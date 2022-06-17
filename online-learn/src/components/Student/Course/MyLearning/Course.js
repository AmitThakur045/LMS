import React, { useState } from "react";
import CourseMain from "./CourseMain";
import CourseSidebar from "../CourseSidebar";
import CourseHeader from "../CourseHeader";
import { useSelector } from "react-redux";

const Course = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));
  const batch = useSelector((state) => state.admin.batch);

  return (
    <div className="bg-black w-screen h-screen flex overflow-hidden">
      <CourseSidebar />
      {user !== null && Object.keys(batch).length !== 0 && (
        <div className="bg-white flex-[0.93] my-4 rounded-2xl mr-4 flex flex-col">
          <CourseHeader />
          <CourseMain />
        </div>
      )}
    </div>
  );
};

export default Course;
