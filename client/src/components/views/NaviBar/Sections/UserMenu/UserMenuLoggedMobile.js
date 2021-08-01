import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Avatar } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import BarChartIcon from "@material-ui/icons/BarChart";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export default function UserMenuLoggedMobile({ user, handleLogout, history }) {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  return (
    <>
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-controls="primary-search-account-menu-mobile"
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </div>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id="primary-search-account-menu-mobile"
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem onClick={() => history.push(`/user/${user.username}`)}>
          <Avatar
            alt={user.firstName}
            style={{ backgroundColor: "#00b0f6" }}
            src="/static/images/avatar/1.jpg"
          />
          <span className={classes.accountName}>
            {user.firstName} {user.lastName}
          </span>
        </MenuItem>
        <MenuItem
          onClick={() => {
            history.push("/statistics");
          }}
        >
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Statistics" />
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <IconButton
            aria-label="show more"
            aria-controls="primary-search-account-menu-mobile"
            aria-haspopup="true"
            color="inherit"
          >
            <ExitToAppIcon />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      </Menu>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },

  accountName: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(4),
  },
}));
