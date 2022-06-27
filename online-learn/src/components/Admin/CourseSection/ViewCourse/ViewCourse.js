import React from "react";
import Sidebar from "../../Sidebar";

import Header from "../../Header";

import Main from "./Main";

const ViewCourse = () => {
  return (
    <div className="h-screen w-full bg-[#ffffff] flex overflow-hidden">
      <div className="lg:flex-[0.15] flex-[0.25] h-screen">
        <Sidebar />
      </div>
      <div className="lg:flex-[0.85] flex-[0.75] flex flex-col">
        <Header title={"Course"} back={true} nav={"course"} />
        <Main />
      </div>
    </div>
  );
};

export default ViewCourse;
