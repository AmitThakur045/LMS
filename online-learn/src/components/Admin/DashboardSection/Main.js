import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import currentIcon from "../../../Assests/currentIcon.svg";
import {
  getAdminDashboardDataByOrganizationName,
  getAdminDashboardDataBySubAdmin,
  getAllAdminDashboardData,
  getAllDeleteQuery,
  getAllDeleteQueryBySubAdmin,
  getAllOrganizationName,
  updateDeleteQuery,
} from "../../../Redux/actions/adminActions";
import BarGraph from "../../../Utils/BarGraph";
import LineGraph from "../../../Utils/LineGraph";
import PieChart from "../../../Utils/PieChart";
import Spinner from "../../../Utils/Spinner";

const Main = () => {
  const user = JSON.parse(localStorage.getItem("admin"));
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const [dashboardData, setDashboardData] = useState({});
  const [organizationName, setOrganizationName] = useState("All");

  const [lineChartData, setLineChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteQueries, setDeleteQueries] = useState([]);
  const [noQueryFound, setNoQueryFound] = useState(false);
  const allDeleteQueries = useSelector((state) => state.admin.allDeleteQuery);
  const allOrganizationName = useSelector(
    (state) => state.admin.allOrganizationName
  );
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
    if (user.result.sub === "true") {
      dispatch(
        getAdminDashboardDataBySubAdmin({
          organizationName: user.result.organizationName,
          email: user.result.email,
        })
      );
      dispatch(getAllDeleteQueryBySubAdmin({ subAdmin: user.result.email }));
    } else {
      dispatch(getAllAdminDashboardData());
      dispatch(getAllDeleteQuery());
      dispatch(getAllOrganizationName());
    }
  }, []);
  const adminDashboardData = useSelector(
    (state) => state.admin.adminDashboardData
  );

  useEffect(() => {
    if (Object.keys(adminDashboardData).length !== 0) {
      setDashboardData(adminDashboardData);
      createBarGraphList();
      createPieChartList();
      if (adminDashboardData.dateOfJoinings.length !== 0) {
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
        adminDashboardData.dateOfJoinings.forEach((student) => {
          let idx = new Date(student).getMonth();
          list[idx].y += 1;
        });

        const newList = list.sort((a, b) => {
          return new Date(a.x) - new Date(b.x);
        });

        setLineChartData(newList);
      } else {
        setLineChartData([
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
        ]);
      }
    }
  }, [adminDashboardData]);

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

    if (adminDashboardData?.attendances?.length === 0) {
      setBarChartData(list);
      return;
    }

    adminDashboardData?.attendances?.forEach((attendance) => {
      let idx = new Date(attendance.date).getMonth();
      let count = 0;
      attendance?.students?.forEach((student) => {
        if (student.present === true) {
          count++;
        }
      });
      list[idx].y += count;
    });

    setBarChartData(list);
  };

  const createPieChartList = () => {
    let list = [];
    let totalStudent = 0;

    adminDashboardData.batchStrength?.forEach((batch) => {
      totalStudent += batch.students;
    });

    adminDashboardData.batchStrength?.forEach((batch) => {
      let percentage = (batch.students / totalStudent) * 100;
      list.push({
        x: batch.batchCode,
        y: batch.students,
        text: percentage.toFixed(2) + "%",
      });
    });

    setPieChartData(list);
  };
  const handleOrganizationNameChange = (e) => {
    setOrganizationName(e.target.value);
    if (e.target.value === "All") {
      dispatch(getAllAdminDashboardData());
    } else {
      dispatch(
        getAdminDashboardDataByOrganizationName({
          organizationName: e.target.value,
        })
      );
    }
  };
  return (
    <div className="mt-4 pb-12 px-12 space-y-16 overflow-y-scroll">
      <div className="flex justify-between">
        <div className=" flex items-center border-l-[1px] border-l-[#955FFF] justify-between pl-3 w-[13rem] text-[#605C94] font-bold">
          <div className="flex flex-col">
            <h1 className="items-start">Batches</h1>
            <p>{dashboardData?.totalBatches}</p>
          </div>
          <img src={currentIcon} alt="" />
        </div>
        <div className=" flex items-center border-l-[1px] border-l-[#955FFF] justify-between pl-3 w-[13rem] text-[#605C94] font-bold">
          <div className="flex flex-col">
            <h1 className="items-start">Courses</h1>
            <p>{dashboardData?.totalCourses}</p>
          </div>
          <img src={currentIcon} alt="" />
        </div>
        <div className=" flex items-center border-l-[1px] border-l-[#955FFF] justify-between pl-3 w-[13rem] text-[#605C94] font-bold">
          <div className="flex flex-col">
            <h1 className="items-start">Students</h1>
            <p>{dashboardData?.totalStudents}</p>
          </div>
          <img src={currentIcon} alt="" />
        </div>
        <div className=" flex items-center border-l-[1px] border-l-[#955FFF] justify-between pl-3 w-[13rem] text-[#605C94] font-bold">
          <div className="flex flex-col">
            <h1 className="items-start">Sub Admins</h1>
            <p>{dashboardData?.totalAdmins}</p>
          </div>
          <img src={currentIcon} alt="" />
        </div>
      </div>
      <div>
        {user.result.sub === "false" && (
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Batch</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={organizationName}
              label="Course"
              onChange={(e) => handleOrganizationNameChange(e)}>
              <MenuItem value="All">All</MenuItem>
              {allOrganizationName.map((organization) => (
                <MenuItem value={organization}>{organization}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
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
            <PieChart data={pieChartData} legendVisiblity />
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
                              className="h-[24px] w-[73px] bg-[#D4F8F8] text-[#6CD1CB] text-[12px] rounded-md hover:text-[#38b6ad]  transition-all duration-150">
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
                              className="h-[24px] w-[73px] bg-[#FBE7E8] text-[#ED5C6C] text-[12px] rounded-md hover:text-[#e73045]  transition-all duration-150">
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
                              className="h-[24px] w-[73px] bg-[#D4F8F8] text-[#6CD1CB] text-[12px] rounded-md hover:text-[#38b6ad]  transition-all duration-150">
                              Approved
                            </button>
                          ) : (
                            <>
                              {query.status === false ? (
                                <button
                                  type="button"
                                  className="h-[24px] w-[73px] bg-[#FBE7E8] text-[#ED5C6C] text-[12px] rounded-md hover:text-[#e73045]  transition-all duration-150">
                                  Declined
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="h-[24px] w-[73px] bg-[#ece7fb] text-[#5c61ed] text-[12px] rounded-md hover:text-[#5230e7]  transition-all duration-150">
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
