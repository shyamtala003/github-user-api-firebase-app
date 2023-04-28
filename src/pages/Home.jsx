import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

import { Input, Button } from "@material-tailwind/react";
import Axios from "axios";
import UserCard from "../components/UserCard";
import RepoItems from "../components/RepoItems";

const Home = () => {
  let { user, setUser } = useContext(UserContext);
  let [gitUser, setGitUser] = useState(false);
  let navigate = useNavigate();
  const [query, setQuery] = React.useState("");
  const onChange = ({ target }) => setQuery(target.value);

  useEffect(() => {
    if (user === false) {
      navigate("/signup");
    }
  }, []);

  // function for feching use data from github api
  async function fetchUser() {
    const { data } = await Axios.get(`https://api.github.com/users/${query}`);
    setGitUser(data);
  }

  return (
    <>
      <div className="container mx-5 my-8 ">
        <div className="guthub_query_form">
          <div className="relative flex w-full max-w-[20rem]">
            <Input
              type="text"
              label="Github Username"
              value={query}
              onChange={onChange}
              className="pr-20"
              containerProps={{
                className: "min-w-0",
              }}
            />
            <Button
              size="sm"
              color={query ? "blue" : "blue-gray"}
              disabled={!query}
              className="!absolute right-1 top-1 rounded"
              onClick={fetchUser}
            >
              Submit
            </Button>
          </div>
          <div className="mt-13 flex flex-wrap align-top gap-14">
            {gitUser && <UserCard user={gitUser}></UserCard>}
            <RepoItems repo_url={gitUser.repos_url}></RepoItems>
          </div>
          <div className="mt-13"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
