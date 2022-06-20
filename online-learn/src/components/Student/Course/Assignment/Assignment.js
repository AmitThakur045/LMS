import React, { useState } from "react";
import { useSelector } from "react-redux";
import CourseHeader from "../CourseHeader";
import CourseSidebar from "../CourseSidebar";
import AssignmentMain from "./AssignmentMain";

const Course = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));

  return (
    <div className="bg-[#1a1a1a] w-screen h-screen flex overflow-hidden">
      <CourseSidebar />
      {user !== null && (
        <div className="bg-white flex-[0.93] my-4 rounded-2xl mr-4 flex flex-col lg:overflow-hidden overflow-auto">
          <CourseHeader />
          <AssignmentMain />
        </div>
      )}
    </div>
  );
};

export default Course;
