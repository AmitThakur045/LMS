import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { MdForum, MdArrowDropDown, MdArrowRight } from "react-icons/md";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { RiAddFill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
const forums = ["Let's talk career", "Tech Verse"];

const problems = [
  {
    title: "Techverse not able to launch",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit Volupta odio autem explicabo praesentium error nostrum recusandae corporis, blanditiis non tempore vel ex voluptates, earum reiciendis asperiores sapiente perferendis odit animi at Voluptatum, porro dolorum in, veniam sequi aspernatur quos a, digni praesentium natus vel velit nesciunt fugiat omnis pariatur quod",
    color: "#c65123",
    by: "Manish Uddhav Patil",
    time: "56 Minutes Ago",
    forum: "Tech Verse",
    replyData: [
      {
        name: "Rishabh Singh",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, ab.",
        profileColor: "#abc43c",
      },
      {
        name: "Abhinav Verma",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, ab.",
        profileColor: "#abc43c",
      },
    ],
  },
  {
    title: "Power BI Source Code",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit Volupta odio autem explicabo praesentium error nostrum recusandae corporis, blanditiis non tempore vel ex voluptates, earum reiciendis asperiores sapiente perferendis odit animi at Voluptatum, porro dolorum in, veniam sequi aspernatur quos a, digni praesentium natus vel velit nesciunt fugiat omnis pariatur quod",
    color: "#c65123",
    by: "Sahil Kumar",
    time: "1 Hour Ago",
    forum: "Let’s talk career",
    replyData: [
      {
        name: "Rishabh Singh",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, ab.",
        profileColor: "#abc43c",
      },
      {
        name: "Abhinav Verma",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, ab.",
        profileColor: "#abc43c",
      },
    ],
  },
  {
    title: "Web Dev Notes",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit Volupta odio autem explicabo praesentium error nostrum recusandae corporis, blanditiis non tempore vel ex voluptates, earum reiciendis asperiores sapiente perferendis odit animi at Voluptatum, porro dolorum in, veniam sequi aspernatur quos a, digni praesentium natus vel velit nesciunt fugiat omnis pariatur quod",
    color: "#c65123",
    by: "Aman K",
    time: "1 hour Ago",
    forum: "Let’s talk career",
    replyData: [
      {
        name: "Rishabh Singh",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, ab.",
        profileColor: "#abc43c",
      },
      {
        name: "Abhinav Verma",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, ab.",
        profileColor: "#abc43c",
      },
    ],
  },
];
const Main = () => {
  const [openLounge, setOpenLounge] = useState(false);
  const [reply, setReply] = useState([""]);
  const [problemData, setProblemData] = useState(problems);
  const [forumData, setForumData] = useState(forums);
  const [forum, setForum] = useState("");
  const addOption = (e) => {
    e.preventDefault();
    let data = [...forumData];
    data.push(forum);
    setForumData(data);
    setForum("");
  };
  const addReply = (e, index) => {
    e.preventDefault();
    let data = [...problemData];

    data[index].replyData.push({
      name: "TheBrad",
      description: reply,
      profileColor: "#abc43c",
    });
    setProblemData(data);
    setReply([""]);
  };
  const handleChange = (e, index) => {
    let data = [...reply];
    data[index] = e.target.value;
    setReply(data);
  };
  const deleteOption = (index) => {
    let data = [...forumData];
    data.splice(index, 1);
    setForumData(data);
  };

  return (
    <div className="mt-4 flex pb-12 px-12 space-x-6 overflow-y-scroll h-full overflow-x-hidden">
      <div className="flex-[0.7] flex flex-col space-y-5">
        {problemData.map((problem, index) => (
          <div
            key={index}
            className="shadow-md shadow-gray-400 flex flex-col rounded-lg px-4 py-5 space-y-4">
            <div className="flex  ">
              <h1 className="bg-primary text-white rounded-full px-2 py-1">
                {problem.forum}
              </h1>
            </div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="lesson">
                <div className="flex items-center space-x-3">
                  <h1 className="py-2  text-[22px] font-bold text-primary">
                    {problem.title}
                  </h1>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <p>{problem.description}</p>
              </AccordionDetails>
            </Accordion>
            <div className="flex">
              <div className="flex-[0.2]">
                Replies {problem.replyData.length}
              </div>
              <div className="flex-[0.5] space-y-2">
                <div className="spacey-2">
                  {problem.replyData.map((data, idx) => (
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
                                bgcolor: data.profileColor,
                              }}
                            />
                            <h1>{data.name}</h1>
                          </div>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p>{data.description}</p>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>
                <form
                  onSubmit={(e) => addReply(e, index)}
                  className="flex border-2 px-2 py-2 border-gray-300">
                  <input
                    required
                    placeholder="Write a reply..."
                    className="flex-[0.9] outline-none px-1"
                    value={reply[index]}
                    onChange={(e) => handleChange(e, index)}
                    type="text"
                  />
                  <button
                    type="submit"
                    className="text-blue-400 flex-[0.1] cursor-pointer hover:text-blue-600 duration-150 transition-all">
                    Reply
                  </button>
                </form>
              </div>
              <div className="flex-[0.3] flex items-start space-x-2 justify-end">
                <div className="flex flex-col items-end">
                  <h1 className="text-[15px]">{problem.by}</h1>
                  <p className="text-[15px]">{problem.time}</p>
                </div>
                <Avatar sx={{ bgcolor: problem.color }} src="" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-[0.3] rounded-lg shadow-md shadow-gray-400 px-5 py-4 pb-5 space-y-4 h-fit min-h-[10rem]">
        <div className="flex space-x-3 items-center ">
          <MdForum size={40} />
          <h1 className="font-bold text-[25px]">Forums</h1>
        </div>
        <div className="flex items-center space-x-3">
          {openLounge ? (
            <MdArrowDropDown
              className="bg-gray-300 cursor-pointer"
              onClick={() => setOpenLounge(!openLounge)}
            />
          ) : (
            <MdArrowRight
              className="bg-gray-300 cursor-pointer"
              onClick={() => setOpenLounge(!openLounge)}
            />
          )}
          <h1 className="text-gray-600">Lounge - General</h1>
        </div>
        <div
          className={` ${openLounge ? "flex" : "hidden"} flex-col space-y-3`}>
          {forumData.map((data, idx) => (
            <div className="flex space-x-3 items-center">
              <AiFillDelete
                onClick={() => deleteOption(idx)}
                className="cursor-pointer text-gray-500 hover:text-gray-800 duration-150 transition-all"
              />
              <h1
                key={idx}
                className="ml-7 bg-gray-200 w-[10rem] truncate py-1 px-2 rounded-md">
                {data}
              </h1>
            </div>
          ))}
          <form
            onSubmit={(e) => addOption(e)}
            className="flex space-x-3 items-center">
            <RiAddFill
              onClick={(e) => addOption(e)}
              type="button"
              className="cursor-pointer text-gray-500 hover:text-gray-800 duration-150 transition-all"
            />

            <input
              required
              placeholder="Add New"
              type="text"
              value={forum}
              onChange={(e) => setForum(e.target.value)}
              className="ml-7 bg-gray-200 w-[10rem]  py-1 px-2 rounded-md outline-none"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Main;
