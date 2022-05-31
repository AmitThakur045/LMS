import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAttendance,
  uploadAttendance,
} from "../../../../../../Redux/actions/adminActions";
const Main = () => {
  const studentData = JSON.parse(localStorage.getItem("students"));
  const batchData = JSON.parse(localStorage.getItem("batch"));
  const dispatch = useDispatch();

  const courseCode = JSON.parse(localStorage.getItem("courseCode"));
  const n = 30;
  const [dates, setDates] = useState({});
  const [attendanceRecord, setAttendanceRecord] = useState([]);
  useEffect(() => {
    const temp = new Date();
    setDates({ year: temp.getFullYear(), month: temp.getMonth() });
    dispatch(
      getAttendance({ batchCode: batchData.batchCode, courseCode: courseCode })
    );
  }, []);

  const attendances = useSelector((store) => store.admin.attendance);
  console.log(attendances);

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
  console.log(attendanceRecord);

  const uploadAttendanceRecord = () => {
    dispatch(uploadAttendance(attendanceRecord));
  };

  return (
    <div className="mt-4 flex flex-col pb-12 px-12 space-y-6 overflow-y-scroll overflow-x-hidden h-full ">
      <div className="flex flex-col overflow-x-scroll space-y-3 w-[70rem] h-full">
        <div className="flex ">
          {[...Array(n + 1)].map((date, idx) => (
            <div key={idx} className="flex">
              {idx === 0 ? (
                <div className=" border-2 bg-black text-white w-[15rem] flex items-center px-3 justify-start h-[2.5rem]">
                  Name
                </div>
              ) : (
                <div className="border-2 w-[2.5rem] flex items-center px-3 justify-center h-[2.5rem]">
                  {idx}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col space-y-3">
          {studentData.map((student, index) => (
            <div key={student.email} className="flex">
              {[...Array(n + 1)].map((date, idx) => (
                <div key={idx} className="flex">
                  {idx === 0 ? (
                    <div className=" border-2 bg-black text-white w-[15rem] flex items-center px-3 justify-start h-[2.5rem]">
                      {student.firstName} {student.lastName}
                    </div>
                  ) : (
                    <input
                      dt={new Date(dates.year, dates.month, idx)}
                      em={student.email}
                      maxLength={1}
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
                      className="border-2 w-[2.5rem] flex items-center px-3 justify-center h-[2.5rem]"
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
    </div>
  );
};

export default Main;
