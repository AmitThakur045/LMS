import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { addScore } from "../../../../../Redux/actions/adminActions";

const SingleStudent = ({ item, index, currentEmail }) => {
  const studentData = JSON.parse(localStorage.getItem("students"));
  const [idx, setIdx] = useState({ studentIndex: 0, assignmentIndex: 0 });
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const store = useSelector((state) => state);

  const [email, setEmail] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [value, setValue] = useState({
    marks: "",
    selectedFile: "",
  });

  let isMarked = useSelector((state) => state.admin.scoreAdded);

  const changeHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = (e) => {
        setValue({
          ...value,
          selectedFile: fileReader.result,
        });
      };
    }
    setIsSelected(true);
  };
  useEffect(() => {
    let studentIdx = studentData.findIndex((stu) => stu.email === item.email);
    let assignmentIdx = studentData[studentIdx].assignment.findIndex(
      (ass) => ass.assignmentCode === item.assignmentCode
    );
    setIdx({ studentIndex: studentIdx, assignmentIndex: assignmentIdx });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      addScore({
        email: item.email,
        assignmentCode: item.assignmentCode,
        score: value.marks,
        checkedAssignment: value.selectedFile,
      })
    );
    setIsAdded(true);
  };

  // useEffect(() => {
  //   if (item.checkedAssignment !== undefined) {
  //     setIsAdded(true);
  //   } else {
  //     setIsAdded(false);
  //   }
  // }, [submitHandler]);

  // useEffect(() => {
  //   setIsAdded(isMarked);
  // }, [isMarked === true]);

  return (
    <div
      key={index}
      onClick={() => setEmail(item.email)}
      className={
        currentEmail === email &&
        "bg-slate-200 shadow-lg font-semibold transition-all duration-100 overflow-y-auto"
      }>
      {item.checkedAssignment !== undefined
        ? (isMarked = true)
        : (isMarked = false)}

      <ListItem button>
        <div type="button" onClick={submitHandler}>
          {isMarked || isAdded ? (
            <BsFillCheckCircleFill style={{ fontSize: "24px" }} />
          ) : (
            <AiOutlineCheckCircle style={{ fontSize: "24px" }} />
          )}
        </div>
        <div className="p-2 pr-3">
          <img
            src={item.avatar}
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
              {/* <a href={item.assignment?.studentAnswer} download> */}
              <a
                href={
                  studentData[idx.studentIndex].assignment[idx.assignmentIndex]
                    .studentAnswer
                }
                download>
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
                disabled={isSelected || isAdded || isMarked}
                onClick={() => inputRef.current.click()}>
                <div className="flex text-blue-600 px-2 space-x-1">
                  <div>
                    {isSelected || isMarked || isAdded ? `Uploaded` : `Upload`}
                  </div>
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
            <div>
              <TextField
                id="outlined-basic"
                type="number"
                size="small"
                label={isMarked ? item.score : "Marks"}
                variant="outlined"
                sx={{
                  width: "70px",
                }}
                value={isAdded || isMarked ? item.score : value.marks}
                disabled={isAdded || isMarked}
                onChange={(e) => setValue({ ...value, marks: e.target.value })}
              />
            </div>
          </div>
        </div>
      </ListItem>
      <Divider />
    </div>
  );
};

export default SingleStudent;
