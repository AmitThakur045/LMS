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
import { getCourses } from "../../../../../Redux/actions/adminActions";

const Main = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [courseList, setCourseList] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [currentCourseCode, setCurrentCourseCode] = useState("");

  const store = useSelector((state) => state);
  const courseData = JSON.parse(localStorage.getItem("courses"));
  const batchData = JSON.parse(localStorage.getItem("batch"));

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

  useEffect(() => {
    if (store.admin.assignmentAdded) {
      let temp = [];
      for (let i = 0; i < batchData.courses?.length; i++) {
        temp.push(batchData.courses[i].courseCode);
      }
      dispatch(getCourses(temp));
    }
  }, [store.admin.assignmentAdded]);

  const handleClick = ( courseCode ) => {
    setCurrentCourseCode(courseCode);
    let tmp = batchData.assignment.filter((item) => item.assignmentCode.substr(4, 6) === courseCode);
    setCurrentList(tmp);
  }

  // useEffect(() => {
  //   handleClick(courseData[0].courseCode);
  // }, [store.admin.assignmentAdded])

  return (
    <div className="flex h-full">
      <div className="w-[18rem] h-full shadow-lg overflow-y-auto">
        <List>
          {courseData.map((item, index) => (
            <div>
              <ListItem
                button
                key={index}
                onClick={() => handleClick(item.courseCode)}
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
