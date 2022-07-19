import React, { useState, useEffect } from "react";
import decode from "jwt-decode";
import HomeSidebar from "../HomeSidebar";
import Main from "./Main";
import Loader from "../../../Utils/Loader";
import { getCourseByBatchCode } from "../../../Redux/actions/studentActions";
import { getBatch } from "../../../Redux/actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.student.courseList);
  const batch = useSelector((state) => state.admin.batch);
  const [courseList, setCourseList] = useState([]);
  const [batchData, setBatchData] = useState({});

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
    if (JSON.parse(localStorage.getItem("learner")) === null) {
      navigate("/login");
    } else {
      dispatch(
        getCourseByBatchCode({
          batchCode: user.result.batchCode[user.result.batchCode.length - 1],
        })
      );
      dispatch(
        getBatch({
          batchCode: user.result.batchCode[user.result.batchCode.length - 1],
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
        <div className="bg-[#1a1a1a] w-full h-screen flex overflow-hidden">
          <HomeSidebar />
          {user !== null && (
            <Main courseList={courseList} batchData={batchData} />
          )}
        </div>
      )}
    </>
  );
};

export default Home;
