import React, { useEffect, useState } from "react";
import { Drawer, makeStyles } from "@material-ui/core";
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
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  paper: {
    background: "#373737",
  },
});

const CourseDrawer = ({ isOpen, setIsOpen }) => {
  const classes = useStyles();
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

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("learner")) === null) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="w-[20rem] h-full bg-[#373737]">
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        classes={{ paper: classes.paper }}>
        <div className="flex flex-col lg:my-4 my-2 py-5 h-full justify-between">
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
          <div className="flex flex-col items-center space-y-2 bottom-0 text-[#555555] hover:text-white hover:scale-110 transition-all duration-150">
            <div className="md:px-5">
              <LogoutIcon onClick={logout} className="cursor-pointer" />
            </div>
            <p className="lg:text-sm text-xs w-full text-center">Logout</p>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default CourseDrawer;
