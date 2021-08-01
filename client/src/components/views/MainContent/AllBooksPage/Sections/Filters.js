import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import FilterListIcon from "@material-ui/icons/FilterList";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import Radio from "@material-ui/core/Radio";
import { Checkbox } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ViewComfySharpIcon from "@material-ui/icons/ViewComfySharp";
import Slider from "@material-ui/core/Slider";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";

import { setFilter } from "_actions/books_actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import categoriesAPI from "utils/categoriesAPI";

export default function Filters({ setSizeOfCards }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleFiltersExpand = () => {
    setIsOpen(!isOpen);
  };

  const [selectedValue, setSelectedValue] = React.useState("0");

  const handleChange = (e) => {
    const { value } = e.target;
    setSelectedValue(value);
    setSizeOfCards(value * 1);
  };

  const filtersOptions = (
    <>
      <Radio
        checked={selectedValue === "0"}
        onChange={handleChange}
        value="0"
        name="radio-button-demo"
        inputProps={{ "aria-label": "0" }}
        icon={<ViewModuleIcon className={classes.clickable} />}
        checkedIcon={
          <ViewModuleIcon
            style={{ color: "#00b0f6" }}
            className={classes.clickable}
          />
        }
      />
      <Radio
        checked={selectedValue === "1"}
        onChange={handleChange}
        value="1"
        name="radio-button-demo"
        inputProps={{ "aria-label": "1" }}
        icon={<ViewComfySharpIcon className={classes.clickable} />}
        checkedIcon={
          <ViewComfySharpIcon
            style={{ color: "#00b0f6" }}
            className={classes.clickable}
          />
        }
      />
      <Checkbox
        onChange={handleFiltersExpand}
        onClick={handleFiltersExpand}
        icon={<FilterListIcon className={classes.clickable} />}
        checkedIcon={<CloseIcon className={classes.clickable} />}
      ></Checkbox>
    </>
  );

  return (
    <>
      <div className="text">
        <span>Books that may interest you:</span>
        <div className={classes.iconContainer}>{filtersOptions}</div>
      </div>
      <AccordionMenu isOpen={isOpen} />
    </>
  );
}

function AccordionMenu({ isOpen }) {
  const classes = useStyles();
  return (
    <Accordion
      style={{
        border: "none",
        marginTop: "0",
      }}
      className={classes.accordionContent}
      expanded={isOpen}
    >
      <AccordionSummary className={classes.none} />
      <AccordionDetails>
        <FilterMainOptions />
      </AccordionDetails>
    </Accordion>
  );
}

const useStylesFilters = makeStyles((theme) => ({
  range: {
    width: 300,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SimplePopover({ label, children }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStylesPopover();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
        className={classes.buttons}
      >
        {label}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className="content" style={{ padding: "2em" }}>
          {children}
        </div>
      </Popover>
    </>
  );
}

function FilterMainOptions() {
  const classes = useStylesFilters();

  const [categories, setCategories] = useState(["loading..."]);

  useEffect(
    () => categoriesAPI.get((res) => setCategories(res.map((c) => c.category))),
    []
  );

  const dispatch = useDispatch();
  const filters = useSelector((state) => state.books_store.filters);

  const [checked, setChecked] = [
    filters.category,
    (a) => dispatch(setFilter({ category: a })),
  ];
  
  const handleChange = (event, newValue) =>
    dispatch(setFilter({ pages: newValue }));

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const [year, setYears] = [
    filters.year,
    (a) => dispatch(setFilter({ year: a })),
  ];
  return (
    <>
      <div className="filterMainOptions">
        <SimplePopover label="category" className={classes.buttons}>
          <List>
            {categories.map((cat) => {
              const labelId = `checkbox-list-label-${cat}`;

              return (
                <ListItem
                  key={cat}
                  role={undefined}
                  dense
                  button
                  onClick={handleToggle(cat)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(cat) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={cat} />
                </ListItem>
              );
            })}
          </List>
        </SimplePopover>
        <SimplePopover label="Numbers of pages">
          <div className={classes.filtersOptions}>
            <Slider
              value={filters.pages.length ? filters.pages : [0, 1000]}
              onChange={handleChange}
              max={1000}
              style={{ width: "200px", marginTop: "1em" }}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              marks={
                filters.pages.length
                  ? [
                      { value: filters.pages[0], label: filters.pages[0] },
                      { value: filters.pages[1], label: filters.pages[1] },
                    ]
                  : [
                      { value: 0, label: 0 },
                      { value: 1000, label: 1000 },
                    ]
              }
            />
          </div>
        </SimplePopover>
        <SimplePopover label="Year">
          <div className="years">
            <TextField
              id="standard-number"
              label="From"
              type="number"
              placeholder="1900"
              onChange={(e) => {
                setYears([+e.target.value, year[1] || 2020]);
              }}
              value={year[0]}
              InputLabelProps={{
                shrink: true,
              }}
              style={{
                margin: ".7em 0",
              }}
            />
            <TextField
              id="standard-number"
              label="From"
              type="number"
              label="To"
              placeholder="2020"
              onChange={(e) => {
                setYears([year[0] || 1900, +e.target.value]);
              }}
              value={year[1]}
              InputLabelProps={{
                shrink: true,
              }}
              style={{
                margin: ".7em 0",
              }}
            />
          </div>
        </SimplePopover>
      </div>
    </>
  );
}

const useStylesPopover = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  buttons: {
    marginRight: "1em",
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    backgroundColor: "transparent",
  },
  bg: {
    backgroundColor: "transparent",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  tp: {
    backgroundColor: "white",
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  none: {
    display: "none",
  },
  accordionContent: {
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.06)",
    borderRadius: "10px",
    [theme.breakpoints.down("md")]: {
      width: "90vw",
    },

    "&:before": {
      display: "none",
    },
  },
  clickable: {
    cursor: "pointer",
    color: "#111",
  },

  secondaryColor: {
    main: "#E33E7F",
  },
  iconContainer: {
    display: "flex",
  },
}));
