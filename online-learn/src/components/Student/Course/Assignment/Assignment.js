import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CourseHeader from "../CourseHeader";
import CourseSidebar from "../CourseSidebar";
import AssignmentMain from "./AssignmentMain";
import Loader from "../../../../Utils/Loader";

const Course = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen w-full">
          <Loader isLoading={isLoading} />
        </div>
      ) : (
        <div className="bg-[#1a1a1a] w-full sm:w-screen h-screen flex overflow-hidden">
          <CourseSidebar />
          {user !== null && (
            <div className="bg-white flex my-4 w-full rounded-2xl sm:mr-4 sm:mx-0 mx-2 flex-col lg:overflow-hidden overflow-auto">
              <CourseHeader />
              <AssignmentMain />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Course;
