import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import { AiFillEye, AiFillStar } from "react-icons/ai";
import HomeDrawer from "../HomeDrawer";
import { Avatar, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#FFB800" : "#308fe8",
  },
}));
const Main = ({ courseList, learner, batch }) => {
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

  function calculateAssignmentScore() {
    let score = 0;

    if (learner.assignment.length !== 0) {
      let total = 0;
      for (let i = 0; i < learner.assignment.length; i++) {
        if (learner.assignment[i].checkedAssignment) {
          score += learner.assignment[i].score;
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
    for (let i = 0; i < learner.attendance.length; i++) {
      total += learner.attendance[i].attended;
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
      <div className="relative bg-[#cacaca] flex-[9.93] flex md:flex-row flex-col mt-4 rounded-t-2xl sm:mr-4 mx-2 sm:mx-0 md:overflow-hidden overflow-auto">
        {isMobile && (
          <div className="absolute h-[5rem] w-fit justify-end text-black right-4 top-5">
            {isOpen ? (
              <CancelIcon fontSize="large" onClick={() => setIsOpen(false)} />
            ) : (
              <MenuIcon fontSize="large" onClick={() => setIsOpen(true)} />
            )}{" "}
          </div>
        )}
        {isOpen && <HomeDrawer isOpen={isOpen} setIsOpen={setIsOpen} />}
        {
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 p-2 text-primary">
            <div className="flex flex-col bg-white py-5 rounded-xl space-y-4 md:h-full h-fit overflow-hidden">
              {/* User Image */}
              <Avatar
                className="self-center"
                sx={{ width: 120, height: 120 }}
                src={learner.avatar}
                alt=""
              />
              <div className="relative flex flex-col pt-3 overflow-y-auto md:h-full h-[35rem] px-10">
                {/* User Details */}
                <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-2 lg:space-y-0 my-[0.5rem]">
                  <TextField
                    aria-disabled
                    type="text"
                    size="small"
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    className="bg-white w-full"
                    value={learner.firstName}
                  />
                  <TextField
                    aria-disabled
                    type="text"
                    size="small"
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    className="bg-white w-full"
                    value={learner.lastName}
                  />
                </div>
                <div className="flex space-x-6 my-[0.5rem]">
                  <TextField
                    aria-disabled
                    type="date"
                    size="small"
                    id="outlined-basic"
                    label="DOB"
                    variant="outlined"
                    className="bg-white w-full"
                    value={learner.dob}
                  />
                  <TextField
                    aria-disabled
                    type="number"
                    size="small"
                    id="outlined-basic"
                    label="Contact Number"
                    variant="outlined"
                    className="bg-white w-full"
                    value={learner.contactNumber}
                  />
                </div>
                <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-3 lg:space-y-0 my-[0.5rem]">
                  <TextField
                    aria-disabled
                    type="email"
                    size="small"
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    className="bg-white w-full"
                    value={learner.email}
                  />
                  <TextField
                    aria-disabled
                    type="text"
                    size="small"
                    id="outlined-basic"
                    label="Active Batch Code"
                    variant="outlined"
                    className="bg-white w-full"
                    value={learner.batchCode[learner.batchCode.length - 1]}
                  />
                </div>

                {/* performance table  848484 */}
                <div className="flex flex-col text-[14px] sm:text-[16px] pt-3">
                  <div className="flex items-center space-x-4 bg-[#EEEDED] px-3 py-[0.5rem] rounded-t-md">
                    <AiFillStar className="text-[#cbbc4a]" />

                    <div className="flex flex-row justify-between w-full pr-2">
                      <h1 className="font-semibold">Performance:</h1>
                      <p>{learner.performance}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 px-3 py-[0.5rem] bg-[#F6F6F6]">
                    <AiFillStar className="text-[#cbbc4a]" />

                    <div className="flex flex-row justify-between w-full pr-2">
                      <h1 className="font-semibold">Total Attendance:</h1>
                      <p>
                        {calculateTotalAttendance()}/{batch.schedule.length}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 bg-[#EEEDED] px-3 py-[0.5rem]">
                    <AiFillStar className="text-[#cbbc4a]" />

                    <div className="flex flex-row justify-between w-full pr-2">
                      <h1 className="font-semibold">
                        Total Assignments Submitted:
                      </h1>
                      <p>
                        {learner.assignment.length}/
                        {calculateTotalAssignments()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 px-3 py-[0.5rem] bg-[#F6F6F6] rounded-b-md">
                    <AiFillStar className="text-[#cbbc4a]" />

                    <div className="flex flex-row justify-between w-full pr-2">
                      <h1 className="font-semibold">Total Assignment Score:</h1>
                      <p>{calculateAssignmentScore()}</p>
                    </div>
                  </div>
                </div>
                <Link
                  to="/profile/updateprofile"
                  className="absolute self-center font-medium bottom-0 text-lg bg-red-600 hover:bg-red-700 duration-150 transition-all text-white px-2 py-1 rounded-md">
                  Update
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-[3.7rem] grid-rows-2 overflow-hidden ">
              <div className="grid grid-cols-2 gap-2  row-span-1 ">
                <div className="flex  rounded-xl flex-col bg-white py-5 ">
                  <h1 className="self-center font-bold text-lg">
                    Course Wise Attendance
                  </h1>
                  <div className="flex flex-col space-y-6 pt-3 overflow-y-auto px-10 h-[20rem]">
                    {learner.attendance.map((course, idx) => (
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
                <div className="flex  rounded-xl flex-col bg-white py-5 ">
                  <h1 className="self-center font-bold text-lg">All Batches</h1>
                  <div className="flex flex-col space-y-6 pt-3 overflow-y-auto px-10 h-[20rem]">
                    {learner.batchCode.map((batch, idx) => (
                      <div
                        key={batch}
                        className="flex items-center justify-between cursor-pointer px-4 hover:bg-slate-100 duration-150 transition-all">
                        <div className="flex items-center space-x-4">
                          <p className="bg-[#D5F8F9] h-[25px] w-[25px] flex items-center justify-center text-[12px] text-[#6F6EA5]">
                            B
                          </p>
                          <p className="text-primary text-[12px]">{batch}</p>
                        </div>
                        <AiFillEye color="#046387" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex row-span-1  py-5 rounded-xl flex-col bg-white ">
                <h1 className="self-center font-bold text-lg">
                  Assignment Wise Score
                </h1>
                <div className="flex flex-col space-y-6 pt-3 overflow-y-auto px-10 h-[20rem]">
                  {learner.assignment.map((assignment, idx) => (
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
        }
      </div>
    </>
  );
};

export default Main;
