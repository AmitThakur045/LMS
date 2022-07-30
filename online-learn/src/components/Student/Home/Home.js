import React, { useState, useEffect } from "react";
import decode from "jwt-decode";
import HomeSidebar from "../HomeSidebar";
import Main from "./Main";
import Loader from "../../../Utils/Loader";
import { getCourseByBatchCode } from "../../../Redux/actions/studentActions";
import { getBatch } from "../../../Redux/actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoBatch from "./NoBatch";
const Home = () => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("learner"))
  );
  const navigate = useNavigate();
  const [batchCode, setBatchCode] = useState(
    JSON.parse(localStorage.getItem("batchCode"))
  );
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.student.courseList);
  const batch = useSelector((state) => state.admin.batch);
  const [courseList, setCourseList] = useState([]);
  const [batchData, setBatchData] = useState({});
  const [noBatch, setNoBatch] = useState(false);

  const logOut = () => {
    alert("OOPS! Your session expired. Please Login again");
    navigate("/login");
  };

  useEffect(() => {
    if (courses.length !== 0) {
      if (Object.keys(batch).length !== 0) {
        setIsLoading(false);
      }
      setCourseList(courses);
    }
  }, [courses]);
  useEffect(() => {
    if (Object.keys(batch).length !== 0) {
      if (courses.length !== 0) {
        setIsLoading(false);
      }
      setBatchData(batch);
    }
  }, [batch]);
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logOut();
      }
    }
    if (JSON.parse(sessionStorage.getItem("learner")) === null) {
      navigate("/login");
    } else {
      if (user.result.batchCode.length === 0) {
        setNoBatch(true);
        setIsLoading(false);
      } else {
        dispatch(
          getCourseByBatchCode({
            batchCode: batchCode,
          })
        );
        dispatch(
          getBatch({
            batchCode: batchCode,
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
        <div className="bg-[#1a1a1a] w-full h-screen flex overflow-hidden">
          <HomeSidebar />
          {user !== null && !noBatch && (
            <Main courseList={courseList} batchData={batchData} />
          )}
          {user !== null && noBatch && <NoBatch />}
        </div>
      )}
    </>
  );
};

export default Home;
