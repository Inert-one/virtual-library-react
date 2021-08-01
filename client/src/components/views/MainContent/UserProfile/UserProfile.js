import React, { useState, useEffect } from "react";
import "./userProfile.css";

import { Avatar } from "@material-ui/core";
import dateFormater from "date-and-time";

import BooksDisplay from "../Statistics/Sections/BooksDisplay";
import NumbersDisplay from "../Statistics/Sections/NumbersDisplay";
import PieChart from "../Statistics/Sections/PieChart";

import usersAPI from "utils/usersAPI";
import statisticsAPI from "utils/statisticsAPI";
import booksAPI from "utils/booksAPI";

export default function UserProfile({ match }) {
  const [user, setUser] = useState("eluwina");
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const formatDate = (date) =>
    ` ${dateFormater.format(new Date(date), "dddd, MMM DD YYYY HH:mm")}`;

  useEffect(() => {
    const userName = match.params.id;
    usersAPI.getByUserName(userName, ({ user, isFound, message }) => {
      if (!isFound) setError(message);
      setUser(user);
      setIsLoaded(true);
    });
  }, [user]);

  if (error) return <h2>{error}</h2>;
  if (!isLoaded) return <h2>Loading...</h2>;

  return (
    <div className="user-profile">
      <section className="user-profile__header">
        <Avatar
          alt={user.firstName}
          className="user-profile__avatar"
          src="/static/images/avatar/1.jpg"
        />
        <h1 className="user-profile__headerText">
          {user.firstName} {user.lastName}
        </h1>
        {user.createdDate && (
          <span className="user-profile__dateText">
            User created at {formatDate(user.createdDate)}
          </span>
        )}
      </section>
      <section className="user-profile__pie-chart">
        <PieChart
          text="Activity of user"
          getCallback={(cb) => statisticsAPI.getUserActivity(user.id, cb)}
        />
      </section>
      <section className="user-profile__numbers">
        <NumbersDisplay
          text="Activity of user"
          getCallback={(cb) => statisticsAPI.getUserActivity(user.id, cb)}
        />
      </section>
      <section className="user-profile__details">
        <BooksDisplay
          getCallback={(cb) => booksAPI.getUserBooks(cb, user.id)}
          header={"Recently added books"}
        />
      </section>
    </div>
  );
}
