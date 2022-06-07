import React, { useEffect, useState } from "react";
import currentIcon from "../../../Assests/currentIcon.svg";

import sampleAvatar from "../../../Assests/sampleAvatar1.svg";

import LineGraph from "../../../Utils/LineGraph";
import BarGraph from "../../../Utils/BarGraph";
import PieChart from "../../../Utils/PieChart";
import {
  lineCustomSeries,
  LinePrimaryXAxis,
  LinePrimaryYAxis,
  // barCustomSeries,
  // barPrimaryXAxis,
  // barPrimaryYAxis,
  pieChartData as data,
} from "./Data";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBatchCodes,
  getAllStudentLength,
  getBatchCodesByOrganizationName,
  getCoursesLength,
  getStudentsLengthByOrganizationName,
  getAdminsLengthByOrganizationName,
  getAllAdminLength,
  getAttendanceByBatchCodes,
} from "../../../Redux/actions/adminActions";

const Main = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const allBatches = useSelector((state) => state.admin.allBatch);
  const allCourses = useSelector((state) => state.admin.coursesLength);
  const allStudents = useSelector((state) => state.admin.studentsLength);
  const allAdmins = useSelector((state) => state.admin.adminsLength);
  const attendances = useSelector((store) => store.admin.attendance);
  const [batches, setBatches] = useState(0);
  const [courses, setCourses] = useState(0);
  const [students, setStudents] = useState(0);
  const [admins, setAdmins] = useState(0);
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    if (allBatches.length !== 0) {
      setBatches(allBatches.length);
    }
  }, [allBatches]);
  useEffect(() => {
    if (allCourses.length !== 0) {
      setCourses(allCourses);
    }
  }, [allCourses]);
  useEffect(() => {
    if (allStudents.length !== 0) {
      setStudents(allStudents);
    }
  }, [allStudents]);
  useEffect(() => {
    if (allAdmins.length !== 0) {
      setAdmins(allAdmins);
    }
  }, [allAdmins]);

  useEffect(() => {
    if (user.result.sub === "true") {
      dispatch(
        getBatchCodesByOrganizationName({
          organizationName: user.result.organizationName,
          subAdmin: user.result.email,
        })
      );
      dispatch(
        getStudentsLengthByOrganizationName({
          organizationName: user.result.organizationName,
          subAdmin: user.result.email,
        })
      );
      dispatch(
        getAdminsLengthByOrganizationName({
          organizationName: user.result.organizationName,
        })
      );
    } else {
      dispatch(getAllBatchCodes());
      dispatch(getAllStudentLength());
      dispatch(getAllAdminLength());
    }
    dispatch(getCoursesLength());
  }, []);

  const barCustomSeries = [
    {
      dataSource: barChartData,
      xName: "x",
      yName: "y",
      name: "Attendance",
      type: "Column",
      marker: {
        dataLabel: {
          visible: true,
          position: "Top",
          font: { fontWeight: "600", color: "#ffffff" },
        },
      },
    },
  ];

  const barPrimaryXAxis = {
    valueType: "Category",
    interval: 1,
    majorGridLines: { width: 0 },
  };
  const barPrimaryYAxis = {
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 },
    labelStyle: { color: "transparent" },
  };

  // const [index, setIndex] = useState(0);
  const createList = () => {
    let list = [
      { x: "Jan", y: 0 },
      { x: "Feb", y: 0 },
      { x: "Mar", y: 0 },
      { x: "Apr", y: 0 },
      { x: "May", y: 0 },
      { x: "Jun", y: 0 },
      { x: "Jul", y: 0 },
      { x: "Aug", y: 0 },
      { x: "Sep", y: 0 },
      { x: "Oct", y: 0 },
      { x: "Nov", y: 0 },
      { x: "Dec", y: 0 },
    ];

    attendances?.map((attendance) => {
      let idx = new Date(attendance?.date).getMonth();
      let count = 0;
      attendance?.students?.map((student) => {
        if (student.present === true) {
          count++;
        }
      });
      list[idx].y += count;
    });

    setBarChartData(list);
  };

  useEffect(() => {
    if (allBatches.length !== 0) {
      dispatch(getAttendanceByBatchCodes({ allBatches }));
      createList();
    }
  }, [allBatches]);

  // console.log("barchart", barChartData);
  // console.log("index", index);
  // console.log("attendance", attendances);
  // console.log("allBatches", allBatches);

  return (
    <div className="mt-4 pb-12 px-12 space-y-16 overflow-y-scroll">
      <div className="flex justify-between">
        <div className=" flex items-center border-l-[1px] border-l-[#955FFF] justify-between pl-3 w-[13rem] text-[#605C94] font-bold">
          <div className="flex flex-col">
            <h1 className="items-start">Batches</h1>
            <p>{batches}</p>
          </div>
          <img src={currentIcon} alt="" />
        </div>
        <div className=" flex items-center border-l-[1px] border-l-[#955FFF] justify-between pl-3 w-[13rem] text-[#605C94] font-bold">
          <div className="flex flex-col">
            <h1 className="items-start">Courses</h1>
            <p>{courses}</p>
          </div>
          <img src={currentIcon} alt="" />
        </div>
        <div className=" flex items-center border-l-[1px] border-l-[#955FFF] justify-between pl-3 w-[13rem] text-[#605C94] font-bold">
          <div className="flex flex-col">
            <h1 className="items-start">Students</h1>
            <p>{students}</p>
          </div>
          <img src={currentIcon} alt="" />
        </div>
        <div className=" flex items-center border-l-[1px] border-l-[#955FFF] justify-between pl-3 w-[13rem] text-[#605C94] font-bold">
          <div className="flex flex-col">
            <h1 className="items-start">Sub Admins</h1>
            <p>{admins}</p>
          </div>
          <img src={currentIcon} alt="" />
        </div>
      </div>
      <div className="flex justify-between">
        <LineGraph
          lineCustomSeries={lineCustomSeries}
          LinePrimaryXAxis={LinePrimaryXAxis}
          LinePrimaryYAxis={LinePrimaryYAxis}
          chartId={"TeacherStudents"}
          height={"420px"}
          width={"550px"}
        />
        <BarGraph
          barCustomSeries={barCustomSeries}
          barPrimaryXAxis={barPrimaryXAxis}
          barPrimaryYAxis={barPrimaryYAxis}
        />
      </div>
      <div className="flex space-x-10">
        <div className="w-[60%] space-y-6">
          <h1 className="text-[#510B88] font-bold text-[18px]">Batch</h1>
          <hr />
          <div className="flex items-center space-x-20 justify-evenly">
            <PieChart data={data} legendVisiblity />
          </div>
        </div>
        <div className="w-[40%] space-y-6">
          <h1 className="text-[#510B88] font-bold text-[18px]">
            Student Queries
          </h1>
          <hr />
          <div className="flex flex-col space-y-4 overflow-y-auto h-[25rem] ">
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
                  className="h-[24px] w-[73px] bg-[#D4F8F8] text-[#6CD1CB] text-[12px] rounded-md hover:text-[#38b6ad]  transition-all duration-150"
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="h-[24px] w-[73px] bg-[#FBE7E8] text-[#ED5C6C] text-[12px] rounded-md hover:text-[#e73045]  transition-all duration-150"
                >
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
                  className="h-[24px] w-[73px] bg-[#D4F8F8] text-[#6CD1CB] text-[12px] rounded-md hover:text-[#38b6ad]  transition-all duration-150"
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="h-[24px] w-[73px] bg-[#FBE7E8] text-[#ED5C6C] text-[12px] rounded-md hover:text-[#e73045]  transition-all duration-150"
                >
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
                  className="h-[24px] w-[73px] bg-[#D4F8F8] text-[#6CD1CB] text-[12px] rounded-md hover:text-[#38b6ad]  transition-all duration-150"
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="h-[24px] w-[73px] bg-[#FBE7E8] text-[#ED5C6C] text-[12px] rounded-md hover:text-[#e73045]  transition-all duration-150"
                >
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
                  className="h-[24px] w-[73px] bg-[#D4F8F8] text-[#6CD1CB] text-[12px] rounded-md hover:text-[#38b6ad]  transition-all duration-150"
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="h-[24px] w-[73px] bg-[#FBE7E8] text-[#ED5C6C] text-[12px] rounded-md hover:text-[#e73045]  transition-all duration-150"
                >
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
                  className="h-[24px] w-[73px] bg-[#D4F8F8] text-[#6CD1CB] text-[12px] rounded-md hover:text-[#38b6ad]  transition-all duration-150"
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="h-[24px] w-[73px] bg-[#FBE7E8] text-[#ED5C6C] text-[12px] rounded-md hover:text-[#e73045]  transition-all duration-150"
                >
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
                  className="h-[24px] w-[73px] bg-[#D4F8F8] text-[#6CD1CB] text-[12px] rounded-md hover:text-[#38b6ad]  transition-all duration-150"
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="h-[24px] w-[73px] bg-[#FBE7E8] text-[#ED5C6C] text-[12px] rounded-md hover:text-[#e73045]  transition-all duration-150"
                >
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
