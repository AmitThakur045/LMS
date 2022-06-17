import React, { useState, useEffect } from "react";

import StarIcon from "@mui/icons-material/Star";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getCourseByBatchCode } from "../../../Redux/actions/studentActions";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ProgressBarComponent } from "@syncfusion/ej2-react-progressbar";

const Main = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));
  const courses = useSelector((state) => state.student.courseList);
  const batch = useSelector((state) => state.admin.batch);
  const [batchData, setBatchData] = useState({});
  useEffect(() => {
    if (courses.length !== 0) {
      setCourseList(courses);
      setOpenCourse(courses[0]);
    }
  }, [courses]);
  const [courseList, setCourseList] = useState([]);

  const [totalStars, setTotalStars] = useState([]);
  const [openCourse, setOpenCourse] = useState();
  const calculateTotalStars = (stars) => {
    setTotalStars([]);
    const list = [];
    for (let index = 0; index < stars; index++) {
      list.push(StarIcon);
    }
    setTotalStars(list);
  };

  useEffect(() => {
    if (batch) {
      setBatchData(batch);
    }
  }, [batch]);

  useEffect(() => {
    dispatch(getCourseByBatchCode({ batchCode: user.result.batchCode[0] }));
  }, []);
  return (
    <div className="bg-white flex-[0.93] md:flex-row flex-col my-4 rounded-2xl mr-4 flex md:overflow-hidden overflow-auto">
      <div className="flex flex-col md:flex-[0.45] bg-[#f6f2f2] rounded-tl-2xl rounded-bl-2xl pt-[30px]">
        <h1 className="font-bold text-[40px] lg:px-[52px] px-3">Courses</h1>
        <div className="lg:px-[52px] px-3 flex mt-[15px] space-x-7 text-[16px] mb-10">
          <p className="text-sm font-semibold">All</p>
          <p className="text-sm text-[#AAAAAA] hover:cursor-pointer hover:text-black hover:font-semibold">
            Active
          </p>
          <p className="text-sm text-[#AAAAAA] hover:cursor-pointer hover:text-black hover:font-semibold">
            Completed
          </p>
        </div>
        <div className="space-y-4 lg:px-[40px] px-3 scrollbar-thin pb-3 scrollbar-track-white scrollbar-thumb-black">
          {courseList.length !== 0 &&
            courseList?.map((data, i) => (
              <div
                onClick={() => {
                  setOpenCourse(data);
                  localStorage.setItem("index", JSON.stringify(i));
                }}
                key={i}
                className="flex cursor-pointer hover:scale-105 duration-150 transition-all bg-white shadow-md rounded-2xl p-3 items-start justify-start"
              >
                <NavLink
                  to="/course"
                  className="relative lg:h-[7.8125rem] md:h-[8rem] h-[8rem] w-auto bg-black rounded-lg"
                >
                  <img
                    src={data.courseImg}
                    className="hover:opacity-50 w-full h-full rounded-lg"
                    alt=""
                  />
                  <div className="absolute text-white top-[50%] left-[50%]  -translate-x-[50%] -translate-y-[50%]">
                    <ProgressBarComponent
                      id={`course-${i + 1}`}
                      type="Circular"
                      height="70px"
                      width="100%"
                      trackThickness={5}
                      progressThickness={5}
                      value={
                        (batchData.courses[i].complete.lessonCompleted /
                          batchData.courses[i].complete.totalLesson) *
                        100
                      }
                      enableRtl={false}
                      labelStyle={{
                        color: "#ffffff",
                        textAlignment: "Center",
                        size: "13px",
                      }}
                      showProgressValue={true}
                      trackColor="#F8C7D8"
                      radius="100%"
                      progressColor="#E3165B"
                      cornerRadius="Round"
                      animation={{
                        enable: true,
                        duration: 1000,
                        delay: 0,
                      }}
                    />
                  </div>
                </NavLink>
                <div className="ml-2">
                  <h4 className="font-bold text-[15px] mb-2">
                    {data.courseName}
                  </h4>
                  <p className="text-[12px] text-[#ADADAD]">
                    {data.description.slice(0, 80)}...
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center space-x-2">
                      <div className="">
                        <StarIcon
                          sx={{ fontSize: 15 }}
                          className="text-[#ED8A19]"
                        />
                        <StarIcon
                          sx={{ fontSize: 15 }}
                          className="text-[#ED8A19]"
                        />
                        <StarIcon
                          sx={{ fontSize: 15 }}
                          className="text-[#ED8A19]"
                        />
                        <StarIcon
                          sx={{ fontSize: 15 }}
                          className="text-[#ED8A19]"
                        />
                        <StarIcon
                          sx={{ fontSize: 15 }}
                          className="text-[#ED8A19]"
                        />
                      </div>
                      <p>5</p>
                    </div>
                    <p className="text-xs text-[#8B8B8B] bg-[#EEEEEE] py-1 px-2 rounded-md ">
                      {data.difficulty}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex md:flex-[0.55] bg-white rounded-tr-2xl rounded-br-2xl">
        {openCourse && (
          <div className="w-full flex flex-col mt-4 scrollbar-thin scrollbar-track-white scrollbar-thumb-black pb-4">
            <div className="p-3">
              <img
                src={openCourse.courseImg}
                className="w-full lg:h-[22rem] md:h-[15rem] object-cover self-center rounded-2xl"
                alt=""
              />
            </div>
            <div className="flex items-center my-6 mx-6 space-x-10">
              <div className="flex items-center space-x-2">
                <div className="">
                  <StarIcon sx={{ fontSize: 20 }} className="text-[#ED8A19]" />
                  <StarIcon sx={{ fontSize: 20 }} className="text-[#ED8A19]" />
                  <StarIcon sx={{ fontSize: 20 }} className="text-[#ED8A19]" />
                  <StarIcon sx={{ fontSize: 20 }} className="text-[#ED8A19]" />
                  <StarIcon sx={{ fontSize: 20 }} className="text-[#ED8A19]" />
                </div>
                <p className="text-xl font-bold">5</p>
              </div>
              <p className="text-xs text-[#8B8B8B] bg-[#EEEEEE] py-1 px-2 rounded-md ">
                {openCourse.difficulty}
              </p>
            </div>
            <h1 className="mx-6 text-[24px] font-bold">
              {openCourse.courseName}
            </h1>
            <p className="mx-6 text-[16px] my-5 text-[#A1A1A1]">
              {openCourse.description}
            </p>
            <div className="mx-6">
              <h1 className="font-bold text-[24px] mb-3">Course's Content</h1>
              <div className="space-y-5">
                {openCourse.section.map((content, i) => (
                  <Accordion aria-disabled key={i}>
                    <AccordionSummary
                      sx={{
                        backgroundColor: `${
                          i % 2 === 0 ? "#d2a1a1" : "#a1b9d2"
                        } `,
                      }}
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="section"
                    >
                      <div className="flex items-center space-x-10 ">
                        <div className={` flex justify-center items-center`}>
                          <div className="h-3 w-3 bg-[#D2D2D2] rounded-full"></div>
                        </div>
                        <div className="w-full font-semibold">
                          {content.sectionName}
                        </div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      {content.lesson.map((lesson, idx) => (
                        <Accordion aria-disabled key={idx}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="lesson"
                          >
                            <div className="flex items-center space-x-10 ">
                              <div
                                className={` flex justify-center items-center`}
                              >
                                <div className="h-3 w-3 bg-[#111111] rounded-full"></div>
                              </div>
                              <div className="w-full font-semibold">
                                {lesson.lessonName}
                              </div>
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>{lesson.lessonDescription}</Typography>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
