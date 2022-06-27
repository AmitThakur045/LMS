import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { SET_ERRORS } from "../../../../Redux/actionTypes";

import ActiveBatch from "../../ActiveBatch";
import RecentNotification from "../../RecentNotification";

import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import Spinner from "../../../../Utils/Spinner";
import { useNavigate } from "react-router-dom";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const student = useSelector((store) => store.admin.student);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    if (Object.keys(student).length === 0) navigate("/admin/student");
  }, []);

  return (
    <div className="flex lg:flex-row flex-col overflow-y-auto h-full space-x-5 lg:px-12 px-2 mb-5">
      <div className="lg:w-[80%] w-full rounded-3xl bg-[#FAFBFF] lg:px-10 px-2 py-5 flex flex-col space-y-4">
        <p className="text-[#8d91b1]">View Student</p>
        <div className="flex flex-col w-full sm:flex-row sm:items-start items-center lg:space-x-16 space-x-4 space-y-6 sm:space-y-0">
          <div className="w-[40%] flex items-start justify-center">
            <div className="lg:w-[250px] w-[10rem] lg:h-[227px] h-[10rem] bg-white border-[1px] border-[#CBCBCB] flex flex-col items-center justify-center">
              <img
                src={student.avatar}
                className="w-full h-full object-cover"
                alt="profile"
              />
            </div>
          </div>
          <div className="flex flex-col sm:w-[60%] w-full space-y-6">
            <div className="flex flex-col lg:flex-row justify-between space-y-6 lg:space-y-0 lg:space-x-2 ">
              <TextField
                aria-disabled
                type="text"
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                className="bg-white"
                value={student.firstName}
              />
              <TextField
                aria-disabled
                type="text"
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                className="bg-white"
                value={student.lastName}
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-between space-y-6 lg:space-y-0 lg:space-x-2 ">
              <TextField
                aria-disabled
                type="email"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className="bg-white"
                value={student.email}
              />
              <TextField
                aria-disabled
                type="date"
                id="outlined-basic"
                variant="outlined"
                className="bg-white "
                value={student.dob}
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-between space-y-6 lg:space-y-0 lg:space-x-2 ">
              <TextField
                aria-disabled
                type="number"
                id="outlined-basic"
                label="Contact Number"
                variant="outlined"
                className="bg-white"
                value={student.contactNumber}
              />
              <TextField
                aria-disabled
                type="text"
                id="outlined-basic"
                label="Performance"
                variant="outlined"
                className="bg-white"
                value={student.performance}
              />
            </div>
            <div className="flex justify-between ">
              <FormControl className="w-full">
                <InputLabel id="demo-multiple-checkbox-label">Batch</InputLabel>
                <Select
                  aria-disabled
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={student.batchCode}
                  input={<OutlinedInput label="Batch" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {student.batchCode?.map((bt) => (
                    <MenuItem key={bt} value={bt}>
                      <Checkbox checked={student.batchCode.indexOf(bt) > -1} />
                      <ListItemText primary={bt} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#FAFBFF] lg:w-[20%] flex lg:flex-col flex-row lg:items-center items-start lg:pl-5 py-5 rounded-3xl lg:space-y-5 space-x-3 lg:space-x-0">
        <ActiveBatch />
        <RecentNotification />
      </div>
    </div>
  );
};

export default Main;
