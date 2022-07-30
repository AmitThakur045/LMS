import React, { useState, useEffect } from "react";
import CertificateMain from "./CertificateMain";
import CourseSidebar from "../CourseSidebar";
import CourseHeader from "../CourseHeader";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../Utils/Loader";
import { getBatch, getStudent } from "../../../../Redux/actions/adminActions";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";
import { getStudentData } from "../../../../Redux/actions/studentActions";
const Certificate = () => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("learner"))
  );
  const [batchCode, setBatchCode] = useState(
    JSON.parse(localStorage.getItem("batchCode"))
  );
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const batch = useSelector((state) => state.admin.batch);
  const [allAssignment, setAllAssignment] = useState({});
  const student = useSelector((state) => state.admin.student);
  const [batchData, setBatchData] = useState({});
  const logOut = () => {
    alert("OOPS! Your session expired. Please Login again");
    navigate("/login");
  };
  useEffect(() => {
    if (Object.keys(batch).length !== 0) {
      if (Object.keys(student).length !== 0) {
        setIsLoading(false);
      }
      setBatchData(batch);
    }
  }, [batch]);
  useEffect(() => {
    if (Object.keys(student).length !== 0) {
      if (Object.keys(batch).length !== 0) {
        setIsLoading(false);
      }
      setAllAssignment(student.assignment);
    }
  }, [student]);

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
      dispatch(
        getBatch({
          batchCode: batchCode,
        })
      );
      dispatch(
        getStudentData({ email: user.result.email, batchCode: batchCode })
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
          {user !== null && Object.keys(batch).length !== 0 && (
            <div className="bg-white flex my-4 w-full rounded-2xl mx-2 sm:mx-0 sm:mr-4 flex-col overflow-hidden">
              <CourseHeader batchData={batchData} />
              <CertificateMain allAssignment={allAssignment} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Certificate;
