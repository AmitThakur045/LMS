import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { ADD_ADMIN, SET_ERRORS } from "../../../../Redux/actionTypes";
import {
  addAdmin,
  getAllOrganizationName,
} from "../../../../Redux/actions/adminActions";

import ActiveBatch from "../../ActiveBatch";
import RecentNotification from "../../RecentNotification";
import { MdOutlineFileUpload } from "react-icons/md";
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
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    sub: "",
    organizationName: "",
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({ ...value, email: "" });
    }
  }, [store.errors]);
  const allOrganizationName = useSelector(
    (state) => state.admin.allOrganizationName
  );
  useEffect(() => {
    if (store.errors || store.admin.adminAdded) {
      setLoading(false);
      if (store.admin.adminAdded) {
        setValue({
          firstName: "",
          lastName: "",
          email: "",
          dob: "",

          sub: "",
          organizationName: "s",
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_ADMIN, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.adminAdded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addAdmin(value));
  };

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    dispatch(getAllOrganizationName());
  }, []);

  return (
    <div className="flex flex-col lg:flex-row overflow-hidden space-x-5 lg:px-12 px-2 mb-5 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="lg:w-[80%] w-full rounded-3xl bg-[#FAFBFF] lg:px-10 px-2 py-5 flex flex-col space-y-4"
      >
        <p className="text-[#8d91b1]">Add Admin</p>

        <div className="flex flex-col xl:w-[60%] lg:w-[80%] w-full space-y-6">
          <div className="flex justify-between space-x-4 w-full">
            <TextField
              required
              type="text"
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              size="small"
              className="bg-white w-full"
              value={value.firstName}
              onChange={(e) =>
                setValue({ ...value, firstName: e.target.value })
              }
            />
            <TextField
              required
              type="text"
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              size="small"
              className="bg-white w-full"
              value={value.lastName}
              onChange={(e) => setValue({ ...value, lastName: e.target.value })}
            />
          </div>
          <div className="flex">
            <TextField
              required
              type="email"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size="small"
              className="bg-white w-full"
              value={value.email}
              onChange={(e) => setValue({ ...value, email: e.target.value })}
            />
          </div>
          <div className="flex justify-between space-x-8">
            <TextField
              required
              type="date"
              id="outlined-basic"
              variant="outlined"
              size="small"
              className="bg-white w-[40%]"
              value={value.dob}
              onChange={(e) => setValue({ ...value, dob: e.target.value })}
            />
          </div>
          <div className="flex space-x-8 ">
            <FormControl required className="w-[50%]" size="small">
              <InputLabel id="demo-simple-select-label" size="small">
                Sub Admin
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value.sub}
                label="Sub Admin"
                onChange={(e) => setValue({ ...value, sub: e.target.value })}
              >
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </Select>
            </FormControl>
            {value.sub === "true" && (
              <FormControl required className="w-[50%]" size="small">
                <InputLabel id="demo-simple-select-label" size="small">
                  Sub Admin
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value.organizationName}
                  label="Sub Admin"
                  onChange={(e) =>
                    setValue({ ...value, organizationName: e.target.value })
                  }
                >
                  {allOrganizationName.map((organization) => (
                    <MenuItem value={organization.organizationName}>
                      {organization.organizationName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </div>
          <button
            type="submit"
            className="self-end bg-[#FB6C3A] h-[3rem] text-white w-[10rem] rounded-md text-[17px] hover:bg-[#e54e17] transition-all duration-150"
          >
            Submit
          </button>
          {loading && <Spinner message="Adding Admin" />}
          {error.emailError && (
            <p className="text-red-500 flex self-center">{error.emailError}</p>
          )}
        </div>
      </form>

      <div className="bg-[#FAFBFF] lg:w-[20%] flex lg:flex-col flex-row lg:items-center items-start lg:pl-5 py-5 rounded-3xl lg:space-y-5 space-x-3 lg:space-x-0">
        <ActiveBatch />
        <RecentNotification />
      </div>
    </div>
  );
};

export default Main;
