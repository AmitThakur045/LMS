import React, { useEffect, useState } from "react";
import ActiveBatch from "../ActiveBatch";
import RecentNotification from "../RecentNotification";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_ADMIN,
  GET_ADMIN,
  SET_ERRORS,
} from "../../../Redux/actionTypes";
import {
  deleteAdmin,
  getAllAdmin,
  getAdminsByOrganizationName,
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
  const [admins, setAdmins] = useState([]);
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
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const allAdmins = useSelector((state) => state.admin.allAdmin);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setIsLoading(false);

      if (store.errors.adminError) {
        alert(store.errors.adminError);
      }
    }
  }, [store.errors]);

  useEffect(() => {
    if (allAdmins.length !== 0) {
      setAdmins(allAdmins);

      setIsLoading(false);
    }
  }, [allAdmins]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    if (user.result.sub === "true") {
      dispatch(
        getAdminsByOrganizationName({
          organizationName: user.result.organizationName,
        })
      );
    } else {
      dispatch(getAllAdmin());
    }
  }, []);

  useEffect(() => {
    if (store.admin.adminDeleted) {
      dispatch(getAllAdmin());
      dispatch({ type: DELETE_ADMIN, payload: false });
    }
  }, [store.admin.adminDeleted]);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    result = allAdmins.filter((data) => {
      return data.email.search(value) !== -1;
    });
    setAdmins(result);
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
                  placeholder="Quick Search Email"
                  className="bg-[#ffffff] placeholder:text-[#A5A4A6]  placeholder:text-[12px] flex w-full outline-none "
                  type="text"
                />
              </div>
              <div className="sm:w-[30%] w-full flex justify-end">
                {user.result.sub === "false" && (
                  <Link
                    to="/admin/admin/addadmin"
                    type="button"
                    className="bg-secondary hover:bg-secondaryHover transition-all duration-150 sm:rounded-3xl sm:w-[10rem] w-full h-[2rem] flex items-center space-x-3 text-white justify-center"
                  >
                    <IoIosAddCircleOutline fontSize={20} />
                    <h1>Add Admin</h1>
                  </Link>
                )}
              </div>
            </div>
            {error.noAdminError && (
              <div className="flex flex-col mt-10">
                <div className="flex items-center justify-center mt-5">
                  {error.noAdminError && (
                    <p className="text-red-500 text-2xl font-bold">
                      {error.noAdminError}
                    </p>
                  )}
                </div>
              </div>
            )}
            {!error.noAdminError && admins.length !== 0 && (
              <div className="flex flex-wrap justify-between text-[#ffffff] w-full overflow-y-auto">
                {admins.map((ad, idx) => (
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
                          <>
                            <MenuItem
                              onClick={() => {
                                dispatch({
                                  type: GET_ADMIN,
                                  payload: admins[index],
                                });
                                navigate("/admin/admin/updateadmin");
                              }}
                            >
                              Update Admin
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                handleOpenDeleteModal();
                                handleClose();
                              }}
                            >
                              Delete Admin
                            </MenuItem>
                          </>
                        ) : (
                          <>
                            {ad.email === user.result.email ? (
                              <MenuItem
                                onClick={() => {
                                  dispatch({
                                    type: GET_ADMIN,
                                    payload: admins[index],
                                  });
                                  navigate("/admin/admin/updateadmin");
                                }}
                              >
                                Update Admin
                              </MenuItem>
                            ) : (
                              <MenuItem
                                onClick={() => {
                                  setShowSubAdminModal(true);
                                  handleClose();
                                }}
                              >
                                Update Admin
                              </MenuItem>
                            )}
                            <MenuItem
                              onClick={() => {
                                setShowSubAdminModal(true);
                                handleClose();
                              }}
                            >
                              Delete Admin
                            </MenuItem>
                          </>
                        )}
                      </Menu>
                    </div>
                    <div
                      className="w-full h-[6rem] py-3 flex justify-center items-center mt-1"
                      onClick={() => {
                        navigate("/admin/admin/viewadmin");
                        dispatch({ type: GET_ADMIN, payload: ad });
                      }}
                    >
                      <Avatar
                        sx={{ height: 60, width: 60, bgcolor: "#f48320" }}
                        alt=""
                      >
                        <p className="text-[25px]">
                          {ad.firstName.slice(0, 1)}
                        </p>
                      </Avatar>
                    </div>
                    <div
                      className="flex flex-col pt-2 space-y-3"
                      onClick={() => {
                        navigate("/admin/admin/viewadmin");
                        dispatch({ type: GET_ADMIN, payload: ad });
                      }}
                    >
                      <div className="flex flex-col w-full justify-center">
                        <div className="flex w-full justify-center text-[0.9rem] font-semibold">
                          {ad.firstName} {ad.lastName}
                        </div>
                        <div className="flex w-full justify-center text-[0.75rem] text-gray-200">
                          {ad.email}
                        </div>
                      </div>
                      <div className="flex flex-col w-full justify-center">
                        <div className="flex w-full justify-center text-[0.75rem] font-semibold">
                          ORGANISATION NAME
                        </div>
                        <div className="flex w-full justify-center text-[0.75rem] text-gray-200">
                          {ad.sub === "false"
                            ? `Super Admin`
                            : ad.organizationName}
                        </div>
                      </div>
                      <div className="flex w-full items-end text-[0.75rem]">
                        <div className="flex w-[50%] justify-start">Sub</div>
                        <div className="flex w-[50%] justify-end">
                          {ad.sub === "false" ? `No` : `Yes`}
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
                <p>You want to delete this admin?</p>
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
                      dispatch(deleteAdmin({ email: admins[index].email }));
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
