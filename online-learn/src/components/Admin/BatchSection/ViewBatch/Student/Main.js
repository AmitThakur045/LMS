import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai";
import { BsPersonCheck } from "react-icons/bs";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Avatar, Button, Modal, Box, TextField } from "@mui/material";
import Select from "react-select";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { styled } from "@mui/material/styles";
import "react-circular-progressbar/dist/styles.css";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudentInBatch,
  getStudents,
  totalAssignment,
} from "../../../../../Redux/actions/adminActions";
import { ADD_STUDENT, SET_ERRORS } from "../../../../../Redux/actionTypes";
import Spinner from "../../../../../Utils/Spinner";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const studentData = JSON.parse(localStorage.getItem("students"));
  const batchData = JSON.parse(localStorage.getItem("batch"));
  const courseData = JSON.parse(localStorage.getItem("courses"));
  const [totalClasses, setTotalClasses] = useState(0);
  const [studentsData, setStudentsData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [allCourses, setAllCourses] = useState([]);
  const [totalAssignmentInBatch, setTotalAssignmentInBatch] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function calTotalAttendance(attendance) {
    let att = 0;
    for (let i = 0; i < attendance.length; i++) {
      att += attendance[i].attended;
    }

    return att;
  }
  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setStudentEmail("");
    }
  }, [store.errors]);

  const totalAssignments = useSelector((store) => store.admin.totalAssignment);
  const newStudents = useSelector((store) => store.admin.students);
  useEffect(() => {
    if (newStudents.length !== 0) {
      setStudentsData(newStudents);
      setLoading(false);
    }
  }, [newStudents]);
  useEffect(() => {
    if (totalAssignments.length !== -1) {
      setTotalAssignmentInBatch(totalAssignments);
    }
  }, [totalAssignments]);
  console.log(newStudents);

  useEffect(() => {
    if (store.errors || store.admin.studentAdded) {
      setLoading(false);
      if (store.admin.studentAdded) {
        const data = JSON.parse(localStorage.getItem("batch"));
        data.students.push(studentEmail);
        localStorage.setItem("batch", JSON.stringify(data));
        dispatch(getStudents({ emails: data.students }));

        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_STUDENT, payload: false });
        handleAddStudentClose();
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.studentAdded]);

  useEffect(() => {
    setLoading(true);
    dispatch(getStudents({ emails: batchData.students }));
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
    dispatch(totalAssignment({ batchCode: batchData.batchCode }));
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
    if (assignment.length !== 0) {
      for (let i = 0; i < assignment.length; i++) {
        score += assignment[i].score;
      }

      score = score / totalAssignmentInBatch;
      return Math.round(score);
    }
    return 0;
  }
  function calPerformance(assignment) {
    let score = 0;

    if (assignment.length !== 0) {
      for (let i = 0; i < assignment.length; i++) {
        score += assignment[i].score;
      }

      score = score / totalAssignmentInBatch;
    }
    let per = score;
    if (per >= 9.5) {
      return "A+";
    } else if (per < 9.5 && per >= 9) {
      return "A";
    } else if (per < 9 && per >= 8.5) {
      return "B+";
    } else if (per < 8.5 && per >= 8) {
      return "B";
    } else if (per < 8 && per >= 7.5) {
      return "C+";
    } else if (per < 7.5 && per >= 7) {
      return "C";
    } else if (per < 7 && per >= 6.5) {
      return "D+";
    } else if (per < 6.5 && per >= 6) {
      return "D";
    } else if (per < 6 && per >= 5.5) {
      return "E+";
    } else if (per < 5.5 && per >= 5) {
      return "E";
    } else {
      return "F";
    }
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
  const [studentEmail, setStudentEmail] = useState("");
  const [openAddStudent, setOpenAddStudent] = useState(false);
  const handleAddStudentOpen = () => setOpenAddStudent(true);
  const handleAddStudentClose = () => {
    setOpenAddStudent(false);
    setStudentEmail("");
  };

  const addstudent = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      addStudentInBatch({ email: studentEmail, batchCode: batchData.batchCode })
    );
  };

  return (
    <div className="mt-4 flex flex-col pb-12 px-12 space-y-6 overflow-y-scroll h-full overflow-x-hidden">
      <Modal
        open={openAddStudent}
        onClose={handleAddStudentClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="flex flex-col space-y-4 h-[15rem]">
            <div className="flex items-center">
              <h1 className="self-center w-[95%] font-bold">Add Student</h1>
              <div
                onClick={handleAddStudentClose}
                className="self-end cursor-pointer w-[5%]">
                <AiOutlineCloseCircle
                  className="text-gray-400 hover:text-gray-500 duration-150 transition-all"
                  fontSize={23}
                />
              </div>
            </div>
            <form onSubmit={addstudent} className="flex flex-col space-y-3  ">
              <TextField
                required
                type="email"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className="bg-white"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
              />
              <Button
                disabled={studentEmail !== "" ? false : true}
                type="submit"
                className=""
                variant="contained"
                color="primary">
                Add
              </Button>
              {loading && <Spinner message="Adding Student" />}
              {error.studentError && (
                <p className="text-red-500 flex self-center">
                  {error.studentError}
                </p>
              )}
            </form>
          </div>
        </Box>
      </Modal>
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
        <div className="space-x-3">
          <Button
            color="success"
            onClick={handleAddStudentOpen}
            variant="contained">
            Add Student
          </Button>
          <Button onClick={handleOpen} variant="contained">
            Mark Attendance
          </Button>
        </div>
      </div>
      <div className="">
        {loading && <Spinner message={"Loading..."} />}
        {!loading &&
          studentsData.map((student, idx) => (
            <Accordion key={student.email}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <div className="grid grid-cols-12 w-full">
                  <div className="col-span-2 font-semibold flex items-center space-x-2">
                    <Avatar
                      src={student?.avatar}
                      sx={{ height: 20, width: 20 }}
                    />
                    <div className="">
                      {student.firstName} {student.lastName}
                    </div>
                  </div>
                  <div className="col-span-2  font-semibold">
                    {student.email}
                  </div>
                  <div className="col-span-2">
                    Total Attendance: {calTotalAttendance(student.attendance)}/
                    {batchData.schedule.length}
                  </div>
                  <div className="col-span-2">
                    Total Assignment: {calTotalAssignment(student.assignment)}/
                    {totalAssignmentInBatch}
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
                            {calTotalAttendance(student.attendance)}/
                            {batchData.schedule.length}
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
                            {calTotalAssignment(student.assignment)}/
                            {totalAssignmentInBatch}
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
                            {calTotalAssignmentScore(student.assignment)}/10
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
                            text={calPerformance(student.assignment)}
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
