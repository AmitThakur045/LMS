import React from "react";
import {
  AiOutlineBell,
  AiOutlineMenu,
  AiOutlineMessage,
  AiOutlineSearch,
} from "react-icons/ai";
import { IoMdHand } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/admin/login");
  };
  return (
    <div className="flex justify-between w-full pl-12 pr-12 py-10">
      <div className="flex items-center space-x-48">
        <div className="flex items-center space-x-2">
          <AiOutlineMenu />
          <h1>Hello {user?.result?.firstName}</h1>

          <IoMdHand color="#FFCD00" />
        </div>
        <div className="flex w-[15.3rem] bg-[#F7F6FB] pl-2 space-x-2 rounded-md h-[1.8rem] items-center">
          <AiOutlineSearch fontSize={20} color="#C7C4D9" />
          <input
            placeholder="Search here"
            className="bg-[#F7F6FB] placeholder:text-[#C7C4D9] placeholder:text-[12px] flex w-full outline-none "
            type="text"
          />
        </div>
      </div>
      <div className="flex space-x-5 items-center">
        <div className="w-[1.8rem] h-[1.8rem] flex items-center justify-center bg-[#F5F7FF]">
          <AiOutlineBell color="#5669A7" />
        </div>
        <div className="w-[1.8rem] h-[1.8rem] flex items-center justify-center bg-[#F5F7FF]">
          <AiOutlineMessage color="#5669A7" />
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex flex-col text-[12px] items-end">
            <h1 className="font-bold">
              {user?.result?.firstName} {user?.result?.lastName}
            </h1>
            <p>{user?.result?.sub === "true" ? "Sub Admin" : "Super Admin"}</p>
          </div>
          <img
            onClick={logout}
            src={user?.result?.avatar}
            className="object-cover cursor-pointer w-[1.8rem] h-[1.8rem]"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
