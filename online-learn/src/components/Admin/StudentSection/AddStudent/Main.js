import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { ADD_STUDENT, SET_ERRORS } from "../../../../Redux/actionTypes";
import { addStudent } from "../../../../Redux/actions/adminActions";

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
const dummyBatch = [
  "Batch-001",
  "Batch-002",
  "Batch-003",
  "Batch-005",
  "Batch-006",
  "Batch-007",
  "Batch-008",
  "Batch-009",
  "Batch-010",
  "Batch-011",
  "Batch-012",
];

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [batchCodes, setBatchCodes] = useState([]);

  const [values, setValues] = useState({
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
        setValues({
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
    setError({});
    setLoading(true);
    dispatch(addStudent(values));
  };

  const handleBatch = (event) => {
    const {
      target: { value },
    } = event;
    setValues({
      ...values,
      batch: typeof value === "string" ? value.split(",") : value,
    });
  };

  return (
    <div className="flex overflow-hidden h-full space-x-5 px-12 mb-5">
      <form
        onSubmit={handleSubmit}
        className="w-[80%] rounded-3xl bg-[#FAFBFF] px-10 py-5 flex flex-col space-y-4">
        <p className="text-[#8d91b1]">Add Student</p>
        <div className="flex space-x-16">
          <div className="w-[40%] flex items-center justify-center">
            <div className="w-[250px] h-[227px] bg-white border-[1px] border-[#CBCBCB] flex flex-col items-center justify-center">
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
                className="bg-white"
                value={values.lastName}
                onChange={(e) =>
                  setValues({ ...values, lastName: e.target.value })
                }
              />
            </div>
            <div className="flex space-x-8">
              <TextField
                required
                type="email"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className="bg-white"
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
                className="bg-white "
                value={values.dob}
                onChange={(e) => setValues({ ...values, dob: e.target.value })}
              />
            </div>
            <div className="flex space-x-8 ">
              <TextField
                type="number"
                id="outlined-basic"
                label="Contact Number"
                variant="outlined"
                className="bg-white w-[60%]"
                value={values.contactNumber}
                onChange={(e) =>
                  setValues({ ...values, contactNumber: e.target.value })
                }
              />
              <TextField
                type="text"
                id="outlined-basic"
                label="Performance"
                variant="outlined"
                className="bg-white w-[60%]"
                value={values.performance}
                onChange={(e) =>
                  setValues({ ...values, performance: e.target.value })
                }
              />
            </div>
            <div className="flex">
              <FormControl sx={{ width: 475 }}>
                <InputLabel id="demo-multiple-checkbox-label">Batch</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={values.batch}
                  onChange={handleBatch}
                  input={<OutlinedInput label="Batch" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}>
                  {dummyBatch.map((batch) => (
                    <MenuItem key={batch} value={batch}>
                      <Checkbox checked={values.batch.indexOf(batch) > -1} />
                      <ListItemText primary={batch} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="self-end bg-[#FB6C3A] h-[3rem] text-white w-[10rem] rounded-md text-[17px] hover:bg-[#e54e17] transition-all duration-150">
          Submit
        </button>
        {loading && <Spinner message="Adding Student" />}
        {error.studentError && (
          <p className="text-red-500 flex self-center">{error.studentError}</p>
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
