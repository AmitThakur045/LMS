import React, { useState } from "react";
import Course1_img from "../Assests/Course1_img.svg";
import Course2_img from "../Assests/Course2_img.svg";

import StarIcon from "@mui/icons-material/Star";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { NavLink, useNavigate } from "react-router-dom";
import HomeSidebar from "./HomeSidebar";

const sampleDate = [
  {
    img: Course1_img,
    title: "Learning Strategy: how instead of what",
    description:
      "Sed sem felis, efficitur eget lacus nec, dignissim consequat ipsum. Aenean venenatis, sem vehicula finibus suscipit, risus ex lobortis dui, vestibulum tempor magna quam sed justo. Proin vel nisi dui. Phasellus sit amet tempor leo. Sed sagittis",
    stars: 5,
    difficulty: "Beginner",
    courseContent: [
      {
        title: "Intro",
        description:
          "Suspendisse in elit non lacus tincidunt fermentum Suspendisse in elit non lacus ",
      },
      {
        title: "Lesson 1",
        description:
          "Suspendisse in elit non lacus tincidunt fermentum Suspendisse in elit non lacus ",
      },
    ],
  },
  {
    img: Course2_img,
    title: "Learning Strategy: how instead of what",
    description:
      "Sed sem felis, efficitur eget lacus nec, dignissim consequat ipsum. Aenean venenatis, sem vehicula finibus suscipit, risus ex lobortis dui, vestibulum tempor magna quam sed justo. Proin vel nisi dui. Phasellus sit amet tempor leo. Sed sagittis",
    stars: 5,
    difficulty: "Beginner",
    courseContent: [
      {
        title: "Intro",
        description:
          "Suspendisse in elit non lacus tincidunt fermentum Suspendisse in elit non lacus ",
      },
      {
        title: "Lesson 1",
        description:
          "Suspendisse in elit non lacus tincidunt fermentum Suspendisse in elit non lacus ",
      },
    ],
  },
  {
    img: Course1_img,
    title: "Learning Strategy: how instead of what",
    description:
      "Sed sem felis, efficitur eget lacus nec, dignissim consequat ipsum. Aenean venenatis, sem vehicula finibus suscipit, risus ex lobortis dui, vestibulum tempor magna quam sed justo. Proin vel nisi dui. Phasellus sit amet tempor leo. Sed sagittis",
    stars: 5,
    difficulty: "Beginner",
    courseContent: [
      {
        title: "Intro",
        description:
          "Suspendisse in elit non lacus tincidunt fermentum Suspendisse in elit non lacus ",
      },
      {
        title: "Lesson 1",
        description:
          "Suspendisse in elit non lacus tincidunt fermentum Suspendisse in elit non lacus ",
      },
    ],
  },
  {
    img: Course1_img,
    title: "Learning Strategy: how instead of what",
    description:
      "Sed sem felis, efficitur eget lacus nec, dignissim consequat ipsum. Aenean venenatis, sem vehicula finibus suscipit, risus ex lobortis dui, vestibulum tempor magna quam sed justo. Proin vel nisi dui. Phasellus sit amet tempor leo. Sed sagittis",
    stars: 5,
    difficulty: "Beginner",
    courseContent: [
      {
        title: "Intro",
        description:
          "Suspendisse in elit non lacus tincidunt fermentum Suspendisse in elit non lacus ",
      },
      {
        title: "Lesson 1",
        description:
          "Suspendisse in elit non lacus tincidunt fermentum Suspendisse in elit non lacus ",
      },
    ],
  },
];

var colors = ["#C87343", "#DFB23C", "#4F8834", "#345688", "#813488"];

