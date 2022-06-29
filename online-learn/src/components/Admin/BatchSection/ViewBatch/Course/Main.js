import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AiOutlineCheckCircle, AiOutlineSearch } from "react-icons/ai";
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
  INDEX_COUNTER,
  SET_ERRORS,
} from "../../../../../Redux/actionTypes";
import {
  getBatchLessonVideo,
  getCourse,
  getCourses,
} from "../../../../../Redux/actions/adminActions";
import Loader from "../../../../../Utils/Loader";
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
  const [batchCode, setBatchCode] = useState(
    JSON.parse(localStorage.getItem("batchCode"))
  );
  const [lessonCount, setLessonCount] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const batch = useSelector((state) => state.admin.batchLessonVideo);
  const [courseData, setCourseData] = useState([]);
  const courses = useSelector((state) => state.admin.courses);
  const [batchData, setBatchData] = useState({});
  useEffect(() => {
    dispatch(getBatchLessonVideo({ batchCode }));
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

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
      setLessonCount(temp);
      let temp1 = [];
      for (let i = 0; i < batch.courses?.length; i++) {
        temp1.push(batch.courses[i].courseCode);
      }
      dispatch(getCourses(temp1));
    }
  }, [batch]);
  useEffect(() => {
    if (courses.length !== 0) {
      setIsLoading(false);
      setCourseData(courses);
    }
  }, [courses]);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader isLoading={isLoading} />
        </div>
      ) : (
        <div className="mt-4 flex flex-col pb-12 px-12 space-y-6 overflow-y-scroll h-full overflow-x-hidden">
          {courseData?.map((course, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex justify-between">
                <h1 className="font-bold text-primary">{course.courseName}</h1>
                <Button
                  onClick={() => {
                    dispatch(getCourse({ courseCode: course.courseCode }));
                    dispatch({ type: INDEX_COUNTER, payload: idx });
                    navigate("/admin/batch/course/update");
                  }}
                  variant="contained">
                  Update
                </Button>
              </div>
              <BorderLinearProgress
                variant="determinate"
                value={
                  (batch.courses[idx].complete.lessonCompleted /
                    batch.courses[idx].complete.totalLesson) *
                  100
                }
              />
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="course">
                  <Typography>See Full Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {course.section?.map((sectionData, sectionIdx) => (
                    <Accordion key={sectionIdx}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="section">
                        <div className="flex items-center space-x-3">
                          {batch.courses[idx].lessonVideo[sectionIdx]
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
                      </AccordionSummary>
                      <AccordionDetails>
                        {sectionData.lesson?.map((lessonData, lessonIdx) => (
                          <Accordion aria-disabled key={lessonIdx}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="lesson">
                              <div className="flex items-center space-x-3">
                                {batchData.courses[idx].lessonVideo[sectionIdx]
                                  .lesson[lessonIdx].lessonCompleted ? (
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
                                <Typography>{lessonData.lessonName}</Typography>
                              </div>
                            </AccordionSummary>
                          </Accordion>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Main;
