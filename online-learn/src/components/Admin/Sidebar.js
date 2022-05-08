import React from "react";
import logo from "../../Assests/icons8-bbb.svg";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { NavLink } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonIcon from "@mui/icons-material/Person";
const isNotActiveStyle =
  "text-[#9a9a9a] flex space-x-3 rounded-xl items-center ml-6  mr-4 hover:text-white transition-all duration-150 py-4 w-[90%] pl-4";
const isActiveStyle =
  "text-black flex space-x-3 rounded-xl items-center bg-white py-4 w-[90%] pl-4 ml-3 mr-4";

const Sidebar = () => {
  return (
    <div className="flex-[0.15] bg-[#190363] flex flex-col space-y-8 ">
      <div className="flex items-center justify-center my-4 space-x-2">
        <img className="h-10" src={logo} alt="" />
        <h1 className="font-bold text-lg text-white">
          Bessalani <span className="text-[#6aa2fc] font-semibold">LMS</span>
        </h1>
      </div>
      <div className="space-y-5 flex flex-col items-start ">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }>
          <DashboardIcon />
          <p className="font-bold">Dashboard</p>
        </NavLink>
        <NavLink
          to="/admin/admin"
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }>
          <PersonIcon />
          <p className="font-bold">Admin</p>
        </NavLink>
        <NavLink
          to="/admin/faculty"
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }>
          <PersonIcon />
          <p className="font-bold">Faculty</p>
        </NavLink>
        <NavLink
          to="/admin/batch"
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }>
          <PeopleIcon />
          <p className="font-bold">Batch</p>
        </NavLink>
        <NavLink
          to="/admin/course"
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }>
          <LibraryBooksIcon />
          <p className="font-bold">Course</p>
        </NavLink>
        <NavLink
          to="/admin/student"
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }>
          <PersonIcon />
          <p className="font-bold">Student</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
