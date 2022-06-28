import React, { useEffect, useState } from "react";
import ActiveBatch from "../ActiveBatch";
import RecentNotification from "../RecentNotification";

import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Box, Button, Modal } from "@mui/material";

import Select from "react-select";
import {
  getAllBatchCodes,
  getBatch,
  getBatchCodesBySubAdmin,
  getCourses,
  getStudents,
} from "../../../Redux/actions/adminActions";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  const [selectedBatch, setSelectedBatch] = useState("");
  const user = JSON.parse(localStorage.getItem("admin"));

  const allBatches = useSelector((state) => state.admin.allBatch);
  const batch = useSelector((state) => state.admin.batch);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedBatch("");
  };

  return (
    <div className="flex overflow-hidden h-full space-x-5 px-12 mb-5">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="flex flex-col space-y-4 h-[15rem]">
            <div className="flex items-center">
              <h1 className="self-center w-[95%] font-bold">Search Batch</h1>
              <div
                onClick={handleClose}
                className="self-end cursor-pointer w-[5%]">
                <AiOutlineCloseCircle
                  className="text-gray-400 hover:text-gray-500 duration-150 transition-all"
                  fontSize={23}
                />
              </div>
            </div>
            <div className="flex space-x-3  ">
              <Select
                className="w-[75%]"
                options={allBatches}
                onChange={(e) => setSelectedBatch(e.value)}
              />
              <Button
                disabled={selectedBatch !== "" ? false : true}
                onClick={() => {
                  localStorage.setItem(
                    "batchCode",
                    JSON.stringify(selectedBatch)
                  );
                  window.open("/admin/batch/viewbatch");
                }}
                className="w-[25%]"
                variant="contained"
                color="primary">
                Search
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <div className="w-[80%] rounded-3xl bg-[#FAFBFF] px-10 py-5 flex  space-x-5">
        <Link
          to="/admin/batch/addbatch"
          className="bg-secondary shadow-[#111111] h-[10rem] w-[50%] rounded-md shadow-md text-white flex items-center justify-center space-x-2 text-xl cursor-pointer hover:bg-secondaryHover transition-all duration-150">
          <h1>Add Batch</h1>
          <IoIosAddCircleOutline />
        </Link>
        <div
          onClick={handleOpen}
          className="bg-secondary shadow-[#111111] h-[10rem] w-[50%] rounded-md shadow-md text-white flex items-center justify-center space-x-2 text-xl cursor-pointer hover:bg-secondaryHover transition-all duration-150">
          <h1>Search Batch</h1>
          <IoIosAddCircleOutline />
        </div>
      </div>
      <div className="bg-[#FAFBFF] w-[20%] flex flex-col px-5 py-5 rounded-3xl space-y-5">
        <ActiveBatch />
        <RecentNotification />
      </div>
    </div>
  );
};

export default Main;
