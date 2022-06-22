import React, { useState, useEffect } from "react";
import CourseMain from "./CourseMain";
import CourseSidebar from "../CourseSidebar";
import CourseHeader from "../CourseHeader";
import { useSelector } from "react-redux";
import Loader from "../../../../Utils/Loader";

const Course = () => {
  const batch = useSelector((state) => state.admin.batch);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
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
          {user !== null && Object.keys(batch).length !== 0 && (
            <div className="bg-white flex my-4 w-full h-full rounded-2xl mx-2 sm:mx-0 sm:mr-4 flex-col">
              <CourseHeader />
              <CourseMain />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Course;
