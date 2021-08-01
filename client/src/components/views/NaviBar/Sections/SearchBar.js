import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { setFilter } from "_actions/books_actions";
import { useDispatch } from "react-redux";
import InputBase from "@material-ui/core/InputBase";

export default function SearchBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleSearchPhrase = (e) => {
    dispatch(setFilter({ searchPhrase: e.target.value }));
  };
  return (
    <div className={classes.search}>
      <InputBase
        placeholder="Search…"
        onChange={handleSearchPhrase}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
      />
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    [theme.breakpoints.up("md")]: {
      marginRight: "2em",
    },
  },
  searchIcon: {
    color: "#999",
    cursor: "pointer",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    width: "100%",
    transition: theme.transitions.create("width"),
    backgroundColor: fade(theme.palette.common.white, 0.15),
    marginLeft: `calc(1em + ${theme.spacing(4)}px)`,
    borderBottom: "1px solid #C9C9C9",
    "&:hover": {
      borderBottom: "1px solid #222",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: 0,
      width: "30vw",
    },
  },
}));
