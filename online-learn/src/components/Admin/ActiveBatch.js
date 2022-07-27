import React, { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBatchCodes,
  getBatch,
  getBatchCodesBySubAdmin,
  getCourses,
  getStudents,
} from "../../Redux/actions/adminActions";
import { ADD_BATCH, SET_ERRORS } from "../../Redux/actionTypes";
import Spinner from "../../Utils/Spinner";

const ActiveBatch = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("admin"));
  const store = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const allBatches = useSelector((state) => state.admin.allBatch);
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    if (allBatches.length !== 0) {
      setLoading(false);
      setBatches(allBatches);
    }
  }, [allBatches]);

  useEffect(() => {
    if (store.admin.batchAdded) {
      if (user.result.sub === "true") {
        dispatch(
          getBatchCodesBySubAdmin({
            organizationName: user.result.organizationName,
            subAdmin: user.result.email,
          })
        );
      } else {
        dispatch(getAllBatchCodes());
      }
      dispatch({ type: ADD_BATCH, payload: false });
    }
  }, [store.admin.batchAdded]);

  useEffect(() => {
    if (user.result.sub === "true") {
      dispatch(
        getBatchCodesBySubAdmin({
          organizationName: user.result.organizationName,
          subAdmin: user.result.email,
        })
      );
    } else {
      dispatch(getAllBatchCodes());
    }
  }, []);

  return (
    <div className="lg:h-[60%] w-full h-[50%] rounded-b-3xl shadow-md bg-white flex flex-col py-3">
      <h1 className="text-primary text-[16px] font-bold self-center">
        Active Batch
      </h1>
      <div className=" mt-6 space-y-4 overflow-y-auto scrollbar-none">
        {batches.map((batch, idx) => (
          <div
            key={idx}
            onClick={() => {
              localStorage.setItem("batchCode", JSON.stringify(batch.value));
              window.open("/admin/batch/viewbatch");
            }}
            className="flex items-center justify-between cursor-pointer px-4 hover:bg-slate-100 duration-150 transition-all">
            <div className="flex items-center space-x-4">
              <p className="bg-[#D5F8F9] h-[25px] w-[25px] flex items-center justify-center text-[12px] text-[#6F6EA5]">
                B
              </p>
              <p className="text-primary text-[12px]">{batch.value}</p>
            </div>
            <AiFillEye color="#046387" />
          </div>
        ))}
        {loading && (
          <>
            {loading && (
              <Spinner
                message="Loading"
                height={50}
                width={150}
                color="#111111"
                messageColor="blue"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ActiveBatch;
