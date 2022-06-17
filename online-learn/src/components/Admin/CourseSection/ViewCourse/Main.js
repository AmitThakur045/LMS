import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { SET_ERRORS } from "../../../../Redux/actionTypes";

import ActiveBatch from "../../ActiveBatch";
import RecentNotification from "../../RecentNotification";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Typography,
} from "@mui/material";
import Spinner from "../../../../Utils/Spinner";
import Collapsible from "react-collapsible";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const course = useSelector((store) => store.admin.course);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    if (Object.keys(course).length === 0) navigate("/admin/course");
  }, []);

  return (
    <div className="flex overflow-hidden h-full space-x-5 px-12 mb-5">
      <div className="w-[80%] rounded-3xl bg-[#FAFBFF] px-10 py-5 flex flex-col space-y-4 pb-16 overflow-y-scroll">
        <p className="text-[#8d91b1]">View Course</p>
        <div className="flex space-x-16 ">
          <div className="w-[40%] flex items-start justify-center">
            <div className="w-[250px] h-[227px] bg-white border-[1px] border-[#CBCBCB] flex flex-col items-center justify-center">
              <img
                src={course.courseImg}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col w-[60%] space-y-6">
            <div className="flex justify-between ">
              <TextField
                aria-disabled
                type="text"
                id="outlined-basic"
                label="Course Code"
                variant="outlined"
                className="bg-white"
                value={course.courseCode}
              />
              <TextField
                aria-disabled
                type="text"
                id="outlined-basic"
                label="Course Name"
                variant="outlined"
                className="bg-white"
                value={course.courseName}
              />
            </div>
            <div className="flex justify-between ">
              <TextField
                aria-disabled
                type="number"
                id="outlined-basic"
                label="Total Lectures"
                variant="outlined"
                className="bg-white"
                value={course.totalLectures}
              />
              <TextField
                aria-disabled
                type="text"
                id="outlined-basic"
                label="Difficulty"
                variant="outlined"
                className="bg-white"
                value={course.difficulty}
              />
            </div>
            <div className="flex">
              <TextField
                aria-disabled
                type="text"
                id="outlined-multiline-flexible"
                multiline
                maxRows={6}
                label="Description"
                variant="outlined"
                className="bg-white w-full"
                value={course.description}
              />
            </div>
          </div>
        </div>
        {course.section?.map((sectionData, sectionIdx) => (
          <div key={sectionIdx} className="flex flex-col  ">
            <Accordion key={sectionIdx}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="course">
                <div className="flex items-center space-x-10 ">
                  <div className={` flex justify-center items-center`}>
                    <div className="h-3 w-3 bg-[#7d7d7d] rounded-full"></div>
                  </div>
                  <div className="w-full font-semibold">
                    Section {sectionData.sectionNumber}
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex flex-col space-y-4">
                  <div className="flex">
                    <TextField
                      aria-disabled
                      type="text"
                      id="outlined-basic"
                      label="Section Name"
                      variant="outlined"
                      className="bg-white w-"
                      value={sectionData.sectionName}
                    />
                  </div>
                  {sectionData.lesson.map((lessonData, lessonIdx) => (
                    <Accordion key={lessonIdx}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="course">
                        <div className="flex items-center space-x-10 ">
                          <div className={` flex justify-center items-center`}>
                            <div className="h-3 w-3 bg-[#7d7d7d] rounded-full"></div>
                          </div>
                          <div className="w-full font-semibold">
                            Lesson {lessonData.lessonNumber}
                          </div>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="flex flex-col space-y-5">
                          <div className="flex">
                            <TextField
                              aria-disabled
                              type="text"
                              id="outlined-basic"
                              label="Lesson Name"
                              variant="outlined"
                              className="bg-white w-"
                              value={lessonData.lessonName}
                            />
                          </div>
                          <div className="flex">
                            <TextField
                              aria-disabled
                              type="text"
                              id="outlined-multiline-flexible"
                              multiline
                              maxRows={6}
                              label="Lesson Description"
                              variant="outlined"
                              className="bg-white w-full"
                              value={lessonData.lessonDescription}
                            />
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}

        {loading && <Spinner message="Adding Course" />}
      </div>

      <div className="bg-[#FAFBFF] w-[20%] flex flex-col px-5 py-5 rounded-3xl space-y-5">
        <ActiveBatch />
        <RecentNotification />
      </div>
    </div>
  );
};

export default Main;
