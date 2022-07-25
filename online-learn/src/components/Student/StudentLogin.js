import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../Assests/Admin_Logo.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Spinner from "../../Utils/Spinner";
import { Box, Modal } from "@mui/material";
import { studentSignUp, generateOtp } from "../../Redux/actions/studentActions";
import {
  ADD_STUDENT,
  LOGOUT,
  SET_ERRORS,
  SIGN_UP,
  OTP,
} from "../../Redux/actionTypes";
import { studentSignIn } from "../../Redux/actions/studentActions";

const StudentLogin = () => {
  const [translate, setTranslate] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    organization: "",
    password: "",
    confirmPassword: "",
  });
  const [otpLoader, setOtpLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const [error, setError] = useState({});
  const [otp, setOtp] = useState(new Array(4).fill(""));

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

  useEffect(() => {
    setTimeout(() => {
      setTranslate(true);
    }, 1000);
    dispatch({ type: LOGOUT });
  }, []);

  useEffect(() => {
    if (store.errors) {
      setShowModal(false);
      setError(store.errors);
    }
  }, [store.errors]);

  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(studentSignIn({ email: email, password: password }, navigate));
  };

  const otpGenerate = (e) => {
    e.preventDefault();
    setLoading(true);
    setShowModal(true);
    if (value.email.trim() === "" || value.password.trim() === "") {
      setError({ email: "Email and Organization Name is required" });
      setLoading(false);
    } else {
      dispatch(generateOtp({ email: value.email, organization: value.organization }));
    }
  };
  const [otpError, setOtpError] = useState(false);
  const checkOtp = (e) => {
    e.preventDefault();
    setOtpError(false);
    setOtpLoader(true);
    setLoading(true);

    if (otp.join("") == otpValue) {
      dispatch(studentSignUp(value));
    } else {
      setOtpLoader(false);
      setOtpError(true);
    }
    setLoading(false);
  };

  // check if the otp is correct
  useEffect(() => {
    if (otpValue) {
      setLoading(false);
      setShowModal(true);
    }
  }, [otpValue]);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
    }
  }, [store.errors]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);
  useEffect(() => {
    if (store.errors || store.student.studentSignedUp) {
      setLoading(false);
      setOtpLoader(false);
      setOtp(["", "", "", ""]);
      if (store.student.studentSignedUp) {
        setShowModal(false);

        setValue({
          firstName: "",
          lastName: "",
          email: "",
          dob: "",
          organization: "",
          password: "",
          confirmPassword: "",
        });

        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: SIGN_UP, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.student.studentSignedUp]);

  useEffect(() => {
    if (store.errors) {
      setLoading(false);
      if (store.errors.emailError) {
        setEmail("");
        setPassword("");
      }
      if (store.errors.passwordError) {
        setPassword("");
      }
    }
  }, [store.errors]);

  // OTP value change
  const otpHandleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const [animate, setAnimate] = useState(false);
  console.log(animate);

  return (
    <div className="bg-[#f6f5f7] flex flex-col justify-center items-center h-screen  overflow-hidden">
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
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
            {otpLoader && (
              <Spinner
                message="Signing Up"
                height={30}
                width={150}
                color="#ffffff"
                messageColor="#22147d"
              />
            )}
            {otpError && (
              <p className="text-red-500 self-center">Incorrect Otp</p>
            )}
          </form>
        </Box>
      </Modal>
      <div
        className="bg-[#fff] rounded-[10px] shadow-2xl relative overflow-hidden w-[768px] max-w-full min-h-[480px]"
        id="container">
        <div
          className={`absolute top-0 h-full transition-all duration-[0.6s] left-0 w-full md:w-1/2   ${
            animate
              ? "md:translate-x-[100%] translate-x-0 opacity-[1] z-[5]"
              : "translate-x-[0%] opacity-0 z-[1]"
          }`}>
          <form
            className="bg-[#fff] flex flex-col py-0 px-[50px] h-full justify-center items-center text-center space-y-2"
            onSubmit={otpGenerate}>
            <h1 className="font-bold text-[20px]">Create Account</h1>
            <div className="w-full space-y-3">
              <div className="flex space-x-2">
                <input
                  required
                  placeholder="First Name"
                  className="bg-[#eee] border-none py-[8px] px-[15px] w-full outline-none"
                  type="text"
                  value={value.firstName}
                  onChange={(e) =>
                    setValue({ ...value, firstName: e.target.value })
                  }
                />
                <input
                  required
                  placeholder="Last Name"
                  className="bg-[#eee] border-none py-[8px] px-[15px] w-full outline-none"
                  type="text"
                  value={value.lastName}
                  onChange={(e) =>
                    setValue({ ...value, lastName: e.target.value })
                  }
                />
              </div>
              <input
                className="bg-[#eee] border-none py-[8px] px-[15px] w-full outline-none"
                type="email"
                placeholder="Email"
                required
                value={value.email}
                onChange={(e) => setValue({ ...value, email: e.target.value })}
              />
              <input
                className="bg-[#eee] border-none py-[8px] px-[15px] w-full outline-none"
                type="organizaton"
                placeholder="Organization Name"
                required
                value={value.organization}
                onChange={(e) => setValue({ ...value, organization: e.target.value })}
              />
              <input
                className="bg-[#eee] border-none py-[8px] px-[15px] w-full outline-none"
                type="date"
                placeholder="DOB"
                required
                value={value.dob}
                onChange={(e) => setValue({ ...value, dob: e.target.value })}
              />
              <div className="w-full bg-[#eee] flex items-center  px-2">
                <input
                  className="bg-[#eee] border-none py-[8px] px-2 w-full outline-none"
                  onChange={(e) =>
                    setValue({ ...value, password: e.target.value })
                  }
                  value={value.password}
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                {showPassword ? (
                  <VisibilityIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  />
                )}
              </div>
              <input
                className="bg-[#eee] border-none py-[8px] px-[15px] w-full outline-none"
                type="password"
                placeholder="Confirm Password"
                required
                value={value.confirmPassword}
                onChange={(e) =>
                  setValue({ ...value, confirmPassword: e.target.value })
                }
              />
              <div className="sm:space-x-8 flex sm:flex-row flex-col w-full justify-center">
                {value.password !== "" &&
                  value.confirmPassword !== "" &&
                  value.password !== value.confirmPassword && (
                    <p className="font-bold text-red-500">
                      Password do not match
                    </p>
                  )}
              </div>
            </div>
            <button
              type="submit"
              className="rounded-[20px]  hover:bg-[#f53c1c] bg-[#ff4b2b] text-white text-[12px] font-bold py-[12px] px-[45px] uppercase transition-all duration-[80ms]">
              Sign Up
            </button>
            <div className="flex space-x-1 md:hidden">
              <p>Already have an account?</p>
              <button
                type="button"
                onClick={() => setAnimate(false)}
                className="text-red-600 font-bold cursor-pointer">
                Login In
              </button>
            </div>
            {loading && (
              <Spinner
                message="Signing Up"
                height={30}
                width={150}
                color="#ffffff"
                messageColor="#111111"
              />
            )}
            {error.studentError && (
              <p className="text-red-500">{error.studentError}</p>
            )}
          </form>
        </div>
        <div
          className={`absolute top-0 h-full transition-all duration-[0.6s] left-0 w-full md:w-1/2 z-[2] ${
            animate ? "translate-x-[100%]" : "translate-x-[0%]"
          } `}>
          <form
            className="bg-[#fff] flex flex-col py-0 px-[50px] h-full justify-center items-center text-center space-y-2"
            onSubmit={login}>
            <img src={logo} className="md:hidden block h-[8rem]" alt="" />
            <div className="space-y-2">
              <h1 className="font-bold text-[30px]">Student</h1>
              <h1 className="font-bold m-0 text-[18px]">Login In</h1>
            </div>
            <div className="w-full space-y-3">
              <input
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="bg-[#eee] border-none py-[12px] px-[15px]   w-full outline-none"
                type="email"
                placeholder="Email"
              />
              <div className="w-full bg-[#eee] flex items-center  px-2">
                <input
                  className="bg-[#eee] border-none py-[12px] px-2 w-full outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                {showPassword ? (
                  <VisibilityIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  />
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate("/studentforgotpassword")}>
              Forgot your password?
            </button>
            <button
              type="submit"
              className="rounded-[20px]  hover:bg-[#f53c1c] bg-[#ff4b2b] text-white text-[12px] font-bold py-[12px] px-[45px] uppercase transition-all duration-[80ms]">
              Login In
            </button>
            <div className="flex space-x-1 md:hidden">
              <p>Don't have an account?</p>
              <button
                type="button"
                onClick={() => setAnimate(true)}
                className="text-red-600 font-bold cursor-pointer">
                Sign Up
              </button>
            </div>
            {loading && (
              <Spinner
                message="Logging In"
                height={30}
                width={150}
                color="#ffffff"
                messageColor="#111"
              />
            )}
            {(error.usernameError ||
              error.passwordError ||
              error.batchError) && (
              <p className="text-red-500">
                {error.usernameError || error.passwordError || error.batchError}
              </p>
            )}
          </form>
        </div>
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-[0.6s] z-[100] ${
            animate ? "translate-x-[-100%]" : "translate-x-[0%] "
          } md:block hidden`}>
          <div
            className={`bg-gradient-to-r from-[#ff4b2b] to-[#ff416c] text-white relative left-[-100%] h-full w-[200%]  transition-transform duration-[0.6s] ${
              animate ? "translate-x-[50%]" : "translate-x-0"
            } `}>
            <div
              className={`absolute top-0 flex flex-col justify-center items-center space-y-6 px-[40px] h-full w-1/2 text-center translate-x-0 transition-transform duration-[0.6s] ${
                animate ? "translate-x-[0%]" : "translate-x-[-20%]"
              } `}>
              <img src={logo} alt="" />
              <div className="space-y-12">
                <div className="space-y-1">
                  <h1 className="text-[25px] font-bold">Hello Learner!</h1>
                  <p className="text-[14px]">
                    Enter your Personal Information to continue
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[14px]">Already have an account?</p>
                  <button
                    type="button"
                    onClick={() => setAnimate(false)}
                    className="rounded-full border-[1px] border-white px-4 py-1 hover:bg-[#ff4b2b] "
                    id="signIn">
                    Login In
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`absolute top-0 flex flex-col justify-center  items-center space-y-6 px-[40px]  h-full w-1/2 text-center translate-x-0 transition-transform duration-[0.6s] overlay-right ${
                animate ? "translate-x-[20%]" : "translate-x-[-0%]"
              } right-0`}>
              <img src={logo} alt="" />
              <div className=" space-y-12">
                <div className="space-y-1">
                  <h1 className="text-[25px] font-bold">Welcome, Back!</h1>
                  <p>Enter your credentials to Login</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[14px]">Don't have an account?</p>
                  <button
                    onClick={() => setAnimate(true)}
                    className="rounded-full border-[1px] border-white px-4 py-1 hover:bg-[#ff416c]"
                    id="signUp">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
