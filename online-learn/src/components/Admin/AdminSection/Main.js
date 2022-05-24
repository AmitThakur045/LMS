import React, { useEffect, useState } from "react";
import ActiveBatch from "../ActiveBatch";
import RecentNotification from "../RecentNotification";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_ADMIN,
  GET_ADMIN,
  SET_ERRORS,
} from "../../../Redux/actionTypes";
import { deleteAdmin, getAllAdmin } from "../../../Redux/actions/adminActions";
import Spinner from "../../../Utils/Spinner";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { confirmAlert } from "react-confirm-alert";

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const allAdmins = useSelector((state) => state.admin.allAdmin);

  const deleteadmin = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui bg-gray-800 text-white h-48 flex flex-col justify-center w-96 px-10 py-4 rounded-md space-y-4">
            <h1 className="text-3xl">Are you sure?</h1>
            <p>You want to delete this admin?</p>
            <div className="space-x-4 text-black">
              <button
                className="bg-white rounded-lg w-24 h-8 hover:scale-105 transition-all duration-150"
                onClick={onClose}>
                No
              </button>
              <button
                className="bg-white rounded-lg w-24 h-8 hover:scale-105 transition-all duration-150"
                onClick={() => {
                  dispatch(deleteAdmin({ email: admins[index].email }));
                  onClose();
                }}>
                Yes
              </button>
            </div>
          </div>
        );
      },
    });
  };

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    if (allAdmins.length !== 0) {
      setAdmins(allAdmins);
      setLoading(false);
    }
  }, [allAdmins]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    dispatch(getAllAdmin());

    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  useEffect(() => {
    dispatch(getAllAdmin());
    dispatch({ type: DELETE_ADMIN, payload: false });
  }, [store.admin.adminDeleted]);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    result = allAdmins.filter((data) => {
      return data.email.search(value) !== -1;
    });
    setAdmins(result);
  };

  return (
    <div className="flex overflow-hidden h-full space-x-5 px-12 mb-5">
      <div className="w-[80%] rounded-3xl bg-[#FAFBFF] px-10 py-5 flex flex-col space-y-20">
        <div className="flex items-center justify-between">
          <div className="flex w-[15.3rem] bg-[#ffffff] pl-2 border-[#D4D4D4] border-[1px] space-x-2 rounded-md h-[1.8rem] items-center">
            <AiOutlineSearch fontSize={20} color="#696969" />
            <input
              onChange={(event) => handleSearch(event)}
              placeholder="Quick Search Admin"
              className="bg-[#ffffff] placeholder:text-[#A5A4A6]  placeholder:text-[12px] flex w-full outline-none "
              type="text"
            />
          </div>
          <Link
            to="/admin/admin/addadmin"
            type="button"
            className="bg-[#4A47D2] hover:bg-[#13119a] transition-all duration-150 rounded-3xl w-[10rem] h-[2rem] flex items-center space-x-3 text-white justify-center">
            <IoIosAddCircleOutline fontSize={20} />
            <h1>Add Admin</h1>
          </Link>
        </div>
        {(loading || Object.keys(error).length !== 0) && (
          <div className="flex flex-col mt-10">
            <div className="flex items-center justify-center mt-5">
              {loading && (
                <Spinner
                  message="Loading"
                  height={50}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {error.noAdminError && (
                <p className="text-red-500 text-2xl font-bold">
                  {error.noAdminError}
                </p>
              )}
            </div>
          </div>
        )}
        {!loading && Object.keys(error).length === 0 && admins.length !== 0 && (
          <div className="overflow-y-auto space-y-2">
            <div className="grid grid-cols-12 h-[32px] bg-white border-[1px] border-[#eeeeee] rounded-md items-center px-4">
              <h1 className="col-span-3 text-[13px] font-bold">Admin Name</h1>
              <h1 className="col-span-3 text-[13px] font-bold">Email</h1>
              <h1 className="col-span-2 text-[13px] font-bold">
                Contact Number
              </h1>
              <h1 className="col-span-3 text-[13px] font-bold">Domain</h1>
              <h1 className="col-span-1 text-[13px] font-bold">Action</h1>
            </div>
            {admins.map((ad, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 h-[37px] bg-white border-[1px] border-[#eeeeee] rounded-md items-center px-4">
                <div
                  onClick={() => {
                    navigate("/admin/admin/viewadmin");
                    dispatch({ type: GET_ADMIN, payload: ad });
                  }}
                  className="col-span-3 font-semibold text-[13px] cursor-pointer flex space-x-2">
                  <Avatar
                    sx={{ height: 20, width: 20 }}
                    src={ad.avatar}
                    alt=""
                  />
                  <p className="">
                    {ad.firstName} {ad.lastName}
                  </p>
                </div>
                <p
                  onClick={() => {
                    navigate("/admin/admin/viewadmin");
                    dispatch({ type: GET_ADMIN, payload: ad });
                  }}
                  className="col-span-3 font-semibold text-[13px] cursor-pointer">
                  {ad.email}
                </p>
                <p
                  onClick={() => {
                    navigate("/admin/admin/viewadmin");
                    dispatch({ type: GET_ADMIN, payload: ad });
                  }}
                  className="col-span-2 font-semibold text-[13px] cursor-pointer">
                  {ad.contactNumber}
                </p>
                <p
                  onClick={() => {
                    navigate("/admin/admin/viewadmin");
                    dispatch({ type: GET_ADMIN, payload: ad });
                  }}
                  className="col-span-3 font-semibold text-[13px] cursor-pointer">
                  {ad.domain}
                </p>
                <div className="col-span-1 font-semibold text-[13px] cursor-pointer ">
                  <BsThreeDotsVertical
                    onClick={(event) => {
                      handleClick(event);
                      setIndex(idx);
                    }}
                  />
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
                        dispatch({ type: GET_ADMIN, payload: admins[index] });
                        navigate("/admin/admin/updateadmin");
                      }}>
                      Update Admin
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        deleteadmin();
                        handleClose();
                      }}>
                      Delete Admin
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-[#FAFBFF] w-[20%] flex flex-col px-5 py-5 rounded-3xl space-y-5">
        <ActiveBatch />
        <RecentNotification />
      </div>
    </div>
  );
};

export default Main;