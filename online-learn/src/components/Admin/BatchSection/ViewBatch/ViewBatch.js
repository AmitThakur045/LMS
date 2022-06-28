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
          <div className="lg:flex-[0.15] flex-[0.25] h-screen">
            <Sidebar />
          </div>
          <div className="lg:flex-[0.85] flex-[0.75] flex flex-col">
            <Header />
            <Main />
          </div>
        </div>
      )}
    </>
  );
};

export default ViewBatch;
