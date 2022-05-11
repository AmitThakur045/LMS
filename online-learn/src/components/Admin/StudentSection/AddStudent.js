import React, { useEffect, useState } from "react";
import Spinner from "../../../Utils/Spinner";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Sidebar from "../Sidebar";
import { ADD_STUDENT, SET_ERRORS } from "../../../Redux/actionTypes";
import { addStudent } from "../../../Redux/actions/adminActions";
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
const dummyBatch = ["Batch-001", "Batch-002", "Batch-003", "Batch-004"];

const AddStudent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [batchCodes, setBatchCodes] = useState([]);

  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    contactNumber: "",
    avatar: "",
    batch: [],
    currentActiveBatch: "",
    performance: "",
  });

  const addstudent = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui bg-gray-800 text-white h-48 flex flex-col justify-center w-96 px-10 py-4 rounded-md space-y-4">
            <h1 className="text-3xl">Are you sure?</h1>
            <p>You want to add this Student?</p>
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
                  dispatch(addStudent(value));
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
      setValue({ ...value, email: "" });
    }
  }, [store.errors]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  useEffect(() => {
    if (store.errors || store.admin.studentAdded) {
      setLoading(false);
      if (store.admin.studentAdded) {
        setValue({
          firstName: "",
          lastName: "",
          email: "",
          dob: "",
          contactNumber: "",
          avatar: "",
          batch: [],
          currentActiveBatch: "",
          performance: "",
        });
        setBatchCodes([]);
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_STUDENT, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.studentAdded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue({ ...value, batch: [...batchCodes] });
    addstudent();
  };

  const handleBatch = (event) => {
    const {
      target: { value },
    } = event;
    setBatchCodes(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className="h-screen w-full bg-[#f1f2f6] flex">
      <Sidebar />
      <div className="flex-[0.85] flex flex-col">
        <Header />
        <Link to="/admin/student">
          <ArrowBackIcon className="mx-3 mt-3 cursor-pointer" />
        </Link>
        <div className="flex-[0.9] w-[70%] mx-auto bg-white mb-10 mt-5 shadow-lg rounded-lg flex flex-col overflow-y-auto">
          <h1 className="self-center mt-4 font-bold text-xl">Add Student</h1>
          <form
            className="flex w-4/6 mx-auto my-6 flex-col space-y-8"
            onSubmit={handleSubmit}>
            <div className="flex space-x-5">
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">First Name</p>
                <input
                  required
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="text"
                  value={value.firstName}
                  onChange={(e) =>
                    setValue({ ...value, firstName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">Last Name</p>
                <input
                  required
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="text"
                  value={value.lastName}
                  onChange={(e) =>
                    setValue({ ...value, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex space-x-5">
              <FormControl sx={{ width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Batch</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={batchCodes}
                  onChange={handleBatch}
                  input={<OutlinedInput label="Batch" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}>
                  {dummyBatch.map((batch) => (
                    <MenuItem key={batch} value={batch}>
                      <Checkbox checked={batchCodes.indexOf(batch) > -1} />
                      <ListItemText primary={batch} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="flex space-x-5">
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">Email</p>
                <input
                  required
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="email"
                  value={value.email}
                  onChange={(e) =>
                    setValue({ ...value, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">DOB</p>
                <input
                  required
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="date"
                  value={value.dob}
                  onChange={(e) => setValue({ ...value, dob: e.target.value })}
                />
              </div>
            </div>
            <div className="flex space-x-5">
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">Contact Number</p>
                <input
                  required
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="number"
                  value={value.contactNumber}
                  onChange={(e) =>
                    setValue({ ...value, contactNumber: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">Profile Picture</p>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setValue({ ...value, avatar: base64 })
                  }
                />
              </div>
            </div>

            <div className="flex-col space-y-5">
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">Performance</p>
                <input
                  required
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="text"
                  value={value.performance}
                  onChange={(e) =>
                    setValue({ ...value, performance: e.target.value })
                  }
                />
              </div>
              <div className="flex space-x-5">
                <div className="space-y-1">
                  <p className="text-sm text-[#7e7e7e]">Current Active Batch</p>
                  <input
                    required
                    className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                    type="text"
                    value={value.currentActiveBatch}
                    onChange={(e) =>
                      setValue({ ...value, currentActiveBatch: e.target.value })
                    }
                  />
                </div>
              </div>
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
                    firstName: "",
                    lastName: "",
                    email: "",
                    dob: "",
                    contactNumber: "",
                    avatar: "",
                    batch: [],
                    currentActiveBatch: "",
                    performance: "",
                  });
                  setBatchCodes([]);
                  setError({});
                }}>
                Clear
              </button>
            </div>
          </form>
          {loading && <Spinner message="Adding Admin" />}
          {error.studentError && (
            <p className="text-red-500 flex self-center">
              {error.studentError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
