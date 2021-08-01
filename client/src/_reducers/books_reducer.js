import {
  SET_BOOKS,
  SET_FILTERS,
  CLEAR_FILTERS,
  SET_LIMITS,
} from "../_actions/types";

const initialState = {
  books: [],
  filters: {
    searchPhrase: "",
    category: [],
    pages: [],
    year: [],
  },
  limits: {
    page: 0,
    itemsPerPage: 12,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_BOOKS:
      return { ...state, books: action.payload };
    case SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case CLEAR_FILTERS:
      return { ...state, filters: initialState.filters };
    case SET_LIMITS:
      return { ...state, limits: action.payload };
    default:
      return state;
  }
}
