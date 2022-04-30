import React, { useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { NavLink } from "react-router-dom";

const CourseMain = () => {
  return (
    <div className="h-[45.5rem] bg-white flex-[0.93] my-4 rounded-2xl mr-4 flex flex-col">
      <div className="h-24 bg-[#373737] w-full rounded-tl-2xl rounded-tr-2xl flex">
        <div className="text-white text-[24px] space-y-1 flex-[0.8] pl-6 py-4">
          <h1>Implement OOPS using JAVA with Data Structures and Beyond</h1>
          <p className="text-[#E4BE34] text-[14px]">
            0 Classes completed | 0% My-Learning videos watched | 0/1 Projects
            Done
          </p>
        </div>
        <div className="flex-[0.2] rounded-tr-2xl h-full flex">
          <NavLink
            to="/community"
            className="bg-[#C4C4C4] h-full flex flex-col items-center flex-[0.4] justify-center">
            <PeopleIcon fontSize="medium" className="" />
            <p className="text-base">Community</p>
          </NavLink>
          <NavLink
            to="/help"
            className="text-white h-full flex flex-col items-center flex-[0.4] justify-center">
            <HelpOutlineIcon fontSize="medium" className="" />
            <p className="text-base">Help</p>
          </NavLink>
          <NavLink
            to="/notes"
            className="text-white  h-full flex flex-col items-center flex-[0.4] justify-center">
            <FormatListNumberedIcon fontSize="medium" className="" />
            <p className="text-base">Notes</p>
          </NavLink>
        </div>
      </div>
      <div className="flex h-full"></div>
    </div>
  );
};

export default CourseMain;
