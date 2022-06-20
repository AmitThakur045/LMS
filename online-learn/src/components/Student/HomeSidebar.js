import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LogoutIcon from "@mui/icons-material/Logout";
import DiamondIcon from "@mui/icons-material/Diamond";
import PeopleIcon from "@mui/icons-material/People";
import logo from "../../Assests/Learner_Logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../Redux/actionTypes";
import { getBatch } from "../../Redux/actions/adminActions";
import decode from "jwt-decode";
const isNotActiveStyle = "text-[#555555] flex flex-col items-center";
const isActiveStyle =
  "border-r-2 border-white  text-white flex flex-col items-center";

const HomeSidebar = () => {
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
    } else {
      dispatch(getBatch({ batchCode: user.result.batchCode[0] }));
    }
  }, []);

  return (
    <div className="hidden sm:block">
      <div className="flex-[0.07] flex flex-col lg:my-4 my-2 justify-between py-5">
        <div className="flex justify-center">
          <img className="lg:h-14 lg:w-14 h-12 w-12" src={logo} alt="" />
        </div>
        <div className="flex flex-col lg:space-y-10 space-y-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <MenuBookIcon className="lg:h-5 h-3" alt="" />
            <p className="lg:text-sm text-xs">Courses</p>
          </NavLink>
          <NavLink
            to="/resources"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <DiamondIcon className="lg:h-5 h-3" alt="" />
            <p className="lg:text-sm text-xs">Resources</p>
          </NavLink>
          <NavLink
            to="/community"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <PeopleIcon className="lg:h-5 h-3" alt="" />
            <p className="lg:text-sm text-xs">Community</p>
          </NavLink>
        </div>
        <div className="flex flex-col items-center space-y-2 text-[#555555] hover:text-white hover:scale-110 transition-all duration-150">
          <LogoutIcon onClick={logout} className="cursor-pointer lg:h-5 h-4" />
          <p className="lg:text-sm text-xs">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default HomeSidebar;
