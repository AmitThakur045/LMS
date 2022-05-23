import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_ERRORS, GET_COURSE, GET_STUDENT } from "../../../../Redux/actionTypes";
import ActiveBatch from "../../ActiveBatch";
import RecentNotification from "../../RecentNotification";
import {
  Avatar,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import Spinner from "../../../../Utils/Spinner";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getAllCourse } from "../../../../Redux/actions/adminActions";

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

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [courses, setCourses] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [index, setIndex] = useState(0);
  const open = Boolean(anchorEl);

  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const batch = useSelector((store) => store.admin.batch);
  const navigate = useNavigate();

  const allCourses = useSelector((state) => state.admin.allCourse);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletecourse = () => {
    // confirmAlert({
    //   customUI: ({ onClose }) => {
    //     return (
    //       <div className="custom-ui bg-gray-800 text-white h-48 flex flex-col justify-center w-96 px-10 py-4 rounded-md space-y-4">
    //         <h1 className="text-3xl">Are you sure?</h1>
    //         <p>You want to delete this course?</p>
    //         <div className="space-x-4 text-black">
    //           <button
    //             className="bg-white rounded-lg w-24 h-8 hover:scale-105 transition-all duration-150"
    //             onClick={onClose}>
    //             No
    //           </button>
    //           <button
    //             className="bg-white rounded-lg w-24 h-8 hover:scale-105 transition-all duration-150"
    //             onClick={() => {
    //               dispatch(
    //                 deleteCourse({ courseCode: courses[index].courseCode })
    //               );
    //               onClose();
    //             }}>
    //             Yes
    //           </button>
    //         </div>
    //       </div>
    //     );
    //   },
    // });
  };


  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    dispatch(getAllCourse());
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    if (Object.keys(batch).length === 0) navigate("/admin/batch");
  }, []);

  useEffect(() => {
    if (allCourses.length !== 0) {
      const res = [];
      batch?.courses.map((course) => {
        allCourses.map((allCourse) => {
          if (course === allCourse.courseCode) {
            res.push(allCourse);
          }
        });
      });
      setCourses(res);
      setLoading(false);
    }
  }, [allCourses]);

  return (
    <div className="flex overflow-hidden h-full space-x-5 px-12 mb-5">
      <div className="w-[80%] rounded-3xl bg-[#FAFBFF] px-10 py-5 flex flex-col space-y-4">
        <p className="text-[#8d91b1]">View Batch</p>
        <div className="flex space-x-16">
          <div className="w-[35%] flex items-center justify-center">
            <div className="w-[250px] h-[227px] bg-white border-[1px] border-[#CBCBCB] flex flex-col items-center justify-center">
              <img
                src={batch?.image}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
          </div>
          <div className="w-[65%] flex-col space-y-8">
            <div className="flex flex-col space-y-6">
              <div className="flex justify-between ">
                <TextField
                  aria-disabled
                  type="text"
                  id="outlined-basic"
                  label="Batch Name"
                  variant="outlined"
                  className="bg-white"
                  value={batch.batchName}
                />
                <TextField
                  aria-disabled
                  type="Batch Code"
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  className="bg-white"
                  value={batch.batchCode}
                />
              </div>
            </div>
            <div className="flex space-x-8">
              {(loading || courses.length === 0) && (
                <div className="flex flex-col mt-10">
                  <div className="flex items-center justify-center mt-5">
                    {loading && (
                      <Spinner
                        message="Loading"
                        height={50}
                        width={150}
                        color="#111111"
                        messageColor="blue"
                      />
                    )}
                    {error.courseError && (
                      <p className="text-red-500 text-2xl font-bold">
                        {error.courseError}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {courses.length !== 0 && !loading && (
                <div className="overflow-y-auto space-y-2">
                  <div className="grid grid-cols-9 gap-4 h-[32px] bg-white border-[1px] border-[#eeeeee] rounded-md items-center px-5">
                    <h1 className="col-span-2 text-[13px] font-bold">
                      Course Code
                    </h1>
                    <h1 className="col-span-2 text-[13px] font-bold">
                      Course Name
                    </h1>
                    <h1 className="col-span-2 text-[13px] font-bold">
                      Total Lectures
                    </h1>
                    <h1 className="col-span-2 text-[13px] font-bold">
                      Difficulty
                    </h1>
                    <h1 className="col-span-1 text-[13px] font-bold">Action</h1>
                  </div>
                  {courses.map((ad, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-9 gap-4 h-[37px] bg-white border-[1px] border-[#eeeeee] rounded-md items-center px-5"
                    >
                      <div
                        onClick={() => {
                          navigate("/admin/course/viewcourse");
                          dispatch({ type: GET_COURSE, payload: ad });
                        }}
                        className="col-span-2 font-semibold text-[13px] cursor-pointer flex space-x-2"
                      >
                        <Avatar
                          sx={{ height: 20, width: 20 }}
                          src={ad.courseImg}
                          alt=""
                        />
                        <p className="">{ad.courseCode}</p>
                      </div>
                      <p
                        onClick={() => {
                          navigate("/admin/course/viewcourse");
                          dispatch({ type: GET_COURSE, payload: ad });
                        }}
                        className="col-span-2 font-semibold text-[13px] cursor-pointer"
                      >
                        {ad.courseName}
                      </p>
                      <p
                        onClick={() => {
                          navigate("/admin/course/viewcourse");
                          dispatch({ type: GET_COURSE, payload: ad });
                        }}
                        className="col-span-2 font-semibold text-[13px] cursor-pointer"
                      >
                        {ad.totalLectures}
                      </p>
                      <p
                        onClick={() => {
                          navigate("/admin/course/viewcourse");
                          dispatch({ type: GET_COURSE, payload: ad });
                        }}
                        className="col-span-2 font-semibold text-[13px] cursor-pointer"
                      >
                        {ad.difficulty}
                      </p>
                      <div className="col-span-1 font-semibold text-[13px] cursor-pointer ">
                        <BsThreeDotsVertical
                          onClick={(event) => {
                            handleClick(event);
                            setIndex(idx);
                          }}
                        />
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem
                            onClick={() => {
                              deletecourse();
                              handleClose();
                            }}
                          >
                            Remove Course
                          </MenuItem>
                        </Menu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#FAFBFF] w-[20%] flex flex-col px-5 py-5 rounded-3xl space-y-5">
        <ActiveBatch />
        <RecentNotification />
      </div>
    </div>
  );
};

export default Main;
