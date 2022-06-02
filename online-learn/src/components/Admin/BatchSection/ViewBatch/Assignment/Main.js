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

const Main = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [courseList, setCourseList] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [currentCourseCode, setCurrentCourseCode] = useState("");

  const store = useSelector((state) => state);
  const courseData = JSON.parse(localStorage.getItem("courses"));

  // useEffect(() => {
  //   if (courseData.assignment.length !== 0) {
  //     setCurrentList(courseData.assignment);
  //   }
  // }, [courseData.assignment]);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    setLoading(true);
  }, []);

  return (
    <div className="flex h-full">
      <div className="w-[18rem] h-full shadow-lg overflow-y-auto">
        <List>
          {courseData.map((item, index) => (
            <div>
              <ListItem
                button
                key={index}
                onClick={() => {
                  setCurrentList(item.assignment);
                  setCurrentCourseCode(item.courseCode);
                }}
              >
                <ListItemIcon>
                  <img
                    className="w-[20px] h-[20px] rounded-full"
                    src={item.courseImg}
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
      <CourseList currentList={currentList} courseCode={currentCourseCode} />
    </div>
  );
};

export default Main;
