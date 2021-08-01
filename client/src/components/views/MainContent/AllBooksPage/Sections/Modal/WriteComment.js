import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";

import commentsAPI from "utils/commentsAPI";

export default function WriteComments({ bookId, getComments, isUserLogged }) {
  const classes = useStyles();

  const [text, setText] = useState("");

  const handleAddingComment = () => {
    commentsAPI.add({ text, bookId }, (res) => {
      res.isSaved || alert(res.message);
      getComments();
      setText("");
    });
  };

  return (
    <div className={classes.margin}>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <AccountCircle />
        </Grid>
        <Grid item>
          <TextField
            id="input-with-icon-grid"
            label={
              isUserLogged ? "Write a comment..." : "Log in  to comment..."
            }
            value={text}
            disabled={!isUserLogged}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <Button
            variant={"contained"}
            size="small"
            color="primary"
            className={classes.button}
            onClick={handleAddingComment}
            disabled={!isUserLogged}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: `${theme.spacing(1)} 0`,
  },

  button: {
    fontFamily: "montserrat",
    marginRight: theme.spacing(1),
    fontSize: 11,
    textTransform: "lowercase",
    [theme.breakpoints.down("md")]: {
      fontSize: 10,
      padding: ".5em",
    },
  },
}));
