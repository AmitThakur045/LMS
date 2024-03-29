import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Button } from "@mui/material";
import {
  SET_ERRORS,
  UPDATE_COURSE_DATA,
} from "../../../../../../Redux/actionTypes";
import {
  getBatchLessonVideo,
  updateCourseData,
} from "../../../../../../Redux/actions/adminActions";
import Spinner from "../../../../../../Utils/Spinner";
import Loader from "../../../../../../Utils/Loader";

import SingleSection from "./SingleSection";
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

  const [garbageData, setGarbageData] = useState([]);
  const [sectionLessonNumber, setSectionLessonNumber] = useState({});
  const dispatch = useDispatch();
  const [disableSubmit, setDisableSubmit] = useState(false);
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

  useEffect(() => {
    if (store.admin.courseUpdated) {
      setLoading(false);
      dispatch({ type: UPDATE_COURSE_DATA, payload: false });
    }
  }, [store.admin.courseUpdated]);

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
                Click on Lesson Tick Icon to mark it's completion
              </h1>
              {courseData.section.map((sectionData, sectionIdx) => (
                <SingleSection
                  sectionData={sectionData}
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
            <Button
              size="large"
              type="button"
              disabled={loading || disableSubmit}
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
