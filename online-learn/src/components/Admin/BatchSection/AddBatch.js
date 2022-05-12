import React, { useEffect, useState } from "react";
import Spinner from "../../../Utils/Spinner";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Sidebar from "../Sidebar";
import { ADD_BATCH, SET_ERRORS } from "../../../Redux/actionTypes";
import { getAllCourse, addBatch } from "../../../Redux/actions/adminActions";
import { Link } from "react-router-dom";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
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

const AddBatch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [courseCodes, setCourseCodes] = useState([]);

  const [value, setValue] = useState({
    batchCode: "",
    batchName: "",
    courses: [],
  });

  const courses = useSelector((store) => store.admin.allCourse);

  const addstudent = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui bg-gray-800 text-white h-48 flex flex-col justify-center w-96 px-10 py-4 rounded-md space-y-4">
            <h1 className="text-3xl">Are you sure?</h1>
            <p>You want to add this Batch?</p>
            <div className="space-x-4 text-black">
              <button
                className="bg-white rounded-lg w-24 h-8 hover:scale-105 transition-all duration-150"
                onClick={onClose}>
                No
              </button>
              <button
                className="bg-white rounded-lg w-24 h-8 hover:scale-105 transition-all duration-150"
                onClick={() => {
                  setError({});
                  setLoading(true);
                  dispatch(addBatch(value));
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
      setValue({ ...value, batchCode: "" });
    }
  }, [store.errors]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    dispatch(getAllCourse());
  }, []);

  useEffect(() => {
    if (store.errors || store.admin.batchAdded) {
      setLoading(false);
      if (store.admin.batchAdded) {
        setValue({
          batchCode: "",
          batchName: "",
          courses: [],
        });
        setCourseCodes([]);
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_BATCH, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.batchAdded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue({ ...value, courses: [...courseCodes] });
    addstudent();
  };

  const handleBatch = (event) => {
    const {
      target: { value },
    } = event;
    setCourseCodes(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className="h-screen w-full bg-[#f1f2f6] flex">
      <Sidebar />
      <div className="flex-[0.85] flex flex-col">
        <Header />
        <Link to="/admin/batch">
          <ArrowBackIcon className="mx-3 mt-3 cursor-pointer" />
        </Link>
        <div className="flex-[0.9] w-[50%] mx-auto bg-white mb-10 mt-5 shadow-lg rounded-lg flex flex-col overflow-y-auto">
          <h1 className="self-center mt-4 font-bold text-xl">Add Batch</h1>
          <form
            className="flex w-4/6 mx-auto my-6 flex-col space-y-8"
            onSubmit={handleSubmit}>
            <div className="flex space-x-5">
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">Batch Name</p>
                <input
                  required
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="text"
                  value={value.batchName}
                  onChange={(e) =>
                    setValue({ ...value, batchName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">Batch Code</p>
                <input
                  required
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="text"
                  value={value.batchCode}
                  onChange={(e) =>
                    setValue({ ...value, batchCode: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex space-x-5">
              <FormControl sx={{ width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Course
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={courseCodes}
                  onChange={handleBatch}
                  input={<OutlinedInput label="Course" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}>
                  {courses.map((course) => (
                    <MenuItem key={course} value={course}>
                      <Checkbox checked={courseCodes.indexOf(course) > -1} />
                      <ListItemText primary={course} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="flex space-x-5">
              <button
                type="submit"
                className="bg-[#ed6e9e] text-white h-10 flex-[0.5] hover:scale-105 transition-all duration-150">
                Submit
              </button>
              <button
                type="button"
                className="bg-[#25642b] text-white h-10 flex-[0.5] hover:scale-105 transition-all duration-150"
                onClick={() => {
                  setValue({
                    batchCode: "",
                    batchName: "",
                    courses: [],
                  });
                  setCourseCodes([]);
                  setError({});
                }}>
                Clear
              </button>
            </div>
          </form>
          {loading && <Spinner message="Adding Batch" />}
          {error.batchError && (
            <p className="text-red-500 flex self-center">{error.batchError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBatch;
