import React, { useEffect, useState } from "react";
import { ProgressBarComponent } from "@syncfusion/ej2-react-progressbar";
import {
  lineCustomSeries1,
  LinePrimaryXAxis1,
  LinePrimaryYAxis1,
} from "./Data";
import LineGraph from "../../../../../Utils/LineGraph";
import {
  getAttendance,
  getAttendanceStatus,
} from "../../../../../Redux/actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Main = ({ user, batchData }) => {
  const [courseCode, setCourseCode] = useState("");
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const attendances = useSelector((store) => store.admin.attendance);
  const [courseStatusNumber, setCourseStatusNumber] = useState(0);

  function courseStatus() {
    let lessonCompleted = 0;
    let totalLessons = 0;
    for (let i = 0; i < batchData.courses.length; i++) {
      lessonCompleted += batchData.courses[i].complete.lessonCompleted;
      totalLessons += batchData.courses[i].complete.totalLesson;
    }
    console.log(lessonCompleted, totalLessons);
    setCourseStatusNumber(Math.round((lessonCompleted / totalLessons) * 100));
  }

  const attendanceStatus = useSelector((store) => store.admin.attendanceStatus);
  const [totalAttendanceStatus, setTotalAttendanceStatus] = useState(0);
  const [totalClassesHeld, setTotalClassesHeld] = useState(0);
  console.log(attendanceStatus);
  useEffect(() => {
    if (Object.keys(attendanceStatus).length !== 0) {
      let totalClasses = batchData?.schedule.length;
      let totalStudents = batchData?.students.length;
      let totalAttendance = totalClasses * totalStudents;
      if (attendanceStatus.LectureAttended !== 0) {
        setTotalAttendanceStatus(
          Math.round((attendanceStatus.LectureAttended / totalAttendance) * 100)
        );
      }
      if (attendanceStatus.totalClasses !== 0) {
        setTotalClassesHeld(
          Math.round(
            (attendanceStatus.totalClasses / batchData.schedule.length) * 100
          )
        );
      }
    }
  }, [attendanceStatus]);
  useEffect(() => {
    setCourseCode(batchData.courses[0].courseCode);
    courseStatus();
    dispatch(
      getAttendanceStatus({
        batchCode: batchData.batchCode,
      })
    );
  }, []);

  useEffect(() => {
    if (courseCode !== "") {
      dispatch(
        getAttendance({
          batchCode: batchData.batchCode,
          courseCode: courseCode,
        })
      );
      createList();
    }
  }, [courseCode]);

  const lineCustomSeries2 = [
    {
      dataSource: listData,
      xName: "x",
      yName: "y",
      name: "Students",
      width: "2",
      marker: { visible: true, width: 10, height: 10 },
      type: "Line",
    },
  ];

  const LinePrimaryXAxis2 = {
    valueType: "Category",
    labelFormat: "y",
    intervalType: "Date",
    edgeLabelPlacement: "Shift",
    majorGridLines: { width: 0 },
    background: "white",
  };

  const LinePrimaryYAxis2 = {
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
    if (attendances.length !== 0) {
      createList();
    }
  }, [attendances]);

  const createList = () => {
    let list = [];
    for (let i = 0; i < attendances.length; i++) {
      let cnt = 0;
      for (let j = 0; j < attendances[i].students.length; j++) {
        if (attendances[i].students[j].present === true) {
          cnt++;
        }
      }
      list.push({ x: attendances[i].date, y: cnt });
    }

    const newList = list.sort((a, b) => {
      return new Date(a.x) - new Date(b.x);
    });

    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 0; i < newList.length; i++) {
      newList[i].x = new Date(newList[i].x).getDate();
    }

    setListData(newList);
  };

  const handleChange = (event) => {
    setLoading(true);
    setCourseCode(event.target.value);
    dispatch(
      getAttendance({
        batchCode: batchData.batchCode,
        courseCode: event.target.value,
      })
    );

    setLoading(false);
  };

  useEffect(() => {
    createList();
  }, [courseCode]);

  useEffect(() => {
    setLoading(true);
    dispatch(
      getAttendance({ batchCode: batchData.batchCode, courseCode: courseCode })
    );

    setLoading(false);
  }, []);

  return (
    <div className="mt-4 flex flex-col pb-12 px-12 space-y-6 overflow-y-auto bg-[#f4f4f4] h-full">
      {Object.keys(batchData).length !== 0 && (
        <>
          <div className="flex justify-between mt-4 ">
            <div className="w-[24%] py-3 flex flex-col space-y-3 bg-white shadow-md rounded-md">
              <p className="self-center font-bold">Batch</p>
              <div className="self-start px-6 flex flex-col justify-between h-full pb-4 text-primary pt-2">
                <div className="flex space-x-2">
                  <h1 className="font-bold">Batch Code: </h1>
                  <p>{batchData?.batchCode}</p>
                </div>
                <div className="flex space-x-2">
                  <h1 className="font-bold truncate">Batch Name: </h1>
                  <p>{batchData?.batchName}</p>
                </div>
                <div className="flex space-x-2">
                  <h1 className="font-bold">Courses: </h1>
                  <p>{batchData?.courses?.length}</p>
                </div>
                <div className="flex space-x-2">
                  <h1 className="font-bold">Students: </h1>
                  <p>{batchData?.students?.length}</p>
                </div>
                <div className="flex space-x-2">
                  <h1 className="font-bold">Batch Status: </h1>
                  <p>{batchData?.status === false ? "Closed" : "Active"}</p>
                </div>
              </div>
            </div>
            <div className="w-[24%] py-3 flex flex-col space-y-3 font-semibold  bg-white shadow-md rounded-md">
              <ProgressBarComponent
                id="course"
                type="Circular"
                height="160px"
                width="100%"
                style={{ progressColor: "#1111111" }}
                trackThickness={14}
                progressThickness={14}
                value={courseStatusNumber}
                enableRtl={false}
                showProgressValue={true}
                trackColor="#e6f8fe"
                radius="100%"
                progressColor="#046387"
                animation={{
                  enable: true,
                  duration: 1000,
                  delay: 0,
                }}
              />
              <p className="self-center text-primary">Course Status</p>
            </div>
            <div className="w-[24%] py-3 flex flex-col space-y-3 font-semibold bg-white shadow-md rounded-md">
              <ProgressBarComponent
                id="student"
                type="Circular"
                height="160px"
                width="100%"
                trackThickness={14}
                progressThickness={14}
                value={totalAttendanceStatus}
                enableRtl={false}
                showProgressValue={true}
                trackColor="#e6f8fe"
                radius="100%"
                progressColor="#046387"
                animation={{
                  enable: true,
                  duration: 1000,
                  delay: 0,
                }}
              />
              <p className="self-center text-primary">Attendance</p>
            </div>
            <div className="w-[24%] py-3 flex flex-col space-y-3 font-semibold bg-white shadow-md rounded-md">
              <ProgressBarComponent
                id="classes"
                type="Circular"
                height="160px"
                width="100%"
                trackThickness={14}
                progressThickness={14}
                value={totalClassesHeld}
                enableRtl={false}
                showProgressValue={true}
                trackColor="#e6f8fe"
                radius="100%"
                progressColor="#046387"
                animation={{
                  enable: true,
                  duration: 1000,
                  delay: 0,
                }}
              />
              <p className="self-center text-primary">Classes Held</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="bg-white shadow-sm rounded-md p-2">
              <LineGraph
                lineCustomSeries={lineCustomSeries1}
                LinePrimaryXAxis={LinePrimaryXAxis1}
                LinePrimaryYAxis={LinePrimaryYAxis1}
                chartId={"feedback"}
                height={"420px"}
                width={"560px"}
              />
            </div>
            <div className="bg-white shadow-sm rounded-md p-2">
              <div>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small">Course</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={courseCode}
                    label="Course"
                    onChange={(e) => handleChange(e)}>
                    {batchData?.courses.map((course) => (
                      <MenuItem value={course.courseCode}>
                        {course.courseCode}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              {!loading && (
                <LineGraph
                  lineCustomSeries={lineCustomSeries2}
                  LinePrimaryXAxis={LinePrimaryXAxis2}
                  LinePrimaryYAxis={LinePrimaryYAxis2}
                  chartId={"students"}
                  height={"420px"}
                  width={"560px"}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
