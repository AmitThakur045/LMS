import React, { useEffect, useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import PdfViewer from "./PdfViewer";
import { getAssignmentByBatchCode } from "../../../../Redux/actions/studentActions";

const sampleData = [
  {
    gradable: "gradable",
    title: "Virtual Key for your repository",
  },
  {
    gradable: "gradable",
    title: "Virtual Key for your repository",
  },
  {
    gradable: "gradable",
    title: "Virtual Key for your repository",
  },
  {
    gradable: "gradable",
    title: "Virtual Key for your repository",
  },
  {
    gradable: "gradable",
    title: "Virtual Key for your repository",
  },
  {
    gradable: "gradable",
    title: "Virtual Key for your repository",
  },
];

const AssignmentMain = () => {
  const dispatch = useDispatch();
  const learner = JSON.parse(localStorage.getItem("learner"));
  const assignment = useSelector((state) => state.student.assignment);
  const [allAssignmet, setAllAssignment] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState("");
  const batch = useSelector((state) => state.admin.batch);
  const [batchData, setBatchData] = useState({});
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (assignment.length !== 0) {
      setAllAssignment(assignment);
      setSelectedPdf(assignment[0].assignmentPdf);
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
          courseCode: batch.courses[0].courseCode,
        })
      );
      setBatchData(batch);
    }
  }, [batch]);

  const pdfHandler = (data) => {
    const raw = window.atob(JSON.stringify(data));
    const rawLength = raw.length;
    const blobArray = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      blobArray[i] = raw.charCodeAt(i);
    }

    const blob = new Blob([blobArray], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    window.open(url);
  };

  return (
    <>
      {Object.keys(batchData).length !== 0 && (
        <div className="flex h-full">
          <div className="flex-[0.4] bg-[#EDF0F5] rounded-bl-2xl">
            <h1 className="ml-6 mt-7 font-semibold text-2xl">Assignment</h1>
            <div className="space-y-4 mt-4 overflow-y-auto h-[33rem]">
              {allAssignmet.map((data, i) => (
                <div
                  className="bg-[#127FED] h-[10rem] mx-6 rounded-xl px-4 py-4 text-white flex flex-col justify-between hover:cursor-pointer"
                  key={i}
                  onClick={() => {
                    setSelectedPdf(data.assignmentPdf);
                  }}>
                  <h3>Assignment code: {data.assignmentCode}</h3>
                  <div className="flex space-x-2">
                    <h1 className="text-[21px] flex justify-center items-center">
                      {data.assignmentName} :
                    </h1>
                    <h1>{data.assignmentDescription}</h1>
                  </div>
                  <div className="">
                    <span className="bg-[#6EAEE9] flex items-center justify-center w-[5rem] rounded-2xl h-[2rem] ">
                      {data.courseCode}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-[0.6] bg-[#F9F9F9] overflow-y-auto">
            <PdfViewer pdf={selectedPdf} />
          </div>
        </div>
      )}
    </>
  );
};

export default AssignmentMain;
