import React, { useState } from "react";
import HomeSidebar from "../HomeSidebar";

import Main from "./Main";

const Community = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));
  return (
    <>
      <div className="bg-[#1a1a1a] w-full h-screen flex overflow-hidden">
        <HomeSidebar />
        {user !== null && <Main />}
      </div>
    </>
  );
};

export default Community;
