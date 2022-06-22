import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeSidebar from "../HomeSidebar";
import Main from "./Main";

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));
  return (
    <div className="bg-[#1a1a1a] w-full h-screen flex overflow-hidden">
      <HomeSidebar />
      {user !== null && <Main />}
    </div>
  );
};

export default Profile;