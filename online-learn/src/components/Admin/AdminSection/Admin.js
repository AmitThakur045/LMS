import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";

import Main from "./Main";

const Admin = () => {
  return (
    <div className="h-screen w-full bg-[#ffffff] flex overflow-hidden">
      <Sidebar />
      <div className="flex flex-col  w-full">
        <Header title={"Admin"} />
        <Main />
      </div>
    </div>
  );
};

export default Admin;
