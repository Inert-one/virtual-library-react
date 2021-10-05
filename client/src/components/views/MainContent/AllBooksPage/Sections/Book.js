import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import cx from "clsx";

import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MoreVertIcon from '@material-ui/icons//MoreVert';
import markersAPI from "utils/markersAPI";
import RateBookAPI from "utils/bookRateAPI";
import isLogged from "utils/isLogged";
import { S3_BUCKET, MY_BUCKET, DESTINATION } from '../../../../../utils/uploadAPI';

const cardSizes = [4, 6];

export default function Book({
  book,
  handleModalOpen,
  buttons = true,
  fullsize = false,
  sizeOfCards = 0,
  children,
}) {
  const classes = useStyles();
  const history = useHistory();

  const [averageRate, setAverageRate] = useState(0);

  const [isMarked, setIsMarked] = useState(false);

  const createMarker = (id) => {
    markersAPI.create(id, (res) => {
      if (res.isSaved) setIsMarked(true);
    });
  };

  const deleteMarker = (id) => {
    markersAPI.remove(id, (res) => {
      if (res.isSaved) setIsMarked(false);
    });
  };

  const handleProfilePageLink = () => {
    book.addedByUsername && history.push(`/user/${book.addedByUsername}`);
  };

  const destination = DESTINATION;
  const pathName = `${ destination }/${ book.fileName }`;

  const downloadBook = () =>{
    function downloadBlob(blob, name = `${book.fileName}`) {
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = name;
      document.body.appendChild(link);
      link.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );

      document.body.removeChild(link);}
    try{
      var params = {
        Bucket : S3_BUCKET,
        Key: pathName
      };
      MY_BUCKET
      .getObject(params, (err, data) => {
        if (err) {
          console.log(err, err.stack);
        } else {
          let fileBlob = new Blob([data.Body]);
          downloadBlob(fileBlob, `${book.fileName}`);
        }
      });
    }catch(err){
      console.error(err)
    }
  }
  useEffect(() => {
    RateBookAPI.getAverageBookRate(book._id, (res) => {
      setAverageRate(res.value);
    });

    isLogged() &&
      markersAPI.isBookMarked(book._id, (res) => {
        setIsMarked(res.isMarked);
      });
  }, []);
  return (
    <Grid item xs={12} md={fullsize ? 12 : cardSizes[sizeOfCards]}>
      <Paper
        className={cx(
          "book-wrapper",
          isMarked ? classes.paperMarked : classes.paper
        )}
      >
        <div className="book">
        <div className={classes.overlayContainer}
        onClick={handleModalOpen}>
          <img
            className="book__img"
            src={book.image}
            alt=""
          />
          <div className={classes.overlay}></div></div>
          <div className="book__info">
            <span className="book__category">{book.category}</span>
            <span className="book__title">{book.name}</span>
            <span className="book__year">{book.year}</span>
            <span className="book__author">written by: {book.author}</span>
            <span className="book__pages">{book.pages} pages</span>
            <Rating
              key={book._id}
              className="book__rating"
              name={book._id}
              size="small"
              value={averageRate * 1 || book.rating * 1}
              readOnly
              precision={0.1}
            />
            {!fullsize && (
              <span onClick={handleProfilePageLink} className="book__addedBy">
                added by:{" "}
                <span className="book__addedByHover">{book.addedBy}</span>
              </span>
            )}

            {buttons && (
              <div className="books__buttons">
                <Button
                  variant={"contained"}
                  size="smaller"
                  color="primary"
                  className={classes.margin}
                  onClick={
                    isMarked
                      ? () => {
                          deleteMarker(book._id);
                        }
                      : () => {
                          createMarker(book._id);
                        }
                  }
                >
                  {isMarked ? "Unmark" : "mark"}
                </Button>
                <Button
                variant={"contained"}
                size="smaller"
                color="primary"
                className={classes.margin}
                onClick={
                  downloadBook}
              >
                Download
              </Button>    
                <Button
                  size="small"
                  color="primary"
                  className={classes.margin}
                  style={{padding: "0px", margin: "0px"}}
                  onClick={handleModalOpen}
                >
                  <MoreVertIcon fontSize="small"/>
                </Button>
              </div>
            )}
          </div>
        </div>
        {children}
      </Paper>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    fontFamily: "montserrat",
    marginRight: theme.spacing(1),
    fontSize: 11,
    textTransform: "lowercase",
    [theme.breakpoints.down("md")]: {
      fontSize: 10,
      padding: ".5em",
    },
  },
  overlayContainer: {
    margin: "0%",
    padding: "0%",
    position: "relative",

  },
  overlay: {
    textAlign: "center",
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    height: "100%",
    opacity: "1",
    transition: ".5s ease",
    zIndex : "10",
    color: "white",
    [theme.breakpoints.up("md")]:{
      background: "linear-gradient( rgba(255,255,255,0) 60%, rgba(255,255,255,1) 90%)",
    },
    [theme.breakpoints.down("sm")]: {
      background: "linear-gradient(to right, rgba(255,255,255,0) 60%, rgba(255,255,255,1) 90%)",
    },
    [theme.breakpoints.down("xs")]: {
      background: "linear-gradient( rgba(255,255,255,0) 60%, rgba(255,255,255,1) 90%)",

    }
  }
  ,
  paper: {
    height: "100%",
    textAlign: "center",
    borderRadius: "20px",
    position: "relative",
    color: theme.palette.text.secondary,
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.11)",
    transition: ".5s",
    [theme.breakpoints.down("sm")]: {
      margin: "0px 20px 0 0",
      height: "auto",
    },
  },
  paperMarked: {
    height: "100%",
    borderRadius: "10px",
    textAlign: "center",
    position: "relative",
    color: theme.palette.text.secondary,
    boxShadow:
      "10px 15px 10px rgba(0, 20, 140, 0.15), 10px 15px 10px rgba(0, 20, 140, 0.15)",
    transition: ".5s",
    [theme.breakpoints.down("md")]: {
      margin: "0px 20px 10px 0",
      height: "auto",
    },
  },
}));
