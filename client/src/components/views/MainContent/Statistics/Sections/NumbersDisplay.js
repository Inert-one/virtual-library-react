import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";

const defaultPoints = [{ y: 1, label: "loading..." }];

export default function NumbersDisplay({ getCallback }) {
  const [dataPoints, setDataPoints] = useState(defaultPoints);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getCallback((res) => {
      if (!Object.keys(res).length) return;
      setIsLoaded(true);
      setDataPoints(res);
    });
  }, []);
  return (
    <div className="statistics-cards">
      {isLoaded ? (
        <>
          {dataPoints.map((point) => (
            <Card point={point} />
          ))}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export const Card = ({ point }) => {
  return (
    <div className="statistics-cards__card">
      <h2>{point.quantity}</h2>
      <div className="statistics-cards__title">{point.category}</div>
    </div>
  );
};
