import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai";
import { BsPersonCheck } from "react-icons/bs";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Avatar, Button, Modal, Box } from "@mui/material";
import Select from "react-select";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { styled } from "@mui/material/styles";
import "react-circular-progressbar/dist/styles.css";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#f0e15a" : "#308fe8",
  },
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 10,
  borderRadius: "3px",
  p: 4,
};
const Main = () => {
  const studentData = JSON.parse(localStorage.getItem("students"));
  const courseData = JSON.parse(localStorage.getItem("courses"));
  const [totalClasses, setTotalClasses] = useState(0);
  const [studentsData, setStudentsData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [allCourses, setAllCourses] = useState([]);
  const navigate = useNavigate();
  function calTotalAttendance(attendance) {
    let att = 0;
    for (let i = 0; i < attendance.length; i++) {
      att += attendance[i].attended;
    }

    return att;
  }
  useEffect(() => {
    let temp = 0;
    let temp2 = [];
    for (let i = 0; i < courseData.length; i++) {
      temp += courseData[i].totalLectures;
      temp2.push({
        label: courseData[i].courseCode,
        value: courseData[i].courseCode,
      });
    }
    setTotalClasses(temp);
    setAllCourses(temp2);
    setStudentsData(studentData);
  }, []);

  function calCourseCompleted(attendance) {
    let att = 0;
    for (let i = 0; i < attendance.length; i++) {
      att += attendance[i].attended;
    }
    return Math.round((att / totalClasses) * 100);
  }
  function calTotalAssignment(assignment) {
    let ass = 0;
    ass = assignment.length;
    return ass;
  }
  function calTotalAssignmentScore(assignment) {
    let score = 0;
    let totalAssignment = assignment.length;
    for (let i = 0; i < assignment.length; i++) {
      score += assignment[i].score;
    }

    score = score / totalAssignment;
    return score;
  }
  function calCourseWiseAttendance(courseCode, attended) {
    let total = 0;
    total = courseData.find((course) => course.courseCode === courseCode);
    return Math.round((attended / total.totalLectures) * 100);
  }
  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();

    let result = [];
    result = studentData.filter((data) => {
      return data.email.search(value) !== -1;
    });
    setStudentsData(result);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedCourse("");
  };

  return (
    <div className="mt-4 flex flex-col pb-12 px-12 space-y-6 overflow-y-scroll h-full overflow-x-hidden">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="flex flex-col space-y-4 h-[15rem]">
            <div className="flex items-center">
              <h1 className="self-center w-[95%] font-bold">Select Course</h1>
              <div
                onClick={handleClose}
                className="self-end cursor-pointer w-[5%]">
                <AiOutlineCloseCircle
                  className="text-gray-400 hover:text-gray-500 duration-150 transition-all"
                  fontSize={23}
                />
              </div>
            </div>
            <div className="flex space-x-3  ">
              <Select
                className="w-[75%]"
                options={allCourses}
                onChange={(e) => setSelectedCourse(e.value)}
              />
              <Button
                disabled={selectedCourse !== "" ? false : true}
                onClick={() => {
                  localStorage.setItem(
                    "courseCode",
                    JSON.stringify(selectedCourse)
                  );
                  navigate("/admin/batch/student/attendance");
                  handleClose();
                }}
                className="w-[25%]"
                variant="contained"
                color="primary">
                Search
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      <div className="flex items-center justify-between">
        <div className="flex w-[15.3rem] bg-[#ffffff] pl-2 border-[#D4D4D4] border-[1px] space-x-2 rounded-md h-[1.8rem] items-center">
          <AiOutlineSearch fontSize={20} color="#696969" />
          <input
            onChange={(event) => handleSearch(event)}
            placeholder="Quick Search Student"
            className="bg-[#ffffff] placeholder:text-[#A5A4A6]  placeholder:text-[12px] flex w-full outline-none "
            type="text"
          />
        </div>
        <Button onClick={handleOpen} variant="contained">
          Mark Attendance
        </Button>
      </div>
      <div className="">
        {studentsData.map((student, idx) => (
          <Accordion key={student.email}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <div className="grid grid-cols-12 w-full">
                <div className="col-span-2 font-semibold flex items-center space-x-2">
                  <Avatar src={student.avatar} sx={{ height: 20, width: 20 }} />
                  <div className="">
                    {student.firstName} {student.lastName}
                  </div>
                </div>
                <div className="col-span-2  font-semibold">{student.email}</div>
                <div className="col-span-2">
                  Total Attendance: {calTotalAttendance(student.attendance)}
                </div>
                <div className="col-span-2">
                  Total Assignment: {calTotalAssignment(student.assignment)}
                </div>
                <div className="col-span-2">
                  Courses Completed: {calCourseCompleted(student.attendance)}%
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex space-x-2 bg-[#fdfdfd]">
                <div className="flex-[0.6] flex flex-col bg-[#ffffff] shadow-md border-[1px] border-white  rounded-md pl-6 py-4 pb-14 space-y-3">
                  <h1 className="font-semibold text-[#fe4492] text-[20px]">
                    {student.firstName}'s Stats
                  </h1>
                  <div className="flex ">
                    <div className="flex-[0.6] space-y-1">
                      <div className="flex w-full">
                        <div className="flex flex-[0.8] space-x-2 items-center">
                          <BsPersonCheck className="text-[#eede49]" />
                          <p className="text-[#47ada8] font-bold">
                            Total Attendance:
                          </p>
                        </div>
                        <span className="text-[#47ada8] font-bold flex-[0.2]">
                          {calTotalAttendance(student.attendance)}
                        </span>
                      </div>
                      <div className="flex w-full">
                        <div className="flex flex-[0.8] space-x-2 items-center">
                          <BsPersonCheck className="text-[#eede49]" />
                          <p className="text-[#47ada8] font-bold">
                            Total Assignment:
                          </p>
                        </div>
                        <span className="text-[#47ada8] font-bold flex-[0.2]">
                          {calTotalAssignment(student.assignment)}
                        </span>
                      </div>
                      <div className="flex w-full">
                        <div className="flex flex-[0.8] space-x-2 items-center">
                          <BsPersonCheck className="text-[#eede49]" />
                          <p className="text-[#47ada8] font-bold">
                            Total Assignment Score:
                          </p>
                        </div>
                        <span className="text-[#47ada8] font-bold flex-[0.2]">
                          {calTotalAssignmentScore(student.assignment)}
                        </span>
                      </div>
                      <div className="flex w-full">
                        <div className="flex flex-[0.8] space-x-2 items-center">
                          <BsPersonCheck className="text-[#eede49]" />
                          <p className="text-[#47ada8] font-bold">
                            Courses Completed:
                          </p>
                        </div>
                        <span className="text-[#47ada8] font-bold flex-[0.2]">
                          {calCourseCompleted(student.attendance)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex-[0.4] flex items-center justify-center">
                      <div className="w-[7rem] h-[7rem]">
                        <CircularProgressbar
                          styles={buildStyles({
                            path: {
                              transition: "stroke-dashoffset 0.5s ease 0s",
                            },
                            // Text size
                            text: {
                              fontWeight: "600",

                              fontSize: "16px",
                            },

                            // Colors
                            pathColor: "#dc3b7e",
                            textColor: "#47ada8",
                            trailColor: "#431c36",
                          })}
                          value={75}
                          text="B+"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-[0.4] flex flex-col bg-[#ffffff] shadow-md  border-[1px] border-white  rounded-md pl-6 py-4 pb-14 space-y-4">
                  <h1 className="font-semibold text-[#fe4492] text-[20px]">
                    Course Wise Attendance
                  </h1>
                  <div className="space-y-2 overflow-y-auto h-[8rem]">
                    {student.attendance.map((course, idx) => (
                      <div key={course.courseCode} className="flex flex-col">
                        <h1 className="text-[#47ada8] text-[12px]">
                          {course.courseCode}
                        </h1>
                        <div className="flex items-center space-x-2">
                          <div className="w-[70%]">
                            <BorderLinearProgress
                              variant="determinate"
                              value={calCourseWiseAttendance(
                                course.courseCode,
                                course.attended
                              )}
                            />
                          </div>
                          <p className="text-[#47ada8] text-[12px]">
                            {calCourseWiseAttendance(
                              course.courseCode,
                              course.attended
                            )}
                            %
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Main;
