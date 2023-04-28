import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Button,
} from "@material-tailwind/react";

export default function UserCard({ user }) {
  return (
    <Card className="max-w-[20rem] mt-4">
      <CardHeader floated={false} className="h-65">
        <img
          src={user.avatar_url}
          alt="profile-picture"
          className="w-full h-full"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {user.name}
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
          followers:- {user.followers}
        </Typography>
        <a
          href={user.html_url}
          target="_blank"
          className="tracking-wider mt-6 capitalize bg-green-400 px-2 py-1 rounded-sm text-white text-sm"
        >
          github
        </a>
      </CardBody>
    </Card>
  );
}
