import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Spinner from "../../Utils/Spinner";
import { studentSignUp } from "../../Redux/actions/studentActions";
import {
  ADD_STUDENT,
  LOGOUT,
  SET_ERRORS,
  SIGN_UP,
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
    contactNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const [error, setError] = useState({});
  useEffect(() => {
    setTimeout(() => {
      setTranslate(true);
    }, 1000);
    dispatch({ type: LOGOUT });
  }, []);

  useEffect(() => {
    if (store.errors) {
      setError(store.errors);
    }
  }, [store.errors]);

  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(studentSignIn({ email: email, password: password }, navigate));
  };

  const signUp = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(studentSignUp(value));
  };
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
      if (store.student.studentSignedUp) {
        setValue({
          firstName: "",
          lastName: "",
          email: "",
          dob: "",
          contactNumber: "",
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
      setEmail("");
      setPassword("");
    }
  }, [store.errors]);
  return (
    <div className="bg-primary h-screen w-full flex items-center justify-center">
      <div className="grid lg:grid-cols-2 gird-cols-1">
        <div
          className={`h-96 hidden lg:block ${
            showSignUp ? "w-[30rem]" : "w-96"
          } bg-white lg:flex items-center justify-center ${
            translate
              ? showSignUp
                ? "translate-x-[18rem]"
                : "translate-x-[12rem]"
              : ""
          }  duration-1000 transition-all rounded-3xl shadow-2xl`}
        >
          <h1 className="text-[3rem]  font-bold text-center">
            Student
            <br />
            Login
          </h1>
        </div>
        <div className="w-full flex justify-center items-center">
          {showSignUp ? (
            <form
              onSubmit={signUp}
              className={`sm:w-[30rem] w-[80vw] bg-[#2c2f35] flex flex-col items-center pt-10 pb-4 px-3 ${
                translate ? "lg:-translate-x-[12rem]" : ""
              }  md:duration-1000 md:transition-all space-y-6 rounded-3xl shadow-2xl`}
            >
              <h1 className="text-white text-3xl font-semibold">Student</h1>
              <div className="sm:space-x-8 flex sm:flex-row flex-col w-full">
                <div className="space-y-1 w-full md:w-[50%]">
                  <p className="text-[#88909e]">First Name</p>
                  <input
                    required
                    className="bg-[#88909e] w-full text-white px-2 outline-none py-1 rounded-sm"
                    type="text"
                    value={value.firstName}
                    onChange={(e) =>
                      setValue({ ...value, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1 w-full  md:w-[50%]">
                  <p className="text-[#88909e]">Last Name</p>
                  <input
                    required
                    className="bg-[#88909e] w-full text-white px-2 outline-none py-1 rounded-sm"
                    type="text"
                    value={value.lastName}
                    onChange={(e) =>
                      setValue({ ...value, lastName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="sm:space-x-8 flex sm:flex-row flex-col w-full">
                <div className="space-y-1 w-full  md:w-[50%]">
                  <p className="text-[#88909e]">Email</p>
                  <input
                    required
                    className="bg-[#88909e] w-full text-white px-2 outline-none py-1 rounded-sm"
                    type="email"
                    value={value.email}
                    onChange={(e) =>
                      setValue({ ...value, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1 w-full md:w-[50%]">
                  <p className="text-[#88909e]">Contact Number</p>
                  <input
                    required
                    className="bg-[#88909e] w-full text-white px-2 outline-none py-1 rounded-sm"
                    type="number"
                    value={value.contactNumber}
                    onChange={(e) =>
                      setValue({ ...value, contactNumber: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[#88909e]">DOB</p>
                <input
                  required
                  className="bg-[#88909e] text-white px-2 outline-none py-1 rounded-sm"
                  type="date"
                  value={value.dob}
                  onChange={(e) => setValue({ ...value, dob: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="sm:w-56 w-full hover:scale-105 transition-all duration-150 rounded-lg flex items-center justify-center text-white text-base py-1 bg-[#04bd7d]"
              >
                Sign Up
              </button>
              <p className="text-white text-sm">
                Already have an account?{" "}
                <button
                  onClick={() => setShowSignUp(false)}
                  className="text-blue-400 cursor-pointer hover:text-blue-600 transition-all duration-150"
                >
                  Sign In
                </button>
              </p>
              {loading && (
                <Spinner
                  message="Signing Up"
                  height={30}
                  width={150}
                  color="#ffffff"
                  messageColor="#fff"
                />
              )}
              {error.studentError && (
                <p className="text-red-500">{error.studentError}</p>
              )}
            </form>
          ) : (
            <form
              onSubmit={login}
              className={`${
                loading ? "h-[27rem]" : "h-96"
              } sm:w-96 w-[80vw] px-3 bg-[#2c2f35] flex flex-col items-center justify-center ${
                translate ? "lg:-translate-x-[12rem]" : ""
              } md:duration-1000 md:transition-all space-y-6 rounded-3xl shadow-2xl`}
            >
              <h1 className="text-white text-3xl font-semibold">Student</h1>
              <div className="space-y-1">
                <p className="text-[#88909e] font-bold text-sm">Email</p>
                <div className="bg-[#88909e] rounded-lg w-[14rem] flex  items-center">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    required
                    className="bg-[#88909e] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[#88909e] font-bold text-sm">Password</p>
                <div className="bg-[#88909e] rounded-lg px-2 flex  items-center">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    type={showPassword ? "text" : "password"}
                    className=" bg-[#88909e] text-white rounded-lg outline-none py-2  placeholder:text-sm"
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
                type="submit"
                className="w-56 hover:scale-105 transition-all duration-150 rounded-lg flex items-center justify-center text-white text-base py-1 bg-[#04bd7d]"
              >
                Login
              </button>
              <p className="text-white text-sm">
                Don't have an account?{" "}
                <button
                  onClick={() => setShowSignUp(true)}
                  className="text-blue-400 cursor-pointer hover:text-blue-600 transition-all duration-150"
                >
                  Sign Up
                </button>
              </p>
              {loading && (
                <Spinner
                  message="Logging In"
                  height={30}
                  width={150}
                  color="#ffffff"
                  messageColor="#fff"
                />
              )}
              {(error.usernameError ||
                error.passwordError ||
                error.batchError) && (
                <p className="text-red-500">
                  {error.usernameError ||
                    error.passwordError ||
                    error.batchError}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
