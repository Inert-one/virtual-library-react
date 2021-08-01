import React from "react";

import UserMenuNotLogged from "./UserMenuNotLogged";
import UserMenuLoggedDesktop from "./UserMenuLoggedDesktop";
import UserMenuLoggedMobile from "./UserMenuLoggedMobile";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutUser } from "_actions/user_actions";

export default function UserMenu({ type }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logoutUser());
    window.location.reload();
  };

  if (user === null && type === "desktop")
    return <UserMenuNotLogged history={history} />;

  if (type === "mobile" && user !== null)
    return (
      <UserMenuLoggedMobile
        user={user}
        history={history}
        handleLogout={handleLogout}
      />
    );

  if (type === "desktop" && user !== null)
    return (
      <UserMenuLoggedDesktop
        user={user}
        history={history}
        handleLogout={handleLogout}
      />
    );

  return null;
}
