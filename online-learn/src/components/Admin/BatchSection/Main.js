import React from "react";
import ActiveBatch from "../ActiveBatch";
import RecentNotification from "../RecentNotification";

import { IoIosAddCircleOutline } from "react-icons/io";

import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="flex overflow-hidden h-full space-x-5 px-12 mb-5">
      <div className="w-[80%] rounded-3xl bg-[#FAFBFF] px-10 py-5 flex  space-x-5">
        <Link
          to="/admin/batch/addbatch"
          className="bg-[#5848a4] h-[10rem] w-[50%] rounded-md shadow-md text-white flex items-center justify-center space-x-2 text-xl cursor-pointer hover:bg-[#352b66] transition-all duration-150">
          <h1>Add Batch</h1>
          <IoIosAddCircleOutline />
        </Link>
        <Link
          to="/admin/batch/searchbatch"
          className="bg-[#5848a4] h-[10rem] w-[50%] rounded-md shadow-md text-white flex items-center justify-center space-x-2 text-xl cursor-pointer hover:bg-[#352b66] transition-all duration-150">
          <h1>Search Batch</h1>
          <IoIosAddCircleOutline />
        </Link>
      </div>
      <div className="bg-[#FAFBFF] w-[20%] flex flex-col px-5 py-5 rounded-3xl space-y-5">
        <ActiveBatch />
        <RecentNotification />
      </div>
    </div>
  );
};

export default Main;
