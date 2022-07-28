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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Spinner from "../../../Utils/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { addThread, getThreads } from "../../../Redux/actions/studentActions";
import { ADD_THREAD } from "../../../Redux/actionTypes";
import Moment from "react-moment";

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

const Main = ({ threads, error, categories }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));
  const colors = ["#abc43c", "#c65123", "#1b8d34", "#1b4c8d", "#4a1b8d"];
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
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

  const [openNewThreadModal, setOpenNewThreadModal] = useState(false);
  const handleNewThreadModalOpen = () => setOpenNewThreadModal(true);
  const handleNewThreadModalClose = () => {
    setOpenNewThreadModal(false);
  };
  const [problem, setProblem] = useState({
    problemName: "",
    problemDescription: "",
    problemCategory: "",
    by: user.result.email,
    communityType: "All",
  });

  const [loading, setLoading] = useState(false);

  const addthread = () => {
    setLoading(true);
    dispatch(addThread(problem));
  };

  useEffect(() => {
    if (store.student.threadAdded) {
      setLoading(false);
      handleNewThreadModalClose();
      dispatch({ type: ADD_THREAD, payload: false });
    }
  }, [store.student.threadAdded]);

  return (
    <div className="relative bg-[#1a1a1a] w-full h-screen flex overflow-hidden">
      <Modal
        open={openNewThreadModal}
        onClose={handleNewThreadModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <h1 className="self-center w-[95%] font-bold">Add New Thread</h1>
              <div
                onClick={handleNewThreadModalClose}
                className="self-end cursor-pointer w-[5%]">
                <AiOutlineCloseCircle
                  className="text-gray-400 hover:text-gray-500 duration-150 transition-all"
                  fontSize={23}
                />
              </div>
            </div>
            <form onSubmit={addthread} className="flex flex-col space-y-3  ">
              <TextField
                required
                type="text"
                id="outlined-basic"
                label="Problem Name"
                variant="outlined"
                className="bg-white"
                value={problem.problemName}
                onChange={(e) =>
                  setProblem({ ...problem, problemName: e.target.value })
                }
              />
              <TextField
                required
                type="text"
                id="outlined-multiline-flexible"
                multiline
                maxRows={6}
                label="Description"
                variant="outlined"
                className="bg-white w-full"
                value={problem.problemDescription}
                onChange={(e) =>
                  setProblem({ ...problem, problemDescription: e.target.value })
                }
              />
              <FormControl required className="w-[60%]" size="small">
                <InputLabel id="demo-simple-select-label" size="small">
                  Problem Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Problem Category"
                  value={problem.problemCategory}
                  onChange={(e) =>
                    setProblem({ ...problem, problemCategory: e.target.value })
                  }>
                  {categories.map((item, i) => (
                    <MenuItem key={i} value={item.category}>
                      {item.category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                disabled={loading}
                type="submit"
                className=""
                variant="contained"
                color="primary">
                ADD
              </Button>
              {loading && <Spinner message="Adding Thread" />}
            </form>
          </div>
        </Box>
      </Modal>
      <div className="absolute bg-white w-full h-full md:flex flex-col sm:my-4 rounded-2xl sm:mr-4 sm:mx-0 sm:px-[3.1rem] px-2 pt-[3rem] ">
        {isMobile && (
          <div className="absolute h-[5rem] justify-end text-black right-4 top-5">
            {isOpen ? (
              <CancelIcon fontSize="large" onClick={() => setIsOpen(false)} />
            ) : (
              <MenuIcon fontSize="large" onClick={() => setIsOpen(true)} />
            )}
          </div>
        )}
        {isOpen && <HomeDrawer isOpen={isOpen} setIsOpen={setIsOpen} />}
        <div>
          <p className="text-4xl font-bold">Community</p>
        </div>
        <div className="flex md:flex-row flex-col space-x-8 space-y-6 h-full">
          <div className="flex flex-col flex-[0.68]  p-3 space-y-3">
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
                      onClick={handleNewThreadModalOpen}
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
            </div>

            <div className=" flex flex-col space-y-5 h-[55vh] p-3 overflow-auto">
              {threads.length !== 0 ? (
                threads.map((problem, index) => (
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
                      <div className="flex-[0.2]">
                        Replies {problem.reply.length}
                      </div>
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
                      </div>
                      <div className="flex-[0.3] flex items-start space-x-2 justify-end">
                        <div className="flex flex-col items-end">
                          <h1 className="text-[15px]">{problem.by}</h1>
                          <Moment fromNow className="text-[15px]">
                            {problem.time}
                          </Moment>
                        </div>
                        <Avatar sx={{ bgcolor: "#f48320" }} src="" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="font-bold text-red-500 self-center mt-10 text-[20px]">
                  {error}
                </p>
              )}
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
                    Lounge - All
                  </p>
                </div>
              </div>

              <div className="flex-col space-y-2 mt-2">
                {isActive &&
                  categories.map((item) => (
                    <div className="ml-6 bg-gray-200 w-[10rem] rounded-md pl-2">
                      <p className="text-1xl font-normal text-base text-gray-500">
                        {item.category}
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

export default Main;
