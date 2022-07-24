import React, { useEffect, useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import CourseDrawer from "./CourseDrawer";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { AiOutlineCloseCircle } from "react-icons/ai";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#ffffff",
  border: "1px solid #000",
  boxShadow: 10,
  borderRadius: "3px",
  p: 4,
};
const CourseHeader = ({ batchData }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("learner")));

  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openHelpModal, setOpenHelpModal] = useState(false);
  const [value, setValue] = useState({
    queryType: "",
    description: "",
    student: "",
    batchCode: "",
  });
  const handleHelpModalOpen = () => setOpenHelpModal(true);
  const handleHelpModalClose = () => {
    setOpenHelpModal(false);
    setValue({ queryType: "", description: "", student: "", batchCode: "" });
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

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("index"))) {
      setIndex(JSON.parse(localStorage.getItem("index")));
    }
  }, []);
  useEffect(() => {
    setValue({ ...value, batchCode: batchData.batchCode });
    setValue({ ...value, student: user.result.email });
  }, []);

  const addhelpquery = (e) => {
    e.preventDefault();
    handleHelpModalClose();
  };

  return (
    <>
      <Modal
        open={openHelpModal}
        onClose={handleHelpModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="flex flex-col space-y-4 h-[15rem]">
            <div className="flex items-center">
              <h1 className="self-center w-[95%] font-bold">Raise a Query</h1>
              <div
                onClick={handleHelpModalClose}
                className="self-end cursor-pointer w-[5%]">
                <AiOutlineCloseCircle
                  className="text-gray-400 hover:text-gray-500 duration-150 transition-all"
                  fontSize={23}
                />
              </div>
            </div>
            <form onSubmit={addhelpquery} className="flex flex-col space-y-3  ">
              <FormControl required className="w-[50%]">
                <InputLabel id="demo-simple-select-label">
                  Query Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value.queryType}
                  label="Sub Admin"
                  onChange={(e) =>
                    setValue({ ...value, queryType: e.target.value })
                  }>
                  <MenuItem value="tech">Tech</MenuItem>
                  <MenuItem value="nontech">Non-Tech</MenuItem>
                </Select>
              </FormControl>
              <TextField
                required
                type="text"
                id="outlined-multiline-flexible"
                multiline
                maxRows={6}
                label="Description"
                variant="outlined"
                className="bg-white w-full"
                value={value.description}
                onChange={(e) =>
                  setValue({ ...value, description: e.target.value })
                }
              />
              <Button
                type="submit"
                className=""
                variant="contained"
                color="primary">
                Add
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
      <div className="bg-[#373737] w-full rounded-tl-2xl rounded-tr-2xl flex md:flex-row flex-col">
        {isMobile && (
          <div className="absolute h-[5rem] justify-end text-white right-4 top-5">
            {isOpen ? (
              <CancelIcon onClick={() => setIsOpen(false)} />
            ) : (
              <MenuIcon onClick={() => setIsOpen(true)} />
            )}
          </div>
        )}
        {isOpen && <CourseDrawer isOpen={isOpen} setIsOpen={setIsOpen} />}
        <div className="text-white text-[24px] space-y-1 md:flex-[0.8] flex-col pl-6 py-4">
          {Object.keys(batchData).length !== 0 && (
            <>
              <h1>{batchData?.courses[index]?.courseName}</h1>
              <p className="text-[#E4BE34] lg:text-[14px] text-[12px]">
                0 Classes completed | 0% My-Learning videos watched | 0/1
                Projects Done
              </p>
            </>
          )}
        </div>
        <div className="md:flex-[0.2] rounded-tr-2xl h-full flex">
          <NavLink
            to="/studentbatchcommunity"
            className="bg-[#C4C4C4] h-full flex flex-col items-center flex-[0.4] justify-center">
            <PeopleIcon fontSize="medium" className="" />
            <p className="text-sm lg:text-base">Community</p>
          </NavLink>
          <div
            onClick={handleHelpModalOpen}
            className="text-white h-full flex flex-col items-center flex-[0.4] justify-center cursor-pointer">
            <HelpOutlineIcon fontSize="medium" className="" />
            <p className="text-sm lg:text-base">Help</p>
          </div>
          <div className="text-white  h-full flex flex-col items-center flex-[0.4] justify-center cursor-pointer">
            <FormatListNumberedIcon fontSize="medium" className="" />
            <p className="text-sm lg:text-base">Notes</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseHeader;
