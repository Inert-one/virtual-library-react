import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import IconButton from "@material-ui/core/IconButton";

import Book from "../AllBooksPage/Sections/Book";
import Modal from "../AllBooksPage/Sections/Modal/Modal";

export default function UserBooks({ title, fetchCallback, deleteCallback }) {
  const [books, setBooks] = useState([]);
  const [modalBook, setModalBook] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchCallback((res) => setBooks(res));
  }, [fetchCallback]);

  const removeCallback = (removedBook) => {
    deleteCallback(removedBook._id, (res) => {
      res.isSaved
        ? setBooks(books.filter((book) => removedBook._id !== book._id))
        : alert(res.message);
    });
  };

  return (
    <div style={{ flexGrow: 1 }}>
      {books.message ? (
        <h1 style={{ padding: ".5em" }}>No access, login or register</h1>
      ) : (
        <>
          <h1 style={{ padding: ".5em" }}>{title}</h1>
          <Grid spacing={4} container>
            {books.map((book, id) => (
              <Book
                handleModalOpen={() => {
                  setModalBook(book);
                  setModalOpen(true);
                }}
                id={id}
                book={book}
                buttons={false}
              >
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="red"
                  className="books__delete"
                  onClick={() => removeCallback(book)}
                >
                  <HighlightOffIcon />
                </IconButton>
              </Book>
            ))}
          </Grid>
          <Modal
            modalContent={modalBook}
            isModalOpen={isModalOpen}
            setModalOpen={setModalOpen}
          />
        </>
      )}
    </div>
  );
}
