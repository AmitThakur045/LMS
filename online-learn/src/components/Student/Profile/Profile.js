import React, { useState, useEffect } from "react";
import HomeSidebar from "../HomeSidebar";
import Main from "./Main";
import Loader from "../../../Utils/Loader";
import { getCourseByBatchCode } from "../../../Redux/actions/studentActions";
import { getBatch, getStudent } from "../../../Redux/actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses = useSelector((state) => state.student.courseList);
  const student = useSelector((state) => state.admin.student);
  const batch = useSelector((state) => state.admin.batch);
  const [courseList, setCourseList] = useState([]);
  const [learner, setLearner] = useState({});

  useEffect(() => {
    if (Object.keys(student).length !== 0) {
      if (courses.length !== 0 && Object.keys(batch).length !== 0) {
        setIsLoading(false);
      }
      setLearner(student);
    }
  }, [student]);
  useEffect(() => {
    if (courses.length !== 0) {
      if (
        Object.keys(student).length !== 0 &&
        Object.keys(batch).length !== 0
      ) {
        setIsLoading(false);
      }
      setCourseList(courses);
    }
  }, [courses]);
  useEffect(() => {
    if (Object.keys(batch).length !== 0) {
      if (Object.keys(student).length !== 0 && courses.length !== 0) {
        setIsLoading(false);
      }
      setCourseList(courses);
    }
  }, [batch]);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("learner")) === null) {
      navigate("/login");
    } else {
      dispatch(
        getCourseByBatchCode({
          batchCode: user.result.batchCode[user.result.batchCode.length - 1],
        })
      );
      dispatch(getStudent({ email: user.result.email }));
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
            <Main courseList={courseList} learner={learner} batch={batch} />
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
