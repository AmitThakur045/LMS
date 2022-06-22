import React, { useEffect, useState } from "react";
import Loader from "../../../../../Utils/Loader";
import Header from "../Header";
import Sidebar from "../Sidebar";

import Main from "./Main";

const BatchCode = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("admin")));
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
              <Header />
              <Main />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BatchCode;
