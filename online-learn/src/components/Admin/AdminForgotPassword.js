import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  generateOtpForPasswordResetAdmin,
  forgotPasswordAdmin,
} from "../../Redux/actions/adminActions";

import Spinner from "../../Utils/Spinner";
import { Box, Modal } from "@mui/material";

const AdminForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [value, setValue] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  // const [otpLoader, setOtpLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const otpValue = useSelector((state) => state.student.otp);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,

    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 10,
    borderRadius: "3px",
    p: 4,
  };

  const checkOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    setShowModal(false);
    setError("");
    console.log("current otp", otp.join(""));

    if (otp.join("") == otpValue) {
      setResetPassword(true);
    } else {
      setError("Invalid OTP");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors.adminError);
    }
  }, [store.errors]);

  // check if the otp is correct
  useEffect(() => {
    if (otpValue !== null) {
      setError("");
      setLoading(false);
      setShowModal(true);
    }
  }, [otpValue]);

  // OTP value change
  const otpHandleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setValue({ ...value, email: email });
    dispatch(generateOtpForPasswordResetAdmin({ email: email }));
  };

  const resetPasswordHandler = (e) => {
    e.preventDefault();
    setError("");
    if (value.newPassword !== value.confirmPassword) {
      setError("Password does not match");
      setValue({
        email: email,
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      setLoading(true);
      dispatch(
        forgotPasswordAdmin(
          { email: email, newPassword: value.newPassword },
          navigate
        )
      );
    }
  };

  return (
    <div className="w-full h-screen bg-primary flex flex-row justify-center items-center">
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
                type="submit"
              >
                Submit
              </button>
            </div>
            {error && <p className="text-red-500 ">{error}</p>}
          </form>
        </Box>
      </Modal>

      {resetPassword ? (
        <form
          onSubmit={resetPasswordHandler}
          className="bg-[#2c2f35] w-[25rem] rounded-md p-6 space-y-3 shadow-2xl"
        >
          <p className="text-[#88909e] font-bold text-sm">New Password</p>
          <input
            required
            className="bg-[#70747d] w-full text-white px-2 py-2 outline-none rounded-md"
            type="text"
            placeholder="New Password"
            value={value.newPassword}
            onChange={(e) =>
              setValue({ ...value, newPassword: e.target.value })
            }
          />
          <p className="text-[#88909e] font-bold text-sm">Confirm Password</p>
          <input
            required
            className="bg-[#70747d] w-full text-white px-2 py-2 outline-none rounded-md"
            type="text"
            placeholder="Confirm Password"
            value={value.confirmPassword}
            onChange={(e) =>
              setValue({ ...value, confirmPassword: e.target.value })
            }
          />
          {error && <p className="text-red-500 ">{error}</p>}
          <div className="w-full flex flex-row justify-center items-center pt-2">
            <button
              disabled={
                value.newPassword == value.confirmPassword &&
                value.newPassword.length !== 0
                  ? false
                  : true
              }
              type="submit"
              className="w-full hover:scale-105 transition-all duration-150 rounded-md flex items-center justify-center text-white text-base py-1 bg-[#04bd7d]"
            >
              Reset Password
            </button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={submitHandler}
          className="bg-[#2c2f35] w-[25rem] rounded-md p-6 space-y-3 shadow-2xl"
        >
          <p className="text-[#88909e] font-bold text-sm">Email</p>
          <input
            required
            className="bg-[#70747d] w-full text-white px-2 py-2 outline-none rounded-md"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-red-500 ">{error}</p>}
          <div className="w-full flex flex-row justify-center items-center pt-2">
            <button
              disabled={email.length == 0}
              type="submit"
              className="w-full hover:scale-105 transition-all duration-150 rounded-md flex items-center justify-center text-white text-base py-1 bg-[#04bd7d]"
            >
              Send OTP
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminForgotPassword;
