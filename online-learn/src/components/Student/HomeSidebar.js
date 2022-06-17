import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LogoutIcon from "@mui/icons-material/Logout";
import DiamondIcon from "@mui/icons-material/Diamond";
import PeopleIcon from "@mui/icons-material/People";
import logo from "../../Assests/icons8-bbb.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../Redux/actionTypes";
import { getBatch } from "../../Redux/actions/adminActions";

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
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("learner")) === null) {
      navigate("/login");
    }
    dispatch(getBatch({ batchCode: user.result.batchCode[0] }));
  }, []);

  return (
    <div className="h-[45.5rem] flex-[0.07] flex flex-col  my-4 justify-between py-5">
      <img className="h-16" src={logo} alt="" />
      <div className="flex flex-col space-y-10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }>
          <MenuBookIcon className=" h-7" alt="" />
          <p className="">Courses</p>
        </NavLink>
        <NavLink
          to="/resources"
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }>
          <DiamondIcon className=" h-7" alt="" />
          <p className="">Resources</p>
        </NavLink>
        <NavLink
          to="/community"
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }>
          <PeopleIcon className=" h-7" alt="" />
          <p className="">Community</p>
        </NavLink>
      </div>
      <div className="flex flex-col items-center space-y-2 text-[#555555] hover:text-white hover:scale-110 transition-all duration-150">
        <LogoutIcon onClick={logout} className="cursor-pointer h-10  " />
        <p className="">Logout</p>
      </div>
    </div>
  );
};

export default HomeSidebar;
