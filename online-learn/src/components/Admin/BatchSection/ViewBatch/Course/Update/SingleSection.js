import { Typography } from "@mui/material";
import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import SingleLesson from "./SingleLesson";

const SingleSection = ({
  sectionData,
  tempBatchData,
  sectionIdx,
  indexCounter,
  handleIconClickDecrease,
  handleIconClickIncrease,
  sectionLessonNumber,
  setSectionLessonNumber,
  setTempBatchData,
  setDisableSubmit,
}) => {
  return (
    <div
      key={sectionIdx}
      className="shadow-sm rounded-sm shadow-gray-400 py-6 px-4">
      <div className="flex items-center space-x-3 mb-7">
        {tempBatchData.courses[indexCounter].lessonVideo[sectionIdx]
          .sectionCompleted ? (
          <BsFillCheckCircleFill fontSize={20} className="text-[#1bca72]" />
        ) : (
          <AiOutlineCheckCircle fontSize={20} className="text-[#]" />
        )}
        <Typography>{sectionData.sectionName}</Typography>
      </div>
      {sectionData.lesson.map((lessonData, lessonIdx) => (
        <SingleLesson
          lessonData={lessonData}
          lessonIdx={lessonIdx}
          tempBatchData={tempBatchData}
          sectionIdx={sectionIdx}
          indexCounter={indexCounter}
          handleIconClickIncrease={handleIconClickIncrease}
          handleIconClickDecrease={handleIconClickDecrease}
          setSectionLessonNumber={setSectionLessonNumber}
          setTempBatchData={setTempBatchData}
          sectionLessonNumber={sectionLessonNumber}
          setDisableSubmit={setDisableSubmit}
        />
      ))}
    </div>
  );
};

export default SingleSection;
