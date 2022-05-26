import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { GET_BATCH, SET_ERRORS } from "../../../../Redux/actionTypes";

import ActiveBatch from "../../ActiveBatch";
import RecentNotification from "../../RecentNotification";

import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  getAllBatchCodes,
  getBatch,
} from "../../../../Redux/actions/adminActions";

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const [selectedBatch, setSelectedBatch] = useState("");
  const navigate = useNavigate();
  const allBatches = useSelector((state) => state.admin.allBatch);
  const batch = useSelector((state) => state.admin.batch);
  useEffect(() => {
    dispatch(getAllBatchCodes());
  }, []);

  useEffect(() => {
    localStorage.setItem("batch", JSON.stringify(batch));
  }, [batch]);

  console.log(batch);
  return (
    <div className="flex overflow-hidden h-full space-x-5 px-12 mb-5">
      <div className="w-[80%] rounded-3xl bg-[#FAFBFF] px-10 py-5 flex flex-col space-y-4">
        <div className="flex space-x-3">
          <Select
            className="w-[80%]"
            options={allBatches}
            onChange={(e) => setSelectedBatch(e.value)}
          />
          <Button
            aria-disabled={selectedBatch !== 0 ? false : true}
            onClick={() => {
              dispatch(getBatch({ batchCode: selectedBatch }));
              window.open("/admin/batch/viewbatch");
            }}
            className="w-[20%]"
            variant="contained"
            color="primary">
            Search
          </Button>
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
