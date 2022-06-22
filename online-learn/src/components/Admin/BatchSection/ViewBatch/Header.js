import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineBell,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { IoMdHand } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateBatchAdmin,
  updateStatus,
} from "../../../../Redux/actions/adminActions";
import {
  UPDATE_BATCH_ADMIN,
  UPDATE_STATUS,
} from "../../../../Redux/actionTypes";
import Spinner from "../../../../Utils/Spinner";
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
const Header = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("admin")));
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const [batchData, setBatchData] = useState(
    JSON.parse(localStorage.getItem("batch"))
  );

  useEffect(() => {
    setStatus(batchData.status);
  }, []);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
    }
  }, [store.errors]);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/admin/login");
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openAdminModal, setOpenAdminModal] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const handleAdminModalOpen = () => setOpenAdminModal(true);
  const handleAdminModalClose = () => {
    setOpenAdminModal(false);
    setAdminEmail("");
  };
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [status, setStatus] = useState(true);
  const handleStatusModalOpen = () => {
    setOpenStatusModal(true);
  };
  const handleStatusModalClose = () => {
    setOpenStatusModal(false);
    setStatus(batchData.status);
  };

  useEffect(() => {
    if (store.admin.statusUpdated) {
      const data = JSON.parse(localStorage.getItem("batch"));
      data.status = status;
      localStorage.setItem("batch", JSON.stringify(data));
      handleStatusModalClose();
      handleClose();
      dispatch({ type: UPDATE_STATUS, payload: false });
      setLoading(false);
    }
  }, [store.admin.statusUpdated]);
  useEffect(() => {
    if (store.admin.batchAdminUpdated) {
      const data = JSON.parse(localStorage.getItem("batch"));
      data.subAdmin = adminEmail;
      localStorage.setItem("batch", JSON.stringify(data));
      handleAdminModalClose();
      handleClose();
      dispatch({ type: UPDATE_BATCH_ADMIN, payload: false });
      setLoading(false);
    }
  }, [store.admin.batchAdminUpdated]);

  const updateadmin = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(updateBatchAdmin({ batchCode: batchData.batchCode, adminEmail }));
  };
  const updatestatus = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(updateStatus({ batchCode: batchData.batchCode, status }));
  };
  return (
    <div className="flex justify-between w-full  pl-12 pr-12 py-10">
      <Modal
        open={openAdminModal}
        onClose={handleAdminModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="flex flex-col space-y-4 h-[15rem]">
            <div className="flex items-center">
              <h1 className="self-center w-[95%] font-bold">Update Admin</h1>
              <div
                onClick={handleAdminModalClose}
                className="self-end cursor-pointer w-[5%]">
                <AiOutlineCloseCircle
                  className="text-gray-400 hover:text-gray-500 duration-150 transition-all"
                  fontSize={23}
                />
              </div>
            </div>
            <form onSubmit={updateadmin} className="flex flex-col space-y-3  ">
              <TextField
                required
                type="email"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className="bg-white"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
              <Button
                disabled={adminEmail !== "" ? false : true}
                type="submit"
                className=""
                variant="contained"
                color="primary">
                Update
              </Button>
              {loading && <Spinner message="Updating Admin" />}
              {error.noAdmin && (
                <p className="text-red-500 flex self-center">{error.noAdmin}</p>
              )}
            </form>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openStatusModal}
        onClose={handleStatusModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="flex flex-col space-y-4 h-[15rem]">
            <div className="flex items-center">
              <h1 className="self-center w-[95%] font-bold">
                Update Active Status
              </h1>
              <div
                onClick={handleStatusModalClose}
                className="self-end cursor-pointer w-[5%]">
                <AiOutlineCloseCircle
                  className="text-gray-400 hover:text-gray-500 duration-150 transition-all"
                  fontSize={23}
                />
              </div>
            </div>
            <form onSubmit={updatestatus} className="flex flex-col space-y-3  ">
              <FormControl required className="w-[50%]">
                <InputLabel id="demo-simple-select-label">
                  Batch Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Batch Status"
                  onChange={(e) => setStatus(e.target.value)}>
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Closed</MenuItem>
                </Select>
              </FormControl>
              <Button
                disabled={status !== batchData.status ? false : true}
                type="submit"
                className=""
                variant="contained"
                color="primary">
                Update
              </Button>
              {loading && <Spinner message="Updating Status" />}
            </form>
          </div>
        </Box>
      </Modal>
      <div className="flex items-center space-x-48">
        <div className="flex items-center space-x-2">
          <AiOutlineMenu />
          <h1>Hello {user?.result?.firstName}</h1>
          <IoMdHand color="#FFCD00" />
        </div>
      </div>
      <div className="flex space-x-5 items-center">
        <div className="w-[1.8rem] h-[1.8rem] flex items-center justify-center bg-[#F5F7FF]">
          <AiOutlineBell color="#5669A7" />
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex flex-col text-[12px] items-end">
            <h1 className="font-bold">
              {user?.result?.firstName} {user?.result?.lastName}
            </h1>
            <p>{user?.result?.sub === "true" ? "Sub Admin" : "Super Admin"}</p>
          </div>
          <div className="">
            <img
              onClick={(event) => handleClick(event)}
              src={user?.result?.avatar}
              className="object-cover cursor-pointer w-[1.8rem] h-[1.8rem]"
              alt=""
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}>
              <MenuItem onClick={handleStatusModalOpen}>
                Update Active Status
              </MenuItem>
              <MenuItem onClick={handleAdminModalOpen}>
                Update Batch Admin
              </MenuItem>
              <MenuItem onClick={() => logout()}>Log Out</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
