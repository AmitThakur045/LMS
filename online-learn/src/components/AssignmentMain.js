import React, { useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { NavLink } from "react-router-dom";
import dummyPdf from "../Assests/SamplePdf.pdf";
import PdfViewer from "../components/PdfViewer";

const sampleData = [
  {
    gradable: "gradable",
    title: "Virtual Key for your repository",
  },
  {
    gradable: "gradable",
    title: "Virtual Key for your repository",
  },
  {
    gradable: "gradable",
    title: "Virtual Key for your repository",
  },
  {
    gradable: "gradable",
    title: "Virtual Key for your repository",
  },
  {
    gradable: "gradable",
    title: "Virtual Key for your repository",
  },
  {
    gradable: "gradable",
    title: "Virtual Key for your repository",
  },
];

const AssignmentMain = () => {
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
      <div className="flex h-full">
        <div className="flex-[0.4] bg-[#EDF0F5] rounded-bl-2xl">
          <h1 className="ml-6 mt-7 font-semibold text-2xl">Assignment</h1>
          <div className="space-y-4 mt-4 overflow-y-auto h-[33rem]">
            {sampleData.map((data, i) => (
              <div className="bg-[#127FED] h-[10rem] mx-6 rounded-xl px-4 py-4 text-white flex flex-col justify-between">
                <h3>Assignment {i + 1}</h3>
                <h1 className="text-[21px]">{data.title}</h1>
                <div className="">
                  <span className="bg-[#6EAEE9] flex items-center justify-center w-[5rem] rounded-2xl h-[2rem] ">
                    {data.gradable}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-[0.6] bg-[#F9F9F9] overflow-y-auto">
          <PdfViewer pdf={dummyPdf} />
        </div>
      </div>
    </div>
  );
};

export default AssignmentMain;
