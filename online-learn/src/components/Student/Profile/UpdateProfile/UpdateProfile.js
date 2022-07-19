import React, { useEffect, useState } from "react";
import HomeSidebar from "../../HomeSidebar";
import Main from "./Main";
import decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));

  const navigate = useNavigate();
  const logOut = () => {
    alert("OOPS! Your session expired. Please Login again");
    navigate("/login");
  };
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logOut();
      }
    }
  }, []);
  return (
    <div className="bg-[#1a1a1a] w-full h-screen flex overflow-hidden">
      <HomeSidebar />
      <Main />
    </div>
  );
};

export default UpdateProfile;
