import { useContext } from "react";
import { Fragment } from "react";
import { Alert, Button } from "@material-tailwind/react";
import { AlertContext } from "../context/AlertPopUpContext";

export default function AlertPopUp() {
  const { show, setShow } = useContext(AlertContext);
  if (show) {
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }
  return (
    <Fragment>
      {show && (
        <Alert
          color={show.color}
          show={show?.visible}
          dismissible={{
            onClose: () => setShow(false),
          }}
        >
          {show.message}
        </Alert>
      )}
    </Fragment>
  );
}
