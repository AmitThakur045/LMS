import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";

import Header from "../Header";

import Main from "./Main";
import Loader from "../../../Utils/Loader";

const Dashboard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("admin")));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen w-full">
          <Loader isLoading={isLoading} />
        </div>
      ) : (
        <div className="h-screen w-full bg-[#ffffff] flex overflow-hidden">
          <Sidebar />
          {user !== null && (
            <div className="flex flex-col  w-full">
              <Header type="Dashboard" />
              <Main />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
