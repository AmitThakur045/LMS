import React from "react";
import { AiOutlineBell, AiOutlineMessage } from "react-icons/ai";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("admin"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/admin/login");
  };
  return (
    <div className="flex justify-between w-full  pl-12 pr-12 py-10">
      <div className="flex items-center space-x-3">
        <Link to="/admin/course" className="cursor-pointer">
          <RiArrowGoBackFill fontSize={20} className="" />
        </Link>
        <div className="">
          <h1 className="text-[#504F89] font-bold text-[26px]">Course</h1>
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
