import React from "react";
import Sidebar from "./Sidebar";

import Header from "./Header";

import Main from "./Assignment/Main";

const BatchAssignment = () => {
  return (
    <div className="h-screen w-full bg-[#ffffff] flex overflow-hidden">
      <Sidebar />
      <div className="flex flex-col  w-full">
        <Header />
        <Main />
      </div>
    </div>
  );
};

export default BatchAssignment;
