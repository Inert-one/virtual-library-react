import React, { useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { AlertTitle } from "@material-ui/lab";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Typography from "@material-ui/core/Typography";

import Book from "../../AllBooksPage/Sections/Book";
import Modal from "../../AllBooksPage/Sections/Modal/Modal.js";

import booksAPI from "utils/booksAPI";

import categoriesAPI from "utils/categoriesAPI";

const exampleBook = {
  id: 1,
  name: "Title",
  category: "",
  pages: true,
  year: "2010",
  description: "Description of the book.",
  image: "https://www.tryngo.ch/img/no-img.jpg",
  rating: false,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "3em",
    [theme.breakpoints.down("md")]: {
      padding: "0.1em",
    },
  },
  txtField: {
    width: "100%",
  },
}));

export default function AddBook() {
  const classes = useStyles();

  const [book, setBook] = useState(exampleBook);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [response, setResponse] = useState(false);
  const [categories, setCategories] = useState([]);
  const handleBookInput = ({ target: { name, value } }) => {
    setBook({ ...book, [name]: value });
  };

  const handleOpenSnackbar = (res) => {
    setResponse(res);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleSaveBook = (book) => {
    if (!book.rating)
      return handleOpenSnackbar({ isSaved: false, message: "Rate the book" });
    booksAPI.create(book, (res) => handleOpenSnackbar(res));
  };

  useEffect(() => {
    categoriesAPI.get((res) => setCategories(res.map((cat) => cat.category)));
  }, []);

  return (
    <>
      <h1>Add new book to your library: </h1>
      <Grid
        alignContent="center"
        container
        className={classes.root}
        spacing={1}
      >
        <Grid container item xs={12} md={6} spacing={2}>
          <Grid item md={10} xs={12}>
            <TextField
              className={classes.txtField}
              onChange={handleBookInput}
              value={book.name}
              id="standard-basic"
              label="Name"
              inputProps={{ name: "name" }}
            />
          </Grid>
          <Grid item md={10} xs={12}>
            <TextField
              className={classes.txtField}
              onChange={handleBookInput}
              value={book.author}
              id="standard-basic"
              label="Author"
              inputProps={{ name: "author" }}
            />
          </Grid>

          <Grid item md={10} xs={12}>
            <Autocomplete
              id="combo-box-demo"
              options={categories}
              inputValue={book.category}
              onInputChange={(_, value) => {
                setBook({ ...book, category: value });
              }}
              getOptionLabel={(opt) => opt}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  id="standard-basic"
                  className={classes.txtField}
                />
              )}
            />
          </Grid>
          <Grid item md={5} xs={6}>
            <TextField
              className={classes.txtField}
              onChange={handleBookInput}
              value={book.year}
              type="number"
              id="standard-basic"
              label="Year"
              inputProps={{ name: "year", min: 1900, max: 2020 }}
            />
          </Grid>
          <Grid item md={5} xs={6}>
            <TextField
              className={classes.txtField}
              onChange={handleBookInput}
              value={book.pages}
              type="number"
              id="standard-basic"
              label="Number of pages"
              inputProps={{ name: "pages" }}
            />
          </Grid>
          <Grid item md={5} xs={6}>
            <Typography component="legend">Rating</Typography>

            <Rating
              className="book__rating"
              name={"rating"}
              label="Number of pages"
              size="small"
              value={book.rating}
              inputProps={{ name: "rating" }}
              onChange={(_, newValue) => {
                if (newValue === null) return;
                setBook({ ...book, rating: newValue });
                console.log(book);
              }}
            />
          </Grid>
          <Grid item md={10} xs={12}>
            <TextField
              className={classes.txtField}
              onChange={handleBookInput}
              value={book.image}
              id="standard-basic"
              label="Image"
              inputProps={{ name: "image" }}
            />
          </Grid>
          <Grid item md={10} xs={12}>
            <TextField
              className={classes.txtField}
              onChange={handleBookInput}
              value={book.description}
              width="200px"
              id="standard-basic"
              label="Description"
              multiline
              rows={6}
              inputProps={{ name: "description" }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSaveBook(book)}
            >
              SAVE THE BOOK
            </Button>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={6} spacing={3}>
          <div className="preview">
            <h4>Preview</h4>
            <Book
              book={book}
              buttons={false}
              fullsize={true}
              handleModalOpen={() => {
                setModalOpen(true);
              }}
            />
          </div>
        </Grid>
      </Grid>
      <Modal
        modalContent={book}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      />
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        {response && (
          <Alert severity={response.isSaved ? "success" : "error"}>
            <AlertTitle>{response.isSaved ? "Success" : "Error"}</AlertTitle>
            {response.message}
          </Alert>
        )}
      </Snackbar>
    </>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
