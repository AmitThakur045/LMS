import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { ADD_ADMIN, SET_ERRORS } from "../../../../Redux/actionTypes";
import { addAdmin } from "../../../../Redux/actions/adminActions";

import ActiveBatch from "../../ActiveBatch";
import RecentNotification from "../../RecentNotification";
import { MdOutlineFileUpload } from "react-icons/md";
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
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    contactNumber: "",
    avatar: "",
    sub: "",
    domain: "",
  });

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setValue({ ...value, avatar: base64 });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({ ...value, email: "" });
    }
  }, [store.errors]);

  useEffect(() => {
    if (store.errors || store.admin.adminAdded) {
      setLoading(false);
      if (store.admin.adminAdded) {
        setValue({
          firstName: "",
          lastName: "",
          email: "",
          dob: "",
          contactNumber: "",
          avatar: "",
          sub: "",
          domain: "",
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
  }, []);

  return (
    <div className="flex overflow-hidden h-full space-x-5 px-12 mb-5">
      <form
        onSubmit={handleSubmit}
        className="w-[80%] rounded-3xl bg-[#FAFBFF] px-10 py-5 flex flex-col space-y-4">
        <p className="text-[#8d91b1]">Add Admin</p>
        <div className="flex space-x-16">
          <div className="w-[40%] flex items-center justify-center">
            <div className="w-[250px] h-[227px] bg-white border-[1px] border-[#CBCBCB] flex flex-col items-center justify-center">
              {value.avatar !== "" ? (
                <img
                  src={value.avatar}
                  className="w-full h-full object-cover"
                  alt=""
                />
              ) : (
                <div className="">
                  <label
                    className="flex items-center justify-center flex-col space-y-3"
                    for="image">
                    <MdOutlineFileUpload
                      className="w-14 rounded-full h-14 bg-[#d8d8d8] cursor-pointer"
                      fontSize={35}
                    />
                    <p>Upload Profile Picture</p>
                  </label>
                  <input
                    id="image"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      uploadImage(e);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col w-[60%] space-y-6">
            <div className="flex justify-between ">
              <TextField
                required
                type="text"
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                className="bg-white"
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
                className="bg-white"
                value={value.lastName}
                onChange={(e) =>
                  setValue({ ...value, lastName: e.target.value })
                }
              />
            </div>
            <div className="flex">
              <TextField
                required
                type="email"
                id="outlined-basic"
                label="Email"
                variant="outlined"
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
                className="bg-white w-[40%]"
                value={value.dob}
                onChange={(e) => setValue({ ...value, dob: e.target.value })}
              />
              <TextField
                type="number"
                id="outlined-basic"
                label="Contact Number"
                variant="outlined"
                className="bg-white w-[60%]"
                value={value.contactNumber}
                onChange={(e) =>
                  setValue({ ...value, contactNumber: e.target.value })
                }
              />
            </div>
            <div className="flex justify-between ">
              <FormControl required className="w-[47%]">
                <InputLabel id="demo-simple-select-label">Sub Admin</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value.sub}
                  label="Sub Admin"
                  onChange={(e) => setValue({ ...value, sub: e.target.value })}>
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </Select>
              </FormControl>
              {value.sub === "true" && (
                <FormControl required className="w-[47%]">
                  <InputLabel id="demo-simple-select-label">Domain</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value.domain}
                    label="Domain"
                    onChange={(e) =>
                      setValue({ ...value, domain: e.target.value })
                    }>
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
        <button
          type="submit"
          className="self-end bg-[#FB6C3A] h-[3rem] text-white w-[10rem] rounded-md text-[17px] hover:bg-[#e54e17] transition-all duration-150">
          Submit
        </button>
        {loading && <Spinner message="Adding Admin" />}
        {error.emailError && (
          <p className="text-red-500 flex self-center">{error.emailError}</p>
        )}
      </form>

      <div className="bg-[#FAFBFF] w-[20%] flex flex-col px-5 py-5 rounded-3xl space-y-5">
        <ActiveBatch />
        <RecentNotification />
      </div>
    </div>
  );
};

export default Main;
