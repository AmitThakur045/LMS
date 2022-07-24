import React, { useEffect, useState } from "react";
import logo from "../../Assests/Admin_Logo.png";
import { AiOutlineAppstore } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { VscLibrary } from "react-icons/vsc";
import { BsPerson } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../Redux/actionTypes";
import decode from "jwt-decode";
const isNotActiveStyle =
  "flex justify-between items-center w-[75%] text-[#9C9BBC]  px-5 h-[3.5rem] hover:text-white duration-150 transition-all";
const isActiveStyle =
  "flex justify-between items-center w-[75%] text-[#5C5892] bg-white px-5 h-[3.5rem] rounded-md";

const Sidebar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("admin")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    alert("OOPS! Your session expired. Please Login again");
    dispatch({ type: LOGOUT });
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("admin")));
  }, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("admin")) === null) {
      navigate("/admin/login");
    }
  }, []);
  return (
    <div className="bg-[#292828] h-screen flex flex-col py-[20px] justify-between">
      <div className="space-y-8">
        <div className="flex items-center justify-center my-2 space-x-2">
          <img className="h-16" src={logo} alt="" />
        </div>
        <div className="w-full space-y-3 flex flex-col items-center p-0">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>
            <div className="flex items-center space-x-2">
              <AiOutlineAppstore fontSize={20} />
              <p className="text-[12px]">Dashboard</p>
            </div>
            <MdKeyboardArrowRight fontSize={20} />
          </NavLink>
          <NavLink
            to="/admin/admin"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>
            <div className="flex items-center space-x-2">
              <RiAdminLine fontSize={20} />
              <p className="text-[12px]">Admin</p>
            </div>
            <MdKeyboardArrowRight fontSize={20} />
          </NavLink>
          <NavLink
            to="/admin/course"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>
            <div className="flex items-center space-x-2">
              <VscLibrary fontSize={20} />
              <p className="text-[12px]">Course</p>
            </div>
            <MdKeyboardArrowRight fontSize={20} />
          </NavLink>
          <NavLink
            to="/admin/student"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>
            <div className="flex items-center space-x-2">
              <BsPerson fontSize={20} />
              <p className="text-[12px]">Student</p>
            </div>
            <MdKeyboardArrowRight fontSize={20} />
          </NavLink>
          <NavLink
            to="/admin/batch"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>
            <div className="flex items-center space-x-2">
              <HiOutlineUserGroup fontSize={20} />
              <p className="text-[12px]">Batch</p>
            </div>
            <MdKeyboardArrowRight fontSize={20} />
          </NavLink>
          <NavLink
            to="/admin/community"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>
            <div className="flex items-center space-x-2">
              <HiOutlineUserGroup fontSize={20} />
              <p className="text-[12px]">Community</p>
            </div>
            <MdKeyboardArrowRight fontSize={20} />
          </NavLink>
        </div>
      </div>
      <div className="flex items-center flex-col text-[0.92rem] text-white w-full">
        <h1 className="font-bold w-full text-center">Bessalani LMS Admin</h1>
        <p className="w-full text-center">
          @ {new Date().getFullYear()} All right reserved
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
