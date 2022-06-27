import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

import Main from "./Dashboard/Main";
import Header from "./Header";

const ViewBatch = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("admin")));

  return (
    <>
      {user !== null && (
        <div className="h-screen w-full bg-[#ffffff] flex overflow-hidden">
          <Sidebar />
          <div className="flex flex-col  w-full">
            <Header />
            <Main />
          </div>
        </div>
      )}
    </>
  );
};

export default ViewBatch;
