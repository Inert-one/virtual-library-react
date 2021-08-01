import React from "react";
import "./statisticsPage.css";

import NumbersDisplay from "./Sections/NumbersDisplay";
import PieChart from "./Sections/PieChart";
import BooksDisplay from "./Sections/BooksDisplay";

import statisticsAPI from "utils/statisticsAPI";

export default function StatisticsPage() {
  return (
    <div className="statistics">
      <h1 className="statistics__header">Statistics</h1>

      <PieChart
        text="Books on our site by categories"
        getCallback={statisticsAPI.getQuantityOfCategories}
      />
      <NumbersDisplay getCallback={statisticsAPI.getNumbers} />
      <BooksDisplay
        getCallback={statisticsAPI.getBestBooks}
        header={"Top rated books"}
      />
      <BooksDisplay
        getCallback={statisticsAPI.getLastBooks}
        header={"Recently added books"}
      />
      <BooksDisplay
        getCallback={statisticsAPI.getMostPopular}
        header={"Most popular books"}
      />
    </div>
  );
}
