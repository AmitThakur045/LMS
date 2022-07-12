import React, { useEffect, useState } from "react";
import ActiveBatch from "../ActiveBatch";
import RecentNotification from "../RecentNotification";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_COURSE,
  GET_COURSE,
  SET_ERRORS,
} from "../../../Redux/actionTypes";
import {
  deleteCourse,
  getAllCourse,
} from "../../../Redux/actions/adminActions";
import Spinner from "../../../Utils/Spinner";
import { Avatar, Box, Menu, MenuItem, Modal } from "@mui/material";
import SubAdminModal from "../../../Utils/SubAdminModal";
import Loader from "../../../Utils/Loader";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 10,
  borderRadius: "3px",
  p: 4,
};
const Main = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("admin")));

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const allCourses = useSelector((state) => state.admin.allCourse);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setIsLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    if (allCourses.length !== 0) {
      setCourses(allCourses);
      setIsLoading(false);
    }
  }, [allCourses]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  useEffect(() => {
    dispatch(getAllCourse());
    dispatch({ type: DELETE_COURSE, payload: false });
  }, [store.admin.courseDeleted]);

  const handleSearch = (event) => {
    let value = event.target.value;
    let result = [];
    result = allCourses.filter((data) => {
      return data.courseCode.search(value) !== -1;
    });

    setCourses(result);
  };
  const [showSubAdminModal, setShowSubAdminModal] = useState(false);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader isLoading={isLoading} />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row overflow-hidden h-full space-x-5 lg:px-10 px-2 mb-5 overflow-y-auto">
          {showSubAdminModal && (
            <SubAdminModal
              showSubAdminModal={showSubAdminModal}
              setShowSubAdminModal={setShowSubAdminModal}
            />
          )}
          <div className="lg:w-[80%] w-full rounded-3xl shadow-inner bg-[#FAFBFF] lg:px-10 px-2 py-5 flex flex-col space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex w-full sm:w-[15.3rem] bg-[#ffffff] pl-2 border-[#D4D4D4] border-[1px] space-x-2 rounded-md h-[1.8rem] items-center">
                <AiOutlineSearch fontSize={20} color="#696969" />
                <input
                  onChange={(event) => handleSearch(event)}
                  placeholder="Quick Search Course"
                  className="bg-[#ffffff] placeholder:text-[#A5A4A6]  placeholder:text-[12px] flex w-full h-full outline-none "
                  type="text"
                />
              </div>
              <div className="sm:w-[30%] w-full flex justify-end">
                {user.result.sub === "false" && (
                  <Link
                    to="/admin/course/addcourse"
                    type="button"
                    className="bg-secondary hover:bg-secondaryHover transition-all duration-150 sm:rounded-3xl sm:w-[10rem] w-full h-[2rem] flex items-center space-x-3 text-white justify-center"
                  >
                    <IoIosAddCircleOutline fontSize={20} />
                    <h1>Add Course</h1>
                  </Link>
                )}
              </div>
            </div>
            {error.courseError && (
              <div className="flex flex-col mt-10">
                <div className="flex items-center justify-center mt-5">
                  {error.courseError && (
                    <p className="text-red-500 text-2xl font-bold">
                      {error.courseError}
                    </p>
                  )}
                </div>
              </div>
            )}
            {!error.courseError && courses.length !== 0 && (
              // <div className="overflow-y-auto space-y-2 pb-3">
              //   <div className="grid grid-cols-12 bg-white shadow-md border-[1px] border-[#eeeeee] rounded-md items-center px-4 py-1">
              //     <h1 className="col-span-3 text-[13px] font-bold">
              //       Course Code
              //     </h1>
              //     <h1 className="col-span-3 text-[13px] font-bold">
              //       Course Name
              //     </h1>

              //     <h1 className="col-span-2 text-[13px] font-bold">
              //       Total Lectures
              //     </h1>
              //     <h1 className="col-span-3 text-[13px] font-bold">
              //       Difficulty
              //     </h1>
              //     <h1 className="col-span-1 text-[13px] font-bold">Action</h1>
              //   </div>
              //   {courses.map((ad, idx) => (
              //     <div
              //       key={idx}
              //       className="grid grid-cols-12 h-[37px] bg-white border-[1px] border-[#eeeeee] rounded-md items-center px-4">
              //       <div
              //         onClick={() => {
              //           navigate("/admin/course/viewcourse");
              //           dispatch({ type: GET_COURSE, payload: ad });
              //         }}
              //         className="col-span-3 font-semibold text-[13px] cursor-pointer flex space-x-2">
              //         <Avatar
              //           sx={{ height: 20, width: 20 }}
              //           src={ad.courseImg}
              //           alt=""
              //         />
              //         <p className="">{ad.courseCode}</p>
              //       </div>
              //       <p
              //         onClick={() => {
              //           navigate("/admin/course/viewcourse");
              //           dispatch({ type: GET_COURSE, payload: ad });
              //         }}
              //         className="col-span-3 font-semibold text-[13px] cursor-pointer">
              //         {ad.courseName}
              //       </p>
              //       <p
              //         onClick={() => {
              //           navigate("/admin/course/viewcourse");
              //           dispatch({ type: GET_COURSE, payload: ad });
              //         }}
              //         className="col-span-2 font-semibold text-[13px] cursor-pointer">
              //         {ad.totalLectures}
              //       </p>
              //       <p
              //         onClick={() => {
              //           navigate("/admin/course/viewcourse");
              //           dispatch({ type: GET_COURSE, payload: ad });
              //         }}
              //         className="col-span-3 font-semibold text-[13px] cursor-pointer">
              //         {ad.difficulty}
              //       </p>
              //       <div className="col-span-1 font-semibold text-[13px] cursor-pointer ">
              //         <BsThreeDotsVertical
              //           onClick={(event) => {
              //             handleClick(event);
              //             setIndex(idx);
              //           }}
              //         />
              //         <Menu
              //           id="basic-menu"
              //           anchorEl={anchorEl}
              //           open={open}
              //           onClose={handleClose}
              //           MenuListProps={{
              //             "aria-labelledby": "basic-button",
              //           }}>
              //           {user.result.sub === "false" ? (
              //             <MenuItem
              //               onClick={() => {
              //                 handleClose();
              //               }}>
              //               Delete Course
              //             </MenuItem>
              //           ) : (
              //             <MenuItem
              //               onClick={() => {
              //                 handleClose();
              //               }}>
              //               Delete Course
              //             </MenuItem>
              //           )}
              //         </Menu>
              //       </div>
              //     </div>
              //   ))}
              // </div>
              <div className="flex flex-wrap justify-between text-[#ffffff] w-full overflow-y-auto">
                {courses.map((ad, idx) => (
                  <div className="flex flex-col m-2 p-2 sm:w-[13rem] w-full bg-gradient-to-b from-[#0085B4] to-[#009DA7] rounded-md hover:cursor-pointer">
                    <div className="flex w-full justify-end items-center">
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
                        {user.result.sub === "false" ? (
                          <MenuItem
                            onClick={() => {
                              handleClose();
                            }}
                          >
                            Delete Course
                          </MenuItem>
                        ) : (
                          <MenuItem
                            onClick={() => {
                              handleClose();
                            }}
                          >
                            Delete Course
                          </MenuItem>
                        )}
                      </Menu>
                    </div>
                    <div
                      className="w-full h-[6rem] py-3 flex justify-center items-center mt-1"
                      onClick={() => {
                        navigate("/admin/course/viewcourse");
                        dispatch({ type: GET_COURSE, payload: ad });
                      }}
                    >
                      <img
                        className="w-[6rem] h-[6rem] rounded-full"
                        src={ad.courseImg}
                        alt="profile_image"
                      />
                    </div>
                    <div
                      className="flex flex-col pt-2 space-y-3"
                      onClick={() => {
                        navigate("/admin/course/viewcourse");
                        dispatch({ type: GET_COURSE, payload: ad });
                      }}
                    >
                      <div className="flex flex-col w-full justify-center">
                        <div className="flex w-full justify-center text-[0.8rem] font-semibold">
                          COURSE CODE
                        </div>
                        <div className="flex w-full justify-center text-[0.75rem] text-gray-200">
                          {ad.courseCode}
                        </div>
                      </div>
                      <div className="flex flex-col w-full justify-center">
                        <div className="flex w-full justify-center text-[0.75rem] font-semibold">
                          COURSE NAME
                        </div>
                        <div className="flex w-full justify-center text-[0.75rem] text-gray-200">
                          {ad.courseName}
                        </div>
                      </div>
                      <div className="flex w-full items-end text-[0.75rem]">
                        <div className="flex w-[50%] justify-start">
                          Difficulty
                        </div>
                        <div className="flex w-[50%] justify-end">
                          {ad.difficulty}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
                    <div className="bg-[#FAFBFF] lg:w-[20%] flex lg:flex-col sm:flex-row flex-col lg:items-center items-start lg:pl-5 py-5 rounded-3xl space-y-5 sm:space-y-0 lg:space-y-5 sm:space-x-3 lg:space-x-0">
  <ActiveBatch />
            <RecentNotification />
          </div>
          <Modal
            open={openDeleteModal}
            onClose={handleCloseDeleteModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="flex flex-col space-y-2">
                <h1 className="text-3xl">Are you sure?</h1>
                <p>You want to delete this course?</p>
                <div className="space-x-4 text-black">
                  <button
                    className="bg-red-400 text-white rounded-lg w-24 h-8 hover:bg-red-600 transition-all duration-150 "
                    onClick={handleCloseDeleteModal}
                  >
                    No
                  </button>
                  <button
                    className="bg-red-400 text-white rounded-lg w-24 h-8 hover:bg-red-600 transition-all duration-150 "
                    onClick={() => {
                      dispatch(
                        deleteCourse({ courseCode: courses[index].courseCode })
                      );
                      handleCloseDeleteModal();
                    }}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Main;
