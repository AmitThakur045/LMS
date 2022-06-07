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
import { useDispatch } from "react-redux";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Button } from "@mui/material";
import { GET_BATCH, INDEX_COUNTER } from "../../../../../Redux/actionTypes";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  return (
    <div className="mt-4 flex flex-col pb-12 px-12 space-y-6 overflow-y-scroll h-full overflow-x-hidden">
      {courseData?.map((course, idx) => (
        <div key={idx} className="space-y-4">
          <div className="flex justify-between">
            <h1 className="font-bold text-[#605C94]">{course.courseName}</h1>
            <Button
              onClick={() => {
                navigate("/admin/batch/course/update");
                dispatch({ type: GET_BATCH, payload: batchData.courses[idx] });
                dispatch({ type: INDEX_COUNTER, payload: idx });
              }}
              variant="contained">
              Update
            </Button>
          </div>
          <BorderLinearProgress
            variant="determinate"
            value={
              (batchData.courses[idx].complete.lessonCompleted /
                batchData.courses[idx].complete.totalLesson) *
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
                      {batchData.courses[idx].lessonVideo[sectionIdx]
                        .sectionCompleted > sectionIdx ? (
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
  );
};

export default Main;
