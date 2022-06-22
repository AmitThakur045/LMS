import React, { useState } from "react";
import PdfViewer from "../Assignment/PdfViewer";

const CertificateMain = ({ user }) => {
  const [allAssignment, setAllAssignment] = useState(user.result.assignment);
  const [keyId, setKeyId] = useState(0);
  const [selectedPdf, setSelectedPdf] = useState(
    allAssignment[0].checkedAssignment
  );

  return (
    <div className="flex lg:flex-row flex-col w-full lg:h-full h-full bg-white overflow-y-auto">
      <div className="lg:flex-[0.40] flex flex-col lg:max-h-full md:h-full h-[30rem] items-center w-full overflow-y-auto py-2 space-y-3">
        {allAssignment.map((assignment, i) => (
          <div
            className="lg:w-[25rem] w-[80vw] p-2 bg-gray-500 hover:bg-opacity-90 rounded-md text-white hover:cursor-pointer hover:scale-105 duration-150 transition-all"
            style={keyId === i ? { backgroundColor: "#969dab" } : {}}
            onClick={() => {
              setSelectedPdf(assignment.checkedAssignment);
              setKeyId(i);
            }}
            key={i}
          >
            <div className="space-x-1 font-semibold">
              <span>{i + 1}.</span>
              <span>Assignment Code: {assignment.assignmentCode}</span>
            </div>
            <p className="flex items-center pl-[1rem]">
              Score: {assignment.score}
            </p>
          </div>
        ))}
      </div>
      <div className="lg:flex-[0.60] bg-[#F9F9F9] w-full overflow-y-auto">
        <PdfViewer pdf={selectedPdf} />
      </div>
    </div>
  );
};

export default CertificateMain;