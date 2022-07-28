import React, { useMemo } from "react";
import { Chart } from "react-charts";

const Reports = () => {
  const data = useMemo(
    () => [
      {
        label: "Responder 1",
        data: [
          [0, 1],
          [1, 2],
          [2, 4],
          [3, 2],
          [4, 7],
        ],
      },
      {
        label: "Responder 2",
        data: [
          [0, 3],
          [1, 1],
          [2, 5],
          [3, 6],
          [4, 4],
        ],
      },
      {
        label: "Responder 2",
        data: [
          [0, 5],
          [1, 2],
          [2, 3],
          [3, 4],
          [4, 3],
        ],
      },
    ],
    []
  );

  const axes = useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "300px",
        }}
      >
        <Chart data={data} axes={axes} />
      </div>
    </>
  );
};

export default Reports;
