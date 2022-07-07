import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Spinner from "../../Utils/Spinner";
import { adminSignIn } from "../../Redux/actions/adminActions";
import { LOGOUT } from "../../Redux/actionTypes";

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
      setEmail("");
      setPassword("");
    }
  }, [store.errors]);
  return (
    <div className="bg-[#04bd7d] h-screen w-full flex items-center justify-center">
      <div className="grid lg:grid-cols-2 gird-cols-1">
        <div
          className={`h-96 w-96 hidden bg-white lg:flex items-center justify-center ${
            translate ? "translate-x-[12rem]" : ""
          }  duration-1000 transition-all rounded-3xl shadow-2xl`}
        >
          <h1 className="text-[3rem]  font-bold text-center">
            Admin
            <br />
            Login
          </h1>
        </div>
        <form
          onSubmit={login}
          className={`${
            loading ? "h-[27rem]" : "h-96"
          } sm:w-96 w-[80vw] px-3 bg-[#2c2f35] flex flex-col items-center justify-center ${
            translate ? "lg:-translate-x-[12rem]" : ""
          }  duration-1000 transition-all space-y-6 rounded-3xl shadow-2xl`}
        >
          <h1 className="text-white text-3xl font-semibold">Admin</h1>
          <div className="space-y-1 w-full flex flex-col items-center">
            <p className="text-[#515966] font-bold text-sm text-left sm:w-[14rem] w-full">Email</p>
            <div className="bg-[#515966] rounded-lg sm:w-[14rem] w-full flex  items-center">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                required
                className="bg-[#515966] text-white px-2 outline-none py-2 w-full rounded-lg placeholder:text-sm"
                placeholder="Username"
              />
            </div>
          </div>
          <div className="space-y-1 w-full flex flex-col items-center">
            <p className="text-[#515966] font-bold text-sm text-left sm:w-[14rem] w-full">Password</p>
            <div className="bg-[#515966] rounded-lg px-2 flex sm:w-[14rem] w-full  items-center">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                type={showPassword ? "text" : "password"}
                className=" bg-[#515966] text-white rounded-lg outline-none py-2 w-full placeholder:text-sm"
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
            className="w-32 hover:scale-105 transition-all duration-150 rounded-lg flex items-center justify-center text-white text-base py-1 bg-[#04bd7d]"
          >
            Login
          </button>
          {loading && (
            <Spinner
              message="Logging In"
              height={30}
              width={150}
              color="#ffffff"
              messageColor="#fff"
            />
          )}
          {(error.emailError || error.passwordError) && (
            <p className="text-red-500">
              {error.emailError || error.passwordError}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
