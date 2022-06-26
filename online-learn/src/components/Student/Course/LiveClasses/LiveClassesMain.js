import React, { useEffect, useState } from "react";

import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const LiveClassesMain = ({ allEvents }) => {
  const [value, setValue] = useState({
    start: "",
    end: "",
    link: "",
    month: "",
    year: "",
    date: "",
  });

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="flex lg:flex-row flex-col overflow-y-auto p-2 overflow-x-auto bg-white h-full">
      <div className="flex md:h-[35rem] h-[45rem] w-[85vw] lg:w-[45rem] p-1">
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          components={{
            timeGutterHeader: function noRefCheck() {},
          }}
          onSelectEvent={function noRefCheck(e) {
            setValue({
              start: e.start.substr(8, 2),
              end: e.end.substr(8, 2),
              link: e.link,
              month: e.start.substr(5, 2),
              year: e.start.substr(0, 4),
              date: e.start,
            });
            console.log(value);
          }}
          style={{ height: "32rem", margin: "10px" }}
        />
      </div>
      <div className="flex-col md:w-[20rem] justify-center md:my-12 rounded-2xl shadow-lg md:h-[20rem] pb-3">
        <div className="text-4xl mt-6 font-bold flex justify-center items-center">
          {value.start}
        </div>
        <div className="flex justify-center items-center text-xl font-semibold">
          {month[value.month - 1]} {value.year}
        </div>
        <div className="flex justify-center my-10 text-orange-900 items-center text-center sm:text-xl text-lg font-semibold">
          Class At: {value.date.substr(11)} PM IST
        </div>
        <div className="flex justify-center items-center mt-4">
          <Button
            style={{
              borderRadius: "50px",
              backgroundColor: "#B33B3B",
              padding: "9px 21px",
              fontSize: "28px",
              fontWeight: "500",
              color: "#fff",
              height: "65px",
              width: "160px",
            }}
            variant="contained">
            <a href={value.link} target="_blank" rel="noreferrer">
              Join
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LiveClassesMain;
