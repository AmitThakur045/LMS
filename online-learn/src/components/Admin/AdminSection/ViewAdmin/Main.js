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

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const admin = useSelector((store) => store.admin.admin);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
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
                disabled
                type="text"
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                className="bg-white"
                value={admin.firstName}
              />
              <TextField
                disabled
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
                disabled
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
                disabled
                type="date"
                id="outlined-basic"
                variant="outlined"
                className="bg-white w-[40%]"
                value={admin.dob}
              />
              <TextField
                disabled
                type="number"
                id="outlined-basic"
                label="Contact Number"
                variant="outlined"
                className="bg-white w-[60%]"
                value={admin.contactNumber}
              />
            </div>
            <div className="flex justify-between ">
              <FormControl disabled className="w-[47%]">
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
                <FormControl disabled className="w-[47%]">
                  <InputLabel id="demo-simple-select-label">Domain</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={admin.domain}
                    label="Domain">
                    <MenuItem value="AI">AI</MenuItem>
                    <MenuItem value="Data Science">Data Science</MenuItem>
                    <MenuItem value="Java Development">
                      Java Development
                    </MenuItem>
                    <MenuItem value="Web Development">Web Development</MenuItem>
                    <MenuItem value="Machine Learning">
                      Machine Learning
                    </MenuItem>
                  </Select>
                </FormControl>
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
