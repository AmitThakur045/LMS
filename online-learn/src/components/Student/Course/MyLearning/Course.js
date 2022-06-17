import React from "react";
import CourseMain from "./CourseMain";
import CourseSidebar from "../CourseSidebar";

const Course = () => {
  return (
    <div className="bg-black w-screen h-screen flex overflow-hidden">
      <CourseSidebar />
      <CourseMain />
    </div>
  );
};

export default Course;
