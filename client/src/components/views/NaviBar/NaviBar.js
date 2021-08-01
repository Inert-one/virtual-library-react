import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Logo from "./Sections/Logo.js";
import SearchBar from "./Sections/SearchBar";
import UserMenu from "./Sections/UserMenu/UserMenu.js";

import Toolbar from "@material-ui/core/Toolbar";
import { Grid } from "@material-ui/core";

export default function NaviBar() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <Grid container>
        <Grid item xs={12} md={9}>
          <Toolbar
            classes={{
              root: classes.toolbar,
            }}
          >
            <Logo />
            <SearchBar />
            <UserMenu type="mobile" />
          </Toolbar>
        </Grid>
        <UserMenu type="desktop" />
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  toolbar: {
    color: "#3C3C3C",
    backgroundColor: "white",
    borderRadius: "20px",
  },

  grow: {
    flexGrow: 1,
  },
}));
