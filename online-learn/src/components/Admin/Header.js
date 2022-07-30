import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuItem,
  Modal,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  AiOutlineBell,
  AiOutlineCloseCircle,
  AiOutlineMenu,
  AiOutlineMessage,
} from "react-icons/ai";
import { IoMdHand } from "react-icons/io";
import { RiArrowGoBackFill } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addOrganizationName,
  generateOtp,
  resetPassword,
} from "../../Redux/actions/adminActions";
import {
  ADD_ORGANIZATION,
  GET_ADMIN,
  LOGOUT,
  RESET_PASSWORD,
  SET_ERRORS,
} from "../../Redux/actionTypes";
import Spinner from "../../Utils/Spinner";
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
const Header = ({ title, type, nav, back }) => {
  const user = JSON.parse(sessionStorage.getItem("admin"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    oldPassword: "",
    newPassword: "",
    email: user.result.email,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [openOrganizationModal, setOpenOrganizationModal] = useState(false);
  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [organizationName, setOrganizationName] = useState("");
  const [otpModal, setOtpModal] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [confirmPassword, setConfirmPassword] = useState("");

  const store = useSelector((state) => state);
  let otpValue = useSelector((state) => state.admin.otp);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setLoading(false);
      setError(store.errors);
      setOrganizationName("");
    }
  }, [store.errors]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate("/admin/login");
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (store.admin.organizationAdded) {
      setLoading(false);
      handleOrganizationModalClose();
      dispatch({ type: SET_ERRORS, payload: {} });
      dispatch({ type: ADD_ORGANIZATION, payload: false });
    }
  }, [store.admin.organizationAdded]);

  const handleOrganizationModalOpen = () => setOpenOrganizationModal(true);
  const handleOrganizationModalClose = () => {
    setError({});
    setOpenOrganizationModal(false);
    setOrganizationName("");
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

  const checkOtp = (e) => {
    e.preventDefault();
    // setOtpLoader(true);
    setOtpModal(false);
    setLoading(true);

    if (otp.join("") == otpValue) {
      setOtp(["", "", "", ""]);
      otpValue = null;
      dispatch(resetPassword(value));
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
      dispatch(generateOtp({ email: value.email }));
    }
  };

  const addorganizationname = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(addOrganizationName({ organizationName, organizationEmails }));
  };

  // check if the otp is correct
  useEffect(() => {
    if (otpValue != null) {
      setLoading(false);
      // setOtpModal(true);
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

  useEffect(() => {
    if (store.admin.resetPassword) {
      setLoading(false);
      handleResetPasswordClose();
      dispatch({ type: RESET_PASSWORD, payload: false });
      dispatch({ type: SET_ERRORS, payload: {} });
    }
  }, [store.admin.resetPassword]);
  const [organizationEmails, setOrganizationEmails] = useState([]);
  const [organizationEmail, setOrganizationEmail] = useState("");

  const handleKeyUp = (e) => {
    if (e.keyCode == 32) {
      setOrganizationEmails((oldState) => [...oldState, e.target.value]);
      setOrganizationEmail("");
    }
  };

  const handleDelete = (item, index) => {
    let arr = [...organizationEmails];
    arr.splice(index, 1);

    setOrganizationEmails(arr);
  };

  return (
    <div
      className={`flex justify-between w-full ${
        back ? "pl-12" : "lg:pl-20 pl-2"
      }  pr-12 py-10`}>
      {/* Add Organization Name */}
      <Modal
        open={openOrganizationModal}
        onClose={handleOrganizationModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="flex flex-col space-y-4 ">
            <div className="flex items-center">
              <h1 className="self-center w-[95%] font-bold">
                Add Organization
              </h1>
              <div
                onClick={handleOrganizationModalClose}
                className="self-end cursor-pointer w-[5%]">
                <AiOutlineCloseCircle
                  className="text-gray-400 hover:text-gray-500 duration-150 transition-all"
                  fontSize={23}
                />
              </div>
            </div>
            <form
              onSubmit={addorganizationname}
              className="flex flex-col space-y-3  ">
              <TextField
                required
                type="text"
                id="outlined-basic"
                label="Organization Name"
                variant="outlined"
                className="bg-white"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
              />
              <FormControl className="space-y-3">
                <FormLabel>Email Domain Names</FormLabel>
                <div className="space-x-1 space-y-1">
                  {organizationEmails.length !== 0 ? (
                    organizationEmails.map((item, index) => (
                      <Chip
                        size="medium"
                        onDelete={() => handleDelete(item, index)}
                        label={item}
                      />
                    ))
                  ) : (
                    <Chip size="medium" label={"None"} />
                  )}
                </div>
                <TextField
                  required
                  type="text"
                  id="outlined-basic"
                  label="Domains"
                  variant="outlined"
                  className="bg-white mt-5"
                  value={organizationEmail}
                  onChange={(e) => setOrganizationEmail(e.target.value)}
                  onKeyDown={handleKeyUp}
                />
              </FormControl>
              <Button
                type="submit"
                className=""
                variant="contained"
                color="primary">
                Add
              </Button>
              {loading && <Spinner message="Adding Organization Name" />}
              {error.organizationNameError && (
                <p className="text-red-500 flex self-center">
                  {error.organizationNameError}
                </p>
              )}
            </form>
          </div>
        </Box>
      </Modal>

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
            {/* {otpLoader && (
              <Spinner
                message="Signing Up"
                height={30}
                width={150}
                color="#ffffff"
                messageColor="#22147d"
              />
            )} */}
            {error.adminError && (
              <p className="text-red-500 ">{error.adminError}</p>
            )}
          </form>
        </Box>
      </Modal>
      {type === "Dashboard" ? (
        <div className="flex items-center space-x-48">
          <div className="flex items-center space-x-2">
            <AiOutlineMenu />
            <h1>Hello {user?.result?.firstName}</h1>
            <IoMdHand color="#FFCD00" />
          </div>
        </div>
      ) : (
        <>
          {back ? (
            <div className="flex items-center space-x-3">
              <Link to={`/admin/${nav}`} className="cursor-pointer">
                <RiArrowGoBackFill fontSize={20} className="" />
              </Link>
              <div className="">
                <h1 className="text-primary font-bold text-[33px]">{title}</h1>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-48">
              <h1 className="text-primary font-bold text-[33px]">{title}</h1>
            </div>
          )}
        </>
      )}

      <div className="flex space-x-5 items-center">
        <div className="w-[1.8rem] h-[1.8rem] flex items-center justify-center bg-[#F5F7FF]">
          <AiOutlineBell color="#5669A7" />
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex flex-col text-[12px] items-end">
            <h1 className="font-bold">
              {user?.result?.firstName} {user?.result?.lastName}
            </h1>
            <p>
              {user?.result?.sub === "true"
                ? "Sub Admin"
                : user.result.sub === "hr"
                ? "HR Admin"
                : "Super Admin"}
            </p>
          </div>
          <div className="">
            <div
              onClick={(event) => handleClick(event)}
              className="object-cover cursor-pointer bg-[#f48320] text-white items-center flex justify-center w-[1.8rem] h-[1.8rem]"
              alt="">
              {user.result.firstName.slice(0, 1)}
            </div>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}>
              <MenuItem
                onClick={() => {
                  dispatch({ type: GET_ADMIN, payload: user.result });
                  navigate("/admin/admin/viewadmin");
                }}>
                Profile
              </MenuItem>
              {user.result.sub === "false" && (
                <MenuItem
                  onClick={() => {
                    handleOrganizationModalOpen();
                  }}>
                  Add Organization Name
                </MenuItem>
              )}
              <MenuItem
                onClick={() => {
                  handleResetPasswordOpen();
                }}>
                Reset Password
              </MenuItem>
              <MenuItem onClick={logout}>Log Out</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
