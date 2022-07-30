import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudent } from "../../../../Redux/actions/adminActions";
import PdfViewer from "../Assignment/PdfViewer";
import { CgFileDocument } from "react-icons/cg";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { IoIosUnlock } from "react-icons/io";

const CertificateMain = ({ allAssignment }) => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("learner"))
  );

  const [selectedPdf, setSelectedPdf] = useState("");
  useEffect(() => {
    if (allAssignment.length !== 0) {
      setSelectedPdf(allAssignment[0].checkedAssignment);
    }
  }, []);
  const [keyId, setKeyId] = useState(0);
  useEffect(() => {
    dispatch(getStudent({ email: user.result.email }));
  }, []);

  const scrollDownToRef = () =>
    scrollRef.current.scrollBy({ top: 200, behavior: "smooth" });
  const scrollUpToRef = () =>
    scrollRef.current.scrollBy({ bottom: 200, behavior: "smooth" });

  return (
    <>
      <div className="flex lg:flex-row flex-col w-full lg:h-full h-full bg-white overflow-y-hidden">
        <div className="lg:flex-[0.50]  py-8  flex flex-col space-y-3">
          <div
            ref={scrollRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-8 h-[12rem] lg:h-[33rem] overflow-y-auto px-20 scrollbar-none">
            {allAssignment.map((assignment, i) => (
              <div
                onClick={() => {
                  setSelectedPdf(assignment.checkedAssignment);
                  setKeyId(i);
                }}
                key={i}
                className={`bg-gradient-to-b ${
                  keyId === i
                    ? "from-[#00668a] to-[#047880]"
                    : "from-[#0085B4] to-[#009DA7]"
                }   cursor-pointer rounded-lg flex flex-col px-4 py-4 max-h-[11rem] text-white`}>
                <div className="flex space-x-1 text-[20px] font-[600]">
                  <h1>{i < 10 ? `0${i + 1}` : "i+1"}</h1>
                  <span>:</span>
                  <h1>Assignment</h1>
                </div>
                <div className="flex space-x-1 text-[13px] font-[400]">
                  <h2>CODE</h2>
                  <span>-</span>
                  <h2>{assignment.assignmentCode}</h2>
                </div>
                <CgFileDocument className="self-center " size={70} />
                <div className="flex space-x-1 text-[15px] font-[600]">
                  <h2>Score</h2>
                  <span>-</span>
                  <h2>{assignment.score}</h2>
                </div>
              </div>
            ))}
          </div>
          <div className="self-center cursor-pointer ">
            {scrollRef.current?.scrollHeight - scrollRef.current?.scrollTop ===
            scrollRef.current?.clientHeight ? (
              <GoChevronUp onClick={scrollUpToRef} size={25} />
            ) : (
              <GoChevronDown onClick={scrollDownToRef} size={25} />
            )}
          </div>
          <button
            className=" flex items-center bg-[#FFB800] font-bold rounded-full px-4 w-[12rem] self-center py-1 justify-center hover:bg-[#bf8901] transition-all duration-150"
            type="button">
            <span>
              <IoIosUnlock />
            </span>
            <p>Unlock Certificate</p>
          </button>
        </div>
        <div className="lg:flex-[0.50] bg-[#F9F9F9] w-full overflow-y-auto">
          {selectedPdf !== "" && <PdfViewer pdf={selectedPdf} />}
        </div>
      </div>
    </>
  );
};

export default CertificateMain;
