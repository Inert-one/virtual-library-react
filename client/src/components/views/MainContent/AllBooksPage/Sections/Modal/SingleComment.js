import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import dateFormater from "date-and-time";

import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Typography from "@material-ui/core/Typography";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import commentsRatingAPI from "utils/commentsRatingAPI";

export default function SingleComment({
  comment: { comment, name },
  key,
  isUserLogged,
}) {
  const classes = useStyles();
  const { _id, text, createdAt: date } = comment;

  const [rating, setRating] = useState(0);
  const [userRate, setUserRate] = useState(null);

  const handleFetchRatings = () => {
    commentsRatingAPI.getById(_id, ({ value }) => {
      setRating(value);
    });

    if (isUserLogged) {
      commentsRatingAPI.getUserCommentRate(_id, ({ value }) => {
        setUserRate(value);
      });
    }
  };

  const handleCommentRate = (event, newAlignment) => {
    setUserRate(newAlignment);

    const _rating = {
      commentId: _id,
      value: newAlignment,
    };

    commentsRatingAPI.set(_rating, () => {
      handleFetchRatings();
    });
  };

  useEffect(() => {
    handleFetchRatings();
  }, [comment]);

  return (
    <div key={key}>
      <ListItem className={classes.listItem}>
        <ListItemAvatar>
          <Avatar
            style={{ backgroundColor: "#00b0f6" }}
            alt={name}
            src="/static/images/avatar/1.jpg"
          />
        </ListItemAvatar>

        <ListItemText
          className={classes.inline}
          primary={
            <>
              {name}
              <Typography
                className={classes.date}
                component="span"
                variant="caption"
                color="textSecondary"
              >
                {date &&
                  ` ${dateFormater.format(
                    new Date(date),
                    "dddd, MMM DD YYYY HH:mm"
                  )}`}
              </Typography>
            </>
          }
          secondary={
            <>
              <Typography component="span" variant="body2" color="textPrimary">
                {text}
              </Typography>
              <div>
                <ToggleButtonGroup
                  size="small"
                  value={userRate}
                  exclusive
                  onChange={handleCommentRate}
                  aria-label="text alignment"
                >
                  <ToggleButton
                    classes={{
                      root: classes.toggleButton,
                      selected: classes.selectedRate,
                    }}
                    value="like"
                    aria-label="like aligned"
                    disabled={!isUserLogged}
                  >
                    <ThumbUpAltIcon className={classes.icon} />
                  </ToggleButton>
                  <div className={classes.counter}>{rating || ""}</div>
                  <ToggleButton
                    classes={{
                      root: classes.toggleButton,
                      selected: classes.selectedRate,
                    }}
                    value="dislike"
                    aria-label="dislike aligned"
                    disabled={!isUserLogged}
                  >
                    <ThumbDownAltIcon className={classes.icon} />
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </>
          }
        />
      </ListItem>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  toggleButton: {
    fontSize: "16px",
    border: "none",
  },
  icon: {
    fontSize: "16px",
  },
  selectedRate: {
    color: "#111 !important",
    fontSize: "18px !important",
    backgroundColor: "transparent !important",
  },
  counter: {
    display: "flex",
    width: 16,
    justifyContent: "center",
    alignItems: "center",
    fontSize: "14px",
  },

  date: {
    fontSize: "10px",
  },
  inline: {
    display: "inline",
    padding: "0 12 0",
  },
  listItem: {
    padding: "0 15px",
  },
}));
