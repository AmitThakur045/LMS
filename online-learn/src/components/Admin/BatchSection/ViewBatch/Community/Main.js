import React, { useEffect, useState } from "react";
import { MdForum, MdArrowDropDown, MdArrowRight } from "react-icons/md";

import { RiAddFill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import Loader from "../../../../../Utils/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  addProblemCategory,
  deleteProblemCategory,
  getProblemCategories,
  getThreads,
} from "../../../../../Redux/actions/studentActions";

import SingleThread from "./SingleThread";
import {
  ADD_PROBLEM_CATEGORY,
  DELETE_PROBLEM_CATEGORY,
} from "../../../../../Redux/actionTypes";
const forums = ["Let's talk career", "Tech Verse"];
const Main = () => {
  const store = useSelector((state) => state);
  const [batchCode, setBatchCode] = useState(
    JSON.parse(localStorage.getItem("batchCode"))
  );
  const [openLounge, setOpenLounge] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const [thread, setThread] = useState([]);
  const [problemCategory, setProblemCategory] = useState([]);
  const [forumData, setForumData] = useState(forums);
  const [forum, setForum] = useState("");
  const allThreads = useSelector((state) => state.student.threads);
  const allCategories = useSelector((state) => state.student.problemCategories);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      if (store.errors.noCategoryError) {
        setProblemCategory([]);
      }
      setError(store.errors);
      setIsLoading(false);
    }
  }, [store.errors]);

  const addOption = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      addProblemCategory({
        category: forum,
        communityType: "Batch",
        batchCode: batchCode,
      })
    );
  };

  const deleteOption = (category) => {
    dispatch(
      deleteProblemCategory({
        category: category,
        communityType: "Batch",
        batchCode: batchCode,
      })
    );
  };

  useEffect(() => {
    if (allThreads.length !== 0) {
      if (allCategories.length !== 0) {
        setIsLoading(false);
      }
      setThread(allThreads);
    }
  }, [allThreads]);

  useEffect(() => {
    if (allCategories.length !== 0) {
      if (allThreads.length !== 0) {
        setIsLoading(false);
      }
      setProblemCategory(allCategories);
    }
  }, [allCategories]);

  useEffect(() => {
    if (store.student.problemCategoryAdded) {
      setLoading(false);
      setForum("");
      dispatch(
        getProblemCategories({ communityType: "Batch", batchCode: batchCode })
      );
      dispatch({ type: ADD_PROBLEM_CATEGORY, payload: false });
    }
  }, [store.student.problemCategoryAdded]);
  useEffect(() => {
    if (store.student.problemCategoryDeleted) {
      dispatch(
        getProblemCategories({ communityType: "Batch", batchCode: batchCode })
      );
      dispatch({ type: DELETE_PROBLEM_CATEGORY, payload: false });
    }
  }, [store.student.problemCategoryDeleted]);

  useEffect(() => {
    dispatch(getThreads({ communityType: "Batch", batchCode: batchCode }));
    dispatch(
      getProblemCategories({ communityType: "Batch", batchCode: batchCode })
    );
  }, []);


  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-full ">
          <Loader isLoading={isLoading} />
        </div>
      ) : (
        <div className="mt-4 flex lg:flex-row flex-col-reverse pb-12 lg:px-12 px-2 h-[79vh] lg:space-x-6 overflow-y-scroll  overflow-x-hidden">
          <div className="lg:flex-[0.7] flex flex-col space-y-5">
            {thread.map((problem, index) => (
              <SingleThread problem={problem} index={index} />
            ))}
            {error.noCommunityError && (
              <p className="text-[20px] font-bold text-red-500 self-center">
                {error.noCommunityError}
              </p>
            )}
          </div>
          <div className="lg:flex-[0.3] rounded-lg shadow-md shadow-gray-400 px-5 py-4 pb-5 space-y-4 h-fit min-h-[10rem]">
            <div className="flex space-x-3 items-center ">
              <MdForum size={40} />
              <h1 className="font-bold text-[25px]">Forums</h1>
            </div>
            <div className="flex items-center space-x-3">
              {openLounge ? (
                <MdArrowDropDown
                  className="bg-gray-300 cursor-pointer"
                  onClick={() => setOpenLounge(!openLounge)}
                />
              ) : (
                <MdArrowRight
                  className="bg-gray-300 cursor-pointer"
                  onClick={() => setOpenLounge(!openLounge)}
                />
              )}
              <h1 className="text-gray-600">Lounge - {batchCode}</h1>
            </div>
            <div
              className={` ${
                openLounge ? "flex" : "hidden"
              } flex-col space-y-3`}>
              {problemCategory.map((data, idx) => (
                <div className="flex space-x-3 items-center">
                  {data.category !== "General" && (
                    <button onClick={() => deleteOption(data.category)}>
                      <AiFillDelete className="cursor-pointer text-gray-500 hover:text-gray-800 duration-150 transition-all" />
                    </button>
                  )}
                  <h1
                    key={idx}
                    className="ml-7 bg-gray-200 w-[10rem] truncate py-1 px-2 rounded-md">
                    {data.category}
                  </h1>
                </div>
              ))}
              <form
                onSubmit={(e) => addOption(e)}
                className="flex space-x-3 items-center">
                <button
                  disabled={loading}
                  onClick={(e) => addOption(e)}
                  type="button">
                  <RiAddFill className="cursor-pointer text-gray-500 hover:text-gray-800 duration-150 transition-all" />
                </button>

                <input
                  required
                  placeholder="Add New"
                  type="text"
                  value={forum}
                  onChange={(e) => setForum(e.target.value)}
                  className="ml-7 bg-gray-200 w-[10rem]  py-1 px-2 rounded-md outline-none"
                />
                {loading && <p className="text-blue-400">Adding Category...</p>}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
