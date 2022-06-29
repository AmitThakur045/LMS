import React, { useState, useRef, useEffect } from "react";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import SingleStudent from "./SingleStudent";
import Spinner from "../../../../../Utils/Spinner";
import { useSelector } from "react-redux";

const StudentList = ({ studentList, loading }) => {
  const store = useSelector((state) => state);

  return (
    <>
      {studentList.length !== 0 && Object.keys(store.errors).length === 0 ? (
        <div className="xl:w-full lg:w-[36vw] w-[35vw] h-full shadow-lg overflow-y-auto">
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
        <>
          {Object.keys(store.errors).length !== 0 ? (
            <div className="xl:w-full lg:w-[36vw] w-[35vw] h-full shadow-lg overflow-y-auto text-center text-red-500 font-bold">
              No Student Found
            </div>
          ) : (
            <div className="w-full h-full shadow-lg overflow-y-auto">
              {loading && <Spinner message={"Loading..."} />}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default StudentList;
