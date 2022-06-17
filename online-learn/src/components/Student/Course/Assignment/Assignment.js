import React from "react";
import CourseSidebar from "../CourseSidebar";
import AssignmentMain from "./AssignmentMain";

const Course = () => {
  return (
    <div className="bg-black w-screen h-screen flex overflow-hidden">
      <CourseSidebar />
      <AssignmentMain />
    </div>
  );
};

export default Course;
