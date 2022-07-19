import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ForumSharpIcon from "@mui/icons-material/ForumSharp";
import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import HomeSidebar from "../HomeSidebar";
import HomeDrawer from "../HomeDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import decode from "jwt-decode";
const isNotActiveStyle = "text-[#555555] flex flex-col items-center";
const isActiveStyle =
  "border-r-2 border-white  text-white flex flex-col items-center";

const dummyData = [
  {
    id: 1,
    title: "Techverse",
    description: "Techverse - Not able to Launch",
    replies: 1,
    answer: "Login to answer",
    user: "Manish Uddhav Patil",
    repliedAt: "56 minutes ago",
    avatar: "M",
  },
  {
    id: 2,
    title: "Let’s talk career",
    description: "Power BI Source Code",
    replies: 0,
    answer: "Login to answer",
    user: "Naveen Jaiswal",
    repliedAt: "30 minutes ago",
    avatar: "N",
  },
  {
    id: 3,
    title: "Let’s talk career",
    description: "Web Dev Notes",
    replies: 4,
    answer: "Login to answer",
    user: "Vikas Kumar",
    repliedAt: "48 minutes ago",
  },
  {
    id: 4,
    title: "Let’s talk career",
    description: "Web Dev Notes",
    replies: 4,
    answer: "Login to answer",
    user: "Vikas Kumar",
    repliedAt: "48 minutes ago",
  },
];

const dummyData2 = [
  {
    id: 1,
    description: "Let’s talk career",
  },
  {
    id: 2,
    description: "Tech Verse",
  },
];

const colors = ["red", "blue", "green", "blue", "orange"];

const Community = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const logOut = () => {
    alert("OOPS! Your session expired. Please Login again");
    navigate("/login");
  };
  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 678) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, [window.innerWidth]);

  const logout = () => {
    navigate("/login/adminLogin");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logOut();
      }
    }
  }, []);

  return (
    <div className="bg-[#1a1a1a] w-full h-screen flex overflow-hidden">
      <HomeSidebar />
      <div className="bg-white w-full md:flex flex-col my-4 rounded-2xl sm:mr-4 sm:mx-0 mx-2 px-[3.1rem] pt-[3rem] overflow-auto">
        {isMobile && (
          <div className="absolute h-[5rem] justify-end text-black right-4 top-5">
            {isOpen ? (
              <CancelIcon onClick={() => setIsOpen(false)} />
            ) : (
              <MenuIcon onClick={() => setIsOpen(true)} />
            )}
          </div>
        )}
        {isOpen && <HomeDrawer isOpen={isOpen} setIsOpen={setIsOpen} />}
        <div>
          <p className="text-4xl font-bold">Community</p>
        </div>
        <div className="flex md:flex-row flex-col space-x-8 space-y-6">
          <div className="flex flex-col flex-[0.68] overflow-auto">
            <div className="w-auto rounded-3xl shadow-lg p-8 mt-4 space-y-2">
              <div>
                <div className="flex flex-row space-x-20 ">
                  <div className="flex">
                    <p className="text-2xl font-bold pt-1 ">
                      Welcome to LearnVerse Community
                    </p>
                  </div>
                  <div className="md:p-2 sm:p-1 p-[0.1rem]">
                    <Button
                      style={{
                        borderRadius: 14,
                        backgroundColor: "#F26B30",
                        padding: "9px 21px",
                        fontSize: "15px",
                        fontWeight: "700",
                        color: "#fff",
                      }}
                      variant="contained">
                      New Thread
                    </Button>
                  </div>
                </div>
                <p className="text-1xl font-normal text-base text-gray-500 pt-2">
                  Connect with like-minded individuals to change lives through
                  learning
                </p>
                <hr className="border-black mt-4"></hr>
              </div>

              {/* <div className="border-white md:py-20 py-10"></div> */}
            </div>

            <div className="p-0 m-0 overflow-y-auto h-[20rem] mt-6">
              {dummyData.map((data) => (
                <div className="flex flex-col space-y-2 w-auto h-fit rounded-3xl shadow-lg p-8 mt-4">
                  <div className="border-2 border-black rounded-xl w-fit px-1">
                    {data.title}
                  </div>
                  <div className="">
                    <p className="text-2xl font-bold pt-1 ">
                      {data.description}
                    </p>
                  </div>
                  <hr className="border-black mt-4"></hr>
                  <div className="flex flex-row justify-between">
                    <div className="flex space-x-6">
                      <p className="text-sm font-base pt-1 ">
                        Replies: {data.replies}
                      </p>
                      <Button
                        style={{
                          borderRadius: 14,
                          backgroundColor: "#FF9C72",
                          padding: "9px 21px",
                          fontSize: "15px",
                          fontWeight: "700",
                          color: "#fff",
                          height: "38px",
                        }}
                        variant="contained">
                        {data.answer}
                      </Button>
                    </div>
                    <div className="flex space-x-3">
                      <div className="flex flex-col">
                        <p>{data.user}</p>
                        <p className="justify-self-end">{data.repliedAt}</p>
                      </div>
                      <div
                        className={`border-2 h-[50px] w-[50px] rounded-full flex items-center justify-center font-bold bg-${
                          colors[Math.floor(Math.random() * colors.length)]
                        }-500`}>
                        {data.avatar}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col flex-[0.32] mr-3 w-full md:w-auto space-y-3 rounded-3xl shadow-lg h-fit p-3">
            <div className="flex flex-row space-x-5 ">
              <ForumSharpIcon className="mt-2" fontSize="large" alt="" />
              <p className="text-4xl font-bold">Forums</p>
            </div>

            <div className="flex flex-col space-x-2">
              <div className="flex">
                <button onClick={() => setIsActive(!isActive)}>
                  {isActive ? (
                    <ArrowDropDownSharpIcon
                      style={{
                        color: "black",
                        backgroundColor: "E7E7E7",
                        size: "medium",
                        height: "auto",
                      }}
                    />
                  ) : (
                    <ArrowRightSharpIcon
                      style={{
                        color: "black",
                        backgroundColor: "E7E7E7",
                        size: "medium",
                        height: "auto",
                      }}
                    />
                  )}
                </button>
                <div className="w-full ml-3">
                  <p className="text-1xl font-normal text-base text-gray-500">
                    Lounge - General
                  </p>
                </div>
              </div>

              <div className="flex-col space-y-2 mt-2">
                {isActive &&
                  dummyData2.map((item) => (
                    <div className="ml-6 bg-gray-200 w-[10rem] rounded-md pl-2">
                      <p className="text-1xl font-normal text-base text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
