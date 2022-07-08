import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScienceIcon from "@mui/icons-material/Science";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../../Redux/actionTypes";
import logo from "../../../Assests/Learner_Logo.png";
import decode from "jwt-decode";
const isNotActiveStyle = "text-[#555555] flex flex-col items-center px-3";
const isActiveStyle =
  "border-r-2 border-white  text-white flex flex-col items-center px-3";

const CourseSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 678) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));
  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate("/login");
  };
  const logOut = () => {
    alert("OOPS! Your session expired. Please Login again");
    navigate("/login");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logOut();
      }
    }
  }, []);

  return (
    <>
      <div className="hidden sm:block">
        <div className=" flex flex-col lg:my-4 my-2 h-full justify-between py-5">
          <div className="flex flex-col items-center space-y-6">
            <div className="">
              <img className="lg:h-14 lg:w-14 h-12 w-12" src={logo} alt="" />
            </div>
            <NavLink
              to="/"
              className="text-[#555555] hover:text-white transition-all duration-200 mx-auto">
              <div className="md:px-5">
                <ArrowBackIcon className="" alt="" />
              </div>
              <p className="width-full text-center">Back</p>
            </NavLink>
          </div>

          <div className="lg:text-sm text-xs flex flex-col space-y-4 ">
            <NavLink
              to="/course"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <div className="md:px-5">
                <LibraryBooksIcon className="" alt="" />
              </div>
              <p className="w-full text-center">My Learning</p>
            </NavLink>
            <NavLink
              to="/liveclass"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <div className="md:px-5">
                <CalendarMonthIcon className="" sx={{ width: "20px" }} alt="" />
              </div>
              <p className="w-full text-center">Live Class</p>
            </NavLink>
            <NavLink
              to="/lab"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <div className="md:px-5">
                <ScienceIcon className="" alt="" />
              </div>
              <p className="w-full text-center">Lab</p>
            </NavLink>
            <NavLink
              to="/assignment"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <div className="md:px-5">
                <AssignmentIcon className="" alt="" />
              </div>
              <p className="w-full text-center">Assignment</p>
            </NavLink>
            <NavLink
              to="/certificate"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <div className="md:px-5">
                <WorkspacePremiumIcon className="" alt="" />
              </div>
              <p className="w-full text-center">Certificate</p>
            </NavLink>
          </div>
          <div className="flex flex-col items-center space-y-2 text-[#555555] hover:text-white hover:scale-110 transition-all duration-150 pb-5">
            <div className="md:px-5">
              <LogoutIcon onClick={logout} className="cursor-pointer" />
            </div>
            <p className="lg:text-sm text-xs w-full text-center">Logout</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseSidebar;
