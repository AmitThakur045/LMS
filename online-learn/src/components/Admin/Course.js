import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GET_COURSE } from "../../Redux/actionTypes";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Course = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_COURSE, payload: {} });
  }, []);
  return (
    <div className="h-screen w-full bg-[#f1f2f6] flex">
      <Sidebar />
      <div className="flex-[0.85] flex flex-col">
        <Header />
        <div className="flex-[0.9] space-y-8">
          <div className="flex space-x-8 justify-between items-center px-8 mt-8">
            <Link
              to="addcourse"
              className="bg-white shadow-lg rounded-lg hover:scale-105 duration-150 transition-all cursor-pointer h-[10rem] w-full flex items-center justify-center text-2xl text-blue-800 font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-800 to-blue-800">
                Add Course
              </span>
            </Link>
            <Link
              to="searchcourse"
              className="bg-white shadow-lg rounded-lg hover:scale-105 duration-150 transition-all cursor-pointer h-[10rem] w-full flex items-center justify-center text-2xl text-blue-800 font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-800 to-blue-800">
                Search Course
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
