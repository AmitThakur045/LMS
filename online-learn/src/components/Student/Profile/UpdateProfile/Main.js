import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_ERRORS } from "../../../../Redux/actionTypes";
import { updateLearner } from "../../../../Redux/actions/studentActions";

import { MdOutlineFileUpload } from "react-icons/md";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../Utils/Spinner";

const Main = () => {
  const [learner, setLearner] = useState(
    JSON.parse(localStorage.getItem("learner"))
  );
  const store = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: learner.result.email,
    contactNumber: "",
    avatar: "",
    oldPassword: "",
    newPassword: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    if (
      value.firstName === "" &&
      value.lastName === "" &&
      value.email === "" &&
      value.contactNumber === "" &&
      value.avatar === "" &&
      value.oldPassword === "" &&
      value.newPassword === ""
    ) {
      alert("Enter atleast one value");
      setLoading(false);
    } else {
      dispatch(updateLearner(value, navigate));
    }
  };

  useEffect(() => {
    if (store.errors) {
      setError(store.errors);
    }
    if (error.passwordError) {
      alert(error.passwordError);
    }
  }, [store.errors]);

  return (
    <div className="flex w-full lg:flex-row flex-col overflow-y-auto h-full space-x-5 px-2 mb-5">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-lg bg-[#FAFBFF] lg:px-10 px-2 py-5 flex flex-col space-y-4"
      >
        <p className="text-[#8d91b1]">Update learner</p>
        <div className="flex flex-col w-full sm:flex-row sm:items-start items-center lg:space-x-16 space-x-4 space-y-6 sm:space-y-0">
          <div className="w-[40%] flex items-start justify-center">
            <div className="lg:w-[250px] w-[10rem] lg:h-[227px] h-[10rem] bg-white border-[1px] border-[#CBCBCB] flex flex-col items-center justify-center">
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
                    for="image"
                  >
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
          <div className="flex flex-col sm:w-[60%] w-full space-y-6">
            <div className="flex flex-col lg:flex-row justify-between space-y-6 lg:space-y-0 lg:space-x-2 ">
              <TextField
                type="text"
                id="outlined-basic"
                label={learner.result.firstName}
                variant="outlined"
                className="bg-white w-full"
                value={value.firstName}
                onChange={(e) =>
                  setValue({ ...value, firstName: e.target.value })
                }
              />
              <TextField
                type="text"
                id="outlined-basic"
                label={learner.result.lastName}
                variant="outlined"
                className="bg-white w-full"
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
                label={learner.result.email}
                variant="outlined"
                className="bg-white w-full"
                value={value.email}
                onChange={(e) => setValue({ ...value, email: e.target.value })}
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-between space-y-6 lg:space-y-0 lg:space-x-2 ">
              <TextField
                disabled
                type="date"
                id="outlined-basic"
                variant="outlined"
                className="bg-white w-full"
                value={learner.result.dob}
                onChange={(e) => setValue({ ...value, dob: e.target.value })}
              />
              <TextField
                type="number"
                id="outlined-basic"
                label="Contact Number"
                variant="outlined"
                className="bg-white w-full"
                value={value.contactNumber}
                onChange={(e) =>
                  setValue({ ...value, contactNumber: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-between space-y-6 lg:space-y-0 lg:space-x-2 ">
              <TextField
                type="text"
                id="outlined-basic"
                label="Old Password"
                variant="outlined"
                className="bg-white w-full"
                value={value.oldPassword}
                onChange={(e) =>
                  setValue({ ...value, oldPassword: e.target.value })
                }
              />
              <TextField
                type="text"
                id="outlined-basic"
                label="New Password"
                variant="outlined"
                className="bg-white w-full"
                value={value.newPassword}
                onChange={(e) =>
                  setValue({ ...value, newPassword: e.target.value })
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
        {loading && <Spinner message="Updating learner" />}
      </form>
    </div>
  );
};

export default Main;
