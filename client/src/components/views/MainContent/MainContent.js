import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./mainContent.css";

import AllBooks from "./AllBooksPage/AllBooks";
import AddBooks from "./AddBooksPage/AddBooks";
import UserBooks from "./UserBooksPages/UserBooks";
import UserProfile from "./UserProfile/UserProfile";
import StatisticsPage from "./Statistics/StatisticsPage";

import booksAPI from "utils/booksAPI";
import markersAPI from "utils/markersAPI";

export default function MainContent() {
  const searchPhrase = useSelector(
    (state) => state.books_store.filters.searchPhrase
  );

  return (
    <div className="content__main">
      {searchPhrase.length ? (
        <>
          <h1>Searching for '{searchPhrase}'</h1>
          <AllBooks />
        </>
      ) : (
        <Switch>
          <Route exact path="/" component={AllBooks} />
          <Route exact path="/myBooks">
            <UserBooks
              title={"Books that you have created:"}
              fetchCallback={booksAPI.getUserBooks}
              deleteCallback={booksAPI.remove}
            />
          </Route>
          <Route exact path="/markers">
            <UserBooks
              title={"Books that you have marked:"}
              fetchCallback={markersAPI.getUserMarkers}
              deleteCallback={markersAPI.remove}
            />
          </Route>
          <Route exact path="/add" component={AddBooks} />
          <Route exact path="/user/:id" component={UserProfile} />
          <Route exact path="/statistics" component={StatisticsPage} />
        </Switch>
      )}
    </div>
  );
}
