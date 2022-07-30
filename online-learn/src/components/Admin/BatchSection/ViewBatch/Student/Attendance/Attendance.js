import React, { useState } from "react";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import Main from "./Main";

const Attendance = () => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("admin")));
  return (
    <div className="h-screen w-full bg-[#ffffff] flex overflow-hidden">
      <div className="lg:flex-[0.15] flex-[0.25] h-screen">
        <Sidebar />
      </div>
      {user !== null && (
        <div className="lg:flex-[0.85] flex-[0.75] flex flex-col">
          <Header back={true} nav={"student"} />
          <Main />
        </div>
      )}
    </div>
  );
};

export default Attendance;
