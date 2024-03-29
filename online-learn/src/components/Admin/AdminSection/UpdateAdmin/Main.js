import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { SET_ERRORS } from "../../../../Redux/actionTypes";
import { updateAdmin } from "../../../../Redux/actions/adminActions";

import ActiveBatch from "../../ActiveBatch";
import RecentNotification from "../../RecentNotification";
import { MdOutlineFileUpload } from "react-icons/md";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../Utils/Spinner";

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector((store) => store.admin.admin);

  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: admin.email,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    if (value.firstName === "" && value.lastName === "" && value.email === "") {
      alert("Enter atleast one value");
      setLoading(false);
    } else {
      dispatch(updateAdmin(value, navigate));
    }
  };

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    if (Object.keys(admin).length === 0) {
      navigate("/admin/admin");
    }
  }, []);
  return (
    <div className="flex lg:flex-row flex-col overflow-y-auto h-full space-x-5 lg:px-12 px-2 mb-5">
      <form
        onSubmit={handleSubmit}
        className="lg:w-[80%] w-full rounded-3xl bg-[#FAFBFF] lg:px-10 px-2 py-5 flex flex-col space-y-4">
        <p className="text-[#8d91b1]">Update Admin</p>
        <div className="flex flex-col w-full sm:flex-row sm:items-start items-center lg:space-x-16 space-x-4 space-y-6 sm:space-y-0">
          <div className="flex flex-col sm:w-[60%] space-y-6">
            <div className="flex flex-col lg:flex-row justify-between space-y-6 lg:space-y-0 lg:space-x-2 ">
              <TextField
                type="text"
                id="outlined-basic"
                label={admin.firstName}
                variant="outlined"
                className="bg-white"
                value={value.firstName}
                onChange={(e) =>
                  setValue({ ...value, firstName: e.target.value })
                }
              />
              <TextField
                type="text"
                id="outlined-basic"
                label={admin.lastName}
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
                disabled
                type="email"
                id="outlined-basic"
                label={admin.email}
                variant="outlined"
                className="bg-white w-full"
                value={value.email}
                onChange={(e) => setValue({ ...value, email: e.target.value })}
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
                onChange={(e) => setValue({ ...value, dob: e.target.value })}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="self-end bg-[#FB6C3A] h-[3rem] text-white w-[10rem] rounded-md text-[17px] hover:bg-[#e54e17] transition-all duration-150">
          Submit
        </button>
        {loading && <Spinner message="Updating Admin" />}
      </form>

      <div className="bg-[#FAFBFF] lg:w-[20%] flex lg:flex-col flex-row lg:items-center items-start lg:pl-5 py-5 rounded-3xl lg:space-y-5 space-x-3 lg:space-x-0">
        <ActiveBatch />
        <RecentNotification />
      </div>
    </div>
  );
};

export default Main;
