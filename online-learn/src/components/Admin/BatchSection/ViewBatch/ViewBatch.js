import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

import Main from "./Dashboard/Main";
import Header from "./Header";

const ViewBatch = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("admin")));
  const [batch, setBatch] = useState(JSON.parse(localStorage.getItem("batch")));
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("batch")) !== null) {
      setBatch(JSON.parse(localStorage.getItem("batch")));
    }
  }, []);

  return (
    <div className="h-screen w-full bg-[#ffffff] flex overflow-hidden">
      <Sidebar />
      {user !== null && batch !== null && (
        <div className="flex flex-col  w-full">
          <Header />
          <Main batchData={batch} user={user} />
        </div>
      )}
    </div>
  );
};

export default ViewBatch;
