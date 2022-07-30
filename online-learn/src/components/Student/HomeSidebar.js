import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LogoutIcon from "@mui/icons-material/Logout";
import DiamondIcon from "@mui/icons-material/Diamond";
import PeopleIcon from "@mui/icons-material/People";
import { BsFillPersonFill } from "react-icons/bs";
import logo from "../../Assests/Learner_Logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../Redux/actionTypes";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";

const isNotActiveStyle = "text-[#555555] flex flex-col items-center px-3";
const isActiveStyle =
  "border-r-2 border-white  text-white flex flex-col items-center px-3";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#ffffff",
  border: "1px solid #000",
  boxShadow: 10,
  borderRadius: "3px",
  p: 4,
};
const HomeSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("learner")));
  const [openChangeBatchModal, setOpenChangeBatchModal] = useState(false);
  const [batchCode, setBatchCode] = useState("");

  const handleChangeBatchModalOpen = () => setOpenChangeBatchModal(true);
  const handleChangeBatchModalClose = () => {
    setOpenChangeBatchModal(false);
  };
  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate("/login");
  };

  const changeBatch = (e) => {
    e.preventDefault();
    localStorage.setItem("batchCode", JSON.stringify(batchCode));
    handleChangeBatchModalClose();
    window.location.reload(false);
  };

  return (
    <>
      <Modal
        open={openChangeBatchModal}
        onClose={handleChangeBatchModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="flex flex-col space-y-4 h-[15rem]">
            <div className="flex items-center">
              <h1 className="self-center w-[95%] font-bold">Change Batch</h1>
              <div
                onClick={handleChangeBatchModalClose}
                className="self-end cursor-pointer w-[5%]">
                <AiOutlineCloseCircle
                  className="text-gray-400 hover:text-gray-500 duration-150 transition-all"
                  fontSize={23}
                />
              </div>
            </div>
            <form onSubmit={changeBatch} className="flex flex-col space-y-3  ">
              <FormControl required className="">
                <InputLabel id="demo-simple-select-label">
                  Select Batch
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={batchCode}
                  label="Batch Code"
                  onChange={(e) => setBatchCode(e.target.value)}>
                  {user.result.batchCode?.map((batch, id) => (
                    <MenuItem key={id} value={batch}>
                      {batch}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                type="submit"
                className=""
                variant="contained"
                color="primary">
                Change
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
      <div className="hidden sm:block">
        <div className="flex-[0.07] flex flex-col h-full justify-between py-5">
          <div className="flex justify-center">
            <img className="lg:h-14 lg:w-14 h-12 w-12" src={logo} alt="" />
          </div>
          <div className="flex flex-col lg:space-y-10 space-y-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <MenuBookIcon className="lg:h-5 h-3" alt="" />
              <p className="lg:text-sm text-xs">Courses</p>
            </NavLink>
            <NavLink
              to="/resource"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <DiamondIcon className="lg:h-5 h-3" alt="" />
              <p className="lg:text-sm text-xs">Resources</p>
            </NavLink>
            <NavLink
              to="/community"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <PeopleIcon className="lg:h-5 h-3" alt="" />
              <p className="lg:text-sm text-xs">Community</p>
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <BsFillPersonFill className="lg:h-5 h-3" alt="" />
              <p className="lg:text-sm text-xs">Profile</p>
            </NavLink>
            <button
              onClick={handleChangeBatchModalOpen}
              className="text-[#555555] flex flex-col items-center px-3 active:border-r-2 active:border-white  active:text-white ">
              <SiGoogleclassroom className="lg:h-5 h-3" alt="" />
              <p className="lg:text-sm text-xs">Change Batch</p>
            </button>
          </div>
          <div className="flex flex-col items-center space-y-2 text-[#555555] hover:text-white hover:scale-110 transition-all duration-150">
            <LogoutIcon
              onClick={logout}
              className="cursor-pointer lg:h-5 h-4"
            />
            <p className="lg:text-sm text-xs">Logout</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeSidebar;
