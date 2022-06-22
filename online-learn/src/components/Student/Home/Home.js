import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeSidebar from "../HomeSidebar";
import Main from "./Main";
import Loader from "../../../Utils/Loader";

const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));
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
        <div className="bg-[#1a1a1a] w-full h-screen flex overflow-hidden">
          <HomeSidebar />
          {user !== null && <Main />}
        </div>
      )}
    </>
  );
};

export default Home;
