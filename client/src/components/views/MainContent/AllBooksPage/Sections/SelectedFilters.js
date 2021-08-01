import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Chip } from "@material-ui/core";
import { setFilter } from "_actions/books_actions";

export default function SelectedFilters() {
  const { category, pages, year } = useSelector(
    (state) => state.books_store.filters
  );

  const dispatch = useDispatch();

  const handleCategoryDelete = (cat) => {
    const _categories = category.filter((item) => cat !== item);
    dispatch(setFilter({ category: _categories }));
  };

  const handleFilterDelete = (cat) => {
    const [name] = Object.keys(cat);
    dispatch(setFilter({ [name]: [] }));
  };

  return (
    <>
      {category &&
        category.map((cat) => (
          <Chip
            style={{ margin: "1em 0 2em" }}
            onDelete={() => {
              handleCategoryDelete(cat);
            }}
            label={cat}
          ></Chip>
        ))}
      {pages.length === 2 && (
        <Chip
          style={{ margin: "1em 1em 2em" }}
          onDelete={() => {
            handleFilterDelete({ pages });
          }}
          label={`pages: ${pages[0]} to ${pages[1]} `}
        ></Chip>
      )}
      {year.length === 2 && (
        <Chip
          style={{ margin: "1em 1em 2em" }}
          onDelete={() => handleFilterDelete({ year })}
          label={`year: ${year[0]} to ${year[1]} `}
        ></Chip>
      )}
    </>
  );
}
