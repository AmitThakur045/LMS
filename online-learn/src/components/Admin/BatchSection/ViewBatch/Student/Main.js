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
  getCourses,
  getStudents,
  totalAssignment,
} from "../../../../../Redux/actions/adminActions";
import { ADD_STUDENT, SET_ERRORS } from "../../../../../Redux/actionTypes";
import Spinner from "../../../../../Utils/Spinner";
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
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("admin")));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const [isLoading, setIsLoading] = useState(true);
  const [totalClasses, setTotalClasses] = useState(0);
  const [studentsData, setStudentsData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [allCourses, setAllCourses] = useState([]);
  const [totalAssignmentInBatch, setTotalAssignmentInBatch] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const batch = useSelector((state) => state.admin.batch);
  const students = useSelector((state) => state.admin.students);
  const courses = useSelector((state) => state.admin.courses);
  const [batchData, setBatchData] = useState({});

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setIsLoading(false);
      setStudentEmail("");
    }
  }, [store.errors]);

  useEffect(() => {
    if (Object.keys(batch).length !== 0) {
      setBatchData(batch);

      let temp = [];
      for (let i = 0; i < batch.courses?.length; i++) {
        temp.push(batch.courses[i].courseCode);
      }
      dispatch(getCourses(temp));
      dispatch(getStudents({ emails: batch.students }));
      dispatch(totalAssignment({ batchCode: batch.batchCode }));
    }
  }, [batch]);
  useEffect(() => {
    if (courses.length !== 0) {
      setCourseData(courses);
      let temp = 0;
      let temp2 = [];
      for (let i = 0; i < courses.length; i++) {
        temp += courses[i].totalLectures;
        temp2.push({
          label: courses[i].courseCode,
          value: courses[i].courseCode,
        });
      }
      setTotalClasses(temp);
      setAllCourses(temp2);
      if (students.length !== 0 && totalAssignments.length !== -1) {
        setIsLoading(false);
      }
    }
  }, [courses]);
  useEffect(() => {
    if (students.length !== 0) {
      setStudentsData(students);
      if (courses.length !== 0 && totalAssignments.length !== -1) {
        setIsLoading(false);
      }
    }
  }, [students]);

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
      if (students.length !== 0 && courses.length !== 0) {
        setIsLoading(false);
      }
    }
  }, [totalAssignments]);

  useEffect(() => {
    if (store.errors || store.admin.studentAdded) {
      setLoading(false);
      if (store.admin.studentAdded) {
        let temp = batchData.students;
        temp.push(studentEmail);
        dispatch(getStudents({ emails: temp }));
        dispatch({ type: SET_ERRORS, payload: {} });
        setError({});
        dispatch({ type: ADD_STUDENT, payload: false });
        handleAddStudentClose();
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.studentAdded]);

  function calTotalAttendance(attendance) {
    let att = 0;
    for (let i = 0; i < attendance.length; i++) {
      att += attendance[i].attended;
    }

    return att;
  }
  function calCourseCompleted(attendance) {
    let att = 0;
    for (let i = 0; i < attendance.length; i++) {
      att += attendance[i].attended;
    }
    if (att === 0) {
      return 0;
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
    total = courses.find((course) => course.courseCode === courseCode);
    return Math.round((attended / total.totalLectures) * 100);
  }
  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();

    let result = [];
    result = studentsData.filter((data) => {
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
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader isLoading={isLoading} />
        </div>
      ) : (
        <div className="mt-4 flex flex-col pb-12 lg:px-12 px-2 space-y-6 overflow-y-scroll h-full overflow-x-hidden">
          <Modal
            open={openAddStudent}
            onClose={handleAddStudentClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="flex flex-col space-y-4 h-[15rem]">
                <div className="flex items-center">
                  <h1 className="self-center w-[95%] font-bold">Add Student</h1>
                  <div
                    onClick={handleAddStudentClose}
                    className="self-end cursor-pointer w-[5%]"
                  >
                    <AiOutlineCloseCircle
                      className="text-gray-400 hover:text-gray-500 duration-150 transition-all"
                      fontSize={23}
                    />
                  </div>
                </div>
                <form
                  onSubmit={addstudent}
                  className="flex flex-col space-y-3  "
                >
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
                    disabled={loading}
                    type="submit"
                    className=""
                    variant="contained"
                    color="primary"
                  >
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
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="flex flex-col space-y-4 h-[15rem]">
                <div className="flex items-center">
                  <h1 className="self-center w-[95%] font-bold">
                    Select Course
                  </h1>
                  <div
                    onClick={handleClose}
                    className="self-end cursor-pointer w-[5%]"
                  >
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
                    color="primary"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </Box>
          </Modal>
          <div className="flex items-center justify-between w-full">
            <div className="flex w-[15.3rem] bg-[#ffffff] pl-2 border-[#D4D4D4] border-[1px] space-x-2 rounded-md h-[1.8rem] items-center">
              <AiOutlineSearch fontSize={20} color="#696969" />
              <input
                onChange={(event) => handleSearch(event)}
                placeholder="Quick Search Student"
                className="bg-[#ffffff] placeholder:text-[#A5A4A6]  placeholder:text-[12px] flex w-full outline-none "
                type="text"
              />
            </div>
            {user.result.sub !== "hr" && (
              <div className="lg:space-x-3 space-y-2 lg:space-y-0 flex flex-col lg:flex-row">
                <Button
                  color="success"
                  onClick={handleAddStudentOpen}
                  variant="contained"
                  className="w-[13rem] h-[1.8rem] items-center"
                >
                  Add Student
                </Button>
                <Button
                  onClick={handleOpen}
                  variant="contained"
                  className="w-[13rem] h-[1.8rem] items-center"
                >
                  Mark Attendance
                </Button>
              </div>
            )}
          </div>
          <div className="w-full">
            {studentsData.map((student, idx) => (
              <Accordion key={student.email}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div className="lg:grid lg:grid-cols-12 flex md:flex-row flex-col w-full justify-between text-[0.9rem]">
                    <div className="lg:col-span-2 font-semibold flex justify-start items-center space-x-2">
                      <Avatar
                        src={student?.avatar}
                        sx={{ height: 20, width: 20 }}
                      />
                      <div className="">
                        {student.firstName} {student.lastName}
                      </div>
                    </div>
                    <div className="lg:col-span-3 font-semibold flex md:justify-center">
                      {student.email}
                    </div>
                    <div className="lg:col-span-2 flex md:justify-center">
                      Attendance: {calTotalAttendance(student.attendance)}/
                      {batchData.schedule.length}
                    </div>
                    <div className="lg:col-span-2 flex md:justify-center">
                      Assignment: {calTotalAssignment(student.assignment)}/
                      {totalAssignmentInBatch}
                    </div>
                    <div className="lg:col-span-3 flex md:justify-center">
                      Courses Completed:{" "}
                      {calCourseCompleted(student.attendance)}%
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="flex lg:flex-row flex-col lg:space-x-2 space-y-2 lg:space-y-0 bg-[#fdfdfd]">
                    <div className="flex-[0.6] flex flex-col bg-[#ffffff] shadow-md border-[1px] border-white  rounded-md px-2 py-4 pb-4 space-y-3">
                      <h1 className="font-bold text-[#009DA7] text-[18px]">
                        {student.firstName}'s Stats
                      </h1>
                      <div className="flex text-[1rem]">
                        <div className="flex-[0.6] space-y-1">
                          <div className="flex w-full">
                            <div className="flex flex-[0.8] space-x-2 items-center">
                              <BsPersonCheck className="text-[#eede49]" />
                              <p className="text-[#0000008F] font-semibold">
                                Total Attendance:
                              </p>
                            </div>
                            <span className="text-[#0000008F] font-semibold flex-[0.2]">
                              {calTotalAttendance(student.attendance)}/
                              {batchData.schedule.length}
                            </span>
                          </div>
                          <div className="flex w-full">
                            <div className="flex flex-[0.8] space-x-2 items-center">
                              <BsPersonCheck className="text-[#eede49]" />
                              <p className="text-[#0000008F] font-semibold">
                                Total Assignment:
                              </p>
                            </div>
                            <span className="text-[#0000008F] font-semibold flex-[0.2]">
                              {calTotalAssignment(student.assignment)}/
                              {totalAssignmentInBatch}
                            </span>
                          </div>
                          <div className="flex w-full">
                            <div className="flex flex-[0.8] space-x-2 items-center">
                              <BsPersonCheck className="text-[#eede49]" />
                              <p className="text-[#0000008F] font-semibold">
                                Total Assignment Score:
                              </p>
                            </div>
                            <span className="text-[#0000008F] font-semibold flex-[0.2]">
                              {calTotalAssignmentScore(student.assignment)}/10
                            </span>
                          </div>
                          <div className="flex w-full">
                            <div className="flex flex-[0.8] space-x-2 items-center">
                              <BsPersonCheck className="text-[#eede49]" />
                              <p className="text-[#0000008F] font-semibold">
                                Courses Completed:
                              </p>
                            </div>
                            <span className="text-[#0000008F] font-semibold flex-[0.2]">
                              {calCourseCompleted(student.attendance)}%
                            </span>
                          </div>
                        </div>

                        {/* CircularProgressbar  */}
                        <div className="flex-[0.4] flex items-center justify-center">
                          <div className="w-[7rem] h-[7rem] font-bold">
                            <CircularProgressbar
                              styles={buildStyles({
                                path: {
                                  transition: "stroke-dashoffset 0.5s ease 0s",
                                },
                                // Text size
                                textSize: "35px",
                                // Colors
                                pathColor: "#FFB800",
                                textColor: "#47ada8",
                                trailColor: "#BD8800",
                              })}
                              value={75}
                              text={calPerformance(student.assignment)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-[0.4] flex flex-col bg-[#ffffff] shadow-md  border-[1px] border-white  rounded-md py-4 px-2 pb-4 space-y-4">
                      <h1 className="font-semibold text-[#009DA7] text-[18px]">
                        Course Wise Attendance
                      </h1>
                      <div className="space-y-2 overflow-y-auto h-[8rem]">
                        {student.attendance.map((course, idx) => (
                          <div
                            key={course.courseCode}
                            className="flex flex-col"
                          >
                            <h1 className="text-[#47ada8] text-[12px] font-semibold">
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
            {error.noStudentError && (
              <p className="font-bold text-red-500 flex justify-center ">
                {error.noStudentError}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
