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
import {
  GET_BATCH,
  SET_ERRORS,
  UPDATE_COURSE_DATA,
} from "../../../../../../Redux/actionTypes";
import {
  getBatchLessonVideo,
  updateCourseData,
} from "../../../../../../Redux/actions/adminActions";
import Spinner from "../../../../../../Utils/Spinner";
import Loader from "../../../../../../Utils/Loader";
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
  const [batchData, setBatchData] = useState({});
  const [batchCode, setBatchCode] = useState(
    JSON.parse(localStorage.getItem("batchCode"))
  );
  const store = useSelector((state) => state);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tempBatchData, setTempBatchData] = useState({});
  const [lessonCount, setLessonCount] = useState([]);
  const indexCounter = useSelector((store) => store.admin.index);
  const course = useSelector((store) => store.admin.course);
  const [completionUpdates, setCompletionUpdates] = useState({});
  const [garbageData, setGarbageData] = useState([]);
  const [sectionLessonNumber, setSectionLessonNumber] = useState({});
  const dispatch = useDispatch();
  const [courseData, setCourseData] = useState({});
  const batch = useSelector((state) => state.admin.batchLessonVideo);
  useEffect(() => {
    if (Object.keys(batch).length !== 0) {
      setBatchData(batch);
      let temp = [...lessonCount];
      for (let i = 0; i < batch.courses.length; i++) {
        if (i === 0) {
          temp[i] = batch.courses[i].complete.lessonCompleted;
        } else {
          temp.push(batch.courses[i].complete.lessonCompleted);
        }
      }
      setTempBatchData(batch);
      setLessonCount(temp);
      if (Object.keys(course).length !== 0) {
        setIsLoading(false);
      }
    }
  }, [batch]);
  useEffect(() => {
    if (Object.keys(course).length !== 0) {
      if (Object.keys(batch).length !== 0) {
        setIsLoading(false);
      }
      setCourseData(course);
    }
  }, [course]);

  useEffect(() => {
    if (Object.keys(course).length === 0) {
      navigate("/admin/batch/course");
    }
    dispatch(getBatchLessonVideo({ batchCode }));
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  const [uploadedVideo, setUploadedVideo] = useState("");

  const handleIconClickIncrease = (sectionIdx, lessonIdx) => {
    const temp = tempBatchData;

    if (lessonIdx === 0) {
      const data = [...garbageData];
      data.push({ sectionIdx, lessonIdx, val: true });
      setGarbageData(data);
      temp.courses[indexCounter].lessonVideo[sectionIdx].lesson[
        lessonIdx
      ].lessonCompleted = true;
      temp.courses[indexCounter].complete.lessonCompleted++;
      if (
        temp.courses[indexCounter].lessonVideo[sectionIdx].lesson.length ===
        lessonIdx + 1
      ) {
        temp.courses[indexCounter].lessonVideo[
          sectionIdx
        ].sectionCompleted = true;
        temp.courses[indexCounter].complete.sectionCompleted++;
      }
      setTempBatchData(temp);
    } else {
      if (
        temp.courses[indexCounter].lessonVideo[sectionIdx].lesson[lessonIdx - 1]
          .lessonCompleted === false
      ) {
        alert("Previous Lesson is not completed");
      } else {
        const data = [...garbageData];
        data.push({ sectionIdx, lessonIdx, val: true });
        setGarbageData(data);
        temp.courses[indexCounter].lessonVideo[sectionIdx].lesson[
          lessonIdx
        ].lessonCompleted = true;
        temp.courses[indexCounter].complete.lessonCompleted++;
        if (
          temp.courses[indexCounter].lessonVideo[sectionIdx].lesson.length ===
          lessonIdx + 1
        ) {
          temp.courses[indexCounter].lessonVideo[
            sectionIdx
          ].sectionCompleted = true;
          temp.courses[indexCounter].complete.sectionCompleted++;
        }
        setTempBatchData(temp);
      }
    }
  };
  const handleIconClickDecrease = (sectionIdx, lessonIdx) => {
    const temp = tempBatchData;
    if (lessonIdx === 0) {
      const data = [...garbageData];
      data.push({ sectionIdx, lessonIdx, val: true });
      setGarbageData(data);
      temp.courses[indexCounter].lessonVideo[sectionIdx].lesson[
        lessonIdx
      ].lessonCompleted = false;
      temp.courses[indexCounter].complete.lessonCompleted--;

      temp.courses[indexCounter].lessonVideo[
        sectionIdx
      ].sectionCompleted = false;
      temp.courses[indexCounter].complete.sectionCompleted--;

      setTempBatchData(temp);
    } else {
      if (
        temp.courses[indexCounter].lessonVideo[sectionIdx].lesson.length - 1 ===
        lessonIdx
      ) {
        const data = [...garbageData];
        data.push({ sectionIdx, lessonIdx, val: true });
        setGarbageData(data);
        temp.courses[indexCounter].lessonVideo[sectionIdx].lesson[
          lessonIdx
        ].lessonCompleted = false;
        temp.courses[indexCounter].complete.lessonCompleted--;
        temp.courses[indexCounter].lessonVideo[
          sectionIdx
        ].sectionCompleted = false;
        temp.courses[indexCounter].complete.sectionCompleted--;
        setTempBatchData(temp);
      } else {
        if (
          temp.courses[indexCounter].lessonVideo[sectionIdx].lesson[
            lessonIdx + 1
          ].lessonCompleted === true
        ) {
          alert("Next Lesson is completed");
        } else {
          const data = [...garbageData];
          data.push({ sectionIdx, lessonIdx, val: true });
          setGarbageData(data);
          temp.courses[indexCounter].lessonVideo[sectionIdx].lesson[
            lessonIdx
          ].lessonCompleted = false;
          temp.courses[indexCounter].complete.lessonCompleted--;

          setTempBatchData(temp);
        }
      }
    }
  };

  const handleVideoUploadButton = async (e) => {
    setUploadingVideo(true);
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setUploadedVideo(base64);
  };

  useEffect(() => {
    if (uploadedVideo !== "") {
      const temp = tempBatchData;
      temp.courses[indexCounter].lessonVideo[
        sectionLessonNumber.sectionNumber
      ].lesson[sectionLessonNumber.lessonNumber].video = uploadedVideo;
      setTempBatchData(temp);

      setUploadingVideo(false);
      setUploadedVideo("");
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
  const updateChanges = () => {
    setLoading(true);

    dispatch(
      updateCourseData({
        lessonVideo: tempBatchData.courses[indexCounter].lessonVideo,
        complete: tempBatchData.courses[indexCounter].complete,
        batchCode: tempBatchData.batchCode,
        courseCode: tempBatchData.courses[indexCounter].courseCode,
      })
    );
  };
  const [uploadingVideo, setUploadingVideo] = useState(false);
  useEffect(() => {
    if (store.admin.courseUpdated) {
      setLoading(false);
      dispatch({ type: UPDATE_COURSE_DATA, payload: false });
    }
  }, [store.admin.courseUpdated]);
  console.log(tempBatchData);
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader isLoading={isLoading} />
        </div>
      ) : (
        <div className="mt-4 flex flex-col pb-12 lg:px-12 px-2 space-y-6 overflow-y-scroll h-full overflow-x-hidden">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <h1 className="font-bold text-primary">
                {courseData.courseName}
              </h1>
            </div>
            <BorderLinearProgress
              variant="determinate"
              value={
                (tempBatchData.courses[indexCounter].complete.lessonCompleted /
                  tempBatchData.courses[indexCounter].complete.totalLesson) *
                100
              }
            />
            <div className="shadow-sm rounded-sm shadow-gray-400 py-6 px-4 space-y-4">
              <h1 className="mb-7">
                Click on Tick Icon to mark it's completion
              </h1>
              {courseData.section.map((sectionData, sectionIdx) => (
                <div
                  key={sectionIdx}
                  className="shadow-sm rounded-sm shadow-gray-400 py-6 px-4">
                  <div className="flex items-center space-x-3 mb-7">
                    {tempBatchData.courses[indexCounter].lessonVideo[sectionIdx]
                      .sectionCompleted ? (
                      <BsFillCheckCircleFill
                        fontSize={20}
                        className="text-[#1bca72]"
                      />
                    ) : (
                      <AiOutlineCheckCircle
                        fontSize={20}
                        className="text-[#]"
                      />
                    )}
                    <Typography>{sectionData.sectionName}</Typography>
                  </div>
                  {sectionData.lesson?.map((lessonData, lessonIdx) => (
                    <div
                      key={lessonIdx}
                      className="flex justify-between shadow-sm rounded-sm shadow-gray-400 py-4 px-4">
                      <div className="flex items-center space-x-3">
                        {tempBatchData.courses[indexCounter].lessonVideo[
                          sectionIdx
                        ].lesson[lessonIdx].lessonCompleted ? (
                          <BsFillCheckCircleFill
                            onClick={() =>
                              handleIconClickDecrease(sectionIdx, lessonIdx)
                            }
                            fontSize={20}
                            className="text-[#1bca72]"
                          />
                        ) : (
                          <AiOutlineCheckCircle
                            onClick={() =>
                              handleIconClickIncrease(sectionIdx, lessonIdx)
                            }
                            fontSize={20}
                            className="text-[#]"
                          />
                        )}
                        <Typography>{lessonData.lessonName}</Typography>
                      </div>
                      <label htmlFor={`video-${sectionIdx}-${lessonIdx}`}>
                        {tempBatchData.courses[indexCounter].lessonVideo[
                          sectionIdx
                        ].lesson[lessonIdx].video === "" ? (
                          <div className="text-white bg-[#1976d2] px-3  h-[2rem] flex items-center justify-center rounded-md cursor-pointer hover:bg-[#0d539a] transition-all duration-150">
                            Upload Video
                          </div>
                        ) : (
                          <div className="text-white bg-[#1976d2] px-3  h-[2rem] flex items-center justify-center rounded-md cursor-pointer hover:bg-[#0d539a] transition-all duration-150">
                            Upload Another Video
                          </div>
                        )}
                      </label>
                      <input
                        className="hidden"
                        id={`video-${sectionIdx}-${lessonIdx}`}
                        type="file"
                        onChange={(e) => {
                          setSectionLessonNumber({
                            sectionNumber: sectionIdx,
                            lessonNumber: lessonIdx,
                          });
                          handleVideoUploadButton(e);
                        }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <Button
              size="large"
              type="button"
              onClick={() => updateChanges()}
              color="error"
              className="w-[7rem] self-center"
              variant="contained">
              Submit
            </Button>
            {loading && <Spinner message="Updating Course" />}
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
