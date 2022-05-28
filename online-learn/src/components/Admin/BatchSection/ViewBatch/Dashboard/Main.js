import React, { useEffect, useState } from "react";
import { ProgressBarComponent } from "@syncfusion/ej2-react-progressbar";
import {
  lineCustomSeries1,
  LinePrimaryXAxis1,
  LinePrimaryYAxis1,
  lineCustomSeries2,
  LinePrimaryXAxis2,
  LinePrimaryYAxis2,
} from "./Data";
import LineGraph from "../../../../../Utils/LineGraph";
const Main = () => {
  const [batchData, setBatchData] = useState({});
  useEffect(() => {
    setBatchData(JSON.parse(localStorage.getItem("batch")));
  }, []);
  return (
    <div className="mt-4 flex flex-col pb-12 px-12 space-y-6 overflow-y-auto bg-[#f4f4f4] h-full">
      <div className="flex justify-between mt-4 ">
        <div className="w-[24%] py-3 flex flex-col space-y-3 bg-white shadow-md rounded-md">
          <p className="self-center font-bold">Batch</p>
          <div className="self-start px-6 flex flex-col justify-between h-full pb-4 text-[#605C94] pt-2">
            <div className="flex space-x-2">
              <h1 className="font-bold">Batch Code: </h1>
              <p>{batchData.batchCode}</p>
            </div>
            <div className="flex space-x-2">
              <h1 className="font-bold">Batch Name: </h1>
              <p>{batchData.batchName}</p>
            </div>
            <div className="flex space-x-2">
              <h1 className="font-bold">Courses: </h1>
              <p>{batchData.courses?.length}</p>
            </div>
            <div className="flex space-x-2">
              <h1 className="font-bold">Students: </h1>
              <p>{batchData.students?.length}</p>
            </div>
          </div>
        </div>
        <div className="w-[24%] py-3 flex flex-col space-y-3 font-semibold  bg-white shadow-md rounded-md">
          <ProgressBarComponent
            id="course"
            type="Circular"
            height="160px"
            width="100%"
            trackThickness={10}
            progressThickness={10}
            value={23}
            enableRtl={false}
            showProgressValue={true}
            trackColor="#F8C7D8"
            radius="100%"
            progressColor="#E3165B"
            cornerRadius="Round"
            animation={{
              enable: true,
              duration: 1000,
              delay: 0,
            }}
          />
          <p className="self-center">Course Status</p>
        </div>
        <div className="w-[24%] py-3 flex flex-col space-y-3 font-semibold bg-white shadow-md rounded-md">
          <ProgressBarComponent
            id="student"
            type="Circular"
            height="160px"
            width="100%"
            trackThickness={10}
            progressThickness={10}
            value={89}
            enableRtl={false}
            showProgressValue={true}
            trackColor="#c7f8d2"
            radius="100%"
            progressColor="#16e327"
            cornerRadius="Round"
            animation={{
              enable: true,
              duration: 1000,
              delay: 0,
            }}
          />
          <p className="self-center">Attendance</p>
        </div>
        <div className="w-[24%] py-3 flex flex-col space-y-3 font-semibold bg-white shadow-md rounded-md">
          <ProgressBarComponent
            id="classes"
            type="Circular"
            height="160px"
            width="100%"
            trackThickness={10}
            progressThickness={10}
            value={52}
            enableRtl={false}
            showProgressValue={true}
            trackColor="#c9c7f8"
            radius="100%"
            progressColor="#2016e3"
            cornerRadius="Round"
            animation={{
              enable: true,
              duration: 1000,
              delay: 0,
            }}
          />
          <p className="self-center">Classes Held</p>
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
          <LineGraph
            lineCustomSeries={lineCustomSeries2}
            LinePrimaryXAxis={LinePrimaryXAxis2}
            LinePrimaryYAxis={LinePrimaryYAxis2}
            chartId={"students"}
            height={"420px"}
            width={"560px"}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
