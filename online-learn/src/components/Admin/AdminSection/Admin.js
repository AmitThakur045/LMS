import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";

import Main from "./Main";

const Admin = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("admin")));
  return (
    <div className="h-screen w-full bg-[#ffffff] flex overflow-hidden">
      <Sidebar />
      {user !== null && (
        <div className="flex flex-col  w-full">
          <Header title={"Admin"} />
          <Main />
        </div>
      )}
    </div>
  );
};

export default Admin;
