import React, { useState, useEffect } from "react";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { addEvent, getBatchEvent } from "../../../../../Redux/actions/adminActions"
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

// const events = [
//   {
//     title: "Big Meeting",
//     link: "https://www.google.com",
//     allDay: true,
//     start: new Date(2022, 6, 0),
//     end: new Date(2022, 6, 0),
//   },
//   {
//     title: "Vacation",
//     link: "https://www.google.com",
//     start: new Date(2022, 6, 7),
//     end: new Date(2022, 6, 10),
//   },
//   {
//     title: "Conference",
//     link: "https://www.google.com",
//     start: new Date(2022, 6, 20),
//     end: new Date(2022, 6, 23),
//   },
// ];

const Main = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const batchData = JSON.parse(localStorage.getItem("batch"));
  const scheduleData = useSelector((state) => state.admin.batchEvent);

  const [newEvent, setNewEvent] = useState({
    title: "",
    link: "",
    start: "",
    end: "",
  });

  const [allEvents, setAllEvents] = useState(scheduleData);

  const handleAddEvent = (e) => {
    e.preventDefault();
    console.log("allEvent");
    dispatch(addEvent(batchData.batchCode, newEvent));
    setNewEvent({title: "", link: "", start: "", end: ""});
  }

  useEffect(() => {
    dispatch(getBatchEvent(batchData.batchCode));
    setAllEvents(scheduleData);
  }, [store.eventAdded])

  return (
    <div className="flex">
      <div className="overflow-y-auto flex-[0.7]">
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "50px" }}
        />
      </div>
      <div className="flex-[0.3]">
        <form
          onSubmit={handleAddEvent}
          className="w-full h-full space-x-5 px-10 mb-5"
        >
          <p className="text-xl p-2 text-[#8d91b1]">Add Event</p>
          <div className="flex flex-col w-[100%] space-y-6">
            <div className="flex justify-between w-full">
              <TextField
                required
                type="text"
                id="outlined-basic"
                label="Title"
                variant="outlined"
                className="bg-white w-full"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
            </div>
            <div className="flex justify-between">
              <TextField
                required
                type="text"
                id="outlined-basic"
                label="Link"
                variant="outlined"
                className="bg-white w-full"
                value={newEvent.link}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, link: e.target.value })
                }
              />
            </div>
            <div className="flex-col space-x-8">
              <div>
                <p className="text-[#8d91b1]">Start Time</p>
              </div>
              <div>
                <TextField
                  required
                  type="datetime-local"
                  id="outlined-basic"
                  variant="outlined"
                  className="bg-white w-full"
                  value={newEvent.start}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, start: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex-col space-x-8">
              <div>
                <p className="text-[#8d91b1]">End Time</p>
              </div>
              <div>
                <TextField
                  required
                  type="datetime-local"
                  id="outlined-basic"
                  variant="outlined"
                  className="bg-white w-full"
                  value={newEvent.end}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, end: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-[1.6rem] bg-[#FB6C3A] h-[3rem] text-white w-[10rem] rounded-md text-[17px] hover:bg-[#e54e17] transition-all duration-150"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Main;
