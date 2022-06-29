import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ReactPlayer from "react-player";

import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useSelector } from "react-redux";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
const CourseMain = ({ batchData }) => {
  const [playVideo, setPlayVideo] = useState(false);
  const [index, setIndex] = useState(JSON.parse(localStorage.getItem("index")));
  const [showVideo, setShowVideo] = useState(false);
  const handle = useFullScreenHandle();
  const [video, setVideo] = useState("");
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("index"))) {
      setIndex(JSON.parse(localStorage.getItem("index")));
    }
  }, []);

  const handleVideo = (sectionIdx, lessonIdx) => {};

  return (
    <div className="flex md:flex-row flex-col h-full overflow-y-auto">
      <div className="flex-[0.4] bg-[#EDF0F5] flex flex-col pl-8 pr-1">
        <div className="flex flex-col mt-8 pr-4 pb-4  overflow-y-auto scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-transparent">
          <div className="space-y-3">
            {Object.keys(batchData).length !== 0 && (
              <>
                {batchData.courses[index].lessonVideo.map(
                  (section, sectionIdx) => (
                    <Accordion key={sectionIdx} aria-disabled>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="section">
                        <div className="flex items-center space-x-10 ">
                          <div className={` flex justify-center items-center`}>
                            <div className="h-3 w-3 bg-[#111111] rounded-full"></div>
                          </div>
                          <div className="w-full font-semibold">
                            {section.sectionName}
                          </div>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        {section.lesson.map((lesson, lessonIdx) => (
                          <Accordion aria-disabled key={lessonIdx}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="lesson">
                              <div className="flex items-center space-x-10 ">
                                <div
                                  className={` flex justify-center items-center`}>
                                  <div className="h-3 w-3 bg-[#7d7d7d] rounded-full"></div>
                                </div>
                                <div className="w-full font-semibold">
                                  {lesson.lessonName}
                                </div>
                              </div>
                            </AccordionSummary>
                            <AccordionDetails>
                              <div
                                onClick={() => {
                                  setPlayVideo(!playVideo);
                                  setShowVideo(true);
                                  setVideo(lesson.video);
                                }}
                                className="rounded-bl-lg rounded-br-lg cursor-pointer bg-[#4864F6] flex justify-between items-center px-4 py-2 text-white text-sm font-normal">
                                <div className="flex items-center space-x-3">
                                  <PlayCircleOutlineIcon fontSize="medium" />

                                  <p>
                                    {sectionIdx + 1}
                                    {"."}
                                    {lessonIdx + 1} Lesson Video
                                  </p>
                                </div>
                                <div className="flex items-center space-x-5">
                                  <div className="bg-[#E1E1E1] w-14 h-2 rounded-full"></div>
                                  <p>{handleVideo(sectionIdx, lessonIdx)}</p>
                                </div>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex-[0.6] bg-white flex items-center justify-center">
        {showVideo && video && (
          <FullScreen className="w-full" handle={handle}>
            <ReactPlayer
              controls
              width="100%"
              playing={playVideo}
              url={video}
            />
          </FullScreen>
        )}
        {!video && showVideo && (
          <h1 className="text-red-600 text-[30px] font-bold text-center">
            No Video
          </h1>
        )}
      </div>
    </div>
  );
};

export default CourseMain;
