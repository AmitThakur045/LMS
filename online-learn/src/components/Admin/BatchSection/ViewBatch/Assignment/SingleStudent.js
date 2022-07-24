import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { Avatar, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { addScore } from "../../../../../Redux/actions/adminActions";
import { ADD_SCORE, GET_PRESIGNED_URL } from "../../../../../Redux/actionTypes";
import { getPresignedUrl } from "../../../../../Redux/actions/awsActions";

const SingleStudent = ({ item, index, currentEmail }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("admin")));

  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const [currPdf, setCurrPdf] = useState({});
  const [email, setEmail] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [pdfUploadLoader, SetPdfUploadLoader] = useState(false);
  const [value, setValue] = useState({
    marks: 0,
    selectedFile: "",
  });
  const s3PresignedUrl = store.aws.presignedUrl;
  const changeHandler = (event) => {
    SetPdfUploadLoader(true);
    const file = event.target.files[0];
    setCurrPdf(file);

    dispatch(
      getPresignedUrl({ fileType: "pdf", fileName: event.target.files[0].name })
    );
    setIsSelected(true);
  };
  useEffect(() => {
    if (item.checkedAssignment !== "") {
      setIsAdded(true);
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
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

  useEffect(() => {
    if (store.admin.scoreAdded) {
      setLoading(false);
      setIsSelected(false);
      setIsAdded(true);
      dispatch({ type: ADD_SCORE, payload: false });
    }
  }, [store.admin.scoreAdded]);

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
              selectedFile: pdfUrl,
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

  return (
    <div key={index} onClick={() => setEmail(item.email)}>
      <ListItem button>
        <button
          disabled={
            !isSelected ||
            isAdded ||
            user.result.sub === "hr" ||
            pdfUploadLoader
          }
          type="button"
          onClick={submitHandler}>
          {isAdded ? (
            <BsFillCheckCircleFill style={{ fontSize: "24px" }} />
          ) : (
            <AiOutlineCheckCircle style={{ fontSize: "24px" }} />
          )}
        </button>
        <div className="p-2 pr-3">
          <Avatar
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
              <a disabled={isAdded} href={item.studentAnswer} download>
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
                disabled={isAdded || user.result.sub === "hr"}
                onClick={() => inputRef.current.click()}>
                <div className="flex text-blue-600 px-2 space-x-1">
                  {!isSelected ? (
                    <div>Upload</div>
                  ) : (
                    <div>{pdfUploadLoader ? `Uploading` : `Uploaded`}</div>
                  )}

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
              {user.result.sub !== "hr" ? (
                <TextField
                  id="outlined-basic"
                  type="number"
                  size="small"
                  label={isAdded ? item.score : "Marks"}
                  variant="outlined"
                  sx={{
                    width: "70px",
                  }}
                  value={isAdded ? item.score : value.marks}
                  onChange={(e) =>
                    setValue({ ...value, marks: e.target.value })
                  }
                />
              ) : (
                <TextField
                  id="outlined-basic"
                  type="number"
                  size="small"
                  label={isAdded ? item.score : "Marks"}
                  variant="outlined"
                  sx={{
                    width: "70px",
                  }}
                  value={isAdded ? item.score : value.marks}
                />
              )}
            </div>
          </div>
        </div>
      </ListItem>
      <Divider />
    </div>
  );
};

export default SingleStudent;
