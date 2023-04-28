import { useContext, useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, redirect, useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { AlertContext } from "../context/AlertPopUpContext";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Signin() {
  let navigate = useNavigate();

  let { user, setUser } = useContext(UserContext);
  let { setShow } = useContext(AlertContext);

  if (user) {
    return navigate("/");
  }

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let [loading, setLoading] = useState(false);

  function handleSignup() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser({
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        });

        setShow({
          color: "green",
          message: "Account has been created",
          visible: true,
        });

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        setShow({
          color: "red",
          message: `failed! ${errorMessage}`,
          visible: true,
        });
      });
  }

  function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    handleSignup();
  }

  if (user?.uid) {
    return redirect("/");
  } else {
    return (
      <div className="flex justify-center mt-7">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to login.
          </Typography>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-4 flex flex-col gap-6">
              <Input
                type="email"
                size="lg"
                label="Email"
                required
                disabled={loading ? true : false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                size="lg"
                label="Password"
                required
                disabled={loading ? true : false}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {loading ? (
              <Button type="submit" disabled className="mt-6" fullWidth>
                Loading...
              </Button>
            ) : (
              <Button type="submit" className="mt-6" fullWidth>
                Login
              </Button>
            )}
            <Typography color="gray" className="mt-4 text-center font-normal">
              if you don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Sign Up
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    );
  }
}
