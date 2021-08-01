import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";

import UserLoginRegisterModal from "./UserLoginRegisterModal";

export default function UserMenuNotLogged() {
  const classes = useStyles();
  return (
    <Grid item xs="12" md="3" lg="3" className={classes.accountRegister}>
      <Toolbar
        classes={{
          root: classes.toolbarDestop,
        }}
      >
        <UserLoginRegisterModal title="Log in" type="login" />
        <UserLoginRegisterModal title="Register" type="register" />
      </Toolbar>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  toolbarDestop: {
    display: "flex",
    justifyContent: "center",
    color: "#3C3C3C",
    borderRadius: "30px",
    margin: "0 0em 3em ",
    padding : "1em",
    [theme.breakpoints.down("md")]: {
      margin: "1.5em 0 0",
      borderRadius: "10px",
    },
  },

  account: {
    padding: "0px 50px",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
    accountRegister: {
      padding: "0px 200px",
      order: 0,
      [theme.breakpoints.up("md")]: {
        order: 1,
      },
    },
  },
}));
