import React, { useState } from "react";
import CourseSidebar from "./CourseSidebar";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { NavLink } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@mui/material";
import Calender from "../Utils/Calender";
import { scheduleData } from "./Data";

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

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2022, 5, 0),
    end: new Date(2022, 5, 0),
  },
  {
    title: "Vacation",
    start: new Date(2022, 5, 7),
    end: new Date(2022, 5, 10),
  },
  {
    title: "Conference",
    start: new Date(2022, 5, 20),
    end: new Date(2022, 5, 23),
  },
];

const LiveClasses = () => {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  var date = new Date();
  let newDate = date.getDate();
  let monthAndYear = new Date(date).toLocaleString("en-us", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-black w-screen h-screen flex overflow-hidden">
      <CourseSidebar />
      <div className="h-[45.5rem] bg-white flex-[0.93] my-4 rounded-2xl mr-4 flex flex-col">
        <div className="h-24 bg-[#373737] w-full rounded-tl-2xl rounded-tr-2xl flex">
          <div className="text-white text-[24px] space-y-1 flex-[0.8] pl-6 py-4">
            <h1>Live Classes</h1>
            <p className="text-[#E4BE34] text-[14px]">
              0 Classes completed | 0/1 Projects Done
            </p>
          </div>
          <div className="flex-[0.2] rounded-tr-2xl h-full flex">
            <NavLink
              to="/community"
              className="bg-[#C4C4C4] h-full flex flex-col items-center flex-[0.4] justify-center">
              <PeopleIcon fontSize="medium" className="" />
              <p className="text-base">Community</p>
            </NavLink>
            <NavLink
              to="/help"
              className="text-white h-full flex flex-col items-center flex-[0.4] justify-center">
              <HelpOutlineIcon fontSize="medium" className="" />
              <p className="text-base">Help</p>
            </NavLink>
            <NavLink
              to="/notes"
              className="text-white h-full flex flex-col items-center flex-[0.4] justify-center">
              <FormatListNumberedIcon fontSize="medium" className="" />
              <p className="text-base">Notes</p>
            </NavLink>
          </div>
        </div>
        <div className="flex">
          <div className="flex-[0.80] h-full p-1 m-0">
            {/* <Calender scheduleData={scheduleData} /> */}
            <Calendar
              localizer={localizer}
              // events={allEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500, margin: "50px" }}
            />
          </div>
          <div className="flex-[0.22] mx-24 justify-center my-12 rounded-2xl shadow-lg h-[20rem]">
            <div className="text-4xl mt-6 font-bold flex justify-center items-center">
              {newDate}
            </div>
            <div className="flex justify-center items-center text-xl font-semibold">
              {monthAndYear}
            </div>
            <div className="flex justify-center my-10 text-orange-900 items-center text-xl font-semibold">
              Class At: 04:00 PM IST
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
                Join
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveClasses;
