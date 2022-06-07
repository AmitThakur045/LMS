import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { ADD_BATCH, SET_ERRORS } from "../../../../Redux/actionTypes";
import {
  addBatch,
  getAllCourseCodes,
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
import { confirmAlert } from "react-confirm-alert";
import CSVReader from "react-csv-reader";

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
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    batchCode: "",
    batchName: "",
    students: [],
    courses: [],
    organizationName: "",
    subAdmin: user.result.email,
  });
  console.log(values);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValues({ ...values, batchCode: "" });
    }
  }, [store.errors]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    dispatch(getAllCourseCodes());
    dispatch(getAllOrganizationName());
  }, []);

  const courses = useSelector((store) => store.admin.allCourse);
  const allOrganizationName = useSelector(
    (store) => store.admin.allOrganizationName
  );
  useEffect(() => {
    if (store.errors || store.admin.batchAdded) {
      setLoading(false);
      if (store.admin.batchAdded) {
        setValues({
          batchCode: "",
          batchName: "",
          students: [],
          courses: [],
          organizationName: "",
        });

        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_BATCH, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.batchAdded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addBatch(values));
  };

  const handleCourse = (event) => {
    const {
      target: { value },
    } = event;
    setValues({
      ...values,
      courses: typeof value === "string" ? value.split(",") : value,
    });
  };
  if (emails.length !== 0) {
    console.log("Yo");
  }

  return (
    <div className="flex overflow-hidden h-full space-x-5 px-12 mb-5">
      <form
        onSubmit={handleSubmit}
        className="w-[80%] rounded-3xl bg-[#FAFBFF] px-10 py-5 flex flex-col space-y-4">
        <p className="text-[#8d91b1]">Add Batch</p>
        <div className="flex space-x-16">
          <div className="flex flex-col w-[100%] space-y-6">
            <div className="flex space-x-8 ">
              <TextField
                required
                type="text"
                id="outlined-basic"
                label="Batch Code"
                variant="outlined"
                className="bg-white"
                value={values.batchCode}
                onChange={(e) =>
                  setValues({ ...values, batchCode: e.target.value })
                }
              />
              <TextField
                required
                type="text"
                id="outlined-basic"
                label="Batch Name"
                variant="outlined"
                className="bg-white"
                value={values.batchName}
                onChange={(e) =>
                  setValues({ ...values, batchName: e.target.value })
                }
              />
            </div>
            <FormControl required className="w-[50%]">
              <InputLabel id="demo-simple-select-label">
                Organization Name
              </InputLabel>
              {user.result.sub === "true" ? (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.organizationName}
                  label="Organization Name"
                  onChange={(e) =>
                    setValues({ ...values, organizationName: e.target.value })
                  }>
                  <MenuItem value={user.result.organizationName}>
                    {user.result.organizationName}
                  </MenuItem>
                </Select>
              ) : (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.organizationName}
                  label="Organization Name"
                  onChange={(e) =>
                    setValues({ ...values, organizationName: e.target.value })
                  }>
                  {allOrganizationName?.map((organizationName, idx) => (
                    <MenuItem key={idx} value={organizationName}>
                      {organizationName}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>

            <div className="flex">
              <FormControl sx={{ width: 475 }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Course
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={values.courses}
                  onChange={handleCourse}
                  input={<OutlinedInput label="Batch" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}>
                  {courses.map((course) => (
                    <MenuItem key={course.value} value={course.value}>
                      <Checkbox
                        checked={values.courses.indexOf(course.value) > -1}
                      />
                      <ListItemText primary={course.value} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="flex border-[1px] border-gray-300 items-center justify-between px-4 h-[3.5rem] w-[40%]">
              <h1 className="">Students</h1>
              <CSVReader
                className=""
                cssInputClass="hidden"
                cssLabelClass={`font-bold cursor-pointer ${
                  values.students.length !== 0 ? "bg-green-500" : "bg-red-400"
                } text-white px-3 py-2 rounded-md `}
                label={`${
                  values.students.length !== 0
                    ? "Emails Uploaded"
                    : "Upload CSV File"
                }`}
                onFileLoaded={(data, fileInfo, originalFile) => {
                  setValues({ ...values, students: data });
                }}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="self-end bg-[#FB6C3A] h-[3rem] text-white w-[10rem] rounded-md text-[17px] hover:bg-[#e54e17] transition-all duration-150">
          Submit
        </button>
        {loading && <Spinner message="Adding Batch" />}
        {error.batchError && (
          <p className="text-red-500 flex self-center">{error.batchError}</p>
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
