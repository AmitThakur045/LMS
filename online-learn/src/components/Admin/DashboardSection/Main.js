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
  barCustomSeries,
  barPrimaryXAxis,
  barPrimaryYAxis,
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
  getAllDeleteQuery,
  updateDeleteQuery,
  getAllDeleteQueryBySubAdmin,
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
  const allDeleteQueries = useSelector((state) => state.admin.allDeleteQuery);
  const [batches, setBatches] = useState(0);
  const [courses, setCourses] = useState(0);
  const [students, setStudents] = useState(0);
  const [admins, setAdmins] = useState(0);
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
      let data = deleteQueries.find((query) => query.updated.false);
      if (!data) {
        setNoQueryFound(true);
      }
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
  }, []);

  useEffect(() => {
    if (store.admin.deleteQueryUpdated) {
      setLoading(true);
      dispatch(getAllDeleteQuery());
      dispatch({ type: UPDATE_DELETE_QUERY, payload: false });
    }
  }, [store.admin.deleteQueryUpdated]);

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
