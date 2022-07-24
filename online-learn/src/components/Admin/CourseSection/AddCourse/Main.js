import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RiAddLine } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  ADD_COURSE,
  SET_ERRORS,
  GET_PRESIGNED_URL,
} from "../../../../Redux/actionTypes";
import {
  addCourse,
  getAllCourse,
} from "../../../../Redux/actions/adminActions";
import { getPresignedUrl } from "../../../../Redux/actions/awsActions";

import ActiveBatch from "../../ActiveBatch";
import RecentNotification from "../../RecentNotification";
import { MdOutlineFileUpload } from "react-icons/md";
import { Button, TextField } from "@mui/material";
import Spinner from "../../../../Utils/Spinner";
import Collapsible from "react-collapsible";

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const s3PresignedUrl = store.aws.presignedUrl;
  let lessonCount = 1;
  let sectionCount = 1;

  const [image, setImage] = useState({});
  const [avatar, setAvatar] = useState("");
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
      // setValue({
      //   courseName: "",
      //   courseCode: "",
      //   description: "",
      //   totalLectures: "",
      //   difficulty: "",
      //   section: [],
      //   courseImg: "",
      // });
      // setSection({
      //   sectionNumber: 1,
      //   sectionName: "",
      //   sectionAdded: false,
      //   lesson: [
      //     {
      //       lessonNumber: 1,
      //       lessonName: "",
      //       lessonDescription: "",
      //       lessonAdded: false,
      //     },
      //   ],
      // });
      setValue({ ...value, courseCode: "" });
    }
  }, [store.errors]);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0 || store.admin.courseAdded) {
      dispatch(getAllCourse());
      setLoading(false);
      if (store.admin.courseAdded) {
        setValue({
          courseName: "",
          courseCode: "",
          description: "",
          totalLectures: "",
          difficulty: "",
          section: [],
          courseImg: "",
        });
        setAvatar("");
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
    }
  }, [store.errors, store.admin.courseAdded]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);

    dispatch(getPresignedUrl({ fileType: "images", fileName: image.name }));
  };

  const clearForm = (e) => {
    e.preventDefault();
    setError({});

    setValue({
      courseName: "",
      courseCode: "",
      description: "",
      totalLectures: "",
      difficulty: "",
      section: [],
      courseImg: "",
    });
    setAvatar("");
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
            data.courseImg = imageUrl;

            dispatch(addCourse(data));
          })
          .catch((error) => {
            console.log(error);
          });
      }
      fetchApi();
      dispatch({ type: GET_PRESIGNED_URL, payload: "" });
    }
  }, [s3PresignedUrl]);

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

  return (
    <div className="flex flex-col lg:flex-row overflow-hidden space-x-5 lg:px-12 px-2 mb-5 ">
      <form
        onSubmit={handleSubmit}
        className="lg:w-[80%] w-full rounded-3xl bg-[#FAFBFF] lg:px-10 px-2 py-5 flex flex-col space-y-4 overflow-y-auto">
        <p className="text-[#8d91b1]">Add Course</p>
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
                    className="flex items-center justify-center flex-col space-y-3 w-full"
                    htmlFor="image">
                    <MdOutlineFileUpload
                      className="w-14 rounded-full h-14 bg-[#d8d8d8] cursor-pointer"
                      fontSize={35}
                    />
                    <p className="w-full text-center">Upload Course Image</p>
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
          <div className="flex flex-col xl:w-[60%] lg:w-[80%] w-full space-y-6">
            <div className="flex justify-between space-x-4 w-full">
              <TextField
                required
                type="text"
                id="outlined-basic"
                label="Course Code"
                variant="outlined"
                className="bg-white"
                value={value.courseCode}
                onChange={(e) =>
                  setValue({ ...value, courseCode: e.target.value })
                }
              />
              <TextField
                required
                type="text"
                id="outlined-basic"
                label="Course Name"
                variant="outlined"
                className="bg-white"
                value={value.courseName}
                onChange={(e) =>
                  setValue({ ...value, courseName: e.target.value })
                }
              />
            </div>
            <div className="flex justify-between space-x-4 w-full">
              <TextField
                required
                type="number"
                id="outlined-basic"
                label="Total Lectures"
                variant="outlined"
                className="bg-white"
                value={value.totalLectures}
                onChange={(e) =>
                  setValue({ ...value, totalLectures: e.target.value })
                }
              />
              <TextField
                required
                type="text"
                id="outlined-basic"
                label="Difficulty"
                variant="outlined"
                className="bg-white"
                value={value.difficulty}
                onChange={(e) =>
                  setValue({ ...value, difficulty: e.target.value })
                }
              />
            </div>
            <div className="flex">
              <TextField
                required
                type="text"
                id="outlined-multiline-flexible"
                multiline
                maxRows={6}
                label="Description"
                variant="outlined"
                className="bg-white w-full"
                value={value.description}
                onChange={(e) =>
                  setValue({ ...value, description: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        {section?.map((sectionData, sectionIdx) => (
          <div key={sectionIdx} className="flex flex-col cursor-pointer ">
            <div className=" flex border-2 border-gray-300">
              <Collapsible
                open={true}
                className="flex-1 w-full flex flex-col py-4"
                openedClassName="w-full flex-1 flex flex-col py-4"
                trigger={
                  <div className="flex justify-between items-center px-10 font-bold text-xl">
                    <h1>Section {sectionIdx + 1}</h1>
                    <MdKeyboardArrowDown />
                  </div>
                }>
                <div className="">
                  <div className="flex space-x-3 md:mx-10 mx-3 mt-3">
                    <div className="space-y-1 flex justify-between w-full">
                      <TextField
                        disabled={
                          section[sectionIdx].sectionAdded ? true : false
                        }
                        type="text"
                        id="outlined-basic"
                        label="Section Name"
                        variant="outlined"
                        className="bg-white"
                        value={section[sectionIdx].sectionName}
                        onChange={(e) => {
                          let data = [...section];
                          data[sectionIdx].sectionName = e.target.value;
                          setSection(data);
                        }}
                      />
                      {section[sectionIdx].sectionAdded ? (
                        <Button
                          size="medium"
                          className="h-[2rem] w-[10rem]"
                          disableElevation
                          variant="contained"
                          color="success">
                          Section Added
                        </Button>
                      ) : (
                        <Button
                          size="medium"
                          className="h-[2rem] w-[10rem]"
                          type="button"
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            sectionToggler(sectionIdx);
                            setValue({ ...value, section: [...section] });
                          }}>
                          Add Section
                        </Button>
                      )}
                    </div>
                  </div>
                  {sectionData?.lesson.map((lessonData, lessonIdx) => (
                    <div key={lessonIdx} className="">
                      <div className="flex flex-col cursor-pointer md:mx-10 mx-3 md:px-3 px-1 py-2 border-2 mt-3">
                        <div className=" flex  ">
                          <Collapsible
                            open={true}
                            className="flex-1 w-full flex flex-col py-4"
                            openedClassName="w-full flex-1 flex flex-col py-4"
                            trigger={
                              <div className="flex justify-between items-center md:px-6 px-2 font-semibold text-lg">
                                <h1>Lesson {lessonIdx + 1}</h1>
                                <MdKeyboardArrowDown />
                              </div>
                            }>
                            <div className="space-y-3 md:mx-6 mx-2 mt-3">
                              <div className="flex space-x-3">
                                <div className="space-y-1 flex justify-between w-full">
                                  <TextField
                                    disabled={
                                      section[sectionIdx].lesson[lessonIdx]
                                        .lessonAdded
                                        ? true
                                        : false
                                    }
                                    name="lessonName"
                                    type="text"
                                    id="outlined-basic"
                                    label="Lesson Name"
                                    variant="outlined"
                                    className="bg-white"
                                    value={
                                      section[sectionIdx].lesson[lessonIdx]
                                        .lessonName
                                    }
                                    onChange={(event) =>
                                      handleFormChange(
                                        sectionIdx,
                                        lessonIdx,
                                        event
                                      )
                                    }
                                  />
                                  {section[sectionIdx].lesson[lessonIdx]
                                    .lessonAdded ? (
                                    <Button
                                      size="medium"
                                      className="h-[2rem] w-[10rem]"
                                      disableElevation
                                      color="success"
                                      variant="contained">
                                      Lesson Added
                                    </Button>
                                  ) : (
                                    <Button
                                      size="medium"
                                      className="h-[2rem] w-[8rem]"
                                      type="button"
                                      color="primary"
                                      variant="contained"
                                      onClick={() =>
                                        lessonToggler(sectionIdx, lessonIdx)
                                      }>
                                      Add Lesson
                                    </Button>
                                  )}
                                </div>
                              </div>
                              <div className="">
                                <div className="space-y-1">
                                  <TextField
                                    disabled={
                                      section[sectionIdx].lesson[lessonIdx]
                                        .lessonAdded
                                        ? true
                                        : false
                                    }
                                    type="text"
                                    name="lessonDescription"
                                    id="outlined-multiline-flexible"
                                    multiline
                                    maxRows={6}
                                    label="Lesson Description"
                                    variant="outlined"
                                    className="bg-white w-full"
                                    value={
                                      section[sectionIdx].lesson[lessonIdx]
                                        .lessonDescription
                                    }
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
                            </div>
                          </Collapsible>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="px-10 mt-2">
                    <button
                      type="button"
                      className="flex w-full self-center space-x-3 mb-4 bg-gray-800 hover:bg-black transition-all duration-150 text-white  items-center justify-center h-10 rounded-md"
                      disabled={section[sectionIdx].sectionAdded ? true : false}
                      onClick={() => {
                        addNewLesson(sectionIdx);
                      }}>
                      <h1 className="text-base">Lessons</h1>
                      <RiAddLine className=" " />
                    </button>
                  </div>
                </div>
              </Collapsible>
            </div>
          </div>
        ))}
        <div className="w-full h-[10rem]">
          <button
            type="button"
            className="bg-gray-800 h-[2.5rem] rounded-md hover:bg-black transition-all duration-150 w-full text-white flex items-center justify-center  "
            onClick={() => {
              addNewSection(sectionCount - 1);
            }}>
            <h1 className="text-base">Sections</h1>
            <RiAddLine className="" />
          </button>
        </div>
        <div className="w-full h-[3rem] flex justify-end space-x-4">
          <button
            disabled={loading}
            type="submit"
            className="self-end bg-[#FB6C3A] h-[3rem] text-white w-[10rem] rounded-md text-[17px] hover:bg-[#e54e17] transition-all duration-150">
            Submit
          </button>
          <button
            type="button"
            onClick={clearForm}
            className="self-end bg-[#df1111] h-[3rem] text-white w-[10rem] rounded-md text-[17px] hover:bg-[#930000] transition-all duration-150">
            Clear
          </button>
        </div>
        {loading && <Spinner message="Adding Course" />}
        {error.courseCodeError && (
          <p className="text-red-500 flex self-center">
            {error.courseCodeError}
          </p>
        )}
      </form>

      <div className="bg-[#FAFBFF] lg:w-[20%] flex lg:flex-col flex-row lg:items-center items-start lg:pl-5 py-5 rounded-3xl lg:space-y-5 space-x-3 lg:space-x-0">
        <ActiveBatch />
        <RecentNotification />
      </div>
    </div>
  );
};

export default Main;
