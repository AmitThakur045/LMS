import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { getStudent, getAllStudent } from "../../../Redux/actions/adminActions";
import { GET_ADMIN, SET_ERRORS } from "../../../Redux/actionTypes";
import Spinner from "../../../Utils/Spinner";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CancelIcon from "@mui/icons-material/Cancel";
import Modal from "react-modal";

Modal.setAppElement("#root");

const SearchStudent = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [viewStudent, setViewStudent] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(getStudent({ email }));
  };

  const [openMenu, setOpenMenu] = useState(false);

  const students = useSelector((state) => state.admin.allStudent);
  const student = useSelector((state) => state.admin.student);

  //   const deleteadmin = () => {
  //     confirmAlert({
  //       customUI: ({ onClose }) => {
  //         return (
  //           <div className="custom-ui bg-gray-800 text-white h-48 flex flex-col justify-center w-96 px-10 py-4 rounded-md space-y-4">
  //             <h1 className="text-3xl">Are you sure?</h1>
  //             <p>You want to delete this admin?</p>
  //             <div className="space-x-4 text-black">
  //               <button
  //                 className="bg-white rounded-lg w-24 h-8 hover:scale-105 transition-all duration-150"
  //                 onClick={onClose}>
  //                 No
  //               </button>
  //               <button
  //                 className="bg-white rounded-lg w-24 h-8 hover:scale-105 transition-all duration-150"
  //                 onClick={() => {
  //                   dispatch(deleteAdmin({ email }, navigate));
  //                   onClose();
  //                 }}>
  //                 Yes
  //               </button>
  //             </div>
  //           </div>
  //         );
  //       },
  //     });
  //   };

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setEmail("");
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    if (
      Object.keys(students).length !== 0 ||
      Object.keys(students).length !== 0
    ) {
      setLoading(false);
      if (Object.keys(students).length !== 0) {
        setViewStudent(student);
      }
    }
  }, [students, student]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    dispatch(getAllStudent());
    // if (store.admin.adminUpdated) {
    //   dispatch(getAdmin({ email: admin.email }));
    // }
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);
  return (
    <div className="h-screen w-full bg-[#f1f2f6] flex">
      <Sidebar />
      <div className="flex-[0.85] flex flex-col">
        <Header />
        <Link to="/admin/student">
          <ArrowBackIcon className="mx-3 mt-3 cursor-pointer" />
        </Link>
        <div className="flex-[0.9] w-[95%] mx-auto bg-white mb-10 mt-5 shadow-lg rounded-lg flex flex-col overflow-hidden ">
          <h1 className="self-center mt-4 font-bold text-xl">View Student</h1>
          <div className="flex px-4 h-full space-x-4 py-4">
            {(loading || Object.keys(error).length !== 0) && (
              <div className="flex-[0.7] shadow-lg h-full px-2 py-2 overflow-hidden  pb-10">
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
                  {(error.noStudentError || error.backendError) && (
                    <p className="text-red-500 text-2xl font-bold">
                      {error.noStudentError || error.backendError}
                    </p>
                  )}
                </div>
              </div>
            )}
            {!loading &&
              Object.keys(error).length === 0 &&
              Object.keys(viewStudent).length === 0 &&
              students?.length !== 0 && (
                <div className="flex-[0.7] shadow-lg h-full px-2 py-2 overflow-x-hidden overflow-y-auto pb-10">
                  <div className="grid grid-cols-9">
                    <h1 className="col-span-1 font-bold py-2 px-2">Sr no.</h1>
                    <h1 className="col-span-3 font-bold py-2 px-2">Name</h1>
                    <h1 className="col-span-2 font-bold py-2 px-2">Email</h1>
                    <h1 className="col-span-2 font-bold py-2 px-2">
                      Current Active Batch
                    </h1>
                  </div>
                  {students?.map((student, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-9 hover:font-semibold duration-200 transition-all cursor-pointer z-[0]"
                    >
                      <h1
                        onClick={() => setViewStudent(student)}
                        className="col-span-1 py-2 px-2"
                      >
                        {idx + 1}
                      </h1>
                      <h1
                        onClick={() => setViewStudent(student)}
                        className="col-span-3 py-2 px-2"
                      >
                        {student.firstName} {student.lastName}
                      </h1>
                      <h1
                        onClick={() => setViewStudent(student)}
                        className="col-span-2 py-2 px-2"
                      >
                        {student.email}
                      </h1>
                      <h1
                        onClick={() => setViewStudent(student)}
                        className="col-span-2 py-2 px-2"
                      >
                        {student.currentActiveBatch}
                      </h1>
                      <div>
                        <button onClick={() => setOpenMenu(true)}>
                          <MoreVertIcon />
                        </button>
                        <Modal
                          isOpen={openMenu}
                          onRequestClose={() => setOpenMenu(false)}
                          style={{
                            overlay: {
                              position: "fixed",
                              zIndex: 1020,
                              top: 0,
                              left: 0,
                              width: "100vw",
                              height: "100vh",
                              background: "rgba(255, 255, 255, 0.75)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            },
                            content: {
                              background: "white",
                              width: "15rem",
                              maxWidth: "calc(100vw - 2rem)",
                              maxHeight: "calc(100vh - 2rem)",
                              overflowY: "auto",
                              position: "relative",
                              border: "1px solid #ccc",
                              borderRadius: "0.3rem",
                            },
                          }}
                        >
                          <div className="flex flex-row-reverse">
                            <button
                              onClick={() => setOpenMenu(false)}
                            >
                              <CancelIcon />
                            </button>
                          </div>
                          <div className="flex space-x-8">
                            <button className="text-2xl text-cyan-800">
                              Update
                            </button>
                            <button className="text-2xl text-cyan-800">
                              Delete
                            </button>
                          </div>
                        </Modal>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            {Object.keys(viewStudent).length !== 0 && (
              <div className="flex-[0.7] shadow-lg h-full px-2 py-2 overflow-x-hidden overflow-y-auto pb-10">
                <form
                  className="flex mx-6 py-3 space-x-10"
                  onSubmit={handleSubmit}
                >
                  <div className="flex  flex-col space-y-8">
                    <div className="flex space-x-5">
                      <div className="space-y-1">
                        <p className="text-sm text-[#7e7e7e]">First Name</p>
                        <input
                          disabled
                          className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                          type="text"
                          value={viewStudent.firstName}
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-[#7e7e7e]">Last Name</p>
                        <input
                          disabled
                          className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                          type="text"
                          value={viewStudent.lastName}
                        />
                      </div>
                    </div>
                    <div className="flex space-x-5"></div>
                    <div className="flex space-x-5">
                      <div className="space-y-1">
                        <p className="text-sm text-[#7e7e7e]">Email</p>
                        <input
                          disabled
                          className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                          type="email"
                          value={viewStudent.email}
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-[#7e7e7e]">DOB</p>
                        <input
                          disabled
                          className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                          type="date"
                          value={viewStudent.dob}
                        />
                      </div>
                    </div>
                    <div className="flex space-x-5">
                      <div className="space-y-1">
                        <p className="text-sm text-[#7e7e7e]">Contact Number</p>
                        <input
                          disabled
                          className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                          type="number"
                          value={viewStudent.contactNumber}
                        />
                      </div>
                    </div>

                    <div className="flex-col space-y-5">
                      <div className="space-y-1">
                        <p className="text-sm text-[#7e7e7e]">Performance</p>
                        <input
                          disabled
                          className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                          type="text"
                          value={viewStudent.performance}
                        />
                      </div>
                      <div className="flex space-x-5">
                        <div className="space-y-1">
                          <p className="text-sm text-[#7e7e7e]">
                            Current Active Batch
                          </p>
                          <input
                            disabled
                            className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                            type="text"
                            value={viewStudent.currentActiveBatch}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-[#7e7e7e]">Profile Picture</p>
                    <img
                      src={viewStudent.avatar}
                      className="w-[10rem] h-[10rem] object-cover"
                      alt=""
                    />
                  </div>
                </form>
              </div>
            )}
            <div className="flex-[0.3] border-2 shadow-lg h-fit">
              <form
                onSubmit={handleSubmit}
                className="flex w-4/6 mx-auto my-6 flex-col space-y-8"
              >
                <div className="space-y-1 self-center">
                  <p className="text-sm text-[#7e7e7e]">Email</p>
                  <input
                    required
                    className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                    type="text"
                    value={
                      Object.keys(viewStudent).length !== 0
                        ? viewStudent.email
                        : email
                    }
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex space-x-5">
                  <button
                    type="submit"
                    className="bg-[#ed6e9e] text-white h-10 flex-[0.5] hover:scale-105 transition-all duration-150"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    className="bg-[#25642b] text-white h-10 flex-[0.5] hover:scale-105 transition-all duration-150"
                    onClick={() => {
                      setEmail("");
                      setError({});
                      setViewStudent("");
                    }}
                  >
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
            </div>
          </div>
          {Object.keys(students).length !== 0 ? (
            <div className=""></div>
          ) : (
            <div className=""></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchStudent;
