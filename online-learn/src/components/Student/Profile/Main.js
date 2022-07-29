import React, { useEffect, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import { AiFillEye, AiFillStar, AiOutlineCloseCircle } from "react-icons/ai";
import HomeDrawer from "../HomeDrawer";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Spinner from "../../../Utils/Spinner";
import { Avatar, Box, Button, Modal, TextField } from "@mui/material";

import {
  generateOtpForPasswordReset,
  resetPasswordStudent,
} from "../../../Redux/actions/studentActions";

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

// Modal styles
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

const Main = ({
  courseList,
  learner,
  batch,
  noBatch,
  currBatch,
  setCurrBatch,
}) => {
  const user = JSON.parse(localStorage.getItem("learner"));
  let otpValue = useSelector((state) => state.student.otp);
  const store = useSelector((state) => state);

  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    oldPassword: "",
    newPassword: "",
    email: user.result.email,
  });
  const [otpModal, setOtpModal] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth < 678) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

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

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setLoading(false);
      setError(store.errors);
    }
  }, [store.errors]);

  const checkOtp = (e) => {
    e.preventDefault();
    setOtpModal(false);
    setLoading(true);

    if (otp.join("") == otpValue) {
      setOtp(["", "", "", ""]);
      otpValue = null;
      dispatch(
        resetPasswordStudent({
          email: user.result.email,
          oldPassword: value.oldPassword,
          newPassword: value.newPassword,
        })
      );
      handleResetPasswordClose();
    } else {
      // setOtpLoader(false);
      // setOtpError(true);
    }
    setLoading(false);
  };

  const otpGenerate = (e) => {
    e.preventDefault();
    setLoading(true);
    setOtpModal(true);
    if (value.email.trim() === "") {
      setError({ email: "Email is required" });
      setLoading(false);
    } else {
      dispatch(generateOtpForPasswordReset({ email: value.email }));
    }
  };

  // OTP value change
  const otpHandleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleResetPasswordOpen = () => {
    setConfirmPassword("");
    setValue({
      oldPassword: "",
      newPassword: "",
      email: user.result.email,
    });
    setResetPasswordModal(true);
  };
  const handleResetPasswordClose = () => {
    setError({});
    setResetPasswordModal(false);
    setValue({
      oldPassword: "",
      newPassword: "",
      email: user.result.email,
    });
  };

  return (
    <>
      {/* Reset Password */}
      <Modal
        open={resetPasswordModal}
        onClose={handleResetPasswordClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <h1 className="self-center w-[95%] font-bold">Update Password</h1>
              <div
                onClick={handleResetPasswordClose}
                className="self-end cursor-pointer w-[5%]">
                <AiOutlineCloseCircle
                  className="text-gray-400 hover:text-gray-500 duration-150 transition-all"
                  fontSize={23}
                />
              </div>
            </div>
            <form onSubmit={otpGenerate} className="flex flex-col space-y-3  ">
              <TextField
                required
                type="text"
                id="outlined-basic"
                label="Old Password"
                variant="outlined"
                className="bg-white"
                value={value.oldPassword}
                onChange={(e) =>
                  setValue({ ...value, oldPassword: e.target.value })
                }
              />
              <TextField
                required
                type="text"
                id="outlined-basic"
                label="New Password"
                variant="outlined"
                className="bg-white"
                value={value.newPassword}
                onChange={(e) =>
                  setValue({ ...value, newPassword: e.target.value })
                }
              />
              <TextField
                required
                type="text"
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                className="bg-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="sm:space-x-8 flex sm:flex-row flex-col w-full justify-center">
                {value.newPassword !== "" &&
                  confirmPassword !== "" &&
                  value.newPassword !== confirmPassword && (
                    <p className="font-bold text-red-500">
                      Password do not match
                    </p>
                  )}
              </div>
              <Button
                disabled={
                  value.newPassword !== "" &&
                  confirmPassword !== "" &&
                  value.newPassword !== confirmPassword
                }
                type="submit"
                className=""
                variant="contained"
                color="primary">
                Update
              </Button>
              {loading && <Spinner message="Updating Password" />}
              {error.passwordError && (
                <p className="text-red-500 flex self-center">
                  {error.passwordError}
                </p>
              )}
            </form>
          </div>
        </Box>
      </Modal>

      {/* OTP Modal */}
      <Modal
        open={otpModal}
        onClose={() => setOtpModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <form onSubmit={checkOtp} className="w-full flex flex-col space-y-5">
            <div className="flex  items-center justify-center font-bold text-center">
              Enter OTP received on the given email
            </div>
            <div className="flex flex-row justify-evenly text-xl">
              {otp.map((data, index) => {
                return (
                  <input
                    className="w-[50px] h-[60px] bg-blue-100 border-2 border-blue-500 text-blue-700 px-4 py-2 rounded-md"
                    type="text"
                    name="otp"
                    maxLength="1"
                    key={index}
                    value={data}
                    onChange={(e) => otpHandleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                  />
                );
              })}
            </div>
            <div className="w-full flex flex-row justify-center mt-5">
              <button
                className="self-end bg-[#FB6C3A] h-[2rem] text-white w-[10rem] rounded-md text-[17px] hover:bg-[#e54e17] transition-all duration-150"
                type="submit">
                Submit
              </button>
            </div>
            {error.studentError && (
              <p className="text-red-500 ">{error.studentError}</p>
            )}
          </form>
        </Box>
      </Modal>

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
                    disabled
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
                  {noBatch ? (
                    <TextField
                      aria-disabled
                      type="text"
                      size="small"
                      id="outlined-basic"
                      label="Active Batch Code"
                      variant="outlined"
                      className="bg-white w-full"
                      value={"No Batch"}
                    />
                  ) : (
                    <TextField
                      aria-disabled
                      type="text"
                      size="small"
                      id="outlined-basic"
                      label="Current Batch Code"
                      variant="outlined"
                      className="bg-white w-full"
                      value={currBatch}
                    />
                  )}
                </div>

                {/* performance table  848484 */}
                <div className="flex flex-col text-[14px] sm:text-[16px] pt-3">
                  <div className="flex items-center space-x-4 bg-[#EEEDED] px-3 py-[0.5rem] rounded-t-md">
                    <AiFillStar className="text-[#cbbc4a]" />

                    <div className="flex flex-row justify-between w-full pr-2">
                      <h1 className="font-semibold">Performance:</h1>
                      {noBatch ? (
                        <p className="text-red-600">No Batch Found!</p>
                      ) : (
                        <p>{learner.performance}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 px-3 py-[0.5rem] bg-[#F6F6F6]">
                    <AiFillStar className="text-[#cbbc4a]" />

                    <div className="flex flex-row justify-between w-full pr-2">
                      <h1 className="font-semibold">Total Attendance:</h1>
                      {noBatch ? (
                        <p className="text-red-600">No Batch Found!</p>
                      ) : (
                        <p>
                          {calculateTotalAttendance()}/{batch.schedule.length}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 bg-[#EEEDED] px-3 py-[0.5rem]">
                    <AiFillStar className="text-[#cbbc4a]" />

                    <div className="flex flex-row justify-between w-full pr-2">
                      <h1 className="font-semibold">
                        Total Assignments Submitted:
                      </h1>
                      {noBatch ? (
                        <p className="text-red-600">No Batch Found!</p>
                      ) : (
                        <p>
                          {learner.assignment.length}/
                          {calculateTotalAssignments()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 px-3 py-[0.5rem] bg-[#F6F6F6] rounded-b-md">
                    <AiFillStar className="text-[#cbbc4a]" />

                    <div className="flex flex-row justify-between w-full pr-2">
                      <h1 className="font-semibold">Total Assignment Score:</h1>
                      {noBatch ? (
                        <p className="text-red-600">No Batch Found!</p>
                      ) : (
                        <p>{calculateAssignmentScore()}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="absolute self-center bottom-0 flex flex-row space-x-3">
                  <Link
                    to="/profile/updateprofile"
                    className="font-medium bottom-0 bg-red-600 hover:bg-red-700 duration-150 transition-all text-white px-2 py-1 rounded-md">
                    Update
                  </Link>
                  <div
                    onClick={() => {
                      handleResetPasswordOpen();
                    }}
                    className="font-medium bottom-0 bg-green-600 hover:cursor-pointer hover:bg-green-700 duration-150 transition-all text-white px-2 py-1 rounded-md">
                    Reset Password
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-[3.7rem] grid-rows-2 overflow-hidden ">
              <div className="grid grid-cols-2 gap-2  row-span-1 ">
                <div className="flex  rounded-xl flex-col bg-white py-5 ">
                  <h1 className="self-center font-bold text-lg">
                    Course Wise Attendance
                  </h1>
                  <div className="flex flex-col space-y-6 pt-3 overflow-y-auto px-10 h-[20rem]">
                    {learner.attendance?.map((course, idx) => (
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
                    {learner.batchCode?.map((batch, idx) => (
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
                  {learner.assignment?.map((assignment, idx) => (
                    <div key={idx} className="flex flex-col">
                      <h1 className="text-primary text-[12px]">
                        {assignment.assignmentCode}
                      </h1>
                      <div className="flex items-center space-x-2">
                        <div className="w-full">
                          <BorderLinearProgress
                            variant="determinate"
                            value={assignment.score * 10}
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
