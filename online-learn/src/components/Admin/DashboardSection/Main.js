import React from "react";
import currentIcon from "../../../Assests/currentIcon.svg";
import curveGraph from "../../../Assests/curveGraph.svg";
import barGraph from "../../../Assests/barGraph.svg";
import pieChart from "../../../Assests/pieChart.svg";
import sampleAvatar from "../../../Assests/sampleAvatar1.svg";
import { FaCircle } from "react-icons/fa";
const Main = () => {
  return (
    <div className="mt-4 pb-12 px-12 space-y-16 overflow-y-scroll">
      <div className="flex justify-between">
        <div className=" flex items-center border-l-[1px] border-l-[#955FFF] justify-between pl-3 w-[13rem] text-[#605C94] font-bold">
          <div className="flex flex-col">
            <h1 className="items-start">Batches</h1>
            <p>51</p>
          </div>
          <img src={currentIcon} alt="" />
        </div>
        <div className=" flex items-center border-l-[1px] border-l-[#955FFF] justify-between pl-3 w-[13rem] text-[#605C94] font-bold">
          <div className="flex flex-col">
            <h1 className="items-start">Courses</h1>
            <p>23</p>
          </div>
          <img src={currentIcon} alt="" />
        </div>
        <div className=" flex items-center border-l-[1px] border-l-[#955FFF] justify-between pl-3 w-[13rem] text-[#605C94] font-bold">
          <div className="flex flex-col">
            <h1 className="items-start">Students</h1>
            <p>243</p>
          </div>
          <img src={currentIcon} alt="" />
        </div>
        <div className=" flex items-center border-l-[1px] border-l-[#955FFF] justify-between pl-3 w-[13rem] text-[#605C94] font-bold">
          <div className="flex flex-col">
            <h1 className="items-start">Sub Admins</h1>
            <p>12</p>
          </div>
          <img src={currentIcon} alt="" />
        </div>
      </div>
      <div className="flex justify-between">
        <img src={curveGraph} alt="" />
        <img src={barGraph} alt="" />
      </div>
      <div className="flex space-x-10">
        <div className="w-[60%] space-y-6">
          <h1 className="text-[#510B88] font-bold text-[18px]">Batch</h1>
          <hr />
          <div className="flex items-center space-x-20 justify-evenly">
            <img src={pieChart} alt="" />
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-6">
                <FaCircle color="#E72208" />
                <p className="text-[#590A7E]">Batches</p>
              </div>
              <div className="flex items-center space-x-6">
                <FaCircle color="#4100CC" />
                <p className="text-[#590A7E]">Batches</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[40%] space-y-6">
          <h1 className="text-[#510B88] font-bold text-[18px]">
            Student Queries
          </h1>
          <hr />
          <div className="flex flex-col space-y-4 overflow-y-auto h-[15rem] ">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <img src={sampleAvatar} alt="" />
                <div className="flex flex-col items-start ">
                  <h1 className="text-[#4A1E90] text-[16px]">Harry Potter</h1>
                  <p className="text-[#7A5488] text-[12px]">By Dumbledore</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <button
                  type="button"
                  className="h-[24px] w-[73px] bg-[#D4F8F8] text-[#6CD1CB] text-[12px] rounded-md hover:text-[#38b6ad]  transition-all duration-150">
                  Approve
                </button>
                <button
                  type="button"
                  className="h-[24px] w-[73px] bg-[#FBE7E8] text-[#ED5C6C] text-[12px] rounded-md hover:text-[#e73045]  transition-all duration-150">
                  Decline
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <img src={sampleAvatar} alt="" />
                <div className="flex flex-col items-start ">
                  <h1 className="text-[#4A1E90] text-[16px]">Harry Potter</h1>
                  <p className="text-[#7A5488] text-[12px]">By Dumbledore</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <button
                  type="button"
                  className="h-[24px] w-[73px] bg-[#D4F8F8] text-[#6CD1CB] text-[12px] rounded-md hover:text-[#38b6ad]  transition-all duration-150">
                  Approve
                </button>
                <button
                  type="button"
                  className="h-[24px] w-[73px] bg-[#FBE7E8] text-[#ED5C6C] text-[12px] rounded-md hover:text-[#e73045]  transition-all duration-150">
                  Decline
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <img src={sampleAvatar} alt="" />
                <div className="flex flex-col items-start ">
                  <h1 className="text-[#4A1E90] text-[16px]">Harry Potter</h1>
                  <p className="text-[#7A5488] text-[12px]">By Dumbledore</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <button
                  type="button"
                  className="h-[24px] w-[73px] bg-[#D4F8F8] text-[#6CD1CB] text-[12px] rounded-md hover:text-[#38b6ad]  transition-all duration-150">
                  Approve
                </button>
                <button
                  type="button"
                  className="h-[24px] w-[73px] bg-[#FBE7E8] text-[#ED5C6C] text-[12px] rounded-md hover:text-[#e73045]  transition-all duration-150">
                  Decline
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <img src={sampleAvatar} alt="" />
                <div className="flex flex-col items-start ">
                  <h1 className="text-[#4A1E90] text-[16px]">Harry Potter</h1>
                  <p className="text-[#7A5488] text-[12px]">By Dumbledore</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <button
                  type="button"
                  className="h-[24px] w-[73px] bg-[#D4F8F8] text-[#6CD1CB] text-[12px] rounded-md hover:text-[#38b6ad]  transition-all duration-150">
                  Approve
                </button>
                <button
                  type="button"
                  className="h-[24px] w-[73px] bg-[#FBE7E8] text-[#ED5C6C] text-[12px] rounded-md hover:text-[#e73045]  transition-all duration-150">
                  Decline
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <img src={sampleAvatar} alt="" />
                <div className="flex flex-col items-start ">
                  <h1 className="text-[#4A1E90] text-[16px]">Harry Potter</h1>
                  <p className="text-[#7A5488] text-[12px]">By Dumbledore</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <button
                  type="button"
                  className="h-[24px] w-[73px] bg-[#D4F8F8] text-[#6CD1CB] text-[12px] rounded-md hover:text-[#38b6ad]  transition-all duration-150">
                  Approve
                </button>
                <button
                  type="button"
                  className="h-[24px] w-[73px] bg-[#FBE7E8] text-[#ED5C6C] text-[12px] rounded-md hover:text-[#e73045]  transition-all duration-150">
                  Decline
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <img src={sampleAvatar} alt="" />
                <div className="flex flex-col items-start ">
                  <h1 className="text-[#4A1E90] text-[16px]">Harry Potter</h1>
                  <p className="text-[#7A5488] text-[12px]">By Dumbledore</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <button
                  type="button"
                  className="h-[24px] w-[73px] bg-[#D4F8F8] text-[#6CD1CB] text-[12px] rounded-md hover:text-[#38b6ad]  transition-all duration-150">
                  Approve
                </button>
                <button
                  type="button"
                  className="h-[24px] w-[73px] bg-[#FBE7E8] text-[#ED5C6C] text-[12px] rounded-md hover:text-[#e73045]  transition-all duration-150">
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;