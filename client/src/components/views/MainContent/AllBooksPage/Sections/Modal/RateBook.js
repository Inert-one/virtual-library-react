import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

import RateBookAPI from "utils/bookRateAPI";
import isLogged from "utils/isLogged";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};
const rating = 5;
export default function RateBook({ bookId, authorRating }) {
  const [averageRate, setAverageRate] = useState(null);
  const [quantityOfVotes, setQuantityOfVotes] = useState(0);
  const [userRate, setUserRate] = useState(0);
  const [hover, setHover] = useState(-1);
  const classes = useStyles();
  const isUserLogged = isLogged();

  const handleChange = (event, newValue) => {
    if (newValue === null || typeof newValue === Number) return;

    setUserRate(newValue);
    RateBookAPI.set({ bookId, value: newValue }, () => {
      fetchBookRatings();
    });
  };

  const fetchBookRatings = () => {
    RateBookAPI.getAverageBookRate(bookId, (res) => {
      setAverageRate(res.value);
      setQuantityOfVotes(res.quantity);
    });

    if (isUserLogged) {
      RateBookAPI.getUserBookRate(bookId, (res) => {
        if (res.isFound) setUserRate(res.value);
      });
    }
  };

  useEffect(() => {
    fetchBookRatings();
  }, []);

  return (
    <>
      <h4>Author of the post rate:</h4>
      <div className={classes.root}>
        <Rating
          name="hover-feedback"
          value={authorRating}
          precision={0.5}
          readOnly
        />
      </div>
      <h4>Average rate:</h4>
      <div className={classes.root}>
        <Rating
          name="hover-feedback"
          value={averageRate * 1}
          precision={0.1}
          readOnly
        />
        {quantityOfVotes && (
          <Box ml={1}>{`${averageRate} (${quantityOfVotes} ${
            quantityOfVotes === 1 ? "vote" : "votes"
          })`}</Box>
        )}
      </div>
      <h4>Your rate:</h4>
      <div className={classes.root}>
        <Rating
          name="hover-feedback"
          value={userRate}
          precision={0.5}
          onChange={handleChange}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          readOnly={!isUserLogged}
        />
        {userRate !== null && (
          <Box ml={2}>{labels[hover !== -1 ? hover : userRate]}</Box>
        )}
        {isUserLogged ? null : <Box ml={2}>Log in to Rate</Box>}
      </div>
    </>
  );
}

const useStyles = makeStyles({
  root: {
    width: 400,
    display: "flex",
    alignItems: "center",
  },
});
