import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import { Card } from "../MainContent/Statistics/Sections/NumbersDisplay";
import statisticsAPI from "utils/statisticsAPI";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    borderRadius: 20,
  },
}));

function MenuStats() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    statisticsAPI.getNumbers((res) => setNumbers(res));
  }, []);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {numbers.map((number) => (
          <div key={number.category}>
            <Card point={number} />
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </div>
  );
}

export default MenuStats;
