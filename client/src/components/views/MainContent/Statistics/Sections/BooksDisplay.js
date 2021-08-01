import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import "../statisticsPage.css";

import Book from "../../AllBooksPage/Sections/Book";
import Modal from "../../AllBooksPage/Sections/Modal/Modal";
import Spinner from "./Spinner";

export default function BooksDisplay({ getCallback, header }) {
  const [books, setBooks] = useState([]);
  const [modalBook, setModalBook] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getCallback((res) => {
      setIsLoaded(true);
      setBooks(res);
    });
  }, []);

  return (
    <>
      <h1 class="statistics__subheader">{header}</h1>
      {isLoaded ? (
        <>
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
      ) : (
        <Spinner />
      )}
    </>
  );
}
