import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CourseList from "./CourseList";
import { sampleData } from "./Data";
import Divider from "@mui/material/Divider";

const Main = () => {
  const [currentList, setCurrentList] = React.useState([]);
  const [currentCourseCode, setCurrentCourseCode] = React.useState("");

  return (
    <div className="flex h-full">
      <div className="w-[18rem] h-full shadow-lg overflow-y-auto">
        <List>
          {sampleData.map((item, index) => (
            <div>
              <ListItem
                button
                key={index}
                onClick={() => { 
                  setCurrentList(item.assignment)
                  setCurrentCourseCode(item.courseCode)
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
