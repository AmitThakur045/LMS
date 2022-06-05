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
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import {
  addEvent,
  getBatchEvent,
  addBatchLink,
  getBatch,
} from "../../../../../Redux/actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../../Utils/Spinner";
import {
  ADD_BATCH_LINK,
  ADD_EVENT,
  SET_ERRORS,
} from "../../../../../Redux/actionTypes";
import { AiOutlineCloseCircle } from "react-icons/ai";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 10,
  borderRadius: "3px",
  p: 4,
};

const Main = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const batchData = JSON.parse(localStorage.getItem("batch"));

  const [error, setError] = useState({});
  const scheduleData = useSelector((state) => state.admin.batchEvent);
  const batch = useSelector((state) => state.admin.batch);

  const [newEvent, setNewEvent] = useState({
    title: "",
    link: "",
    start: "",
    end: "",
    courseCode: "",
  });

  const [allEvents, setAllEvents] = useState([]);

  const handleAddEvent = (e) => {
    e.preventDefault();

    dispatch(addEvent(batchData.batchCode, newEvent));
  };

  const addLink = (e) => {
    e.preventDefault();
    dispatch(
      addBatchLink({
        batchLink: link.batchLink,
        batchCode: batchData.batchCode,
      })
    );
  };
  useEffect(() => {
    if (scheduleData.length !== 0) {
      setAllEvents(scheduleData);
      setLoading(false);
    }
  }, [scheduleData]);

  useEffect(() => {
    setAllEvents(batchData.schedule);
  }, []);
  console.log(allEvents);

  useEffect(() => {
    if (store.admin.eventAdded) {
      const data = JSON.parse(localStorage.getItem("batch"));
      data.schedule.push(newEvent);
      localStorage.setItem("batch", JSON.stringify(data));
      setAllEvents(data.schedule);
      dispatch({ type: ADD_EVENT, payload: false });
      setNewEvent({ title: "", start: "", end: "", courseCode: "" });
    }
  }, [store.admin.eventAdded]);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    if (store.admin.batchLinkAdded) {
      const data = { ...JSON.parse(localStorage.getItem("batch")), ...link };
      localStorage.setItem("batch", JSON.stringify(data));

      setNewEvent({ ...newEvent, link: link.batchLink });
      dispatch({ type: ADD_BATCH_LINK, payload: false });
      handleClose();
    }
  }, [store.admin.batchLinkAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    setLoading(true);
  }, []);
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState({ batchLink: "" });
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setLink("");
  };

  return (
    <div className="">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="flex flex-col space-y-4 h-[9rem]">
            <div className="flex items-center">
              <div className="self-center w-[95%] font-bold">
                Add Batch Link
              </div>
              <div
                onClick={handleClose}
                className="self-end cursor-pointer w-[5%]">
                <AiOutlineCloseCircle
                  className="text-gray-400 hover:text-gray-500 duration-150 transition-all"
                  fontSize={23}
                />
              </div>
            </div>
            <form onSubmit={addLink} className="flex flex-col space-y-3">
              <TextField
                required
                type="text"
                id="outlined-basic"
                label="Batch Link"
                variant="outlined"
                className="bg-white w-full"
                value={link.batchLink}
                onChange={(e) =>
                  setLink({ ...link, batchLink: e.target.value })
                }
              />
              <Button
                type="submit"
                className="self-end"
                color="error"
                variant="contained">
                Submit
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
      <div className="flex flex-col">
        <div className="flex ml-[50px]">
          <Button onClick={handleOpen} variant="contained">
            {batchData.batchLink ? "Update Batch Link" : "Add Batch Link"}
          </Button>
        </div>
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
              className="w-full h-full space-x-5 px-10 mb-5">
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
                    aria-disabled
                    type="text"
                    id="outlined-basic"
                    label="Link"
                    variant="outlined"
                    className="bg-white w-full"
                    value={batchData.batchLink}
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
                <FormControl required className="">
                  <InputLabel id="demo-simple-select-label">
                    Course Code
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={newEvent.courseCode}
                    label="Course Code"
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, courseCode: e.target.value })
                    }>
                    {batchData.courses.map((course, idx) => (
                      <MenuItem value={course.courseCode}>
                        {course.courseCode}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <button
                type="submit"
                className="mt-[1.6rem] bg-[#FB6C3A] h-[3rem] text-white w-[10rem] rounded-md text-[17px] hover:bg-[#e54e17] transition-all duration-150">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
