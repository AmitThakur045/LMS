import React, { useState, useRef, useEffect } from "react";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import SingleStudent from "./SingleStudent";
import Spinner from "../../../../../Utils/Spinner";
import { useSelector } from "react-redux";

const StudentList = ({ studentList }) => {
  const store = useSelector((state) => state);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setLoading(false);
    }
  }, [store.errors]);

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
        <div className="w-[45rem] h-full shadow-lg">
          {loading && <Spinner message={"Loading..."} />}
        </div>
      )}
    </>
  );
};

export default StudentList;
