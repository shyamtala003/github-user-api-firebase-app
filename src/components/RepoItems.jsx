import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import Axios from "axios";
import { useEffect, useState } from "react";

export default function RepoItems({ repo_url }) {
  let [repos, setRepos] = useState([]);
  async function userRepos() {
    let response = await Axios.get(repo_url);
    setRepos(response.data);
  }
  useEffect(() => {
    userRepos();
  }, [repo_url]);

  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-6">
      {repos &&
        repos.map((repo) => {
          return (
            <Card className="w-full max-w-[26rem] shadow-lg">
              <CardBody>
                <div className="mb-3 flex items-center justify-between">
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {repo.name}
                  </Typography>
                </div>
                <Typography color="gray">{repo.description}</Typography>
              </CardBody>
              <CardFooter className="pt-3">
                <a
                  href={repo.html_url}
                  target="_blank"
                  className="text-[12px] bg-blue-500  text-white px-4 py-2 rounded-l"
                >
                  Check Repository
                </a>
              </CardFooter>
            </Card>
          );
        })}
    </div>
  );
}
