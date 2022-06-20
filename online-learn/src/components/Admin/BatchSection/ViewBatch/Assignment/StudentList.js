import React, { useState, useRef } from "react";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import SingleStudent from "./SingleStudent";

const StudentList = ({ studentList }) => {
  return (
    <>
      {studentList.length !== 0 ? (
        <div className="w-[45rem] h-full shadow-lg overflow-y-auto">
          <List>
            {studentList.map((item, index) =>
              item.checkedAssignment !== undefined ? (
                <SingleStudent
                  item={item}
                  index={index}
                  currentEmail={item.email}
                />
              ) : (
                <SingleStudent
                  item={item}
                  index={index}
                  currentEmail={item.email}
                />
              )
            )}
          </List>
        </div>
      ) : (
        <div className="w-[45rem] h-full shadow-lg"></div>
      )}
    </>
  );
};

export default StudentList;
