import React, { useState, useEffect } from "react";
import { S3_BUCKET, MY_BUCKET, DESTINATION } from '../../../../../utils/uploadAPI';

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
  fileName: "",
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
  
  
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
  
    const changeHandler = (event) => {
      setSelectedFile(event.target.files[0]);
      setBook({ ...book, fileName: event.target.files[0].name });
      setIsFilePicked(true);
    };

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

  const handleSaveBook = (book, file) => {
    if (!book.rating)
      return handleOpenSnackbar({ isSaved: false, message: "Rate the book" });
    booksAPI.create(book, (res) => handleOpenSnackbar(res));

    // Upload book
    const destination = DESTINATION;
    const pathName = `${ destination }/${ file.name }`;

    // setBook({ ...book, fileName: file.name });
    const contentTypes = {
      'pdf': 'application/pdf',
      'docx': 'application/docx',
      'txt': 'application/txt'
    };

    const getContentType = file => {
      const extension = file.split('.').pop();
      return contentTypes[extension];
    }

    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: pathName,
      ContentType: getContentType(file.name)
    };

    MY_BUCKET
      .putObject(params)
      .send(err => {
        if (err) console.log(err);
      });
  };

  useEffect(() => {
    categoriesAPI.get((res) => setCategories(res.map((cat) => cat.category)));
  }, []);

  return (
    <>
      <h1>Add new book to your library: </h1>
      <div
      alignContent="center" container >
      <input
      type="file"
      accept=".pdf, .docx, .txt"
      style={{ display: 'none' }}
      id="contained-button-file"
      onChange={changeHandler}
      onInputChange={(_, selectedFile) => {
        setBook({ ...book, fileName: selectedFile.name });
      }}
    />
    <label htmlFor="contained-button-file">
      <Button variant="contained" color="primary" component="span">
        Upload
      </Button>
    </label>
    {isFilePicked ? (
					<p>{selectedFile.name}</p>
				
			) : (
				<p>Select a file to show details</p>
			)}</div>
      <Grid
        alignContent="center"
        container
        className={classes.root}
        spacing={1}
      >
        <Grid container item xs={12} md={8} spacing={2}>
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
              onClick={() => handleSaveBook(book, selectedFile)}
            >
              SAVE THE BOOK
            </Button>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={4} spacing={3}>
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
