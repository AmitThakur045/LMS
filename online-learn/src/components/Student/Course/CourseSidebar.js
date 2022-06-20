import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScienceIcon from "@mui/icons-material/Science";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../../Redux/actionTypes";
import { getBatch } from "../../../Redux/actions/adminActions";
import logo from "../../../Assests/Learner_Logo.png";
import decode from "jwt-decode";
const isNotActiveStyle = "text-[#555555] flex flex-col items-center";
const isActiveStyle =
  "border-r-2 border-white  text-white flex flex-col items-center";

const CourseSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));
  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate("/login");
  };
  const logOut = () => {
    alert("OOPS! Your session expired. Please Login again");
    dispatch({ type: LOGOUT });
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
  const batch = useSelector((state) => state.admin.batch);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("learner")) === null) {
      navigate("/login");
    }

    dispatch(
      getBatch({
        batchCode: user?.result.batchCode[user.result.batchCode.length - 1],
      })
    );
  }, []);

  return (
    <div className="flex-[0.07] flex flex-col lg:my-4 my-2 justify-between py-5">
      <div className="flex flex-col items-center space-y-6">
        <div className="">
          <img className="lg:h-14 lg:w-14 h-12 w-12" src={logo} alt="" />
        </div>
        <NavLink
          to="/"
          className="text-[#555555] hover:text-white transition-all duration-200 mx-auto">
          <ArrowBackIcon className="lg:h-5 h-3" alt="" />
          <p className="lg:text-sm text-xs">Back</p>
        </NavLink>
      </div>

      <div className="flex flex-col space-y-5 ">
        <NavLink
          to="/course"
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }>
          <LibraryBooksIcon className="lg:h-5 h-3" alt="" />
          <p className="lg:text-sm text-xs text-center">My Learning</p>
        </NavLink>
        <NavLink
          to="/liveclass"
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }>
          <CalendarMonthIcon className="lg:h-5 h-3" alt="" />
          <p className="lg:text-sm text-xs">Live Class</p>
        </NavLink>
        <NavLink
          to="/lab"
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }>
          <ScienceIcon className="lg:h-5 h-3" alt="" />
          <p className="lg:text-sm text-xs">Lab</p>
        </NavLink>
        <NavLink
          to="/assignment"
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }>
          <AssignmentIcon className="lg:h-5 h-3" alt="" />
          <p className="lg:text-sm text-xs">Assignment</p>
        </NavLink>
        <NavLink
          to="/certificate"
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }>
          <WorkspacePremiumIcon className="lg:h-5 h-3" alt="" />
          <p className="lg:text-sm text-xs">Certificate</p>
        </NavLink>
      </div>
      <div className="flex flex-col items-center space-y-2 text-[#555555] hover:text-white hover:scale-110 transition-all duration-150">
        <LogoutIcon onClick={logout} className="cursor-pointer h-10  " />
        <p className="lg:text-sm text-xs">Logout</p>
      </div>
    </div>
  );
};

export default CourseSidebar;
