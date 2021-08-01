import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Collapse from "@material-ui/core/Collapse";
import MoreVertSharp from "@material-ui/icons/MoreVertSharp";
import AddToHomeScreen from "@material-ui/icons/AddToHomeScreen";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ArrowRightOutlined from "@material-ui/icons/ArrowRightOutlined";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BarChartIcon from "@material-ui/icons/BarChart";

import { useDispatch } from "react-redux";
import { setFilter, clearFilters } from "_actions/books_actions";

import MenuStats from "./MenuStats";
import categoriesAPI from "utils/categoriesAPI.js";

export default function DesktopMenu({ history }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState(["loading data..."]);

  const isLogged = false;

  useEffect(() => {
    categoriesAPI.get((res) => {
      setCategories(res.map((c) => c.category));
    });
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleCategoryClick = (cat) => {
    dispatch(setFilter({ category: [cat] }));
    history.push("/");
  };

  return (
    <>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Menu
          </ListSubheader>
        }
        className={classes.root}
      >
        <ListItem
          button
          onClick={() => {
            dispatch(clearFilters());
            history.push("/");
          }}
        >
          <ListItemIcon>
            <LibraryBooks />
          </ListItemIcon>
          <ListItemText primary="All books" />
        </ListItem>
        <ListItem
          button
          disabled={isLogged}
          onClick={() => {
            history.push("/myBooks");
          }}
        >
          <ListItemIcon>
            <AddToHomeScreen />
          </ListItemIcon>
          <ListItemText primary="My books" />
        </ListItem>
        <ListItem
          button
          disabled={isLogged}
          onClick={() => {
            history.push("/markers");
          }}
        >
          <ListItemIcon>
            <BookmarkIcon />
          </ListItemIcon>
          <ListItemText primary="Marked books" />
        </ListItem>
        <ListItem
          button
          disabled={isLogged}
          onClick={() => {
            history.push("/add");
          }}
        >
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Add books" />
        </ListItem>
        <ListItem
          button
          disabled={isLogged}
          onClick={() => {
            history.push("/statistics");
          }}
        >
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Statistics" />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <MoreVertSharp />
          </ListItemIcon>
          <ListItemText primary="Categories" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {categories.map((cat) => {
              return (
                <ListItem
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  button
                  className={classes.nested}
                  size="small"
                >
                  <ListItemIcon>
                    <ArrowRightOutlined fontSize="small" />
                  </ListItemIcon>
                  <span className={classes.text}>{cat}</span>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
        <div className={classes.stats}>
          <MenuStats />
        </div>
      </List>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "15vw",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "20px",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  nested: {
    padding: "1em 2em .5em",
  },
  paper: {
    margin: theme.spacing(1),
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
  text: {
    fontSize: "14px",
  },
  stats: {
    display: "flex",
    position: "absolute",
    flexDirection: "column",
    marginTop: "5vh",
    flexGrow: 1,
    borderRadius: 20,
    width: "100%",
    justifyContent: "center",
  },
}));
