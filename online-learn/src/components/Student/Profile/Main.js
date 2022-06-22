import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import { AiFillStar } from "react-icons/ai";
import HomeDrawer from "../HomeDrawer";
import { Avatar, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { getCourseByBatchCode } from "../../../Redux/actions/studentActions";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#0d136c" : "#308fe8",
  },
}));
const Main = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.student.courseList);
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    if (courses.length !== 0) {
      setCourseList(courses);
    }
  }, [courses]);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleResize = () => {
    if (window.innerWidth < 678) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, [window.innerWidth]);
  useEffect(() => {
    dispatch(
      getCourseByBatchCode({
        batchCode: user.result.batchCode[user.result.batchCode.length - 1],
      })
    );
  }, []);
  const batch = useSelector((state) => state.admin.batch);
  function calculateAssignmentScore() {
    let score = 0;

    if (user.result.assignment.length !== 0) {
      let total = 0;
      for (let i = 0; i < user.result.assignment.length; i++) {
        if (user.result.assignment[i].checkedAssignment) {
          score += user.result.assignment[i].score;
          total++;
        }
      }

      score = score / total;
      return Math.round(score);
    }
    return 0;
  }
  function calculateTotalAttendance() {
    let total = 0;
    for (let i = 0; i < user.result.attendance.length; i++) {
      total += user.result.attendance[i].attended;
    }
    return total;
  }
  function calculateTotalAssignments() {
    let total = 0;
    for (let i = 0; i < batch.courses.length; i++) {
      total += batch.courses[i].assignment.length;
    }

    return total;
  }
  function calCourseWiseAttendance(courseCode, attended) {
    let total = 0;
    total = courseList.find((course) => course.courseCode === courseCode);
    return Math.round((attended / total.totalLectures) * 100);
  }

  return (
    <>
      <div className="bg-[#cacaca] flex-[9.93] flex md:flex-row flex-col mt-4 rounded-t-2xl sm:mr-4 mx-2 sm:mx-0 md:overflow-hidden overflow-auto ">
        {isMobile && (
          <div className="absolute h-[5rem] justify-end text-black right-4 top-5">
            {isOpen ? (
              <CancelIcon onClick={() => setIsOpen(false)} />
            ) : (
              <MenuIcon onClick={() => setIsOpen(true)} />
            )}{" "}
          </div>
        )}
        {isOpen && <HomeDrawer isOpen={isOpen} setIsOpen={setIsOpen} />}
        {Object.keys(batch).length !== 0 &&
          Object.keys(courseList).length !== 0 && (
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 p-5 text-primary">
              <div className="flex flex-col bg-white  py-5 rounded-xl space-y-6 overflow-hidden">
                <Avatar
                  className="self-center"
                  sx={{ width: 160, height: 160 }}
                  src={user.result.avatar}
                  alt=""
                />
                <h1 className="self-center font-bold text-lg">My Profile</h1>
                <div className="flex flex-col space-y-6 pt-3 overflow-y-auto px-10">
                  <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0">
                    <TextField
                      aria-disabled
                      type="text"
                      id="outlined-basic"
                      label="First Name"
                      variant="outlined"
                      className="bg-white w-full"
                      value={user.result.firstName}
                    />
                    <TextField
                      aria-disabled
                      type="text"
                      id="outlined-basic"
                      label="Last Name"
                      variant="outlined"
                      className="bg-white w-full"
                      value={user.result.lastName}
                    />
                  </div>
                  <div className="flex space-x-6">
                    <TextField
                      aria-disabled
                      type="date"
                      id="outlined-basic"
                      label="DOB"
                      variant="outlined"
                      className="bg-white w-full"
                      value={user.result.dob}
                    />
                    <TextField
                      aria-disabled
                      type="number"
                      id="outlined-basic"
                      label="Contact Number"
                      variant="outlined"
                      className="bg-white w-full"
                      value={user.result.contactNumber}
                    />
                  </div>
                  <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0">
                    <TextField
                      aria-disabled
                      type="email"
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      className="bg-white w-full"
                      value={user.result.email}
                    />
                    <TextField
                      aria-disabled
                      type="text"
                      id="outlined-basic"
                      label="Batch Code"
                      variant="outlined"
                      className="bg-white w-full"
                      value={
                        user.result.batchCode[user.result.batchCode.length - 1]
                      }
                    />
                  </div>
                  <div className="border-[1px] border-[#848484] flex flex-col space-y-4 py-4 px-5 text-[14px] sm:text-[16px]">
                    <div className="flex items-center space-x-4">
                      <AiFillStar className="text-[#cbbc4a]" />

                      <h1 className="font-semibold">Performance:</h1>
                      <p>{user.result.performance}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <AiFillStar className="text-[#cbbc4a]" />

                      <h1 className="font-semibold">Total Attendance:</h1>
                      <p>
                        {calculateTotalAttendance()}/{batch.schedule.length}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <AiFillStar className="text-[#cbbc4a]" />

                      <h1 className="font-semibold">
                        Total Assignments Submitted:
                      </h1>
                      <p>
                        {user.result.assignment.length}/
                        {calculateTotalAssignments()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <AiFillStar className="text-[#cbbc4a]" />

                      <h1 className="font-semibold">Total Assignment Score:</h1>
                      <p>{calculateAssignmentScore()}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 grid-rows-2 overflow-hidden ">
                <div className="flex row-span-1  py-5 rounded-xl flex-col bg-white ">
                  <h1 className="self-center font-bold text-lg">
                    Course Wise Attendance
                  </h1>
                  <div className="flex flex-col space-y-6 pt-3 overflow-y-auto px-10 h-[20rem]">
                    {user.result.attendance.map((course, idx) => (
                      <div key={course.courseCode} className="flex flex-col">
                        <h1 className="text-primary text-[12px]">
                          {course.courseCode}
                        </h1>
                        <div className="flex items-center space-x-2">
                          <div className="w-full">
                            <BorderLinearProgress
                              variant="determinate"
                              value={calCourseWiseAttendance(
                                course.courseCode,
                                course.attended
                              )}
                            />
                          </div>
                          <p className="text-primary text-[12px]">
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
                <div className="flex row-span-1  py-5 rounded-xl flex-col bg-white ">
                  <h1 className="self-center font-bold text-lg">
                    Assignment Wise Score
                  </h1>
                  <div className="flex flex-col space-y-6 pt-3 overflow-y-auto px-10 h-[20rem]">
                    {user.result.assignment.map((assignment, idx) => (
                      <div key={idx} className="flex flex-col">
                        <h1 className="text-primary text-[12px]">
                          {assignment.assignmentCode}
                        </h1>
                        <div className="flex items-center space-x-2">
                          <div className="w-full">
                            <BorderLinearProgress
                              variant="determinate"
                              value={assignment.score}
                            />
                          </div>
                          <p className="text-primary text-[12px]">
                            {assignment.score}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default Main;
