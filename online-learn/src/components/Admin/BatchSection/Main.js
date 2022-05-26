import React, { useEffect, useState } from "react";
import ActiveBatch from "../ActiveBatch";
import RecentNotification from "../RecentNotification";

import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Modal from "react-modal";
import { Button } from "@mui/material";

import Select from "react-select";
import {
  getAllBatchCodes,
  getBatch,
} from "../../../Redux/actions/adminActions";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #bbbbbb",
  },
};

const Main = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  function closeModal() {
    setIsOpen(false);
    setSelectedBatch("");
  }

  const dispatch = useDispatch();
  const [selectedBatch, setSelectedBatch] = useState("");

  const allBatches = useSelector((state) => state.admin.allBatch);
  const batch = useSelector((state) => state.admin.batch);
  useEffect(() => {
    dispatch(getAllBatchCodes());
  }, []);

  useEffect(() => {
    localStorage.setItem("batch", JSON.stringify(batch));
  }, [batch]);
  console.log(selectedBatch);
  return (
    <div className="flex overflow-hidden h-full space-x-5 px-12 mb-5">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        overlayClassName=""
        contentLabel="Example Modal">
        <div className="flex flex-col h-[15rem] w-[25rem] space-y-4">
          <div onClick={closeModal} className="self-end cursor-pointer">
            <AiOutlineCloseCircle fontSize={23} />
          </div>
          <div className="flex space-x-3  ">
            <Select
              className="w-[80%]"
              options={allBatches}
              onChange={(e) => setSelectedBatch(e.value)}
            />
            <Button
              disabled={selectedBatch !== "" ? false : true}
              onClick={() => {
                dispatch(getBatch({ batchCode: selectedBatch }));
                setIsOpen(false);
                window.open("/admin/batch/viewbatch");
              }}
              className="w-[20%]"
              variant="contained"
              color="primary">
              Search
            </Button>
          </div>
        </div>
      </Modal>
      <div className="w-[80%] rounded-3xl bg-[#FAFBFF] px-10 py-5 flex  space-x-5">
        <Link
          to="/admin/batch/addbatch"
          className="bg-[#5848a4] shadow-[#111111] h-[10rem] w-[50%] rounded-md shadow-md text-white flex items-center justify-center space-x-2 text-xl cursor-pointer hover:bg-[#352b66] transition-all duration-150">
          <h1>Add Batch</h1>
          <IoIosAddCircleOutline />
        </Link>
        <div
          onClick={openModal}
          className="bg-[#5848a4] shadow-[#111111] h-[10rem] w-[50%] rounded-md shadow-md text-white flex items-center justify-center space-x-2 text-xl cursor-pointer hover:bg-[#352b66] transition-all duration-150">
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
