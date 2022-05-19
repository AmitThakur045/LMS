import React from "react";
import { AiFillEye } from "react-icons/ai";
const data = [
  {
    batchName: "Batch 101",
  },
  {
    batchName: "Batch 102",
  },
  {
    batchName: "Batch 103",
  },
  {
    batchName: "Batch 104",
  },
  {
    batchName: "Batch 105",
  },
  {
    batchName: "Batch 106",
  },
  {
    batchName: "Batch 107",
  },
  {
    batchName: "Batch 108",
  },
  {
    batchName: "Batch 109",
  },
  {
    batchName: "Batch 110",
  },
  {
    batchName: "Batch 111",
  },
  {
    batchName: "Batch 112",
  },
];
const ActiveBatch = () => {
  return (
    <div className="h-[60%] rounded-t-3xl shadow-md bg-white flex flex-col py-3">
      <h1 className="text-[#504F89] text-[16px] font-bold self-center">
        Active Batch
      </h1>
      <div className="px-4 mt-6 space-y-4 overflow-y-auto scrollbar-none">
        {data.map((batch, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <p className="bg-[#D5F8F9] h-[25px] w-[25px] flex items-center justify-center text-[12px] text-[#6F6EA5]">
                B
              </p>
              <p className="text-[#6F6EA5] text-[12px]">{batch.batchName}</p>
            </div>
            <AiFillEye color="#6F6EA5" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveBatch;
