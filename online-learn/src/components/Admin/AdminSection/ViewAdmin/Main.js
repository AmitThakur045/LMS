import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { SET_ERRORS } from "../../../../Redux/actionTypes";

import ActiveBatch from "../../ActiveBatch";
import RecentNotification from "../../RecentNotification";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Spinner from "../../../../Utils/Spinner";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const admin = useSelector((store) => store.admin.admin);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    if (Object.keys(admin).length === 0) navigate("/admin/admin");
  }, []);

  return (
    <div className="flex overflow-hidden h-full space-x-5 px-12 mb-5">
      <div className="w-[80%] rounded-3xl bg-[#FAFBFF] px-10 py-5 flex flex-col space-y-4">
        <p className="text-[#8d91b1]">View Admin</p>
        <div className="flex space-x-16">
          <div className="w-[40%] flex items-center justify-center">
            <div className="w-[250px] h-[227px] bg-white border-[1px] border-[#CBCBCB] flex flex-col items-center justify-center">
              <img
                src={admin.avatar}
                className="w-full h-full object-cover"
                alt="Profile"
              />
            </div>
          </div>
          <div className="flex flex-col w-[60%] space-y-6">
            <div className="flex justify-between ">
              <TextField
                aria-disabled
                type="text"
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                className="bg-white"
                value={admin.firstName}
              />
              <TextField
                aria-disabled
                type="text"
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                className="bg-white"
                value={admin.lastName}
              />
            </div>
            <div className="flex">
              <TextField
                aria-disabled
                type="email"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className="bg-white w-full"
                value={admin.email}
              />
            </div>
            <div className="flex justify-between space-x-8">
              <TextField
                aria-disabled
                type="date"
                id="outlined-basic"
                variant="outlined"
                className="bg-white w-[40%]"
                value={admin.dob}
              />
              <TextField
                aria-disabled
                type="number"
                id="outlined-basic"
                label="Contact Number"
                variant="outlined"
                className="bg-white w-[60%]"
                value={admin.contactNumber}
              />
            </div>
            <div className="flex justify-between ">
              <FormControl aria-disabled className="w-[47%]">
                <InputLabel id="demo-simple-select-label">Sub Admin</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={admin.sub}
                  label="Sub Admin">
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </Select>
              </FormControl>
              {admin.sub === "true" && (
                <TextField
                  aira-disabled
                  type="text"
                  id="outlined-basic"
                  label="Organization Name"
                  variant="outlined"
                  className="bg-white w-[50%]"
                  value={admin.organizationName}
                />
              )}
            </div>
          </div>
        </div>

        {loading && <Spinner message="Adding Admin" />}
        {error.emailError && (
          <p className="text-red-500 flex self-center">{error.emailError}</p>
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
