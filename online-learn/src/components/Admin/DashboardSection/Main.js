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
import { SET_ERRORS } from "../../../Redux/actionTypes";
import BarGraph from "../../../Utils/BarGraph";
import LineGraph from "../../../Utils/LineGraph";
import Loader from "../../../Utils/Loader";
import PieChart from "../../../Utils/PieChart";
import Spinner from "../../../Utils/Spinner";

const Main = () => {
  const user = JSON.parse(localStorage.getItem("admin"));
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const [dashboardData, setDashboardData] = useState({});
  const [organizationName, setOrganizationName] = useState("All");

  const [width, setWidth] = useState("490px");
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
      setIsLoading(false);
      setError(store.errors);
    }
  }, [store.errors]);

  useEffect(() => {
    if (allDeleteQueries.length !== 0) {
      setDeleteQueries(allDeleteQueries);

      if (Object.keys(adminDashboardData).length !== 0) {
        setIsLoading(false);
      }
    }
  }, [allDeleteQueries]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    if (user.result.sub === "true") {
      dispatch(
        getAdminDashboardDataBySubAdmin({
          organizationName: user.result.organizationName,
          email: user.result.email,
        })
      );
      dispatch(getAllDeleteQueryBySubAdmin({ subAdmin: user.result.email }));
    } else if (user.result.sub === "hr") {
      dispatch(
        getAdminDashboardDataByOrganizationName({
          organizationName: user.result.organizationName,
        })
      );
      dispatch(getAllDeleteQueryBySubAdmin({ subAdmin: user.result.email }));
    } else {
      dispatch(getAllAdminDashboardData());
      dispatch(getAllDeleteQuery({ superAdmin: user.result.email }));
      dispatch(getAllOrganizationName());
    }
  }, []);
  const adminDashboardData = useSelector(
    (state) => state.admin.adminDashboardData
  );

  function handleSizeChange() {
    if (window.innerWidth > 1424) {
      setWidth("600px");
    } else if (window.innerWidth > 1300) {
      setWidth("500px");
    } else if (window.innerWidth > 1024) {
      setWidth("420px");
    } else if (window.innerWidth > 868) {
      setWidth("650px");
    } else if (window.innerWidth > 600) {
      setWidth("550px");
    } else {
      setWidth(toString(window.innerWidth * 0.6) + "px");
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleSizeChange);
  }, []);

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
      if (allDeleteQueries.length !== 0) {
        setIsLoading(false);
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
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader isLoading={isLoading} />
        </div>
      ) : (
        <div className="mt-4 pb-12 lg:px-12 px-3 space-y-16 w-auto overflow-y-auto">
          <div className="flex flex-col sm:flex-row justify-between md:text-[0.9rem] text-[0.8rem] w-full overflow-y-auto">
            <div className="flex items-center border-l-[1px] border-l-[#955FFF] justify-between pl-3 text-primary font-bold">
              <div className="flex flex-col">
                <h1 className="items-start">Batches</h1>
                <p>{dashboardData?.totalBatches}</p>
              </div>
              <img className="hidden lg:block" src={currentIcon} alt="" />
            </div>
            <div className=" flex items-center border-l-[1px] border-l-[#955FFF] justify-between pl-3 text-primary font-bold">
              <div className="flex flex-col">
                <h1 className="items-start">Courses</h1>
                <p>{dashboardData?.totalCourses}</p>
              </div>
              <img className="hidden lg:block" src={currentIcon} alt="" />
            </div>
            <div className=" flex items-center border-l-[1px] border-l-[#955FFF] justify-between pl-3 text-primary font-bold">
              <div className="flex flex-col">
                <h1 className="items-start">Students</h1>
                <p>{dashboardData?.totalStudents}</p>
              </div>
              <img className="hidden lg:block" src={currentIcon} alt="" />
            </div>
            <div className=" flex items-center border-l-[1px] border-l-[#955FFF] justify-between pl-3 text-primary font-bold">
              <div className="flex flex-col">
                <h1 className="items-start">Admins</h1>
                <p>{dashboardData?.totalAdmins}</p>
              </div>
              <img className="hidden lg:block" src={currentIcon} alt="" />
            </div>
          </div>
          <div className="w-full flex justify-start items-center">
            {user.result.sub === "false" && (
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Organizations</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={organizationName}
                  label="Course"
                  onChange={(e) => handleOrganizationNameChange(e)}>
                  <MenuItem value="All">All</MenuItem>
                  {allOrganizationName.map((organization) => (
                    <MenuItem value={organization.organizationName}>
                      {organization.organizationName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </div>
          <div className="flex flex-col justify-center lg:flex-row lg:items-center lg:justify-between overflow-y-auto">
            <div className="">
              {lineChartData.length !== 0 && (
                <LineGraph
                  lineCustomSeries={lineCustomSeries}
                  LinePrimaryXAxis={LinePrimaryXAxis}
                  LinePrimaryYAxis={LinePrimaryYAxis}
                  chartId={"Admission"}
                  height={"420px"}
                  width={width}
                />
              )}
            </div>
            <div className="lg:flex lg:justify-end">
              <BarGraph
                barCustomSeries={barCustomSeries}
                barPrimaryXAxis={barPrimaryXAxis}
                barPrimaryYAxis={barPrimaryYAxis}
                height={"420px"}
                width={width}
              />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col space-x-10">
            <div className="lg:w-[60%] w-full space-y-6">
              <h1 className="text-primary font-bold text-[18px]">Batch</h1>
              <hr />
              <div className="flex items-center space-x-20 justify-evenly">
                <PieChart data={pieChartData} legendVisiblity />
              </div>
            </div>
            <div className="w-[40%] space-y-6">
              <h1 className="text-primary font-bold text-[18px]">
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
                    {error.deleteQueryError}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
