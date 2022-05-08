import React, { useEffect, useState } from "react";
import Spinner from "../../../Utils/Spinner";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Sidebar from "../Sidebar";
import { SET_ERRORS } from "../../../Redux/actionTypes";
import { updateAdmin } from "../../../Redux/actions/adminActions";
import { Link, useNavigate } from "react-router-dom";

const UpdateAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin.admin);

  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: admin.email,
    contactNumber: "",
    avatar: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    if (
      value.firstName === "" &&
      value.lastName === "" &&
      value.email === "" &&
      value.contactNumber === "" &&
      value.avatar === ""
    ) {
      alert("Enter atleast one value");
      setLoading(false);
    } else {
      dispatch(updateAdmin(value, navigate));
    }
  };

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    if (Object.keys(admin).length === 0) {
      navigate("/admin/admin/searchadmin");
    }
  }, []);

  return (
    <div className="h-screen w-full bg-[#f1f2f6] flex">
      <Sidebar />
      <div className="flex-[0.85] flex flex-col">
        <Header />
        <Link to="/admin/admin/searchadmin">
          <ArrowBackIcon className="mx-3 mt-3 cursor-pointer" />
        </Link>
        <div className="flex-[0.9] w-[50%] mx-auto bg-white mb-10 mt-5 shadow-lg rounded-lg flex flex-col ">
          <h1 className="self-center mt-4 font-bold text-xl">Update Admin</h1>
          <form
            className="flex w-4/6 mx-auto my-6 flex-col space-y-8"
            onSubmit={handleSubmit}>
            <div className="flex space-x-5">
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">First Name</p>
                <input
                  placeholder={admin.firstName}
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
                  disabled
                  placeholder={admin.lastName}
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
                disabled
                className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                type="text"
                value={value.email}
              />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-[#7e7e7e]">DOB</p>
              <input
                disabled
                className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                type="date"
                value={admin.dob}
                onChange={(e) => setValue({ ...value, dob: e.target.value })}
              />
            </div>
            <div className="flex space-x-5">
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">Contact Number</p>
                <input
                  placeholder={admin.contactNumber}
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
            <div className="flex w-full  justify-center">
              <button
                type="submit"
                className="bg-[#ed6e9e] w-32 text-white h-10 flex-[0.5] hover:scale-105 transition-all duration-150 self-center">
                Submit
              </button>
            </div>
          </form>
          {loading && <Spinner message="Updating Admin" />}
        </div>
      </div>
    </div>
  );
};

export default UpdateAdmin;
