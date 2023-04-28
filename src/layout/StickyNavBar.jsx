import React, { useState, useEffect, useContext } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

import { UserContext } from "../context/UserContext";

export default function StickyNavBar() {
  let navigate = useNavigate();
  let { user, setUser } = useContext(UserContext);

  // method for logout
  function logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser(false);
        navigate("/signin");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link
          to="/signup"
          className="flex items-center"
          onClick={() => setOpenNav(false)}
        >
          SignUp
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link
          to="/signin"
          className="flex items-center"
          onClick={() => setOpenNav(false)}
        >
          SignIn
        </Link>
      </Typography>
    </ul>
  );

  return (
    <>
      <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link
            as="a"
            to="/"
            className="mr-4 cursor-pointer py-1.5 font-medium"
            onClick={() => setOpenNav(false)}
          >
            GithubApp
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block"
                  onClick={logout}
                >
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <div className="mr-4 hidden lg:block">{navList}</div>
            )}

            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <div
                  className="hamburger hamburger--collapse is-active"
                  type="button"
                >
                  <span className="hamburger-box">
                    <span className="hamburger-inner"></span>
                  </span>
                </div>
              ) : (
                <div className="hamburger hamburger--collapse" type="button">
                  <span className="hamburger-box">
                    <span className="hamburger-inner"></span>
                  </span>
                </div>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {user ? (
            <Button
              variant="gradient"
              size="sm"
              fullWidth
              className="mb-2 mt-2"
              onClick={() => {
                setOpenNav(false);
                logout();
              }}
            >
              <span>Logout</span>
            </Button>
          ) : (
            navList
          )}
        </MobileNav>
      </Navbar>
    </>
  );
}
