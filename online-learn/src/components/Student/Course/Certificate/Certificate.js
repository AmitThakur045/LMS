import React, { useState, useEffect } from "react";
import CertificateMain from "./CertificateMain";
import CourseSidebar from "../CourseSidebar";
import CourseHeader from "../CourseHeader";
import { useSelector } from "react-redux";
import Loader from "../../../../Utils/Loader";

const Certificate = () => {
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
            <div className="bg-white flex my-4 w-full rounded-2xl mx-2 sm:mx-0 sm:mr-4 flex-col overflow-hidden">
              <CourseHeader />
              <CertificateMain user={user} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Certificate;
