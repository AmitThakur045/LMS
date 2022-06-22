import React, { useEffect, useState } from "react";
import { Drawer, makeStyles } from "@material-ui/core";
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
import { BsFillPersonFill } from "react-icons/bs";

const isNotActiveStyle = "text-[#555555] flex flex-col items-center";
const isActiveStyle =
  "border-r-2 border-white  text-white flex flex-col items-center";
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

const HomeDrawer = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const classes = useStyles();
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
      dispatch(
        getBatch({
          batchCode: user.result.batchCode[user.result.batchCode.length - 1],
        })
      );
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
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <MenuBookIcon className="lg:h-5 h-3" alt="" />
              <p className="lg:text-sm text-xs">Courses</p>
            </NavLink>
            <NavLink
              to="/resources"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <DiamondIcon className="lg:h-5 h-3" alt="" />
              <p className="lg:text-sm text-xs">Resources</p>
            </NavLink>
            <NavLink
              to="/community"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <PeopleIcon className="lg:h-5 h-3" alt="" />
              <p className="lg:text-sm text-xs">Community</p>
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <BsFillPersonFill className="lg:h-5 h-3" alt="" />
              <p className="lg:text-sm text-xs">Profile</p>
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

export default HomeDrawer;
