import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ModalContent from "./ModalContent.js";


export default function TransitionsModal({
  setModalOpen,
  isModalOpen,
  modalContent,
}) {
  const classes = useStyles();

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isModalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpen}>
          <ModalContent book={modalContent} handleClose={handleClose} />
        </Fade>
      </Modal>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    margin: "5% 0 ",
    justifyContent: "center",
    overflowY: "scroll",
    height: "auto",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(12, 14, 13),
  },
}));
