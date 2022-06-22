import React from "react";
import Sidebar from "../../Sidebar";

import Header from "../../Header";

import Main from "./Main";

const AddCourse = () => {
  return (
    <div className="h-screen w-full bg-[#ffffff] flex overflow-hidden">
      <Sidebar />
      <div className="flex flex-col  w-full">
        <Header title={"Course"} back={true} nav={"course"} />
        <Main />
      </div>
    </div>
  );
};

export default AddCourse;
