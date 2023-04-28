import { Typography } from "@material-tailwind/react";

export default function Footer() {
  function getCurrentYear() {
    return new Date().getFullYear();
  }
  return (
    <footer className="w-full  bg-white p-8">
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; {getCurrentYear()} Github Profile App
      </Typography>
    </footer>
  );
}
