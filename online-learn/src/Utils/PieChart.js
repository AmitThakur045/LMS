import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const PieChart = ({ percentage }) => {
  return (
    <div className="w-[7rem] h-[7rem] mx-10 mb-5">
      <CircularProgressbar value={percentage} text={`${percentage}%`} />;
    </div>
  );
};

export default PieChart;
