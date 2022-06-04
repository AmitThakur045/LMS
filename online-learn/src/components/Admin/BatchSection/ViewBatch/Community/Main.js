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
const forumData = ["Let's talk career", "Tech Verse"];
const replyData = [
  {
    name: "Rishabh Singh",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, ab.",
    profileColor: "#3c59c4",
  },
  {
    name: "Abhinav Verma",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, ab.",
    profileColor: "#abc43c",
  },
];

const problemData = [
  {
    title: "Techverse not able to launch",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit Volupta odio autem explicabo praesentium error nostrum recusandae corporis, blanditiis non tempore vel ex voluptates, earum reiciendis asperiores sapiente perferendis odit animi at Voluptatum, porro dolorum in, veniam sequi aspernatur quos a, digni praesentium natus vel velit nesciunt fugiat omnis pariatur quod",
    color: "#c65123",
    by: "Manish Uddhav Patil",
    time: "56 Minutes Ago",
    forum: "Tech Verse",
  },
  {
    title: "Power BI Source Code",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit Volupta odio autem explicabo praesentium error nostrum recusandae corporis, blanditiis non tempore vel ex voluptates, earum reiciendis asperiores sapiente perferendis odit animi at Voluptatum, porro dolorum in, veniam sequi aspernatur quos a, digni praesentium natus vel velit nesciunt fugiat omnis pariatur quod",
    color: "#c65123",
    by: "Sahil Kumar",
    time: "1 Hour Ago",
    forum: "Let’s talk career",
  },
  {
    title: "Web Dev Notes",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit Volupta odio autem explicabo praesentium error nostrum recusandae corporis, blanditiis non tempore vel ex voluptates, earum reiciendis asperiores sapiente perferendis odit animi at Voluptatum, porro dolorum in, veniam sequi aspernatur quos a, digni praesentium natus vel velit nesciunt fugiat omnis pariatur quod",
    color: "#c65123",
    by: "Aman K",
    time: "1 hour Ago",
    forum: "Let’s talk career",
  },
];
const Main = () => {
  const [openLounge, setOpenLounge] = useState(false);

  const addOption = () => {};
  return (
    <div className="mt-4 flex pb-12 px-12 space-x-6 overflow-y-scroll h-full overflow-x-hidden">
      <div className="flex-[0.7] flex flex-col space-y-5">
        {problemData.map((problem, index) => (
          <div className="shadow-md shadow-gray-400 flex flex-col rounded-lg px-4 py-5 space-y-4">
            <div className="flex  ">
              <h1 className="bg-[#605C94] text-white rounded-full px-2 py-1">
                {problem.forum}
              </h1>
            </div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="lesson">
                <div className="flex items-center space-x-3">
                  <h1 className="py-2  text-[22px] font-bold text-[#605C94]">
                    {problem.title}
                  </h1>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <p>{problem.description}</p>
              </AccordionDetails>
            </Accordion>
            <div className="flex">
              <div className="flex-[0.2]">Replies 3</div>
              <div className="flex-[0.5] space-y-2">
                <div className="spacey-2">
                  {replyData.map((data, idx) => (
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
                <div className="flex border-2 px-2 py-2 border-gray-300">
                  <input
                    placeholder="Write a reply..."
                    className="flex-[0.9] outline-none px-1"
                    type="text"
                  />
                  <h1 className="text-blue-400 flex-[0.1] cursor-pointer hover:text-blue-600 duration-150 transition-all">
                    Reply
                  </h1>
                </div>
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
          <RiAddFill onClick={() => addOption()} className="cursor-pointer " />
        </div>
        <div
          className={` ${openLounge ? "flex" : "hidden"} flex-col space-y-3`}>
          {forumData.map((data, idx) => (
            <h1
              key={idx}
              className="ml-7 bg-gray-200 w-[10rem] truncate py-1 px-2 rounded-md">
              {data}
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
