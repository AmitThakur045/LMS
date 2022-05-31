import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import StudentList from "./StudentList";
import { assignment } from "./Data";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { saveAs } from "file-saver";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";

const CourseList = ({ currentList }) => {
  const [studentList, setStudentList] = useState([]);
  const [currentAssignmentCode, setCurrentAssignmentCode] = useState("");

  useEffect(() => {
    let tmp = [];
    assignment.filter((assignment) => {
      if (assignment.assignmentCode === currentAssignmentCode) {
        tmp = assignment.student;
      }
    });
    setStudentList(tmp);
  }, [currentAssignmentCode]);

  const saveFile = (pdf) => {};

  return (
    <>
      {currentList.length !== 0 ? (
        <div className="w-[16rem] h-full flex-col">
          <div>
            {currentList.map((item, index) => (
              <div className="flex items-center">
                <div className="flex">
                  <ListItemText
                    primary={item.assignmentCode}
                    onClick={() =>
                      setCurrentAssignmentCode(item.assignmentCode)
                    }
                  />
                </div>
                <a
                  id="downloadFile"
                  href={item.assignmentPdf}
                  download
                >
                  <CloudDownloadIcon />
                </a>
              </div>
            ))}
          </div>
          <List>
            <ListItem>
              <ListItemText>Create Assignment</ListItemText>
            </ListItem>
          </List>
        </div>
      ) : (
        <div className="w-[20rem] h-full">
          <List>
            <ListItem>
              <ListItemText>Create Assignment</ListItemText>
            </ListItem>
          </List>
        </div>
      )}

      <StudentList studentList={studentList} />
    </>
  );
};

export default CourseList;
