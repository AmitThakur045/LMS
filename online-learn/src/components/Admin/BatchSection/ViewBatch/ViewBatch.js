import React, { useState } from "react";
import Sidebar from "./Sidebar";

import Header from "./Dashboard/Header";

import Main from "./Dashboard/Main";

const ViewBatch = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  return (
    <div className="h-screen w-full bg-[#ffffff] flex overflow-hidden">
      <Sidebar />
      {user !== null && (
        <div className="flex flex-col  w-full">
          <Header />
          <Main />
        </div>
      )}
    </div>
  );
};

export default ViewBatch;
