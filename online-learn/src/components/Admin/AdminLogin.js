import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Spinner from "../../Utils/Spinner";
import { adminSignIn } from "../../Redux/actions/adminActions";
import { LOGOUT } from "../../Redux/actionTypes";
import logo from "../../Assests/Admin_Logo.png";
const AdminLogin = () => {
  const [translate, setTranslate] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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
    dispatch(adminSignIn({ email: email, password: password }, navigate));
  };

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
  const [animate, setAnimate] = useState(false);
  return (
    <div className="bg-[#f6f5f7] flex flex-col justify-center items-center h-screen  overflow-hidden">
      <div
        className="bg-[#fff] rounded-[10px] shadow-2xl relative overflow-hidden w-[768px] max-w-full min-h-[480px]"
        id="container">
        <div
          className={`absolute top-0 h-full transition-all duration-[0.6s] left-0 w-full md:w-1/2   ${
            animate
              ? "md:translate-x-[100%] translate-x-0 opacity-[1] z-[5]"
              : "translate-x-[0%] opacity-0 z-[1]"
          }`}>
          <form className="bg-[#fff] flex flex-col py-0 px-[50px] h-full justify-center items-center text-center space-y-2">
            <h1 className="font-bold text-[20px]">Create Account</h1>
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
              <h1 className="font-bold text-[30px]">Admin</h1>
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
              onClick={() => navigate("/admin/forgotpassword")}>
              Forgot your password?
            </button>
            <button
              type="submit"
              className="rounded-[20px]  hover:bg-[#f53c1c] bg-[#ff4b2b] text-white text-[12px] font-bold py-[12px] px-[45px] uppercase transition-all duration-[80ms]">
              Login In
            </button>

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
