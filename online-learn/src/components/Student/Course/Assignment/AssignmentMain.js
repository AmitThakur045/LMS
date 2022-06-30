import React, { useEffect, useState, useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import PdfViewer from "./PdfViewer";
import { submitAssignment } from "../../../../Redux/actions/studentActions";

import { SUBMIT_ASSIGNMENT } from "../../../../Redux/actionTypes";

const AssignmentMain = ({ batchData, allAssignment }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));
  const dispatch = useDispatch();
  const learner = JSON.parse(localStorage.getItem("learner"));
  const store = useSelector((state) => state);

  const [selectedPdf, setSelectedPdf] = useState("");
  const [value, setValue] = useState("");
  const [isSelected, setIsSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (allAssignment.length !== 0) {
      setSelectedPdf(allAssignment[0].assignmentPdf);
      let arr = new Array(allAssignment.length).fill(false);

      let n = arr.length;
      for (let i = 0; i < n; i++) {
        allAssignment[i].student.map((data, index) => {
          if (data.email === learner.result.email) {
            arr[i] = true;
          }
        });
      }
      setIsSubmitted(arr);
      setIsSelected(arr);
    }
  }, []);

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

  const submitassignment = (i) => {
    setLoading(true);
    if (value !== "") {
      dispatch(
        submitAssignment({
          assignmentCode: allAssignment[i].assignmentCode,
          studentAnswer: value,
          email: learner.result.email,
        })
      );

      let data = [...isSubmitted];
      console.log(i);
      data[i] = true;
      setIsSubmitted(data);
    } else {
      return alert("Submit Answer!!!");
    }
  };

  useEffect(() => {
    if (store.student.assignmentSubmitted) {
      setLoading(false);
      setValue(false);
      dispatch({ type: SUBMIT_ASSIGNMENT, payload: false });
    }
  }, [store.student.assignmentSubmitted]);

  // console.log("allAsssignemnt", allAssignment[0].student.includes(learner.result.email));
  // console.log("LEARNER", user);
  // console.log("isSelected", isSelected);

  return (
    <>
      {Object.keys(batchData).length !== 0 && (
        <div className="flex lg:flex-row flex-col w-full lg:h-full bg-white pb-[5rem]">
          <div className="lg:flex-[0.4] flex-col w-full bg-[#EDF0F5] rounded-bl-2xl lg:h-full overflow-y-auto">
            <h1 className="ml-6 mt-7 font-semibold text-2xl">Assignment</h1>

            <div className="flex flex-col space-y-4 mt-4 lg:h-full h-[50vh] overflow-y-auto pb-5">
              {allAssignment.map((data, i) => (
                <div
                  className="bg-[#127FED] mx-6 rounded-xl px-4 py-4 text-white flex flex-col justify-between hover:cursor-pointer"
                  key={i}
                  onClick={() => {
                    setSelectedPdf(data.assignmentPdf);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <h3>Assignment code: {data.assignmentCode}</h3>
                    <button
                      type="button"
                      disabled={loading || isSubmitted[i]}
                      onClick={() => submitassignment(i)}
                      className="bg-blue-600 hover:bg-blue-800 duration-150 transition-all text-white rounded-xl h-[2rem] px-4"
                    >
                      {isSubmitted[i] ? (
                        "Submitted"
                      ) : (
                        <>{loading ? "Submitting" : "Submit"}</>
                      )}
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
              {allAssignment.length === 0 && (
                <div className="text-red-500 text-[20px]  font-bold self-center">
                  <p>No Assignment Found</p>
                </div>
              )}
            </div>
          </div>
          <div className="lg:flex-[0.6] bg-[#F9F9F9] w-full overflow-y-auto ">
            {allAssignment.length === 0 ? (
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
