import React, { useState } from "react";
import CourseSidebar from "../CourseSidebar";

import CourseHeader from "../CourseHeader";

import LabsMain from "./LabsMain";

const Labs = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));

  return (
    <div className="bg-[#1a1a1a] w-full sm:w-screen h-screen flex overflow-hidden">
      <CourseSidebar />
      {user !== null && (
        <div className="bg-white flex my-4 w-full rounded-2xl mx-2 sm:mx-0 sm:mr-4 flex-col">
          <CourseHeader />
          <LabsMain />
        </div>
      )}
    </div>
  );
};

export default Labs;
