import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";

import Header from "../Header";

import Main from "./Main";
import Loader from "../../../Utils/Loader";

const Dashboard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("admin")));

  return (
    <div className="flex h-screen w-full bg-[#ffffff] overflow-hidden">
      <div className="lg:flex-[0.15] flex-[0.25] h-screen">
        <Sidebar />
      </div>
      {user !== null && (
        <div className="lg:flex-[0.85] flex-[0.75] flex flex-col">
          <Header type="Dashboard" />
          <Main />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
