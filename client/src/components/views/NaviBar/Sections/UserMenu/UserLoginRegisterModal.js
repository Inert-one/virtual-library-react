import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

import UserLoginRegisterForm from "./UserLoginRegisterForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserLoginRegisterModal({ title, type }) {
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button
        variant={type === "register" && "contained"}
        color="primary"
        onClick={toggleModal}
      >
        {title}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={toggleModal}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <UserLoginRegisterForm type={type} />
      </Dialog>
    </>
  );
}
