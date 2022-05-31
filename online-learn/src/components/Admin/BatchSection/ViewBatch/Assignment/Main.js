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

const Main = () => {
  const [currentList, setCurrentList] = React.useState([]);

  return (
    <div className="flex">
      <div className="w-[20rem] h-full">
        <List>
          {sampleData.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => setCurrentList(item.assignment)}
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
          ))}
        </List>
      </div>
      <CourseList currentList={currentList} />
    </div>
  );
};

export default Main;