const Home = () => {
  const navigate = useNavigate();

  const [totalStars, setTotalStars] = useState([]);
  const [openCourse, setOpenCourse] = useState(sampleDate[0]);
  const calculateTotalStars = (stars) => {
    setTotalStars([]);
    const list = [];
    for (let index = 0; index < stars; index++) {
      list.push(StarIcon);
    }
    setTotalStars(list);
  };
  console.log(openCourse);

  return (
    <div className="bg-black w-screen h-screen flex overflow-hidden">
      <HomeSidebar />
      <div className="h-[45.5rem] bg-white flex-[0.93] my-4 rounded-2xl mr-4 flex">
        <div className="flex flex-col flex-[0.45] bg-[#F9F9F9] rounded-tl-2xl rounded-bl-2xl  pt-[53px]">
          <h1 className="font-bold text-[40px] px-[52px]">Courses</h1>
          <div className=" px-[52px] flex  mt-[15px] space-x-7 text-[16px] mb-10 ">
            <p className="">All</p>
            <p className="text-[#AAAAAA]">Active</p>
            <p className="text-[#AAAAAA]">Completed</p>
          </div>
          <div className="space-y-4 px-[52px] scrollbar-thin scrollbar-track-white scrollbar-thumb-black overflow-y-auto">
            {sampleDate.map((data, i) => (
              <div
                onClick={() => setOpenCourse(data)}
                key={i}
                className="flex cursor-pointer hover:scale-105 duration-150 transition-all bg-white h-[9.125rem] shadow-md rounded-2xl p-3 ">
                <NavLink
                  to="/course"
                  className="relative h-[7.8125rem] w-[17.125rem] bg-black">
                  <img
                    src={data.img}
                    className="hover:opacity-50 w-full h-full "
                    alt=""
                  />
                  <PlayCircleOutlineIcon
                    fontSize="large"
                    className="absolute text-white top-[50%] left-[50%] backdrop-blur-md -translate-x-[50%] -translate-y-[50%]"
                  />
                </NavLink>
                <div className="ml-5">
                  <h4 className="font-bold text-[15px] mb-3">{data.title}</h4>
                  <p className="text-[12px] text-[#ADADAD]">
                    {data.description.slice(0, 100)}
                  </p>
                  <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center space-x-2">
                      <div className="">
                        <StarIcon
                          sx={{ fontSize: 15 }}
                          className="text-[#ED8A19]"
                        />
                        <StarIcon
                          sx={{ fontSize: 15 }}
                          className="text-[#ED8A19]"
                        />
                        <StarIcon
                          sx={{ fontSize: 15 }}
                          className="text-[#ED8A19]"
                        />
                        <StarIcon
                          sx={{ fontSize: 15 }}
                          className="text-[#ED8A19]"
                        />
                        <StarIcon
                          sx={{ fontSize: 15 }}
                          className="text-[#ED8A19]"
                        />
                      </div>
                      <p>5</p>
                    </div>
                    <p className="text-xs text-[#8B8B8B] bg-[#EEEEEE] py-1 px-2 rounded-md ">
                      {data.difficulty}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-[0.55] bg-white rounded-tr-2xl rounded-br-2xl">
          {openCourse && (
            <div className="w-full flex flex-col mt-4 scrollbar-thin scrollbar-track-white scrollbar-thumb-black overflow-y-auto">
              <img
                src={openCourse.img}
                className="w-[45.75rem] h-[23.75rem] object-cover self-center rounded-2xl"
                alt=""
              />
              <div className="flex items-center my-6 mx-6 space-x-10">
                <div className="flex items-center space-x-2">
                  <div className="">
                    <StarIcon
                      sx={{ fontSize: 20 }}
                      className="text-[#ED8A19]"
                    />
                    <StarIcon
                      sx={{ fontSize: 20 }}
                      className="text-[#ED8A19]"
                    />
                    <StarIcon
                      sx={{ fontSize: 20 }}
                      className="text-[#ED8A19]"
                    />
                    <StarIcon
                      sx={{ fontSize: 20 }}
                      className="text-[#ED8A19]"
                    />
                    <StarIcon
                      sx={{ fontSize: 20 }}
                      className="text-[#ED8A19]"
                    />
                  </div>
                  <p className="text-xl font-bold">5</p>
                </div>
                <p className="text-xs text-[#8B8B8B] bg-[#EEEEEE] py-1 px-2 rounded-md ">
                  {openCourse.difficulty}
                </p>
              </div>
              <h1 className="mx-6 text-[24px] font-bold">{openCourse.title}</h1>
              <p className="mx-6 text-[18px] my-5 text-[#A1A1A1]">
                {openCourse.description}
              </p>
              <div className="mx-6">
                <h1 className="font-bold text-[24px] mb-3">Course's Content</h1>
                <div className="space-y-5">
                  {openCourse.courseContent.map((content, i) => (
                    <div
                      key={i}
                      className="h-[9.75rem] border-[1px] rounded-2xl flex">
                      <div
                        className={`w-full flex-[0.3] bg-[${
                          colors[Math.floor(Math.random() * colors.length)]
                        }] rounded-tl-2xl rounded-bl-2xl flex items-center justify-center space-x-3`}>
                        <div className="h-3 w-3 bg-[#D2D2D2] rounded-full"></div>
                        <div className="h-3 w-3 bg-[#D2D2D2] rounded-full"></div>
                        <div className="h-3 w-3 bg-[#D2D2D2] rounded-full"></div>
                      </div>
                      <div className="flex-[0.7] px-5 py-5 space-y-2">
                        <h1 className="font-bold text-[18px]">
                          {content.title}
                        </h1>
                        <p className="text-[#6F6F6F] text-[16px]">
                          {content.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
