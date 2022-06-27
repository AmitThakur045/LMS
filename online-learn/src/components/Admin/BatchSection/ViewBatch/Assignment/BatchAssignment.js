import React, { useEffect, useState } from "react";
import Loader from "../../../../../Utils/Loader";
import Header from "../Header";
import Sidebar from "../Sidebar";

import Main from "./Main";

const BatchAssignment = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("admin")));

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

export default BatchAssignment;
