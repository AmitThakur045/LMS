import React, { useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { NavLink } from "react-router-dom";
import Collapsible from "react-collapsible";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ReactPlayer from "react-player";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
const CourseMain = () => {
  const [openSection, setOpenSection] = useState(false);
  const [openLesson, setOpenLesson] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const handle = useFullScreenHandle();
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
        <div className="flex-[0.4] bg-[#EDF0F5] flex flex-col pl-8 pr-1">
          <div className="flex flex-col  mt-8 pr-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-transparent">
            <div className="space-y-3">
              <p className="text-sm text-[#6A6A6A] font-semibold">Section 1</p>
              <div className="flex relative cursor-pointer">
                <Collapsible
                  open
                  onClick={() => setOpenSection(!openSection)}
                  className="flex-1 w-full flex flex-col z-[10] font-bold text-2xl"
                  openedClassName="w-full flex-1 flex flex-col z-[10] font-bold text-2xl"
                  trigger="Agile Scrum Foundation ">
                  <div className="bg-white  my-4 shadow-md rounded-lg space-y-4">
                    <p className="text-[#6C6C6C] text-sm ml-4 pt-3 font-medium">
                      Lesson 1
                    </p>
                    <div className=" flex relative cursor-pointer">
                      <Collapsible
                        className="flex-1 w-full flex flex-col z-[11] font-medium text-lg"
                        openedClassName="w-full flex-1 flex flex-col z-[11] font-medium text-lg "
                        triggerOpenedClassName="ml-4 mb-3"
                        triggerClassName="ml-4 mb-3"
                        onClick={() => setOpenLesson(!openLesson)}
                        trigger="Course Introduction">
                        <div
                          onClick={() => {
                            setPlayVideo(!playVideo);
                            setShowVideo(true);
                          }}
                          className="rounded-bl-lg rounded-br-lg bg-[#4864F6] flex justify-between items-center px-4 py-2 text-white text-sm font-normal">
                          <div className="flex items-center space-x-3">
                            {playVideo ? (
                              <PauseCircleOutlineIcon fontSize="medium" />
                            ) : (
                              <PlayCircleOutlineIcon fontSize="medium" />
                            )}
                            <p>1.1 Course Introduction</p>
                          </div>
                          <div className="flex items-center space-x-5">
                            <div className="bg-[#E1E1E1] w-14 h-2 rounded-full">
                              <div className="bg-[#9CADCE] h-full w-4 rounded-l-full"></div>
                            </div>
                            <p>05:00</p>
                          </div>
                        </div>
                      </Collapsible>
                      {!openLesson ? (
                        <ArrowDropDownIcon className="absolute right-0 top-0 z-[0]" />
                      ) : (
                        <ArrowDropUpIcon className="absolute right-0 top-0 z-[0]" />
                      )}
                    </div>
                  </div>
                  <div className="bg-white  my-4 shadow-md rounded-lg space-y-4">
                    <p className="text-[#6C6C6C] text-sm ml-4 pt-3 font-medium">
                      Lesson 2
                    </p>
                    <div className=" flex relative cursor-pointer">
                      <Collapsible
                        className="flex-1 w-full flex flex-col z-[11] font-medium text-lg"
                        openedClassName="w-full flex-1 flex flex-col z-[11] font-medium text-lg "
                        triggerOpenedClassName="ml-4 mb-3"
                        triggerClassName="ml-4 mb-3"
                        onClick={() => setOpenLesson(!openLesson)}
                        trigger="Agile Scrum Concepts">
                        <div
                          onClick={() => {
                            setPlayVideo(!playVideo);
                            setShowVideo(true);
                          }}
                          className="rounded-bl-lg rounded-br-lg bg-[#4864F6] flex justify-between items-center px-4 py-2 text-white text-sm font-normal">
                          <div className="flex items-center space-x-3">
                            {playVideo ? (
                              <PauseCircleOutlineIcon fontSize="medium" />
                            ) : (
                              <PlayCircleOutlineIcon fontSize="medium" />
                            )}
                            <p>1.1 Concepts</p>
                          </div>
                          <div className="flex items-center space-x-5">
                            <div className="bg-[#E1E1E1] w-14 h-2 rounded-full">
                              <div className="bg-[#9CADCE] h-full w-4 rounded-l-full"></div>
                            </div>
                            <p>05:00</p>
                          </div>
                        </div>
                      </Collapsible>
                      {!openLesson ? (
                        <ArrowDropDownIcon className="absolute right-0 top-0 z-[0]" />
                      ) : (
                        <ArrowDropUpIcon className="absolute right-0 top-0 z-[0]" />
                      )}
                    </div>
                  </div>
                  <div className="bg-white  my-4 shadow-md rounded-lg space-y-4">
                    <p className="text-[#6C6C6C] text-sm ml-4 pt-3 font-medium">
                      Lesson 3
                    </p>
                    <div className=" flex relative cursor-pointer">
                      <Collapsible
                        className="flex-1 w-full flex flex-col z-[11] font-medium text-lg"
                        openedClassName="w-full flex-1 flex flex-col z-[11] font-medium text-lg "
                        triggerOpenedClassName="ml-4 mb-3"
                        triggerClassName="ml-4 mb-3"
                        onClick={() => setOpenLesson(!openLesson)}
                        trigger="Roles and Rituals">
                        <div
                          onClick={() => {
                            setPlayVideo(!playVideo);
                            setShowVideo(true);
                          }}
                          className="rounded-bl-lg rounded-br-lg bg-[#4864F6] flex justify-between items-center px-4 py-2 text-white text-sm font-normal">
                          <div className="flex items-center space-x-3">
                            {playVideo ? (
                              <PauseCircleOutlineIcon fontSize="medium" />
                            ) : (
                              <PlayCircleOutlineIcon fontSize="medium" />
                            )}
                            <p>1.1 Concepts</p>
                          </div>
                          <div className="flex items-center space-x-5">
                            <div className="bg-[#E1E1E1] w-14 h-2 rounded-full">
                              <div className="bg-[#9CADCE] h-full w-4 rounded-l-full"></div>
                            </div>
                            <p>05:00</p>
                          </div>
                        </div>
                      </Collapsible>
                      {!openLesson ? (
                        <ArrowDropDownIcon className="absolute right-0 top-0 z-[0]" />
                      ) : (
                        <ArrowDropUpIcon className="absolute right-0 top-0 z-[0]" />
                      )}
                    </div>
                  </div>
                </Collapsible>
                {!openSection ? (
                  <ArrowDropDownIcon className="absolute right-0 top-0 z-[0]" />
                ) : (
                  <ArrowDropUpIcon className="absolute right-0 top-0 z-[0]" />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[0.6] bg-black flex items-center justify-center">
          <FullScreen className="w-full" handle={handle}>
            {showVideo && (
              <ReactPlayer
                controls
                width="100%"
                playing={playVideo}
                url="https://www.youtube.com/watch?v=qG32jM4tGFk"
              />
            )}
          </FullScreen>
        </div>
      </div>
    </div>
  );
};

export default CourseMain;
