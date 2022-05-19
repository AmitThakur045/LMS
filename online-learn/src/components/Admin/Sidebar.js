import React from "react";
import logo from "../../Assests/Logo.png";
import { AiOutlineAppstore } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { VscLibrary } from "react-icons/vsc";
import { BsPerson } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const isNotActiveStyle =
  "flex justify-between items-center w-[75%] text-[#9C9BBC]  px-5 h-[3.5rem] hover:text-white duration-150 transition-all";
const isActiveStyle =
  "flex justify-between items-center w-[75%] text-[#5C5892] bg-white px-5 h-[3.5rem] rounded-md";

const Sidebar = () => {
  return (
    <div className="w-[18.75rem] bg-[#5C5892] flex flex-col  py-[28px] justify-between">
      <div className="space-y-8">
        <div className="flex items-center justify-center my-4 space-x-2">
          <img className="h-12" src={logo} alt="" />
        </div>
        <div className="space-y-4 flex flex-col items-center ">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>
            <div className="flex items-center space-x-6">
              <AiOutlineAppstore fontSize={20} />
              <p className="text-[14px]">Dashboard</p>
            </div>
            <MdKeyboardArrowRight fontSize={20} />
          </NavLink>
          <NavLink
            to="/admin/admin"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>
            <div className="flex items-center space-x-6">
              <RiAdminLine fontSize={20} />
              <p className="text-[14px]">Admin</p>
            </div>
            <MdKeyboardArrowRight fontSize={20} />
          </NavLink>
          <NavLink
            to="/admin/course"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>
            <div className="flex items-center space-x-6">
              <VscLibrary fontSize={20} />
              <p className="text-[14px]">Course</p>
            </div>
            <MdKeyboardArrowRight fontSize={20} />
          </NavLink>
          <NavLink
            to="/admin/student"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>
            <div className="flex items-center space-x-6">
              <BsPerson fontSize={20} />
              <p className="text-[14px]">Student</p>
            </div>
            <MdKeyboardArrowRight fontSize={20} />
          </NavLink>
          <NavLink
            to="/admin/batch"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>
            <div className="flex items-center space-x-6">
              <HiOutlineUserGroup fontSize={20} />
              <p className="text-[14px]">Batch</p>
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
