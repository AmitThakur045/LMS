import React, { useState, useEffect, useRef } from "react";
import ListItem from "@mui/material/ListItem";
import StudentList from "./StudentList";
import { assignment } from "./Data";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Box, Modal } from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  addAssignment,
  getStudentByAssignmentCode,
} from "../../../../../Redux/actions/adminActions";
import { ADD_ASSIGNMENT } from "../../../../../Redux/actionTypes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 350,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 10,
  borderRadius: "3px",
  p: 4,
};

const CourseList = ({ currentList, courseCode }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    courseCode: "",
    batchCode: "",
    assignmentName: "",
    assignmentCode: "",
    assignmentDescription: "",
    assignmentDate: "",
    assignmentPdf: "",
  });
  const [studentList, setStudentList] = useState([]);
  const [currentAssignmentCode, setCurrentAssignmentCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [open, setOpen] = useState(false);
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [newAssignment, setNewAssignment] = useState();

  const store = useSelector((state) => state);

  const handleClose = () => {
    setOpen(false);
  };

  const changeHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = (e) => {
        setValue({
          ...value,
          assignmentPdf: e.target.result,
        });
      };
    }
  };

  let assignmentStudent = useSelector((store) => store.admin.studentList);

  const submitHandler = (e) => {
    e.preventDefault();
    const batchData = JSON.parse(localStorage.getItem("batch"));
    const batchCode = batchData.batchCode;

    let assignmentNo = currentList.length + 1;
    if (assignmentNo < 10) {
      assignmentNo = "0" + assignmentNo;
    }
    const assignmentCode = batchCode + courseCode + assignmentNo;
    let tmp = value;
    tmp.assignmentCode = assignmentCode;
    tmp.batchCode = batchCode;
    tmp.assignmentDate = new Date().toISOString().slice(0, 10);
    tmp.courseCode = courseCode;

    setValue(tmp);
    dispatch(addAssignment(value));
  };

  useEffect(() => {
    if (store.admin.assignmentAdded) {
      console.log(value);
      const data = JSON.parse(localStorage.getItem("batch"));
      for (let i = 0; i < data.courses.length; i++) {
        if (data.courses[i].courseCode === value.courseCode) {
          data.courses[i].assignment.push({
            assignmentCode: value.assignmentCode,
            assignmentName: value.assignmentName,
            assignmentPdf: value.assignmentPdf,
          });
        }
      }
      localStorage.setItem("batch", JSON.stringify(data));
      setOpen(false);
      dispatch({ type: ADD_ASSIGNMENT, payload: false });
      setValue({
        courseCode: "",
        batchCode: "",
        assignmentName: "",
        assignmentCode: "",
        assignmentDescription: "",
        assignmentDate: "",
        assignmentPdf: "",
      });
    }
  }, [store.admin.assignmentAdded]);

  useEffect(() => {
    setStudentList(assignmentStudent);
    // console.log("studentList", studentList);
  }, [assignmentStudent]);

  useEffect(() => {
    if (currentList.length !== 0) {
      dispatch(
        getStudentByAssignmentCode({
          assignmentCode: currentList[0].assignmentCode,
        })
      );
    }
  }, [currentList]);

  useEffect(() => {
    dispatch(
      getStudentByAssignmentCode({ assignmentCode: currentAssignmentCode })
    );
  }, [currentAssignmentCode]);

  return (
    <>
      {currentList.length !== 0 ? (
        <div>
          <div className="w-[16rem] h-full flex-col pt-2 shadow-lg overflow-y-auto">
            <div>
              {currentList.map((item, index) => (
                <div
                  key={index}
                  className={
                    currentAssignmentCode === item.assignmentCode &&
                    "bg-slate-200 shadow-xl font-semibold transition-all duration-100"
                  }>
                  <div className="flex items-center">
                    <ListItem
                      button
                      onClick={() =>
                        setCurrentAssignmentCode(item.assignmentCode)
                      }>
                      <div>
                        <div className="flex text-[1.3rem] text-slate-700">
                          Assignment {item.assignmentCode.slice(-2)}
                        </div>
                        <div className="text-sm text-slate-600">
                          {item.assignmentCode}
                        </div>
                      </div>
                    </ListItem>
                    {/* <div className="top-0">
                      <a
                        id="downloadFile"
                        href={item.assignmentPdf}
                        target="_blank"
                        download
                        rel="noreferrer"
                      >
                        <Button>
                          <CloudDownloadIcon />
                        </Button>
                      </a>
                    </div> */}
                  </div>
                  <Divider />
                </div>
              ))}
            </div>
          </div>
          <div className="bottom-0 fixed w-[16rem]">
            <button
              className="self-end bg-[#FB6C3A] h-[3rem] text-white w-full rounded-md text-[17px] hover:bg-[#e54e17] transition-all duration-150"
              onClick={() => setOpen(true)}>
              Create Assignment
            </button>
          </div>
        </div>
      ) : (
        courseCode.length !== 0 && (
          <div className="shadow-lg">
            <div className="w-[16rem]">
              <button
                className="self-end bg-[#FB6C3A] h-[3rem] text-white w-full rounded-md text-[17px] hover:bg-[#e54e17] transition-all duration-150"
                onClick={() => setOpen(true)}>
                Create Assignment
              </button>
            </div>
          </div>
        )
      )}

      {currentList.length !== 0 && <StudentList studentList={studentList} />}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <form onSubmit={submitHandler}>
            <div className="flex flex-col space-y-4 h-[15rem]">
              <div className="flex items-center">
                <h1 className="self-center w-[95%] font-bold">
                  Add Assignment
                </h1>
                <div
                  onClick={handleClose}
                  className="self-end cursor-pointer w-[5%]">
                  <AiOutlineCloseCircle
                    className="text-gray-400 hover:text-gray-500 duration-150 transition-all"
                    fontSize={23}
                  />
                </div>
              </div>
              <div className="flex space-x-3">
                <TextField
                  required
                  type="text"
                  id="outlined-basic"
                  label="Assignment Name"
                  variant="outlined"
                  className="bg-white"
                  value={value.assignmentName}
                  onChange={(e) =>
                    setValue({ ...value, assignmentName: e.target.value })
                  }
                />
                <TextField
                  required
                  type="text"
                  id="outlined-basic"
                  label="Course Code"
                  variant="outlined"
                  className="bg-white"
                  value={courseCode}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="flex">
                <TextField
                  style={{
                    width: "100%",
                  }}
                  required
                  type="text"
                  id="outlined-basic"
                  label="Assignment Description"
                  variant="outlined"
                  className="bg-white"
                  value={value.assignmentDescription}
                  onChange={(e) =>
                    setValue({
                      ...value,
                      assignmentDescription: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Button
                  type="button"
                  style={{
                    width: "100%",
                    justifyContent: "left",
                  }}>
                  <input
                    type="file"
                    ref={inputRef}
                    name="file"
                    onChange={changeHandler}
                  />
                </Button>
              </div>
              <div className="flex w-full space-x-2">
                <div className="w-full">
                  <button
                    type="submit"
                    className="self-end bg-[#FB6C3A] h-[3rem] text-white w-full rounded-md text-[17px] hover:bg-[#e54e17] transition-all duration-150">
                    Submit
                  </button>
                </div>
                <div className="w-full">
                  <button
                    onClick={() => {
                      setAssignmentName("");
                      setAssignmentDescription("");
                      setNewAssignment();
                    }}
                    className="self-end bg-[#df1111] h-[3rem] text-white w-full rounded-md text-[17px] hover:bg-[#930000] transition-all duration-150">
                    clear
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default CourseList;
