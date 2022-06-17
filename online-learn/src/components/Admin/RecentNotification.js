import React from "react";
import { HiOutlineDocumentText } from "react-icons/hi";
const data = [
  {
    title: "References",
    size: "1.8 MB",
  },
  {
    title: "References",
    size: "1.8 MB",
  },
  {
    title: "References",
    size: "1.8 MB",
  },
  {
    title: "References",
    size: "1.8 MB",
  },
  {
    title: "References",
    size: "1.8 MB",
  },
  {
    title: "References",
    size: "1.8 MB",
  },
  {
    title: "References",
    size: "1.8 MB",
  },
];
const RecentNotification = () => {
  return (
    <div className="h-[40%] rounded-b-3xl shadow-md bg-white flex flex-col py-3">
      <h1 className="text-[#504F89] text-[16px] font-bold self-center">
        Recent Notifications
      </h1>
      <div className="px-4 mt-6 space-y-4 overflow-y-auto scrollbar-none">
        {data.map((not, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div
                className={`${
                  idx % 2 === 0 ? "bg-[#D5F8F9]" : "bg-[#FBE7E8]"
                } h-[37px] w-[37px] flex items-center justify-center ${
                  idx % 2 === 0 ? "text-[#72D5CE]" : "text-[#F37C8A]"
                }`}>
                <HiOutlineDocumentText />
              </div>
              <p className="text-primary text-[12px]">{not.title}</p>
            </div>
            <p className="text-primary text-[7px]">{not.size}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentNotification;
