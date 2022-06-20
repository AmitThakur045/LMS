import React, { useState } from "react";
import CourseMain from "./CourseMain";
import CourseSidebar from "../CourseSidebar";
import CourseHeader from "../CourseHeader";
import { useSelector } from "react-redux";

const Course = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));
  const batch = useSelector((state) => state.admin.batch);

  return (
    <div className="bg-[#1a1a1a] w-full sm:w-screen h-screen flex overflow-hidden">
      <CourseSidebar />
      {user !== null && Object.keys(batch).length !== 0 && (
        <div className="bg-white flex my-4 w-full rounded-2xl mx-2 sm:mx-0 sm:mr-4 flex-col">
          <CourseHeader />
          <CourseMain />
        </div>
      )}
    </div>
  );
};

export default Course;
