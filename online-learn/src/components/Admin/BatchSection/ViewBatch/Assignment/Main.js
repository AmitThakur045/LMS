import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CourseList from "./CourseList";
import { sampleData } from "./Data";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { SET_ERRORS } from "../../../../../Redux/actionTypes";
import {
  getBatch,
  getCourses,
} from "../../../../../Redux/actions/adminActions";

const Main = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [courseList, setCourseList] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [currentCourseCode, setCurrentCourseCode] = useState("");

  const store = useSelector((state) => state);
  const courseData = JSON.parse(localStorage.getItem("courses"));
  const batchDataLocal = JSON.parse(localStorage.getItem("batch"));
  const batchData = useSelector((store) => store.admin.batch);
  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    dispatch(getBatch({ batchCode: batchDataLocal.batchCode }));
    setLoading(true);
  }, []);

  useEffect(() => {
    if (store.admin.assignmentAdded) {
      dispatch(getBatch({ batchCode: batchDataLocal.batchCode }));
    }
  }, [store.admin.assignmentAdded]);

  useEffect(() => {
    if (Object.keys(batchData).length !== 0) {
      setCurrentCourseCode(batchData.courses[0].courseCode);
      setCurrentList(batchData.courses[0].assignment);
    }
  }, [batchData]);

  const handleClick = (item) => {
    setCurrentCourseCode(item.courseCode);

    setCurrentList(item.assignment);
  };

  // useEffect(() => {
  //   handleClick(courseData[0].courseCode);
  // }, [store.admin.assignmentAdded])

  return (
    <div className="flex h-full">
      <div className="w-[18rem] h-full shadow-lg overflow-y-auto">
        <List>
          {batchData.courses?.map((item, index) => (
            <div>
              <ListItem button key={index} onClick={() => handleClick(item)}>
                <ListItemIcon>
                  <img
                    className="w-[20px] h-[20px] rounded-full"
                    src={
                      courseData.find(
                        (course) => course.courseCode === item.courseCode
                      ).courseImg
                    }
                    alt={item.courseCode}
                  />
                </ListItemIcon>
                <ListItemText primary={item.courseName} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
      {currentList.length !== 0 && (
        <CourseList currentList={currentList} courseCode={currentCourseCode} />
      )}
    </div>
  );
};

export default Main;
