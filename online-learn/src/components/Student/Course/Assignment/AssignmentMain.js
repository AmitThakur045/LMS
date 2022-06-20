import React, { useEffect, useState, useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import PdfViewer from "./PdfViewer";
import {
  getAssignmentByBatchCode,
  submitAssignment,
} from "../../../../Redux/actions/studentActions";

import { SUBMIT_ASSIGNMENT } from "../../../../Redux/actionTypes";

const AssignmentMain = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const learner = JSON.parse(localStorage.getItem("learner"));
  const assignment = useSelector((state) => state.student.assignment);
  const store = useSelector((state) => state);

  const [allAssignmet, setAllAssignment] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState("");
  const batch = useSelector((state) => state.admin.batch);
  const [batchData, setBatchData] = useState({});
  const [value, setValue] = useState("");
  const [isSelected, setIsSelected] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (assignment.length !== 0) {
      setAllAssignment(assignment);
      setSelectedPdf(assignment[0].assignmentPdf);
      let arr = new Array(assignment.length).fill(false);
      setIsSelected(arr);
    }
  }, [assignment]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("index"))) {
      setIndex(JSON.parse(localStorage.getItem("index")));
    }
  }, []);
  useEffect(() => {
    if (Object.keys(batch).length !== 0) {
      dispatch(
        getAssignmentByBatchCode({
          batchCode: learner.result.batchCode[0],
          courseCode: batch.courses[index].courseCode,
        })
      );
      setBatchData(batch);
    }
  }, [batch]);

  const changeHandler = (event, i) => {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = (e) => {
        setValue(fileReader.result);
      };
    }
    let data = [...isSelected];
    console.log(i);
    data[i] = true;
    setIsSelected(data);
  };
  console.log(isSelected);

  const submitassignment = (i) => {
    if (value !== "") {
      dispatch(
        submitAssignment({
          assignmentCode: allAssignmet[i].assignmentCode,
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
      setValue(false);
      let arr = new Array(assignment.length).fill(false);
      setIsSelected(arr);
      dispatch({ type: SUBMIT_ASSIGNMENT, payload: false });
    }
  }, [store.student.assignmentSubmitted]);

  return (
    <>
      {Object.keys(batchData).length !== 0 && (
        <div className="flex lg:flex-row flex-col w-full lg:h-full bg-white">
          <div className="lg:flex-[0.4] flex-col w-full bg-[#EDF0F5] rounded-bl-2xl lg:h-full pb-5">
            <h1 className="ml-6 mt-7 font-semibold text-2xl">Assignment</h1>

            <div className="flex flex-col space-y-4 mt-4 lg:h-[75vh] h-[50vh] overflow-y-auto">
              {allAssignmet.map((data, i) => (
                <div
                  className="bg-[#127FED] h-[10rem] mx-6 rounded-xl px-4 py-4 text-white flex flex-col justify-between overflow-auto hover:cursor-pointer"
                  key={i}
                  onClick={() => {
                    setSelectedPdf(data.assignmentPdf);
                  }}>
                  <div className="flex justify-between items-center">
                    <h3>Assignment code: {data.assignmentCode}</h3>
                    <button
                      type="button"
                      onClick={() => submitassignment(i)}
                      className="bg-blue-600 hover:bg-blue-800 duration-150 transition-all text-white rounded-xl h-[2rem] w-[5rem]">
                      Submit
                    </button>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <h1 className="text-[20px]">{data.assignmentName} :</h1>
                    <h1>{data.assignmentDescription}</h1>
                  </div>
                  <div className="flex space-x-2">
                    <span className="bg-[#6EAEE9] flex items-center justify-center w-[5rem] rounded-2xl h-[2rem] ">
                      {data.courseCode}
                    </span>

                    <label htmlFor={`answer-${i}`} type="button">
                      <div className="flex text-white bg-[#6EAEE9] rounded-2xl cursor-pointer h-[2rem] w-[7rem] space-x-1 items-center justify-center">
                        <div>{isSelected[i] ? `Uploaded` : `Upload`}</div>
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
              ))}
              {allAssignmet.length === 0 && (
                <div className="text-red-500 text-[20px]  font-bold self-center">
                  <p>No Assignment Found</p>
                </div>
              )}
            </div>
          </div>
          <div className="lg:flex-[0.6] bg-[#F9F9F9] w-full overflow-y-auto ">
            {allAssignmet.length === 0 ? (
              <div className=""></div>
            ) : (
              <PdfViewer pdf={selectedPdf} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AssignmentMain;
