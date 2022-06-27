import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { ADD_STUDENT, SET_ERRORS } from "../../../../Redux/actionTypes";
import {
  addStudent,
  getAllBatchCodes,
  getAllStudent,
  getStudentsByOrganizationName,
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
import { confirmAlert } from "react-confirm-alert";

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
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("admin")));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    contactNumber: "",
    avatar: "",
  });

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setValues({ ...values, avatar: base64 });
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
      setValues({ ...values, email: "" });
    }
  }, [store.errors]);
  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  useEffect(() => {
    if (store.errors || store.admin.studentAdded) {
      setLoading(false);
      if (store.admin.studentAdded) {
        if (user.result.sub === "true") {
          dispatch(
            getStudentsByOrganizationName({
              organizationName: user.result.organizationName,
              subAdmin: user.result.email,
            })
          );
        } else {
          dispatch(getAllStudent());
        }
        setValues({
          firstName: "",
          lastName: "",
          email: "",
          dob: "",
          contactNumber: "",
          avatar: "",
        });

        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_STUDENT, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.studentAdded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addStudent(values));
  };

  return (
    <div className="flex lg:flex-row flex-col overflow-y-auto h-full space-x-5 lg:px-12 px-2 mb-5">
      <form
        onSubmit={handleSubmit}
        className="lg:w-[80%] w-full rounded-3xl bg-[#FAFBFF] lg:px-10 px-2 py-5 flex flex-col space-y-4"
      >
        <p className="text-[#8d91b1]">Add Student</p>
        <div className="flex flex-col w-full sm:flex-row sm:items-start items-center lg:space-x-16 space-x-4 space-y-6 sm:space-y-0">
          <div className="w-[40%] flex items-start justify-center">
            <div className="lg:w-[250px] w-[10rem] lg:h-[227px] h-[10rem] bg-white border-[1px] border-[#CBCBCB] flex flex-col items-center justify-center">
              {values.avatar !== "" ? (
                <img
                  src={values.avatar}
                  className="w-full h-full object-cover"
                  alt=""
                />
              ) : (
                <div className="">
                  <label
                    className="flex items-center justify-center flex-col space-y-3"
                    for="image"
                  >
                    <MdOutlineFileUpload
                      className="w-14 rounded-full h-14 bg-[#d8d8d8] cursor-pointer"
                      fontSize={35}
                    />
                    <p className="w-full text-center">Upload Profile Picture</p>
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
          <div className="flex flex-col sm:w-[60%] w-full space-y-6">
            <div className="flex flex-col lg:flex-row justify-between space-y-6 lg:space-y-0 lg:space-x-2 ">
              <TextField
                required
                type="text"
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                className="bg-white w-full"
                value={values.firstName}
                onChange={(e) =>
                  setValues({ ...values, firstName: e.target.value })
                }
              />
              <TextField
                required
                type="text"
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                className="bg-white w-full"
                value={values.lastName}
                onChange={(e) =>
                  setValues({ ...values, lastName: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-between space-y-6 lg:space-y-0 lg:space-x-2 ">
              <TextField
                required
                type="email"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className="bg-white w-full"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
              <TextField
                required
                type="date"
                id="outlined-basic"
                variant="outlined"
                className="bg-white w-full"
                value={values.dob}
                onChange={(e) => setValues({ ...values, dob: e.target.value })}
              />
            </div>
            <div className="flex">
              <TextField
                type="number"
                id="outlined-basic"
                label="Contact Number"
                variant="outlined"
                className="bg-white w-full sm:w-[50%]"
                value={values.contactNumber}
                onChange={(e) =>
                  setValues({ ...values, contactNumber: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="self-end bg-[#FB6C3A] h-[3rem] text-white w-[10rem] rounded-md text-[17px] hover:bg-[#e54e17] transition-all duration-150"
        >
          Submit
        </button>
        {loading && <Spinner message="Adding Student" />}
        {error.studentError && (
          <p className="text-red-500 flex self-center">{error.studentError}</p>
        )}
      </form>

      <div className="bg-[#FAFBFF] lg:w-[20%] flex lg:flex-col flex-row lg:items-center items-start lg:pl-5 py-5 rounded-3xl lg:space-y-5 space-x-3 lg:space-x-0">
        <ActiveBatch />
        <RecentNotification />
      </div>
    </div>
  );
};

export default Main;
