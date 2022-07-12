import React from "react";
import HomeSidebar from "../../HomeSidebar";
import Main from "./Main";

const Profile = () => {
  return (
    <>
      <div className="bg-[#1a1a1a] w-full h-screen flex overflow-hidden">
        <HomeSidebar />
        <Main />
      </div>
    </>
  );
};

export default Profile;
