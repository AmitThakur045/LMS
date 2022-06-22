import React from "react";
import Sidebar from "../../Sidebar";

import Header from "../../Header";

import Main from "./Main";

const ViewAdmin = () => {
  return (
    <div className="h-screen w-full bg-[#ffffff] flex overflow-hidden">
      <Sidebar />
      <div className="flex flex-col  w-full">
        <Header title={"Admin"} back={true} nav={"admin"} />
        <Main />
      </div>
    </div>
  );
};

export default ViewAdmin;
