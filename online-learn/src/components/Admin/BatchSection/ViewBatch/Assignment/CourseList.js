import React, { useState, useEffect, useRef } from "react";
import ListItem from "@mui/material/ListItem";
import StudentList from "./StudentList";
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
import { getPresignedUrl } from "../../../../../Redux/actions/awsActions";
import {
  ADD_ASSIGNMENT,
  GET_STUDENT_BY_ASSIGNMENT_CODE,
  SET_ERRORS,
  GET_PRESIGNED_URL,
} from "../../../../../Redux/actionTypes";
import Spinner from "../../../../../Utils/Spinner";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,

  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 10,
  borderRadius: "3px",
  p: 4,
};

const CourseList = ({ currentList, courseCode }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("admin")));

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
  const [currPdf, setCurrPdf] = useState({});
  const [studentList, setStudentList] = useState([]);
  const [currentAssignmentCode, setCurrentAssignmentCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const [open, setOpen] = useState(false);
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [newAssignment, setNewAssignment] = useState();
  const [addAssignmentLoading, setAddAssignmentLoading] = useState(false);
  const store = useSelector((state) => state);
  const s3PresignedUrl = store.aws.presignedUrl;

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (s3PresignedUrl !== "" && pdfUploadLoader === true) {
      async function fetchApi() {
        await fetch(s3PresignedUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/*",
          },
          body: currPdf,
        })
          .then((response) => {
            const pdfUrl = s3PresignedUrl.split("?")[0];

            setValue({
              ...value,
              assignmentPdf: pdfUrl,
            });
            SetPdfUploadLoader(false);
            setCurrPdf({});
          })
          .catch((error) => {
            console.log(error);
          });
      }
      fetchApi();
      dispatch({ type: GET_PRESIGNED_URL, payload: "" });
    }
  }, [s3PresignedUrl]);

  const changeHandler = (event) => {
    SetPdfUploadLoader(true);
    const file = event.target.files[0];
    setCurrPdf(file);

    dispatch(
      getPresignedUrl({ fileType: "pdf", fileName: event.target.files[0].name })
    );
  };

  let assignmentStudent = useSelector((store) => store.admin.studentList);
  let batchData = useSelector((store) => store.admin.batch);

  const submitHandler = (e) => {
    e.preventDefault();
    setAddAssignmentLoading(true);
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
      setAddAssignmentLoading(false);
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
    if (Object.keys(store.errors).length !== 0) {
      setLoading(false);
      dispatch({ type: GET_STUDENT_BY_ASSIGNMENT_CODE, payload: [] });
    }
  }, [store.errors]);

  useEffect(() => {
    if (assignmentStudent.length !== 0) {
      setLoading(false);

      setStudentList(assignmentStudent);
    }
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
    if (currentList.length !== 0) {
      setCurrentAssignmentCode(currentList[0].assignmentCode);
    }
  }, []);

  useEffect(() => {
    if (currentAssignmentCode !== "") {
      setLoading(true);
      dispatch({ type: SET_ERRORS, payload: {} });
      setStudentList([]);
      dispatch(
        getStudentByAssignmentCode({ assignmentCode: currentAssignmentCode })
      );
    }
  }, [currentAssignmentCode]);

  const [pdfUploadLoader, SetPdfUploadLoader] = useState(false);

  return (
    <>
      {currentList.length !== 0 ? (
        <div>
          <div className="w-[14rem] h-full flex-col pt-2 shadow-lg overflow-y-auto">
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
                        <div className="flex text-[1.3rem] text-slate-700 space-x-2">
                          <p>Assignment</p>
                          <p>{item.assignmentCode.slice(-2)}</p>
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
          {user.result.sub !== "hr" && (
            <div className="bottom-0 fixed w-[14rem]">
              <button
                className="self-end bg-[#FB6C3A] h-[3rem] text-white w-full rounded-md text-[17px] hover:bg-[#e54e17] transition-all duration-150"
                onClick={() => setOpen(true)}>
                Create Assignment
              </button>
            </div>
          )}
        </div>
      ) : (
        courseCode.length !== 0 &&
        user.result.sub !== "hr" && (
          <div className="shadow-lg">
            <div className="w-[14rem]">
              <button
                className="self-end bg-[#FB6C3A] h-[3rem] text-white w-full rounded-md text-[17px] hover:bg-[#e54e17] transition-all duration-150"
                onClick={() => setOpen(true)}>
                Create Assignment
              </button>
            </div>
          </div>
        )
      )}

      {currentList.length !== 0 && (
        <StudentList studentList={studentList} loading={loading} />
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <form onSubmit={submitHandler}>
            <div className="flex flex-col space-y-4 ">
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
              {pdfUploadLoader && (
                <div className="ml-3">
                  <button>Uploading...</button>
                </div>
              )}
              <div className="flex w-full space-x-2">
                <div className="w-full">
                  <button
                    disabled={addAssignmentLoading || pdfUploadLoader}
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
            {addAssignmentLoading && <Spinner message="Adding Assignment" />}
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default CourseList;
