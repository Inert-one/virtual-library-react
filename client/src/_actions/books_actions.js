import axios from "axios";
import { URL_API } from "utils/URL_API";
import { authHeader } from "../utils/authHeader";
import { SET_BOOKS, SET_FILTERS, CLEAR_FILTERS, SET_LIMITS } from "./types";

export async function setBooks() {
  return async (dispatch, getState) => {
    const options = getState().books_store.filters;
    const limits = getState().books_store.limits;

    const data = await axios
      .post(
        URL_API.getBooks,
        { options, limits },
        {
          headers: authHeader(),
        }
      )
      .then((response) => (response.length ? [] : response.data));

    dispatch({
      type: SET_BOOKS,
      payload: data,
    });
  };
}

export function setFilter(option) {
  return {
    type: SET_FILTERS,
    payload: option,
  };
}

export function clearFilters() {
  return {
    type: CLEAR_FILTERS,
  };
}
export function setLimits(limits) {
  return {
    type: SET_LIMITS,
    payload: limits,
  };
}
