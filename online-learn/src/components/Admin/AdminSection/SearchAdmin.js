import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin, deleteAdmin } from "../../../Redux/actions/adminActions";
import { GET_ADMIN, SET_ERRORS } from "../../../Redux/actionTypes";
import Spinner from "../../../Utils/Spinner";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const SearchAdmin = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(getAdmin({ email }));
  };

  const admin = useSelector((state) => state.admin.admin);

  const deleteadmin = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui bg-gray-800 text-white h-48 flex flex-col justify-center w-96 px-10 py-4 rounded-md space-y-4">
            <h1 className="text-3xl">Are you sure?</h1>
            <p>You want to delete this admin?</p>
            <div className="space-x-4 text-black">
              <button
                className="bg-white rounded-lg w-24 h-8 hover:scale-105 transition-all duration-150"
                onClick={onClose}>
                No
              </button>
              <button
                className="bg-white rounded-lg w-24 h-8 hover:scale-105 transition-all duration-150"
                onClick={() => {
                  dispatch(deleteAdmin({ email }, navigate));
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
      setEmail("");
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    if (Object.keys(admin).length !== 0) {
      setLoading(false);
    }
  }, [admin]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    if (store.admin.adminUpdated) {
      dispatch(getAdmin({ email: admin.email }));
    }
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
          <h1 className="self-center mt-4 font-bold text-xl">Search Admin</h1>
          {Object.keys(admin).length !== 0 ? (
            <form
              className="flex w-4/6 mx-auto my-6 flex-col space-y-8"
              onSubmit={handleSubmit}>
              <div className="flex space-x-5">
                <div className="space-y-1">
                  <p className="text-sm text-[#7e7e7e]">First Name</p>
                  <input
                    disabled
                    className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                    type="text"
                    value={admin.firstName}
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-[#7e7e7e]">Last Name</p>
                  <input
                    disabled
                    className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                    type="text"
                    value={admin.lastName}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">Email</p>
                <input
                  disabled
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="text"
                  value={admin.email}
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">DOB</p>
                <input
                  disabled
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="date"
                  value={admin.dob}
                />
              </div>
              <div className="flex space-x-5">
                <div className="space-y-1">
                  <p className="text-sm text-[#7e7e7e]">Contact Number</p>
                  <input
                    disabled
                    className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                    type="number"
                    value={admin.contactNumber}
                  />
                </div>
              </div>
              <div className="flex space-x-5">
                <button
                  type="button"
                  onClick={() =>
                    navigate("/admin/admin/searchadmin/updateadmin")
                  }
                  className="bg-[#3a1b97] text-white h-10 flex-[0.5] hover:scale-105 transition-all duration-150">
                  Update
                </button>
                <button
                  type="button"
                  onClick={deleteadmin}
                  className="bg-[#b00303] text-white h-10 flex-[0.5] hover:scale-105 transition-all duration-150">
                  Delete
                </button>
              </div>
              <button
                type="button"
                onClick={() => dispatch({ type: GET_ADMIN, payload: {} })}
                className="bg-[#893838] text-white h-10 w-32 self-center rounded-md hover:scale-105 transition-all duration-150">
                Check Another
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-4/6 mx-auto my-6 flex-col space-y-8">
              <div className="space-y-1 self-center">
                <p className="text-sm text-[#7e7e7e]">Email</p>
                <input
                  required
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                    setEmail("");
                    setError({});
                  }}>
                  Clear
                </button>
              </div>
              {loading && <Spinner message="Searching Admin" />}

              {error.noAdminError && (
                <p className="text-red-500 flex self-center">
                  {error.noAdminError}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAdmin;
