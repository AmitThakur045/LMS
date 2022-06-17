import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineBell,
  AiOutlineMessage,
} from "react-icons/ai";
import { IoMdHand } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GET_ADMIN } from "../../../Redux/actionTypes";
const Header = () => {
  const user = JSON.parse(localStorage.getItem("admin"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/admin/login");
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="flex justify-between w-full  pl-20 pr-12 py-10">
      <div className="flex items-center space-x-48">
        <div className="flex items-center space-x-2">
          <AiOutlineMenu />
          <h1>Hello {user?.result?.firstName}</h1>
          <IoMdHand color="#FFCD00" />
        </div>
      </div>
      <div className="flex space-x-5 items-center">
        <div className="w-[1.8rem] h-[1.8rem] flex items-center justify-center bg-[#F5F7FF]">
          <AiOutlineBell color="#5669A7" />
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex flex-col text-[12px] items-end">
            <h1 className="font-bold">
              {user?.result?.firstName} {user?.result?.lastName}
            </h1>
            <p>{user?.result?.sub === "true" ? "Sub Admin" : "Super Admin"}</p>
          </div>
          <div className="">
            <img
              onClick={(event) => handleClick(event)}
              src={user?.result?.avatar}
              className="object-cover cursor-pointer w-[1.8rem] h-[1.8rem]"
              alt=""
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}>
              <MenuItem
                onClick={() => {
                  dispatch({ type: GET_ADMIN, payload: user.result });
                  navigate("/admin/admin/viewadmin");
                }}>
                Profile
              </MenuItem>
              <MenuItem onClick={logout}>Log Out</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
