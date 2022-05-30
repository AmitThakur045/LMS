import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Button } from "@mui/material";
import { GET_BATCH, SET_ERRORS } from "../../../../../../Redux/actionTypes";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const Main = () => {
  const batchData = JSON.parse(localStorage.getItem("batch"));
  const courseData = JSON.parse(localStorage.getItem("courses"));
  const [lessonCount, setLessonCount] = useState([]);
  const batchCourse = useSelector((store) => store.admin.batch);
  const indexCounter = useSelector((store) => store.admin.index);
  const [sectionLessonNumber, setSectionLessonNumber] = useState({
    sectionNumber: 0,
    lessonNumber: 0,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [batchCourseData, SetBatchCourseData] = useState({});
  useEffect(() => {
    let temp = [...lessonCount];
    for (let i = 0; i < batchData.courses.length; i++) {
      if (i === 0) {
        temp[i] = batchData.courses[i].complete.lessonCompleted;
      } else {
        temp.push(batchData.courses[i].complete.lessonCompleted);
      }
    }
    setLessonCount(temp);
  }, []);
  useEffect(() => {
    SetBatchCourseData(batchCourse);
  }, [batchCourse]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    if (Object.keys(batchCourse).length === 0) {
      navigate("/admin/batch/course");
    }
    // else {
    //   SetBatchCourseData(batchCourse);
    // }
  }, []);

  const [uploadedVideo, setUploadedVideo] = useState("");

  const handleIconClickIncrease = () => {
    let temp = batchCourseData.complete.lessonCompleted;
    temp++;
    let data = { ...batchCourseData };
    data.complete.lessonCompleted = temp;
    SetBatchCourseData(temp);
  };
  const handleIconClickDecrease = () => {
    let temp = batchCourseData.complete.lessonCompleted;
    temp--;
    let data = { ...batchCourseData };
    data.complete.lessonCompleted = temp;
    SetBatchCourseData(temp);
  };

  const handleVideoUploadButton = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setUploadedVideo(base64);
  };
  console.log(batchCourseData);

  useEffect(() => {
    if (uploadedVideo !== "") {
      let temp = { ...batchCourseData };
      temp.lessonVideo[sectionLessonNumber.sectionNumber].lesson[
        sectionLessonNumber.lessonNumber
      ].video = uploadedVideo;
    }
  }, [uploadedVideo]);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  return (
    <div className="mt-4 flex flex-col pb-12 px-12 space-y-6 overflow-y-scroll h-full overflow-x-hidden">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between">
          <h1 className="font-bold text-[#605C94]">
            {batchCourseData.courseName}
          </h1>
        </div>
        <BorderLinearProgress
          variant="determinate"
          value={
            (batchCourseData.complete?.lessonCompleted /
              batchCourseData.complete?.totalLesson) *
            100
          }
        />
        <div className="shadow-sm rounded-sm shadow-gray-400 py-6 px-4 space-y-4">
          <h1 className="mb-7">Click on Tick Icon to mark it's completion</h1>
          {courseData[indexCounter].section?.map((sectionData, sectionIdx) => (
            <div
              key={sectionIdx}
              className="shadow-sm rounded-sm shadow-gray-400 py-6 px-4">
              <div className="flex items-center space-x-3 mb-7">
                {batchCourseData.complete?.sectionCompleted ? (
                  <BsFillCheckCircleFill
                    fontSize={20}
                    className="text-[#1bca72]"
                  />
                ) : (
                  <AiOutlineCheckCircle fontSize={20} className="text-[#]" />
                )}
                <Typography>{sectionData.sectionName}</Typography>
              </div>
              {sectionData.lesson?.map((lessonData, lessonIdx) => (
                <div
                  key={lessonIdx}
                  className="flex justify-between shadow-sm rounded-sm shadow-gray-400 py-4 px-4">
                  <div className="flex items-center space-x-3">
                    {batchCourseData.complete?.lessonCompleted <
                    batchCourseData.complete?.totalLesson -
                      (lessonIdx + sectionIdx) -
                      1 ? (
                      <BsFillCheckCircleFill
                        onClick={() => handleIconClickDecrease()}
                        fontSize={20}
                        className="text-[#1bca72]"
                      />
                    ) : (
                      <AiOutlineCheckCircle
                        onClick={() => handleIconClickIncrease()}
                        fontSize={20}
                        className="text-[#]"
                      />
                    )}
                    <Typography>{lessonData.lessonName}</Typography>
                  </div>
                  <label for="video">
                    <div className="text-white bg-[#1976d2] w-[8rem] h-[2rem] flex items-center justify-center rounded-md cursor-pointer hover:bg-[#0d539a] transition-all duration-150">
                      Upload Video
                    </div>
                  </label>
                  <input
                    className="hidden"
                    id="video"
                    type="file"
                    onChange={(e) => {
                      handleVideoUploadButton(e);
                      setSectionLessonNumber({
                        ...sectionLessonNumber,
                        sectionNumber: sectionIdx,
                        lessonNumber: lessonIdx,
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <Button
          size="large"
          color="error  "
          className="w-[7rem] self-center"
          variant="contained">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Main;
