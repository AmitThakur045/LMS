import React, { useState, useRef } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { Divider } from "@mui/material";

const SingleStudent = ({ item, index }) => {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  return (
    <div>
      <ListItem button key={index}>
        <div className="p-2 pr-3">
          <img
            src={item.image}
            alt={item.email}
            className="w-[24px] h-[24px] rounded-full"
          />
        </div>
        <div className="flex w-full justify-between">
          <div>
            <div className="text-xl text-gray-700">
              {item.firstName} {item.lastName}
            </div>
            <div className="text-md text-gray-400">{item.email}</div>
          </div>
          <div className="flex items-center space-x-2">
            <div>
              <a href={item.studentAnswer} download>
                <Button>
                  <CloudDownloadIcon />
                </Button>
              </a>
            </div>
            <div className="flex-col">
              <Button
                type="button"
                style={{
                  backgroundColor: "#bfd8e0",
                  borderRadius: "20px",
                }}
                onClick={() => inputRef.current.click()}
              >
                <div className="flex text-blue-600 px-2 space-x-1">
                  <div>{isSelected ? `Uploaded` : `Upload`}</div>
                  <CloudUploadIcon />
                </div>
                <input
                  type="file"
                  ref={inputRef}
                  name="file"
                  onChange={changeHandler}
                  className="hidden"
                />
              </Button>
            </div>
          </div>
        </div>
      </ListItem>
      <Divider />
    </div>
  );
};

export default SingleStudent;
