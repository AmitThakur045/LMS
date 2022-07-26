import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_PRESIGNED_URL, SET_ERRORS } from "../../../../Redux/actionTypes";
import { useNavigate } from "react-router-dom";
import { updateLearner } from "../../../../Redux/actions/studentActions";
import HomeDrawer from "../../HomeDrawer";
import { MdOutlineFileUpload } from "react-icons/md";
import { TextField } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import Spinner from "../../../../Utils/Spinner";
import { getPresignedUrl } from "../../../../Redux/actions/awsActions";

const Main = () => {
  const [learner, setLearner] = useState(
    JSON.parse(localStorage.getItem("learner"))
  );
  const store = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState({});
  const [avatar, setAvatar] = useState("");
  const [image, setImage] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const s3PresignedUrl = store.aws.presignedUrl;

  // to check the window size and adjust sidebar
  const handleResize = () => {
    // let element = document.getElementById("form");
    if (window.innerWidth < 678) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, [window.innerWidth]);

  // adding the absolte property to form when window width is <= 678px
  useEffect(() => {
    let element = document.getElementById("form");
    if (isMobile === true) {
      element.classList.add("absolute");
    } else {
      element.classList.remove("absolute");
    }
  }, [isMobile]);

  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: learner.result.email,
    avatar: "",
    contactNumber: "",
    oldPassword: "",
    newPassword: "",
  });

  const uploadImage = async (e) => {
    const file = e.target.files[0];

    // size of the image in bytes
    if (file.size > 1000000) {
      setError({
        ...error,
        avatar: "Image size should be less than 1MB",
      });
      return;
    }

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
      if (avatar !== "") {
        dispatch(getPresignedUrl({ fileType: "images", fileName: image.name }));
      } else {
        dispatch(updateLearner(value, navigate));
      }
    }
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

            dispatch(updateLearner(data, navigate));
          })
          .catch((error) => {
            console.log(error);
          });
      }
      fetchApi();
      dispatch({ type: GET_PRESIGNED_URL, payload: "" });
    }
  }, [s3PresignedUrl]);

  useEffect(() => {
    if (store.errors) {
      setLoading(false);
      setError(store.errors);
    }
  }, [store.errors]);

  return (
    <div className="flex w-full lg:flex-row flex-col sm:overflow-y-auto h-full sm:pt-4 mb-5">
      {isMobile && (
        <div className="absolute h-[5rem] justify-end text-black right-4 top-5 z-30">
          {isOpen ? (
            <CancelIcon fontSize="large" onClick={() => setIsOpen(false)} />
          ) : (
            <MenuIcon fontSize="large" onClick={() => setIsOpen(true)} />
          )}{" "}
        </div>
      )}
      {isOpen && <HomeDrawer isOpen={isOpen} setIsOpen={setIsOpen} />}
      <form
        id="form"
        onSubmit={handleSubmit}
        className="w-full sm:rounded-lg bg-[#FAFBFF] border-8 h-full border-[#cacaca] lg:px-14 px-2 py-7 flex flex-col space-y-4"
      >
        <p className="text-[#000000] w-full flex justify-center sm:justify-start">
          Update learner
        </p>
        <div className="flex flex-col w-full sm:pr-8 pr-3 sm:flex-row sm:items-start items-center lg:space-x-16 space-x-4 space-y-6 sm:space-y-0">
          <div className="sm:w-[35%] flex items-start justify-start">
            <div className="lg:w-[250px] w-[10rem] lg:h-[227px] h-[10rem] bg-[#D9D9D9] border-[1px] rounded-md border-[#CBCBCB] flex flex-col items-center justify-center">
              {avatar !== "" ? (
                <img
                  src={avatar}
                  className="w-full h-full object-cover"
                  alt=""
                />
              ) : (
                <div className="bg-[#D9D9D9]">
                  <label
                    className="flex items-center justify-center flex-col space-y-3"
                    for="image"
                  >
                    <MdOutlineFileUpload
                      className="w-14 rounded-full h-14 bg-[#CAC7C7] p-2 text-[#7c7b7b] cursor-pointer"
                      fontSize={45}
                    />
                    <p className="text-[#7c7b7b]">Upload Profile Picture</p>
                    {error.avatar && (
                      <p className="text-[#ff0000] text-center">
                        {error.avatar}
                      </p>
                    )}
                  </label>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      uploadImage(e);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:w-[65%] w-full space-y-6">
            <div className="flex flex-col lg:flex-row justify-between space-y-6 lg:space-y-0 lg:space-x-2 ">
              <TextField
                type="text"
                id="outlined-basic"
                label={learner.result.firstName}
                variant="outlined"
                className="bg-[#F3F3F3] w-full"
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
                className="bg-[#F3F3F3] w-full"
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
                className="bg-[#F3F3F3] w-full"
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
                className="bg-[#F3F3F3] w-full"
                value={learner.result.dob}
                onChange={(e) => setValue({ ...value, dob: e.target.value })}
              />
              <TextField
                type="number"
                id="outlined-basic"
                label="Contact Number"
                variant="outlined"
                className="bg-[#F3F3F3] w-full"
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
                className="bg-[#F3F3F3] w-full"
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
                className="bg-[#F3F3F3] w-full"
                value={value.newPassword}
                onChange={(e) =>
                  setValue({ ...value, newPassword: e.target.value })
                }
              />
            </div>
            <div className="flex space-x-3 self-end">
              <button
                type="submit"
                className="self-end bg-[#FB6C3A] h-[3rem] text-white w-[10rem] rounded-md text-[17px] hover:bg-[#e54e17] transition-all duration-150"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="self-end bg-[#e92f2f] h-[3rem] text-white w-[10rem] rounded-md text-[17px] hover:bg-[#e51717] transition-all duration-150"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        {loading && <Spinner message="Updating learner" />}
        {error.passwordError && (
          <p className="text-red-500 flex self-center font-bold">
            {error.passwordError}
          </p>
        )}
      </form>
    </div>
  );
};

export default Main;
