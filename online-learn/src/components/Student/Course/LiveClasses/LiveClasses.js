import React, { useEffect, useState } from "react";
import CourseSidebar from "../CourseSidebar";
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
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../../../Redux/actions/studentActions";
import CourseHeader from "../CourseHeader";
import LiveClassesMain from "./LiveClassesMain";

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

const LiveClasses = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));

  return (
    <div className="bg-[#1a1a1a] w-full sm:w-screen h-screen flex overflow-hidden">
      <CourseSidebar />
      {user !== null && (
        <div className="bg-white flex my-4 w-full rounded-2xl mx-2 sm:mx-0 sm:mr-4 flex-col">
          <CourseHeader />
          <LiveClassesMain />
        </div>
      )}
    </div>
  );
};

export default LiveClasses;
