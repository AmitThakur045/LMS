import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CourseList from "./CourseList";

import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { SET_ERRORS } from "../../../../../Redux/actionTypes";
import {
  getBatch,
  getCourses,
  getStudents,
} from "../../../../../Redux/actions/adminActions";
import Spinner from "../../../../../Utils/Spinner";
import Loader from "../../../../../Utils/Loader";
import { Avatar } from "@mui/material";

const Main = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [courseList, setCourseList] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [currentCourseCode, setCurrentCourseCode] = useState("");

  const store = useSelector((state) => state);
  const courseData = JSON.parse(localStorage.getItem("courses"));
  const batchData = useSelector((store) => store.admin.batch);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setIsLoading(false);
    }
  }, [store.errors]);
  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);
  useEffect(() => {
    if (store.admin.assignmentAdded) {
      dispatch(getBatch({ batchCode: batchData.batchCode }));
    }
  }, [store.admin.assignmentAdded]);

  useEffect(() => {
    if (Object.keys(batchData).length !== 0) {
      setIsLoading(false);
      setCurrentCourseCode(batchData.courses[0].courseCode);
      dispatch(getStudents({ emails: batchData.students }));
      setCurrentList(batchData.courses[0].assignment);
    }
  }, [batchData]);

  const handleClick = (item) => {
    setCurrentCourseCode(item.courseCode);

    setCurrentList(item.assignment);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader isLoading={isLoading} />
        </div>
      ) : (
        <div className="flex h-full w-full">
          <div className="lg:w-[18rem] w-[15rem] h-full overflow-y-auto">
            <div className="pt-2 w-full">
              {loading && <Spinner message={"Loading..."} />}
              {!loading &&
                Object.keys(batchData).length !== 0 &&
                batchData.courses.map((item, index) => (
                  <div
                    key={index}
                    className={
                      currentCourseCode === item.courseCode
                        ? "bg-slate-200 w-full shadow-xl font-semibold transition-all duration-100"
                        : ""
                    }>
                    <ListItem
                      button
                      key={index}
                      onClick={() => handleClick(item)}>
                      <ListItemIcon>
                        <Avatar
                          className="w-[20px] h-[20px] rounded-full"
                          src={
                            courseData.find(
                              (course) => course.courseCode === item.courseCode
                            )?.courseImg
                          }
                          alt={item.courseCode}
                        />
                      </ListItemIcon>

                      <div className="py-1 w-full">{item.courseName}</div>
                    </ListItem>
                    <Divider />
                  </div>
                ))}
            </div>
          </div>

          <CourseList
            currentList={currentList}
            courseCode={currentCourseCode}
          />
        </div>
      )}
    </>
  );
};

export default Main;
