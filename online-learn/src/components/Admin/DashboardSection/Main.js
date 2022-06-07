import React, { useEffect, useState } from "react";
import currentIcon from "../../../Assests/currentIcon.svg";

import sampleAvatar from "../../../Assests/sampleAvatar1.svg";

import LineGraph from "../../../Utils/LineGraph";
import BarGraph from "../../../Utils/BarGraph";
import PieChart from "../../../Utils/PieChart";
import {
  // lineCustomSeries,
  // LinePrimaryXAxis,
  // LinePrimaryYAxis,
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
  getAllDeleteQuery,
  updateDeleteQuery,
  getAllDeleteQueryBySubAdmin,
  getAllStudent,
} from "../../../Redux/actions/adminActions";
import { Avatar } from "@mui/material";
import Spinner from "../../../Utils/Spinner";
import { UPDATE_DELETE_QUERY } from "../../../Redux/actionTypes";

const Main = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const user = JSON.parse(localStorage.getItem("user"));
  const allBatches = useSelector((state) => state.admin.allBatch);
  const allCourses = useSelector((state) => state.admin.coursesLength);
  const allStudents = useSelector((state) => state.admin.studentsLength);
  const allAdmins = useSelector((state) => state.admin.adminsLength);
  const attendances = useSelector((store) => store.admin.attendance);
  const allDeleteQueries = useSelector((state) => state.admin.allDeleteQuery);
  const everyStudent = useSelector((state) => state.admin.allStudent);
  const [batches, setBatches] = useState(0);
  const [courses, setCourses] = useState(0);
  const [students, setStudents] = useState(0);
  const [admins, setAdmins] = useState(0);
  const [barChartData, setBarChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);

  const [deleteQueries, setDeleteQueries] = useState([]);
  const [noQueryFound, setNoQueryFound] = useState(false);
  useEffect(() => {
    if (allBatches.length !== 0) {
      setBatches(allBatches.length);
    }
  }, [allBatches]);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setLoading(false);
      setError(store.errors);
    }
  }, [store.errors]);
  useEffect(() => {
    if (allDeleteQueries.length !== 0) {
      setLoading(false);
      setDeleteQueries(allDeleteQueries);
      let flag = true;
      for (let i = 0; i < deleteQueries.length; i++) {
        if (deleteQueries[i].updated.false) {
          flag = false;
        }
      }

      setNoQueryFound(flag);
    }
  }, [allDeleteQueries]);
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
    setLoading(true);
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
      dispatch(getAllDeleteQueryBySubAdmin({ subAdmin: user.result.email }));
    } else {
      dispatch(getAllBatchCodes());
      dispatch(getAllStudentLength());
      dispatch(getAllAdminLength());
    }

    dispatch(getCoursesLength());
    dispatch(getAllDeleteQuery());
    dispatch(getAllStudent());
  }, []);

  console.log("everyStudent", everyStudent);

  // Line Graph
  const lineCustomSeries = [
    {
      dataSource: lineChartData,
      xName: "x",
      yName: "y",
      name: "Admission",
      width: "2",
      marker: { visible: true, width: 10, height: 10 },
      type: "Line",
    },
  ];
  const LinePrimaryXAxis = {
    valueType: "Category",
    labelFormat: "y",
    intervalType: "Date",
    edgeLabelPlacement: "Shift",
    majorGridLines: { width: 0 },
    background: "white",
  };
  const LinePrimaryYAxis = {
    labelFormat: "{value}",
    rangePadding: "None",
    minimum: 0,
    maximum: 10,
    interval: 2,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
  };

  useEffect(() => {
    if (everyStudent.length !== 0) {
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
      everyStudent.map((student) => {
        let idx = new Date(student.dateOfJoining).getMonth();
        list[idx].y += 1;
      });

      const newList = list.sort((a, b) => {
        return new Date(a.x) - new Date(b.x);
      });

      setLineChartData(newList);
    }
  }, [everyStudent]);
  console.log("newList", lineChartData);

  // const barCustomSeries1 = [
  //   {
  //     dataSource: lineChartData,
  //     xName: "x",
  //     yName: "y",
  //     name: "Attendance",
  //     type: "Column",
  //     marker: {
  //       dataLabel: {
  //         visible: true,
  //         position: "Top",
  //         font: { fontWeight: "600", color: "#ffffff" },
  //       },
  //     },
  //   },
  // ];

  // Bar Graph
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
  const createBarGraphList = () => {
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
    }
  }, [allBatches]);

  useEffect(() => {
    if (attendances.length !== 0) {
      createBarGraphList();
    }
  }, [attendances]);

  // console.log("barchart", barChartData);
  // console.log("index", index);
  // console.log("attendance", attendances);
  // console.log("allBatches", allBatches);
  useEffect(() => {
    if (store.admin.deleteQueryUpdated) {
      setLoading(true);
      dispatch(getAllDeleteQuery());
      dispatch({ type: UPDATE_DELETE_QUERY, payload: false });
    }
  }, [store.admin.deleteQueryUpdated]);
  console.log(noQueryFound);

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
        {lineChartData.length !== 0 && (
          <LineGraph
            lineCustomSeries={lineCustomSeries}
            LinePrimaryXAxis={LinePrimaryXAxis}
            LinePrimaryYAxis={LinePrimaryYAxis}
            chartId={"Admission"}
            height={"420px"}
            width={"550px"}
          />
        )}
        {/* <BarGraph 
          barCustomSeries={barCustomSeries1}
          barPrimaryXAxis={barPrimaryXAxis}
          barPrimaryYAxis={barPrimaryYAxis}
        /> */}
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
            {deleteQueries.length !== 0 &&
              deleteQueries.map((query) => (
                <>
                  {user.result.sub === "false" ? (
                    <>
                      {query.updated === false && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            <Avatar src={query.avatar} alt="" />
                            <div className="flex flex-col items-start ">
                              <h1 className="text-[#4A1E90] text-[16px]">
                                {query.code}
                              </h1>
                              <p className="text-[#7A5488] text-[12px]">
                                {query.subAdmin}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-6">
                            <button
                              onClick={() =>
                                dispatch(
                                  updateDeleteQuery({
                                    code: query.code,
                                    subAdmin: query.subAdmin,
                                    status: true,
                                  })
                                )
                              }
                              type="button"
                              className="h-[24px] w-[73px] bg-[#D4F8F8] text-[#6CD1CB] text-[12px] rounded-md hover:text-[#38b6ad]  transition-all duration-150"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                dispatch(
                                  updateDeleteQuery({
                                    code: query.code,
                                    subAdmin: query.subAdmin,
                                    status: false,
                                  })
                                )
                              }
                              type="button"
                              className="h-[24px] w-[73px] bg-[#FBE7E8] text-[#ED5C6C] text-[12px] rounded-md hover:text-[#e73045]  transition-all duration-150"
                            >
                              Decline
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <Avatar src={query.avatar} alt="" />
                          <div className="flex flex-col items-start ">
                            <h1 className="text-[#4A1E90] text-[16px]">
                              {query.code}
                            </h1>
                            <p className="text-[#7A5488] text-[12px]">
                              {query.subAdmin}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6">
                          {query.status === true ? (
                            <button
                              type="button"
                              className="h-[24px] w-[73px] bg-[#D4F8F8] text-[#6CD1CB] text-[12px] rounded-md hover:text-[#38b6ad]  transition-all duration-150"
                            >
                              Approved
                            </button>
                          ) : (
                            <>
                              {query.status === false ? (
                                <button
                                  type="button"
                                  className="h-[24px] w-[73px] bg-[#FBE7E8] text-[#ED5C6C] text-[12px] rounded-md hover:text-[#e73045]  transition-all duration-150"
                                >
                                  Declined
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="h-[24px] w-[73px] bg-[#ece7fb] text-[#5c61ed] text-[12px] rounded-md hover:text-[#5230e7]  transition-all duration-150"
                                >
                                  Waiting
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </>
              ))}

            {loading && <Spinner message="Loading" />}
            {error.deleteQueryError && (
              <p className="text-red-500 flex self-center">
                {error.noQueryFound}
              </p>
            )}
            {noQueryFound && user.result.sub === "false" && (
              <p className="text-red-500 flex self-center">No Query Found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
