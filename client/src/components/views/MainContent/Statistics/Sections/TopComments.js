import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import IconButton from "@material-ui/core/IconButton";

import statisticsAPI from "utils/statisticsAPI";

import Book from "../../AllBooksPage/Sections/Book";
import Modal from "../../AllBooksPage/Sections/Modal/Modal";

export default function TopRated({}) {
  const [books, setBooks] = useState([]);
  const [modalBook, setModalBook] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    statisticsAPI.getBestBooks((res) => setBooks(res));
  }, []);

  return (
    <>
      <h1 style={{ paddingBottom: ".5em" }}>{"Top rated books"}</h1>
      <Grid spacing={4} container>
        {books.map((book, id) => (
          <Book
            handleModalOpen={() => {
              setModalBook(book);
              setModalOpen(true);
            }}
            id={id}
            book={book}
          ></Book>
        ))}
      </Grid>
      <Modal
        modalContent={modalBook}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  );
}
