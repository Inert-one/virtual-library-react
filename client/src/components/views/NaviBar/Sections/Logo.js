import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as Vlogo } from './V.svg';

export default function Logo() {
  const classes = useStyles();
  return (
    <>
      <a href="/">
        <Vlogo className={classes.logo}/>
      </a>
      <span className={classes.logoText}>
        virtual<b>LIBRARY</b>
      </span>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  logo: {
    height: "60px",
    width: "50px"
  },
  logoText: {
    display: "none",
    marginLeft: theme.spacing(1),
    color: "#3C3C3C",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
}));
