import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseHeader from "../CourseHeader";
import CourseSidebar from "../CourseSidebar";
import AssignmentMain from "./AssignmentMain";
import Loader from "../../../../Utils/Loader";
import { getAssignmentByBatchCode } from "../../../../Redux/actions/studentActions";
import { getBatch } from "../../../../Redux/actions/adminActions";
import { useNavigate } from "react-router-dom";
import { SET_ERRORS } from "../../../../Redux/actionTypes";
const Course = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const batch = useSelector((state) => state.admin.batch);
  const store = useSelector((state) => state);
  const [index, setIndex] = useState(JSON.parse(localStorage.getItem("index")));
  const [batchData, setBatchData] = useState({});
  const assignment = useSelector((state) => state.student.assignment);
  const [allAssignment, setAllAssignment] = useState([]);
  useEffect(() => {
    if (assignment.length !== 0) {
      setIsLoading(false);
      setAllAssignment(assignment);
    }
  }, [assignment]);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setIsLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    if (Object.keys(batch).length !== 0) {
      dispatch(
        getAssignmentByBatchCode({
          batchCode: user.result.batchCode[0],
          courseCode: batch.courses[index].courseCode,
        })
      );
      setBatchData(batch);
    }
  }, [batch]);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("learner")) === null) {
      navigate("/login");
    } else {
      dispatch(
        getBatch({
          batchCode: user?.result.batchCode[user.result.batchCode.length - 1],
        })
      );
    }
    dispatch({ type: SET_ERRORS, payload: {} });
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
              <CourseHeader batchData={batchData} />
              <AssignmentMain
                allAssignment={allAssignment}
                batchData={batchData}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Course;
