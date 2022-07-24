import React, { useEffect, useState } from "react";
import CourseSidebar from "../CourseSidebar";

import CourseHeader from "../CourseHeader";
import Loader from "../../../../Utils/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getBatch } from "../../../../Redux/actions/adminActions";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";
import StudentBatchCommunityMain from "./StudentBatchCommunityMain";
import {
  getProblemCategories,
  getThreads,
} from "../../../../Redux/actions/studentActions";

const StudentBatchCommunity = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));
  const [isLoading, setIsLoading] = useState(true);
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const batch = useSelector((state) => state.admin.batch);
  const [batchData, setBatchData] = useState({});
  const allThreads = useSelector((state) => state.student.threads);
  const allCategories = useSelector((state) => state.student.problemCategories);
  const [threads, setThreads] = useState([]);
  const [problemCategory, setProblemCategory] = useState([]);
  const [error, setError] = useState({});
  const logOut = () => {
    alert("OOPS! Your session expired. Please Login again");
    navigate("/login");
  };
  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      if (store.errors.noCategoryError) {
        setProblemCategory([]);
      }
      setError(store.errors);
      setIsLoading(false);
    }
  }, [store.errors]);
  useEffect(() => {
    if (Object.keys(batch).length !== 0) {
      if (allCategories.length !== 0 && allThreads.length !== 0) {
        setIsLoading(false);
      }
      setBatchData(batch);
    }
  }, [batch]);
  useEffect(() => {
    if (allThreads.length !== 0) {
      if (allCategories.length !== 0 && Object.keys(batch).length !== 0) {
        setIsLoading(false);
      }
      setThreads(allThreads);
    }
  }, [allThreads]);
  useEffect(() => {
    if (allCategories.length !== 0) {
      if (allThreads.length !== 0 && Object.keys(batch).length !== 0) {
        setIsLoading(false);
      }
      setProblemCategory(allCategories);
    }
  }, [allCategories]);
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logOut();
      }
    }
    if (JSON.parse(localStorage.getItem("learner")) === null) {
      navigate("/login");
    } else {
      dispatch(
        getBatch({
          batchCode: user?.result.batchCode[user.result.batchCode.length - 1],
        })
      );
      dispatch(
        getThreads({
          communityType: "Batch",
          batchCode: user?.result.batchCode[user.result.batchCode.length - 1],
        })
      );
      dispatch(
        getProblemCategories({
          communityType: "Batch",
          batchCode: user?.result.batchCode[user.result.batchCode.length - 1],
        })
      );
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
            <div className="bg-white flex my-4 w-full rounded-2xl mx-2 sm:mx-0 sm:mr-4 flex-col">
              <CourseHeader batchData={batchData} />
              <StudentBatchCommunityMain
                threads={threads}
                categories={problemCategory}
                error={error.noCommunityError}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default StudentBatchCommunity;
