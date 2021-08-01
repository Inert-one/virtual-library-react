import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import { Avatar } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";

export default function UserMenuLoggedDesktop({ user, handleLogout, history }) {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={3} className={classes.account}>
      <Toolbar
        classes={{
          root: classes.toolbarDestop,
        }}
      >
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={() => history.push(`/user/${user.username}`)}
        >
          <Avatar
            alt={user.firstName}
            style={{ backgroundColor: "#00b0f6" }}
            src="/static/images/avatar/1.jpg"
          />
        </IconButton>
        <span className={classes.accountName}>
          {user.firstName} {user.lastName}
        </span>

        <IconButton
          aria-label="show more"
          aria-controls="primary-search-account-menu-mobile"
          aria-haspopup="true"
          onClick={handleLogout}
          color="inherit"
        >
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  toolbarDestop: {
    display: "flex",
    justifyContent: "center",
    color: "#3C3C3C",
    backgroundColor: "white",
    borderRadius: "30px",
    [theme.breakpoints.up("md")]: {
      margin: "0 0 2em 0",
    },
  },

  account: {
    padding: "0px 50px",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  accountName: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(4),
  },
}));
