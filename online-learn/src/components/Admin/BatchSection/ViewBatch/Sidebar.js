import React, { useEffect, useState } from "react";
import logo from "../../../../Assests/Logo.png";
import { AiOutlineAppstore, AiOutlineCalendar } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { VscLibrary } from "react-icons/vsc";
import { BsPerson } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const isNotActiveStyle =
  "flex justify-between items-center w-[75%] text-[#9C9BBC]  px-5 h-[3.5rem] hover:text-white duration-150 transition-all";
const isActiveStyle =
  "flex justify-between items-center w-[75%] text-[#5C5892] bg-white px-5 h-[3.5rem] rounded-md";

const Sidebar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    alert("OOPS! Your session expired. Please Login again");
    dispatch({ type: "LOGOUT" });
    navigate("/admin/login");
  };
  console.log();

  // useEffect(() => {
  //   const token = user?.token;
  //   if (token) {
  //     const decodedToken = decode(token);
  //     if (decodedToken.exp * 1000 < new Date().getTime()) logout();
  //   }

  //   setUser(JSON.parse(localStorage.getItem("user")));
  // }, [navigate]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")) === null) {
      navigate("/admin/login");
    }
  }, []);
  return (
    <div className="w-[18.75rem] bg-[#5C5892] flex flex-col  py-[28px] justify-between">
      <div className="space-y-8">
        <div className="flex items-center justify-center my-4 space-x-2">
          <img className="h-12" src={logo} alt="" />
        </div>
        <div className="space-y-4 flex flex-col items-center ">
          <NavLink
            to="/admin/batch/viewbatch"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>
            <div className="flex items-center space-x-6">
              <AiOutlineAppstore fontSize={20} />
              <p className="text-[14px]">
                {JSON.parse(localStorage.getItem("batch"))?.batchCode}
              </p>
            </div>
            <MdKeyboardArrowRight fontSize={20} />
          </NavLink>
          <NavLink
            to="/admin/batch/course"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>
            <div className="flex items-center space-x-6">
              <RiAdminLine fontSize={20} />
              <p className="text-[14px]">Course</p>
            </div>
            <MdKeyboardArrowRight fontSize={20} />
          </NavLink>
          <NavLink
            to="/admin/batch/date"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>
            <div className="flex items-center space-x-6">
              <AiOutlineCalendar fontSize={20} />
              <p className="text-[14px]">Date</p>
            </div>
            <MdKeyboardArrowRight fontSize={20} />
          </NavLink>
          <NavLink
            to="/admin/batch/student"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>
            <div className="flex items-center space-x-6">
              <VscLibrary fontSize={20} />
              <p className="text-[14px]">Student</p>
            </div>
            <MdKeyboardArrowRight fontSize={20} />
          </NavLink>
          <NavLink
            to="/admin/batch/assignment"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>
            <div className="flex items-center space-x-6">
              <BsPerson fontSize={20} />
              <p className="text-[14px]">Assignment</p>
            </div>
            <MdKeyboardArrowRight fontSize={20} />
          </NavLink>
          <NavLink
            to="/admin/batch/community"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>
            <div className="flex items-center space-x-6">
              <HiOutlineUserGroup fontSize={20} />
              <p className="text-[14px]">Community</p>
            </div>
            <MdKeyboardArrowRight fontSize={20} />
          </NavLink>
        </div>
      </div>
      <div className="flex items-center flex-col  text-white">
        <h1 className="font-bold">Bessalani LMS Admin</h1>
        <p>@ 2022 All right reserved</p>
      </div>
    </div>
  );
};

export default Sidebar;
