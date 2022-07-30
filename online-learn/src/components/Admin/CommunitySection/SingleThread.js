import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  addThreadReply,
  getThreads,
} from "../../../Redux/actions/studentActions";
import Moment from "react-moment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { ADD_THREAD_REPLY } from "../../../Redux/actionTypes";
const SingleThread = ({ problem, index }) => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("admin")));
  const colors = ["#abc43c", "#c65123", "#1b8d34", "#1b4c8d", "#4a1b8d"];
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [reply, setReply] = useState("");
  const addReply = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      addThreadReply({
        threadId: problem._id,
        reply,
        by: user.result.email,
      })
    );
  };

  useEffect(() => {
    if (store.student.threadReplyAdded) {
      setLoading(false);
      dispatch(getThreads({ communityType: "All" }));
      setReply("");
      dispatch({ type: ADD_THREAD_REPLY, payload: false });
    }
  }, [store.student.threadReplyAdded]);
  return (
    <div
      key={index}
      className="shadow-md shadow-gray-400 flex flex-col rounded-lg px-4 py-5 space-y-4">
      <div className="flex  ">
        <h1 className="bg-primary text-white rounded-full px-2 py-1">
          {problem.problemCategory}
        </h1>
      </div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="lesson">
          <div className="flex items-center space-x-3">
            <h1 className="py-2  text-[22px] font-bold text-primary">
              {problem.problemName}
            </h1>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <p>{problem.problemDescription}</p>
        </AccordionDetails>
      </Accordion>
      <div className="flex">
        <div className="flex-[0.2]">Replies {problem.reply.length}</div>
        <div className="flex-[0.5] space-y-2">
          <div className="spacey-2">
            {problem.reply.map((data, idx) => (
              <Accordion key={idx}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="lesson">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Avatar
                        sx={{
                          width: 30,
                          height: 30,
                          bgcolor: colors[idx % 5],
                        }}
                      />
                      <h1>{data.by}</h1>
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <p>{data.solution}</p>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
          <form
            onSubmit={(e) => addReply(e)}
            className="flex border-2 px-2 py-2 border-gray-300">
            <input
              required
              placeholder="Write a reply..."
              className="flex-[0.9] outline-none px-1"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              type="text"
            />
            <button
              disabled={loading}
              type="submit"
              className="text-blue-400 flex-[0.1] cursor-pointer hover:text-blue-600 duration-150 transition-all">
              {loading ? "Replying" : "Reply"}
            </button>
          </form>
        </div>
        <div className="flex-[0.3] flex items-start space-x-2 justify-end">
          <div className="flex flex-col items-end">
            <h1 className="text-[15px]">{problem.by}</h1>

            <Moment fromNow className="text-[15px]">
              {problem.time}
            </Moment>
          </div>
          <Avatar
            sx={{
              bgcolor: "#f48320",
            }}
            src=""
          />
        </div>
      </div>
    </div>
  );
};

export default SingleThread;
