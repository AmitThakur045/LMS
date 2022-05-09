import React, { useEffect, useState } from "react";
import Spinner from "../../../Utils/Spinner";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Sidebar from "../Sidebar";
import { ADD_COURSE, SET_ERRORS } from "../../../Redux/actionTypes";
import { addCourse } from "../../../Redux/actions/adminActions";
import { Link } from "react-router-dom";
import Collapsible from "react-collapsible";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const AddCourse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  let lessonCount = 1;
  let sectionCount = 1;

  const [section, setSection] = useState([
    {
      sectionNumber: 1,
      sectionName: "",
      sectionAdded: false,
      lesson: [
        {
          lessonNumber: 1,
          lessonName: "",
          lessonDescription: "",
          lessonAdded: false,
        },
      ],
    },
  ]);
  const [value, setValue] = useState({
    courseName: "",
    courseCode: "",
    description: "",
    totalLectures: "",
    difficulty: "",
    section: [],
    courseImg: "",
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({
        courseName: "",
        courseCode: "",
        description: "",
        totalLectures: "",
        difficulty: "",
        section: [],
      });
      setSection({
        sectionNumber: 1,
        sectionName: "",
        sectionAdded: false,
        lesson: [
          {
            lessonNumber: 1,
            lessonName: "",
            lessonDescription: "",
            lessonAdded: false,
          },
        ],
      });
    }
  }, [store.errors]);

  useEffect(() => {
    if (store.errors || store.admin.courseAdded) {
      setLoading(false);
      if (store.admin.courseAdded) {
        setValue({
          courseName: "",
          courseCode: "",
          description: "",
          totalLectures: "",
          difficulty: "",
          section: [],
        });
        setSection([
          {
            sectionNumber: 1,
            sectionName: "",
            sectionAdded: false,
            lesson: [
              {
                lessonNumber: 1,
                lessonName: "",
                lessonDescription: "",
                lessonAdded: false,
              },
            ],
          },
        ]);
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_COURSE, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.courseAdded]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError({});
    setLoading(true);
    console.log(value);
    dispatch(addCourse(value));
  };

  const clearForm = (e) => {
    e.preventDefault();
    setValue({
      courseName: "",
      courseCode: "",
      description: "",
      totalLectures: "",
      difficulty: "",
      section: [],
    });
    setSection([
      {
        sectionNumber: 1,
        sectionName: "",
        sectionAdded: false,
        lesson: [
          {
            lessonNumber: 1,
            lessonName: "",
            lessonDescription: "",
            lessonAdded: false,
          },
        ],
      },
    ]);
  };

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  const handleFormChange = (sectionIdx, lessonIdx, event) => {
    let data = [...section];
    data[sectionIdx].lesson[lessonIdx][event.target.name] = event.target.value;
    setSection(data);
  };

  const addNewSection = (sectionIdx) => {
    let newSection = {
      sectionName: "",
      sectionNumber: ++sectionCount,
      sectionAdded: false,
      lesson: [
        {
          lessonNumber: 1,
          lessonName: "",
          lessonDescription: "",
          lessonAdded: false,
        },
      ],
    };
    let temp = [...section];
    temp.push(newSection);
    setSection(temp);
    lessonCount = 1;
  };

  const addNewLesson = (sectionIdx) => {
    let newLesson = {
      lessonNumber: ++lessonCount,
      lessonName: "",
      lessonDescription: "",
      lessonAdded: false,
    };
    let temp = [...section];
    temp[sectionIdx].lesson.push(newLesson);
    setSection(temp);
  };

  const sectionToggler = (sectionIdx) => {
    const data = [...section];
    data[sectionIdx].sectionAdded = true;
    setSection(data);
  };
  const lessonToggler = (sectionIdx, lessonIdx) => {
    const data = [...section];
    data[sectionIdx].lesson[lessonIdx].lessonAdded = true;
    setSection(data);
  };

  return (
    <div className="h-screen w-full bg-[#f1f2f6] flex overflow-hidden">
      <Sidebar />
      <div className="flex-[0.85] flex flex-col">
        <Header />
        <Link to="/admin/course">
          <ArrowBackIcon className="mx-3 mt-3 cursor-pointer" />
        </Link>
        <div className="flex-[0.9] w-[80%] mx-auto bg-white mb-10 mt-5 shadow-lg rounded-lg flex flex-col overflow-y-auto">
          <h1 className="self-center mt-4 font-bold text-xl">Add Course</h1>
          <form
            className="flex w-4/6 mx-auto my-6 flex-col space-y-8 "
            onSubmit={handleSubmit}>
            <div className="flex space-x-3">
              <div className="flex flex-col">
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
              </div>
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">Course Image</p>
                {value.courseImg === "" ? (
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setValue({ ...value, courseImg: base64 })
                    }
                  />
                ) : (
                  <img src={value.courseImg} alt="Profile" />
                )}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-[#7e7e7e]">Description</p>
              <textarea
                required
                className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e] w-full h-20"
                type="text"
                value={value.description}
                onChange={(e) =>
                  setValue({ ...value, description: e.target.value })
                }
              />
            </div>
            {section?.map((sectionData, sectionIdx) => (
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
                          <p className="text-sm text-[#7e7e7e]">Section Name</p>
                          <input
                            disabled={
                              section[sectionIdx].sectionAdded ? true : false
                            }
                            value={section[sectionIdx].sectionName}
                            type="text"
                            className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                            onChange={(e) => {
                              let data = [...section];
                              data[sectionIdx].sectionName = e.target.value;
                              setSection(data);
                            }}
                          />
                        </div>
                      </div>
                      {sectionData?.lesson.map((lessonData, lessonIdx) => (
                        <div key={lessonIdx} className="">
                          <div className="flex flex-col cursor-pointer mx-10 px-3 py-2 border-2 mt-3">
                            <div className=" flex relative ">
                              <Collapsible
                                open={true}
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
                                        disabled={
                                          section[sectionIdx].lesson[lessonIdx]
                                            .lessonAdded
                                            ? true
                                            : false
                                        }
                                        value={
                                          section[sectionIdx].lesson[lessonIdx]
                                            .lessonName
                                        }
                                        type="text"
                                        className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                                        onChange={(event) =>
                                          handleFormChange(
                                            sectionIdx,
                                            lessonIdx,
                                            event
                                          )
                                        }
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
                                        disabled={
                                          section[sectionIdx].lesson[lessonIdx]
                                            .lessonAdded
                                            ? true
                                            : false
                                        }
                                        value={
                                          section[sectionIdx].lesson[lessonIdx]
                                            .lessonDescription
                                        }
                                        type="text"
                                        className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e] h-[5rem] w-[30re w-5/6"
                                        onChange={(event) =>
                                          handleFormChange(
                                            sectionIdx,
                                            lessonIdx,
                                            event
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                  {section[sectionIdx].lesson[lessonIdx]
                                    .lessonAdded ? (
                                    <button
                                      disabled
                                      className="bg-green-600 text-white px-3 py-1 rounded-md ">
                                      Lesson Added
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        lessonToggler(sectionIdx, lessonIdx)
                                      }
                                      className="bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all duration-150">
                                      Add Lesson
                                    </button>
                                  )}
                                </div>
                              </Collapsible>
                              <ArrowDropDownIcon className="absolute right-[0rem] top-[1rem] z-[0]" />
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="px-10">
                        <button
                          type="button"
                          className="flex w-full self-center space-x-3 mb-4 bg-gray-800 hover:bg-black transition-all duration-150 text-white  items-center justify-center h-10 rounded-md"
                          disabled={
                            section[sectionIdx].sectionAdded ? true : false
                          }
                          onClick={() => {
                            addNewLesson(sectionIdx);
                          }}>
                          <h1 className="text-base">Lessons</h1>
                          <AddIcon className=" " />
                        </button>
                      </div>
                    </div>
                  </Collapsible>
                  <ArrowDropDownIcon className="absolute right-[1rem] top-[1rem] z-[0]" />
                </div>
                {section[sectionIdx].sectionAdded ? (
                  <button
                    disabled
                    className="bg-green-600 text-white px-3 py-1 rounded-md ">
                    Section Added
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      sectionToggler(sectionIdx);
                      setValue({ ...value, section: [...section] });
                    }}
                    className="bg-blue-400 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-all duration-150">
                    Add Section
                  </button>
                )}
              </div>
            ))}
            <div
              className="flex space-x-3 bg-gray-800 hover:bg-black transition-all duration-150 text-white  items-center justify-center h-10 rounded-md cursor-pointer"
              onClick={() => {
                addNewSection(sectionCount - 1);
              }}>
              <h1 className="text-base">Sections</h1>
              <AddIcon className=" right-0 top-0 z-[0]" />
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
                onClick={clearForm}>
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
