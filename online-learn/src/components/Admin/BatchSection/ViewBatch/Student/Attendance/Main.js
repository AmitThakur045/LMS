import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAttendance,
  uploadAttendance,
} from "../../../../../../Redux/actions/adminActions";
import { UPLOAD_ATTENDANCE } from "../../../../../../Redux/actionTypes";
import Spinner from "../../../../../../Utils/Spinner";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "November",
  "December",
];
const Main = () => {
  const studentData = JSON.parse(localStorage.getItem("students"));
  const batchData = JSON.parse(localStorage.getItem("batch"));
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const courseCode = JSON.parse(localStorage.getItem("courseCode"));
  const n = 30;
  const [dates, setDates] = useState({});
  const [attendancess, setAttendancess] = useState([]);
  const [attendanceRecord, setAttendanceRecord] = useState([]);
  useEffect(() => {
    const temp = new Date();

    setDates({ year: temp.getFullYear(), month: temp.getMonth() });
    dispatch(
      getAttendance({ batchCode: batchData.batchCode, courseCode: courseCode })
    );
  }, []);

  const attendances = useSelector((store) => store.admin.attendance);

  const markAttendance = (email, date, value) => {
    let data = [...attendanceRecord];
    let temp;
    if (value === "P" || value === "p") {
      temp = true;
    } else if (value === "A" || value === "a") {
      temp = false;
    } else {
      let temp2 = attendanceRecord.findIndex(
        (att) => att.email === email && att.date === date
      );

      data.slice(temp2, 1);
      setAttendanceRecord(data);
    }
    if (value === "P" || value === "A" || value === "p" || value === "a") {
      data.push({
        batchCode: batchData.batchCode,
        courseCode: courseCode,
        date: date,
        student: email,
        present: temp,
      });
      setAttendanceRecord(data);
    }
  };

  const uploadAttendanceRecord = () => {
    dispatch(uploadAttendance(attendanceRecord));
  };

  useEffect(() => {
    if (store.errors || store.admin.attendanceUploaded) {
      setLoading(false);
      if (store.admin.attendanceUploaded) {
        dispatch({ type: UPLOAD_ATTENDANCE, payload: false });
        dispatch(
          getAttendance({
            batchCode: batchData.batchCode,
            courseCode: courseCode,
          })
        );
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.attendanceUploaded]);

  const checkDate = (idx, email) => {
    const date = new Date(dates.year, dates.month, idx);
    if (attendancess.length === 0) {
      return "";
    } else {
      for (let i = 0; i < attendancess.length; i++) {
        if (attendancess[i].date.toString() === date.toString()) {
          for (let j = 0; j < attendancess[i].students.length; j++) {
            if (attendancess[i].students[j].email === email) {
              if (attendancess[i].students[j].present === false) {
                return "A";
              } else {
                return "P";
              }
            }
          }
        }
      }
      return "";
    }
  };

  useEffect(() => {
    setAttendancess(attendances);
  }, [attendances]);

  return (
    <div className="mt-4 flex flex-col pb-12 px-12 space-y-6 overflow-y-scroll overflow-x-hidden h-full ">
      <div className="flex flex-col overflow-x-scroll space-y-3 w-[73rem] rounded-lg py-5 px-4 pr-6 h-full bg-[#f7f7f7]">
        <div className="self-center text-[18px] font-bold text-[#5848a4] mb-4">
          Attendance Report for {months[dates.month]} of {courseCode}
        </div>
        <div className="flex space-x-1">
          {[...Array(n + 1)].map((date, idx) => (
            <div key={idx} className="flex">
              {idx === 0 ? (
                <div className="shadow-md bg-white font-semibold text-[#111111] w-[15rem] flex items-center px-3 justify-start h-[2.5rem]">
                  Name
                </div>
              ) : (
                <div className="shadow-md bg-white font-semibold text-[#111111] w-[2.5rem] flex items-center px-3 justify-center h-[2.5rem]">
                  {idx}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col space-y-3 ">
          {studentData.map((student, index) => (
            <div key={student.email} className="flex space-x-1">
              {[...Array(n + 1)].map((date, idx) => (
                <div key={idx} className="flex ">
                  {idx === 0 ? (
                    <div className="shadow-md bg-white font-semibold text-[#5848e4] w-[15rem] flex items-center px-3 justify-start h-[2.5rem]">
                      {student.firstName} {student.lastName}
                    </div>
                  ) : (
                    <input
                      className="shadow-md bg-white font-semibold text-[#5848e4] w-[2.5rem] flex items-center px-3 justify-center h-[2.5rem]"
                      dt={new Date(dates.year, dates.month, idx)}
                      em={student.email}
                      maxLength={1}
                      placeholder={checkDate(idx, student.email)}
                      autoCapitalize
                      key={idx}
                      onChange={(e) =>
                        markAttendance(
                          e.target.getAttribute("em"),
                          e.target.getAttribute("dt"),
                          e.target.value
                        )
                      }
                      type="text"
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Button
        onClick={uploadAttendanceRecord}
        className="w-[15rem] self-center"
        variant="contained">
        Mark Attendance
      </Button>
      {loading && <Spinner message="Uploading Attendance" />}
    </div>
  );
};

export default Main;