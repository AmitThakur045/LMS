import React, { useEffect, useState } from "react";
import Spinner from "../../../Utils/Spinner";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Sidebar from "../Sidebar";
import { ADD_ADMIN, SET_ERRORS } from "../../../Redux/actionTypes";
import { addAdmin } from "../../../Redux/actions/adminActions";
import { Link } from "react-router-dom";

const AddCourse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [lesson, setLesson] = useState([{ lessonNumber: 1, lessonName: "" }]);
  const [section, setSection] = useState([{ sectionNumber: 1, lesson: [] }]);
  const [value, setValue] = useState({
    courseName: "",
    courseCode: "",
    description: "",
    totalLectures: "",
    difficulty: "",
    section: section,
  });

  const handleFormChange = (index, event) => {
    let data = [...lesson];
    data[index][event.target.name] = event.target.value;
    setLesson(data);
  };

  //   useEffect(() => {
  //     if (Object.keys(store.errors).length !== 0) {
  //       setError(store.errors);
  //       setValue({ ...value, email: "" });
  //     }
  //   }, [store.errors]);

  //   useEffect(() => {
  //     if (store.errors || store.admin.adminAdded) {
  //       setLoading(false);
  //       if (store.admin.adminAdded) {
  //         setValue({
  //           firstName: "",
  //           lastName: "",
  //           dob: "",
  //           email: "",
  //           contactNumber: "",
  //           avatar: "",
  //         });
  //         dispatch({ type: SET_ERRORS, payload: {} });
  //         dispatch({ type: ADD_ADMIN, payload: false });
  //       }
  //     } else {
  //       setLoading(true);
  //     }
  //   }, [store.errors, store.admin.adminAdded]);

  const addSection = (sectionId) => {
    let sec = { sectionNumber: sectionId, lesson: [Array.from(lesson)] };
    setSection([...section, sec]);
    setLesson([{ lessonNumber: 1, lessonName: "" }]);
    console.log(section);
  };
  const addLesson = (lessonId) => {
    let newLesson = { lessonNumber: lessonId, lessonName: "" };
    setLesson([...lesson, newLesson]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    // dispatch(addAdmin(value));
  };

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="h-screen w-full bg-[#f1f2f6] flex overflow-hidden">
      <Sidebar />
      <div className="flex-[0.85] flex flex-col">
        <Header />
        <Link to="/admin/course">
          <ArrowBackIcon className="mx-3 mt-3 cursor-pointer" />
        </Link>
        <div className="flex-[0.9] w-[50%] mx-auto bg-white mb-10 mt-5 shadow-lg rounded-lg flex flex-col overflow-y-auto">
          <h1 className="self-center mt-4 font-bold text-xl">Add Course</h1>
          <form
            className="flex w-4/6 mx-auto my-6 flex-col space-y-8 "
            onSubmit={handleSubmit}>
            <div className="flex space-x-5">
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">Course Name</p>
                <input
                  required
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="text"
                  value={value.courseName}
                  onChange={(e) =>
                    setValue({ ...value, courseName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">Course Code</p>
                <input
                  required
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="text"
                  value={value.courseCode}
                  onChange={(e) =>
                    setValue({ ...value, courseCode: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex space-x-5">
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">Total Lectures</p>
                <input
                  required
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="number"
                  value={value.totalLectures}
                  onChange={(e) =>
                    setValue({ ...value, totalLectures: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">Difficulty</p>
                <input
                  required
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="text"
                  value={value.difficulty}
                  onChange={(e) =>
                    setValue({ ...value, difficulty: e.target.value })
                  }
                />
              </div>
            </div>
            {section.map((sectionData, sectionId) => (
              <div key={sectionId} className="flex flex-col">
                <p className="mb-3 font-bold">{`Section ${sectionId + 1}`}</p>
                <div className="space-y-1">
                  <p className="text-sm text-[#7e7e7e]">Section Number</p>
                  <input
                    disabled
                    className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                    type="number"
                    value={sectionId + 1}
                    onChange={(e) =>
                      setValue({ ...section, sectionNumber: sectionId + 1 })
                    }
                  />
                </div>
                {lesson.map((lessonData, lessonId) => (
                  <div
                    key={lessonId}
                    className="justify-self-end self-end space-y-5 mt-3">
                    <p className="font-semibold">{`Lesson ${lessonId + 1}`}</p>
                    <div className="space-y-1">
                      <p className="text-sm text-[#7e7e7e]">Lesson Number</p>
                      <input
                        disabled
                        className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                        type="number"
                        value={lessonId + 1}
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-[#7e7e7e]">Lesson Name</p>
                      <input
                        name="lessonName"
                        className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                        type="text"
                        value={lessonData.lessonName}
                        onChange={(event) => handleFormChange(lessonId, event)}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        addLesson(lessonId + 2);
                      }}
                      className="bg-[#7e748d] text-white w-24 h-8 text-sm rounded-md hover:scale-105 duration-150  transition-all">
                      Add Lesson
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    addSection(sectionId + 2);
                  }}
                  className="bg-[#bd7575] text-white w-32 h-10 rounded-md hover:scale-105 duration-150 transition-all">
                  Add Section
                </button>
              </div>
            ))}

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
                  setValue({
                    firstName: "",
                    lastName: "",
                    dob: "",
                    email: "",
                    contactNumber: "",
                    avatar: "",
                  });
                  setError({});
                }}>
                Clear
              </button>
            </div>
          </form>
          {loading && <Spinner message="Adding Admin" />}
          {error.emailError && (
            <p className="text-red-500 flex self-center">{error.emailError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
