import React, { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import { getPresignedUrl } from "../../../../Redux/actions/awsActions";
import { submitAssignment } from "../../../../Redux/actions/studentActions";
import {
  GET_PRESIGNED_URL,
  SUBMIT_ASSIGNMENT,
} from "../../../../Redux/actionTypes";
const SingleAssignment = ({ data, i, setSelectedPdf, setIsOpen, isOpen }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const s3PresignedUrl = store.aws.presignedUrl;
  const [currPdf, setCurrPdf] = useState({});
  const learner = JSON.parse(localStorage.getItem("learner"));
  const [value, setValue] = useState("");
  const [isSelected, setIsSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const changeHandler = (event, i) => {
    setIsUploading(true);
    const file = event.target.files[0];
    setCurrPdf(file);
    dispatch(
      getPresignedUrl({ fileType: "pdf", fileName: event.target.files[0].name })
    );
  };

  useEffect(() => {
    let index = data.student.findIndex(
      (stu) => stu.email === user.result.email
    );

    if (index !== -1) {
      setIsUploaded(true);
      setIsSubmitted(true);
    }
  }, []);

  const submitassignment = (i) => {
    setLoading(true);
    if (value !== "") {
      dispatch(
        submitAssignment({
          assignmentCode: data.assignmentCode,
          studentAnswer: value,
          email: learner.result.email,
        })
      );
    } else {
      return alert("Submit Answer!!!");
    }
  };

  useEffect(() => {
    if (store.student.assignmentSubmitted) {
      setLoading(false);
      setIsSubmitted(true);
      setValue(false);
      dispatch({ type: SUBMIT_ASSIGNMENT, payload: false });
    }
  }, [store.student.assignmentSubmitted]);

  useEffect(() => {
    if (s3PresignedUrl !== "") {
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

            setValue(pdfUrl);
            setIsUploading(false);
            setIsUploaded(true);
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
    <div
      className={`bg-gradient-to-b ${
        isOpen === i
          ? "from-[#00668a] to-[#047880]"
          : "from-[#0085B4] to-[#009DA7]"
      }  mx-6 rounded-xl space-y-2 px-4 py-4 text-white flex flex-col justify-between hover:cursor-pointer`}
      key={i}
      onClick={() => {
        setSelectedPdf(data.assignmentPdf);
        setIsOpen(i);
      }}>
      <div className="flex justify-between items-center">
        <h3>Assignment code: {data.assignmentCode}</h3>
        {!isSubmitted && (
          <button
            type="button"
            disabled={isUploading || !isUploaded}
            onClick={() => submitassignment(i)}
            className="bg-blue-600 hover:bg-blue-800 duration-150 transition-all text-white rounded-xl h-[2rem] px-4">
            {loading ? "Submitting" : "Submit"}
          </button>
        )}
      </div>
      <div className="flex space-x-2 items-center">
        <h1 className="text-[20px]">{data.assignmentName} :</h1>
        <h1>{data.assignmentDescription}</h1>
      </div>
      <div className="flex space-x-2">
        <span className="bg-primary flex items-center justify-center w-[5rem] rounded-2xl h-[2rem] ">
          {data.courseCode}
        </span>

        <label htmlFor={`answer-${i}`} type="button">
          <div className="flex text-white bg-primary rounded-2xl cursor-pointer h-[2rem] w-[7rem] space-x-1 items-center justify-center">
            <div className="">
              {isUploaded
                ? "Uploaded"
                : `${isUploading ? "Uploading" : "Upload"}`}
            </div>
            <CloudUploadIcon />
          </div>
        </label>
        <input
          id={`answer-${i}`}
          type="file"
          name="file"
          onChange={(event) => changeHandler(event, i)}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default SingleAssignment;
