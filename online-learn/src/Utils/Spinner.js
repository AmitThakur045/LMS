import { CircularProgress } from "@mui/material";
import React from "react";
// import { Circles } from "react-loader-spinner";
const Spinner = ({ message, messageColor }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      {/* <Circles color={color} height={height} width={width} className="m-5" /> */}
      <CircularProgress color="secondary" />
      <p style={{ color: messageColor }} className="text-lg text-center px-2">
        {message}
      </p>
    </div>
  );
};

export default Spinner;
