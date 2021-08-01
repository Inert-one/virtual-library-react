import React, { useEffect, useState } from "react";
import TablePagination from "@material-ui/core/TablePagination";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLimits } from "_actions/books_actions";

import statisticsAPI from "utils/statisticsAPI";

export default function Pagination() {
  const dispatch = useDispatch();
  const [booksQuantity, setBooksQuantity] = useState(0);

  const page = useSelector((state) => state.books_store.limits.page);
  const itemsPerPage = useSelector(
    (state) => state.books_store.limits.itemsPerPage
  );
  const searchPhrase =
    useSelector((state) => state.books_store.filters.searchPhrase) || false;

  const scrollToTop = () => {
    document.querySelector(".content__main").scrollTop = 0;
  };

  const handleChangePage = (event, newPage) => {
    scrollToTop();
    dispatch(setLimits({ page: newPage, itemsPerPage }));
  };

  const handleChangeRowsPerPage = (event) => {
    scrollToTop();
    dispatch(
      setLimits({ page: 0, itemsPerPage: parseInt(event.target.value, 10) })
    );
  };

  useEffect(() => {
    statisticsAPI.getNumbers((res) => {
      const value = res[0].quantity;
      if (value === undefined) return setBooksQuantity(999);
      setBooksQuantity(value);
    });
  }, []);

  if (searchPhrase.length) return null;

  return (
    <TablePagination
      component="div"
      count={booksQuantity}
      page={page}
      onChangePage={handleChangePage}
      rowsPerPage={itemsPerPage}
      rowsPerPageOptions={[6, 12, 24, 36, 48, 96]}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      style={{ margin: "5vh 0" }}
    />
  );
}
