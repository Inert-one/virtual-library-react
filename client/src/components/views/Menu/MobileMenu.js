import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import AddBoxIcon from "@material-ui/icons/AddBox";

export default function IconLabelTabs({ history }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon label tabs example"
      >
        <Tab
          classes={{ root: classes.option }}
          icon={<LibraryBooks />}
          label="All"
          onClick={() => {
            history.push("/");
          }}
        />
        <Tab
          classes={{ root: classes.option }}
          icon={<BookmarkIcon />}
          label="marked"
          onClick={() => {
            history.push("/markers");
          }}
        />
        <Tab
          classes={{ root: classes.option }}
          icon={<AddBoxIcon />}
          label="add"
          onClick={() => {
            history.push("/add");
          }}
        />
      </Tabs>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    width: "calc(100vw - 2em)",
    borderRadius: "10px",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
    zIndex: "99",
  },
  option: {
    fontSize: "12px",
    textTransform: "lowercase",
    textColor: "#00b0f6",
  },
}));
