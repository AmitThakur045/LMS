import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import HomeSidebar from "../HomeSidebar";

import decode from "jwt-decode";

import { AiOutlineCloseCircle } from "react-icons/ai";
import Spinner from "../../../Utils/Spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  getProblemCategories,
  getThreads,
} from "../../../Redux/actions/studentActions";
import Loader from "../../../Utils/Loader";
import Main from "./Main";

const Community = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));
  const store = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const allThreads = useSelector((state) => state.student.threads);
  const allCategories = useSelector((state) => state.student.problemCategories);
  const [threads, setThreads] = useState([]);
  const [problemCategory, setProblemCategory] = useState([]);
  const logOut = () => {
    alert("OOPS! Your session expired. Please Login again");
    navigate("/login");
  };
  const [error, setError] = useState({});

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setIsLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    if (allThreads.length !== 0) {
      if (allCategories.length !== 0) {
        setIsLoading(false);
      }
      setThreads(allThreads);
    }
  }, [allThreads]);
  useEffect(() => {
    if (allCategories.length !== 0) {
      if (allThreads.length !== 0) {
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
      dispatch(getThreads({ communityType: "All" }));
      dispatch(getProblemCategories({ communityType: "All" }));
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
            <Main
              threads={threads}
              error={error.noCommunityError}
              categories={problemCategory}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Community;
