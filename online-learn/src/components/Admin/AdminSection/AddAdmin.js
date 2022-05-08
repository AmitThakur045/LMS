import React, { useEffect, useState } from "react";
import Spinner from "../../../Utils/Spinner";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Sidebar from "../Sidebar";
import { ADD_ADMIN, SET_ERRORS } from "../../../Redux/actionTypes";
import { addAdmin } from "../../../Redux/actions/adminActions";
import { Link } from "react-router-dom";

const AddAdmin = () => {
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
  });

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
          dob: "",
          email: "",
          contactNumber: "",
          avatar: "",
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
    <div className="h-screen w-full bg-[#f1f2f6] flex">
      <Sidebar />
      <div className="flex-[0.85] flex flex-col">
        <Header />
        <Link to="/admin/admin">
          <ArrowBackIcon className="mx-3 mt-3 cursor-pointer" />
        </Link>
        <div className="flex-[0.9] w-[50%] mx-auto bg-white mb-10 mt-5 shadow-lg rounded-lg flex flex-col ">
          <h1 className="self-center mt-4 font-bold text-xl">Add Admin</h1>
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
            <div className="space-y-1">
              <p className="text-sm text-[#7e7e7e]">Email</p>
              <input
                required
                className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                type="text"
                value={value.email}
                onChange={(e) => setValue({ ...value, email: e.target.value })}
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
                    dob: "",
                    email: "",
                    contactNumber: "",
                    avatar: "",
                  });
                  setError({});
                }}>
                Clear
              </button>
            </div>
          </form>
          {loading && <Spinner message="Adding Admin" />}
          {error.emailError && (
            <p className="text-red-500 flex self-center">{error.emailError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
