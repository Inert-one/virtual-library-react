import React, { useState, useEffect } from "react";

import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import commentsAPI from "utils/commentsAPI";
import CardContent from "@material-ui/core/CardContent";

import SingleComment from "./SingleComment.js";
import WriteComment from "./WriteComment";

import isLogged from "utils/isLogged";

export default function Comments({ bookId }) {
  const classes = useStyles();
  const isUserLogged = isLogged();
  const [comments, setComments] = useState([]);

  const getComments = () => {
    commentsAPI.get(bookId, (res) => {
      setComments(res);
    });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      <CardContent>
        <h1>
          {comments.length}
          {comments.length === 1 ? " Comment" : " Comments"}
        </h1>
        <WriteComment
          bookId={bookId}
          getComments={getComments}
          isUserLogged={isUserLogged}
        />
      </CardContent>

      <CardContent className={classes.comments}>
        {comments.length ? (
          <List className={classes.list}>
            {comments.map((comment) => (
              <SingleComment
                comment={comment}
                key={comment.id}
                getComments={getComments}
                isUserLogged={isUserLogged}
              />
            ))}
          </List>
        ) : (
          <h4>No comments</h4>
        )}
      </CardContent>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  list: {
    marginBottom: theme.spacing(2),
  },
  comments: {
    [theme.breakpoints.down("md")]: {
      padding: "0px !important",
    },
  },
}));
