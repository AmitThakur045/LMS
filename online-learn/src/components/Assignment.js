import React from "react";
import AssignmentMain from "./AssignmentMain";
import CourseMain from "./CourseMain";
import CourseSidebar from "./CourseSidebar";

const Course = () => {
  return (
    <div className="bg-black w-screen h-screen flex overflow-hidden">
      <CourseSidebar />
      <AssignmentMain />
    </div>
  );
};

export default Course;
