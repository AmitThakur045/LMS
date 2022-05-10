import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { getCourse, deleteCourse } from "../../../Redux/actions/adminActions";
import { GET_COURSE, SET_ERRORS } from "../../../Redux/actionTypes";
import Spinner from "../../../Utils/Spinner";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Collapsible from "react-collapsible";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const SearchCourse = () => {
  const [courseCode, setCourseCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(getCourse({ courseCode }));
  };

  const course = useSelector((state) => state.admin.course);

  const deletecourse = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui bg-gray-800 text-white h-48 flex flex-col justify-center w-96 px-10 py-4 rounded-md space-y-4">
            <h1 className="text-3xl">Are you sure?</h1>
            <p>You want to delete this course?</p>
            <div className="space-x-4 text-black">
              <button
                className="bg-white rounded-lg w-24 h-8 hover:scale-105 transition-all duration-150"
                onClick={onClose}>
                No
              </button>
              <button
                className="bg-white rounded-lg w-24 h-8 hover:scale-105 transition-all duration-150"
                onClick={() => {
                  dispatch(deleteCourse({ courseCode }));
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
      setCourseCode("");
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    if (Object.keys(course).length !== 0) {
      setLoading(false);
    }
  }, [course]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    if (store.admin.courseUpdated) {
      dispatch(getCourse({ courseCode: course.courseCode }));
    }
  }, []);
  console.log(course);
  return (
    <div className="h-screen w-full bg-[#f1f2f6] flex">
      <Sidebar />
      <div className="flex-[0.85] flex flex-col">
        <Header />
        <Link to="/admin/course">
          <ArrowBackIcon className="mx-3 mt-3 cursor-pointer" />
        </Link>
        <div
          className={
            Object.keys(course).length === 0
              ? "flex-[0.9] w-[50%] mx-auto bg-white mb-10 mt-5 shadow-lg rounded-lg flex flex-col"
              : "flex-[0.9] w-[80%] mx-auto bg-white mb-10 mt-5 shadow-lg rounded-lg flex flex-col overflow-y-auto "
          }>
          <h1 className="self-center mt-4 font-bold text-xl">Search Course</h1>
          {Object.keys(course).length !== 0 ? (
            <form
              className="flex w-4/6 mx-auto my-6 flex-col space-y-8 "
              onSubmit={handleSubmit}>
              <div className="flex space-x-3">
                <div className="flex flex-col">
                  <div className="flex space-x-5">
                    <div className="space-y-1">
                      <p className="text-sm text-[#7e7e7e]">Course Name</p>
                      <input
                        disabled
                        className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                        type="text"
                        value={course.courseName}
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-[#7e7e7e]">Course Code</p>
                      <input
                        disabled
                        className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                        type="text"
                        value={course.courseCode}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-5">
                    <div className="space-y-1">
                      <p className="text-sm text-[#7e7e7e]">Total Lectures</p>
                      <input
                        disabled
                        className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                        type="number"
                        value={course.totalLectures}
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-[#7e7e7e]">Difficulty</p>
                      <input
                        disabled
                        className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                        type="text"
                        value={course.difficulty}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-[#7e7e7e]">Course Image</p>
                  <img src={course.courseImg} alt="Profile" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">Description</p>
                <textarea
                  disabled
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e] w-full h-20"
                  type="text"
                  value={course.description}
                />
              </div>
              {course.section?.map((sectionData, sectionIdx) => (
                <div key={sectionIdx} className="flex flex-col cursor-pointer ">
                  <div className="relative flex border-2">
                    <Collapsible
                      open={true}
                      className="flex-1 w-full flex flex-col z-[10] text-lg font-semibold px-4 py-4"
                      openedClassName="w-full flex-1 flex flex-col z-[10]  text-lg font-semibold px-4 py-4"
                      trigger={`Section ${sectionIdx + 1}`}>
                      <div className="">
                        <div className="flex space-x-3 mx-10 mt-3">
                          <div className="space-y-1">
                            <p className="text-sm text-[#7e7e7e]">
                              Section Name
                            </p>
                            <input
                              disabled
                              value={course.section[sectionIdx].sectionName}
                              type="text"
                              className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                            />
                          </div>
                        </div>
                        {sectionData?.lesson.map((lessonData, lessonIdx) => (
                          <div key={lessonIdx} className="">
                            <div className="flex flex-col cursor-pointer mx-10 px-3 py-2 border-2 mt-3">
                              <div className=" flex relative ">
                                <Collapsible
                                  className="flex-1 w-full flex flex-col z-[11] font-medium text-lg px-4 py-4"
                                  openedClassName="w-full flex-1 flex flex-col z-[11] font-medium text-lg px-4 py-4"
                                  trigger={`Lesson ${lessonIdx + 1}`}>
                                  <div className="space-y-3">
                                    <div className="flex space-x-3">
                                      <div className="space-y-1">
                                        <p className="text-sm text-[#7e7e7e]">
                                          Lesson Name
                                        </p>
                                        <input
                                          name="lessonName"
                                          disabled
                                          value={
                                            course.section[sectionIdx].lesson[
                                              lessonIdx
                                            ].lessonName
                                          }
                                          type="text"
                                          className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                                        />
                                      </div>
                                    </div>
                                    <div className="">
                                      <div className="space-y-1">
                                        <p className="text-sm text-[#7e7e7e]">
                                          Lesson Description
                                        </p>
                                        <textarea
                                          name="lessonDescription"
                                          disabled
                                          value={
                                            course.section[sectionIdx].lesson[
                                              lessonIdx
                                            ].lessonDescription
                                          }
                                          type="text"
                                          className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e] h-[5rem] w-[30re w-5/6"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </Collapsible>
                                <ArrowDropDownIcon className="absolute right-[0rem] top-[1rem] z-[0]" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Collapsible>
                    <ArrowDropDownIcon className="absolute right-[1rem] top-[1rem] z-[0]" />
                  </div>
                </div>
              ))}
              <div className="flex space-x-5">
                <button
                  type="button"
                  onClick={() =>
                    navigate("/admin/course/searchcourse/updatecourse")
                  }
                  className="bg-[#3a1b97] text-white h-10 flex-[0.5] hover:scale-105 transition-all duration-150">
                  Update
                </button>
                <button
                  type="button"
                  onClick={deletecourse}
                  className="bg-[#b00303] text-white h-10 flex-[0.5] hover:scale-105 transition-all duration-150">
                  Delete
                </button>
              </div>
              <button
                type="button"
                onClick={() => dispatch({ type: GET_COURSE, payload: {} })}
                className="bg-[#893838] text-white h-10 w-32 self-center rounded-md hover:scale-105 transition-all duration-150">
                Check Another
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-4/6 mx-auto my-6 flex-col space-y-8">
              <div className="space-y-1 self-center">
                <p className="text-sm text-[#7e7e7e]">Course Code</p>
                <input
                  required
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="text"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
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
                    setCourseCode("");
                    setError({});
                  }}>
                  Clear
                </button>
              </div>
              {loading && <Spinner message="Searching Course" />}

              {error.noCourseError && (
                <p className="text-red-500 flex self-center">
                  {error.noCourseError}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchCourse;
