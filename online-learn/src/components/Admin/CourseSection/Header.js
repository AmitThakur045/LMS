import React from "react";
import {
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineBell,
  AiOutlineMessage,
} from "react-icons/ai";
import { IoMdHand } from "react-icons/io";
import profile from "../../../Assests/profile.svg";
const Header = () => {
  return (
    <div className="flex justify-between w-full  pl-20 pr-12 py-10">
      <div className="flex items-center space-x-48">
        <h1 className="text-[#504F89] font-bold text-[26px]">Course</h1>
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
            <h1 className="font-bold">TheBrad</h1>
            <p>Admin</p>
          </div>
          <img
            src={profile}
            className="object-cover w-[1.8rem] h-[1.8rem]"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
