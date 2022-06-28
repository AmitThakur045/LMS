import React, { useState, useEffect } from "react";
import CourseMain from "./CourseMain";
import CourseSidebar from "../CourseSidebar";
import CourseHeader from "../CourseHeader";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../Utils/Loader";
import { getBatch } from "../../../../Redux/actions/adminActions";
import { useNavigate } from "react-router-dom";
import { getBatchLessonVideoByCourse } from "../../../../Redux/actions/studentActions";

const Course = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));
  const [courseCode, setCourseCode] = useState(
    JSON.parse(localStorage.getItem("courseCode"))
  );

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const batch = useSelector((state) => state.admin.batchLessonVideo);
  const [batchData, setBatchData] = useState({});

  useEffect(() => {
    if (Object.keys(batch).length !== 0) {
      setIsLoading(false);
      setBatchData(batch);
    }
  }, [batch]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("learner")) === null) {
      navigate("/login");
    } else {
      if (courseCode !== null) {
        dispatch(
          getBatchLessonVideoByCourse({
            batchCode: user.result.batchCode[user.result.batchCode.length - 1],
            courseCode,
          })
        );
      }
    }
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
            <div className="bg-white flex my-4 w-full h-full rounded-2xl mx-2 sm:mx-0 sm:mr-4 flex-col">
              <CourseHeader batchData={batchData} />
              <CourseMain batchData={batchData} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Course;
