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
import Loader from "../../../../Utils/Loader";
import { getBatch } from "../../../../Redux/actions/adminActions";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";
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
  const [isLoading, setIsLoading] = useState(true);
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allEvents, setAllEvents] = useState([]);
  const events = useSelector((state) => state.student.allEvents);
  const batch = useSelector((state) => state.admin.batch);
  const [batchData, setBatchData] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    if (events.length !== 0) {
      if (Object.keys(batch).length !== 0) {
        setIsLoading(false);
      }
      setAllEvents(events);
    }
  }, [events]);
  useEffect(() => {
    if (Object.keys(batch).length !== 0) {
      if (events.length !== 0 || Object.keys(store.errors).length !== 0) {
        setIsLoading(false);
      }
      setBatchData(batch);
    }
  }, [batch]);
  const logOut = () => {
    alert("OOPS! Your session expired. Please Login again");
    navigate("/login");
  };
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logOut();
      }
    }
    if (JSON.parse(localStorage.getItem("learner")) === null) {
      navigate("/login");
    } else {
      dispatch(getAllEvents({ batchCode: user.result.batchCode }));

      dispatch(
        getBatch({
          batchCode: user?.result.batchCode[user.result.batchCode.length - 1],
        })
      );
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen w-full">
          <Loader isLoading={isLoading} />
        </div>
      ) : (
        <div className="bg-[#1a1a1a] w-full sm:w-screen h-screen flex overflow-hidden">
          <CourseSidebar />
          {user !== null && (
            <div className="bg-white flex my-4 w-full rounded-2xl mx-2 sm:mx-0 sm:mr-4 flex-col">
              <CourseHeader batchData={batchData} />
              <LiveClassesMain allEvents={allEvents} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LiveClasses;
