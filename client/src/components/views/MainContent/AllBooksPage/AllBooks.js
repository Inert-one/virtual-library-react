import React, { useState } from "react";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";

import Modal from "./Sections/Modal/Modal";
import Filters from "./Sections/Filters";
import SelectedFilters from "./Sections/SelectedFilters";
import Book from "./Sections/Book";
import Pagination from "./Sections/Pagination";

export default function AllBooks() {
  const books = useSelector((state) => state.books_store.books) || false;

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [sizeOfCards, setSizeOfCards] = useState(0);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  if (!books) return <>Loading...</>;

  const listOfBooks = books.map((book, id) => (
    <Book
      key={book._id}
      id={id}
      book={book}
      handleModalOpen={() => {
        setModalContent(book);
        handleModalOpen();
      }}
      sizeOfCards={sizeOfCards}
    />
  ));

  const noResults = <h1 style={{ padding: ".5em" }}>No results</h1>;

  return (
    <>
      <Filters setSizeOfCards={setSizeOfCards} />
      <SelectedFilters />
      <div className="allBooks">
        <Grid spacing={4} container>
          {books.length ? listOfBooks : noResults}
        </Grid>
        <Modal
          modalContent={modalContent}
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
        />
      </div>
      <Pagination />
    </>
  );
}
