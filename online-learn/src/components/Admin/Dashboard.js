import React from "react";
import Sidebar from "./Sidebar";

import PeopleIcon from "@mui/icons-material/People";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonIcon from "@mui/icons-material/Person";
import PieChart from "../../Utils/PieChart";
import Header from "./Header";

const Dashboard = () => {
  return (
    <div className="h-screen w-full bg-[#f1f2f6] flex">
      <Sidebar />
      <div className="flex-[0.85] flex flex-col">
        <Header />
        <div className="flex-[0.9]">
          <div className="flex space-x-4 mx-7 mt-7">
            <div className="bg-white h-[10rem] flex-[0.333] flex items-center rounded-lg shadow-lg">
              <PeopleIcon
                sx={{ width: "60px", height: "60px" }}
                className="flex-[0.5] text-[#086f34]"
              />
              <div className="flex flex-col flex-[0.5] ml-6 text-[#086f34]">
                <h1 className="font-bold text-3xl">Batch</h1>
                <p className="text-2xl font-semibold">4</p>
              </div>
            </div>
            <div className="bg-white h-[10rem] flex-[0.333] flex items-center rounded-lg shadow-lg">
              <LibraryBooksIcon
                sx={{ width: "60px", height: "60px" }}
                className="flex-[0.5] text-[#09086f]"
              />
              <div className="flex flex-col flex-[0.5] ml-6 text-[#09086f]">
                <h1 className="font-bold text-3xl">Courses</h1>
                <p className="text-2xl font-semibold">10</p>
              </div>
            </div>
            <div className="bg-white h-[10rem] flex-[0.333] flex items-center rounded-lg shadow-lg">
              <PersonIcon
                sx={{ width: "60px", height: "60px" }}
                className="flex-[0.5] text-[#6f080f]"
              />
              <div className="flex flex-col flex-[0.5] ml-6 text-[#6f080f]">
                <h1 className="font-bold text-3xl">Teachers</h1>
                <p className="text-2xl font-semibold">3</p>
              </div>
            </div>
          </div>
          <div className=" flex space-x-4 mx-7 my-6">
            <div className="flex-[0.35] bg-white rounded-lg shadow-lg h-[15rem] flex items-center">
              <PieChart percentage={67} />
              <div className="space-y-4 text-[#60086f]">
                <h1 className="font-bold text-3xl">Students</h1>
                <p className="font-semibold text-2xl">43</p>
              </div>
            </div>
            <div className="flex-[0.65] bg-white shadow-lg h-[15rem]"></div>
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
