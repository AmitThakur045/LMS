import React, { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";

const BookLoader = ({ isLoading }) => {
  const override = `
  display: block;
  margin: 0 auto;
  border-color: red;
`;
  return <BeatLoader color={"#13426e"} isLoading={isLoading} css={override} />;
};

export default BookLoader;
