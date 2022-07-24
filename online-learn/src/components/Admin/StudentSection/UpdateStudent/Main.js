import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { SET_ERRORS, GET_PRESIGNED_URL } from "../../../../Redux/actionTypes";
import { updateStudent } from "../../../../Redux/actions/adminActions";
import { getPresignedUrl } from "../../../../Redux/actions/awsActions";

import ActiveBatch from "../../ActiveBatch";
import RecentNotification from "../../RecentNotification";
import { MdOutlineFileUpload } from "react-icons/md";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../Utils/Spinner";

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [image, setImage] = useState({});
  const [avatar, setAvatar] = useState("");
  const store = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const student = useSelector((store) => store.admin.student);
  const s3PresignedUrl = store.aws.presignedUrl;

  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: student.email,
    contactNumber: "",
    avatar: "",
  });

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    const base64 = await convertBase64(file);
    setAvatar(base64);
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
    if (s3PresignedUrl !== "") {
      async function fetchApi() {
        await fetch(s3PresignedUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "image/*",
          },
          body: image,
        })
          .then((response) => {
         
            const imageUrl = s3PresignedUrl.split("?")[0];
            let data = value;
            data.avatar = imageUrl;

            dispatch(updateStudent(data, navigate));
          })
          .catch((error) => {
            console.log(error);
          });
      }
      fetchApi();
      dispatch({ type: GET_PRESIGNED_URL, payload: "" });
    }
  }, [s3PresignedUrl]);

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
      if (avatar !== "") {
        dispatch(getPresignedUrl({ fileType: "images", fileName: image.name }));
      } else {
        dispatch(updateStudent(value, navigate));
      }
    }
  };

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    if (Object.keys(student).length === 0) {
      navigate("/admin/student");
    }
  }, []);

  return (
    <div className="flex lg:flex-row flex-col overflow-y-auto h-full space-x-5 lg:px-12 px-2 mb-5">
      <form
        onSubmit={handleSubmit}
        className="lg:w-[80%] w-full rounded-3xl bg-[#FAFBFF] lg:px-10 px-2 py-5 flex flex-col space-y-4"
      >
        <p className="text-[#8d91b1]">Update Student</p>
        <div className="flex flex-col w-full sm:flex-row sm:items-start items-center lg:space-x-16 space-x-4 space-y-6 sm:space-y-0">
          <div className="w-[40%] flex items-start justify-center">
            <div className="lg:w-[250px] w-[10rem] lg:h-[227px] h-[10rem] bg-white border-[1px] border-[#CBCBCB] flex flex-col items-center justify-center">
              {avatar !== "" ? (
                <img
                  src={avatar}
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
                label={student.firstName}
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
                label={student.lastName}
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
                label={student.email}
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
                value={student.dob}
                onChange={(e) => setValue({ ...value, dob: e.target.value })}
              />
              <TextField
                type="number"
                id="outlined-basic"
                label={student.contactNumber}
                variant="outlined"
                className="bg-white w-full"
                value={value.contactNumber}
                onChange={(e) =>
                  setValue({ ...value, contactNumber: e.target.value })
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
        {loading && <Spinner message="Updating Student" />}
      </form>

      <div className="bg-[#FAFBFF] lg:w-[20%] flex lg:flex-col flex-row lg:items-center items-start lg:pl-5 py-5 rounded-3xl lg:space-y-5 space-x-3 lg:space-x-0">
        <ActiveBatch />
        <RecentNotification />
      </div>
    </div>
  );
};

export default Main;
