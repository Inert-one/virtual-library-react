export const URL_API = {
  getByUserName: "/api/users",

  addBook: "/api/books/add",
  getBooks: "/api/books",
  getUserBooks: "/api/books/user",
  deleteBook: "/api/books/delete",

  getCategories: "/api/categories",
  addCategories: "/api/categories",
  removeCategories: "/api/categories",

  getUserMarkers: "/api/markers/user",
  isBookMarked: "/api/markers/book",
  createMarker: "/api/markers/",

  getComments: "/api/comments/get",
  addComment: "/api/comments",
  removeComments: "/api/comments",

  setCommentRate: "/api/commentsRating",
  getCommentRateById: "/api/commentsRating",
  getUserCommentRate: "/api/commentsRating/user",

  setBookRate: "/api/booksRating",
  getAverageBookRate: "/api/booksRating",
  getBookRateById: "/api/booksRating/user",

  getBestBooks: "/api/statistics/bestBooks",
  getLastBooks: "/api/statistics/lastBooks",
  getMostPopular: "/api/statistics/mostPopularBooks",
  getQuantityOfCategories: "/api/statistics/getQuantityOfCategories",
  getNumbers: "/api/statistics/getNumbers",
  getUserActivity: "/api/statistics/userActivity",

  REGISTER: "/api/users/register",
  LOGIN: "/api/users/login",
};
