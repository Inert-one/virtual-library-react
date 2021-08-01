import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import CanvasJSReact from "utils/canvasjs.react.js";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const defaultPoints = [
  { y: 18, label: "Direct" },
  { y: 49, label: "Organic Search" },
  { y: 9, label: "Paid Search" },
  { y: 5, label: "Referral" },
  { y: 19, label: "Social" },
];

export default function PieChart({ getCallback, text = "" }) {
  const [dataPoints, setDataPoints] = useState(defaultPoints);
  const [isLoaded, setIsLoaded] = useState(false);

  const changeDataToPoints = (data) => {
    const sum = data.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0);

    const points = data
      .filter((point) => point.quantity)
      .map(({ quantity, category }) => {
        return { y: ((quantity / sum) * 100).toFixed(2), label: category };
      });

    return points;
  };

  useEffect(() => {
    getCallback((res) => {
      if (!Object.keys(res).length) return;
      setIsLoaded(true);
      setDataPoints(changeDataToPoints(res));
    });
  }, []);
  return (
    <div className="statistics__chart">
      {isLoaded ? (
        <CanvasJSChart
          options={{
            exportEnabled: true,
            animationEnabled: true,
            backgroundColor: "transparent",
            title: {
              text,
            },
            data: [
              {
                type: "pie",
                startAngle: 75,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{y}% {label} ",
                dataPoints,
              },
            ],
          }}
          /* onRef={ref => this.chart = ref} */
        />
      ) : (
        <Spinner />
      )}

      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
}
