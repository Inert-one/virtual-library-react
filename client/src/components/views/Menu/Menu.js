import React from "react";
import { useHistory } from "react-router-dom";

import DesktopMenu from "./DektopMenu.js";
import MobileMenu from "./MobileMenu.js";

export default function IconLabelTabs() {
  const history = useHistory();

  return (
    <div className="content__menu">
      <MobileMenu history={history} />
      <DesktopMenu history={history} />
    </div>
  );
}
