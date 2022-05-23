import React, { useEffect, useState } from "react";
import ActiveBatch from "../ActiveBatch";
import RecentNotification from "../RecentNotification";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_BATCH, GET_BATCH, SET_ERRORS } from "../../../Redux/actionTypes";
import { getAllBatch } from "../../../Redux/actions/adminActions";
import Spinner from "../../../Utils/Spinner";
import { Avatar, Menu, MenuItem } from "@mui/material";

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [batches, setBatches] = useState([]);
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const allBatches = useSelector((state) => state.admin.allBatch);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    if (allBatches?.length !== 0) {
      setBatches(allBatches);
      setLoading(false);
    }
  }, [allBatches]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    dispatch(getAllBatch());

    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  const handleSearch = (event) => {
    let value = event.target.value;
    let result = [];
    result = allBatches.filter((data) => {
      return data.batchCode.search(value) !== -1;
    });
    setBatches(result);
  };

  return (
    <div className="flex overflow-hidden h-full space-x-5 px-12 mb-5">
      <div className="w-[80%] rounded-3xl bg-[#FAFBFF] px-10 py-5 flex flex-col space-y-20">
        <div className="flex items-center justify-between">
          <div className="flex w-[15.3rem] bg-[#ffffff] pl-2 border-[#D4D4D4] border-[1px] space-x-2 rounded-md h-[1.8rem] items-center">
            <AiOutlineSearch fontSize={20} color="#696969" />
            <input
              onChange={(event) => handleSearch(event)}
              placeholder="Quick Search Student"
              className="bg-[#ffffff] placeholder:text-[#A5A4A6]  placeholder:text-[12px] flex w-full outline-none "
              type="text"
            />
          </div>
          <Link
            to="/admin/batch/addbatch"
            type="button"
            className="bg-[#4A47D2] hover:bg-[#13119a] transition-all duration-150 rounded-3xl w-[10rem] h-[2rem] flex items-center space-x-3 text-white justify-center">
            <IoIosAddCircleOutline fontSize={20} />
            <h1>Add Batch</h1>
          </Link>
        </div>
        {(loading || Object.keys(error)?.length !== 0) && (
          <div className="flex flex-col mt-10">
            <div className="flex items-center justify-center mt-5">
              {loading && (
                <Spinner
                  message="Loading"
                  height={50}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {error.noBatchError && (
                <p className="text-red-500 text-2xl font-bold">
                  {error.noStudentError}
                </p>
              )}
            </div>
          </div>
        )}
        {!loading && batches.length !== 0 && (
          <div className="overflow-y-auto space-y-2">
            <div className="grid grid-cols-12 h-[32px] bg-white border-[1px] border-[#eeeeee] rounded-md items-center px-4">
              <h1 className="col-span-3 text-[13px] font-bold">Batch Name</h1>
              <h1 className="col-span-3 text-[13px] font-bold">Batch Code</h1>
              <h1 className="col-span-1 text-[13px] font-bold">Action</h1>
            </div>
            {batches.map((ad, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 h-[37px] bg-white border-[1px] border-[#eeeeee] rounded-md items-center px-4">
                <div
                  onClick={() => {
                    window.open("/admin/batch/viewbatch");
                    dispatch({ type: GET_BATCH, payload: ad });
                  }}
                  className="col-span-3 font-semibold text-[13px] cursor-pointer flex space-x-2">
                  {/* <Avatar
                    sx={{ height: 20, width: 20 }}
                    src={ad?.avatar}
                    alt=""
                  /> */}
                  <p className="">
                    {ad.batchName}
                  </p>
                </div>
                <p
                  onClick={() => {
                    window.open("/admin/batch/viewbatch");
                    dispatch({ type: GET_BATCH, payload: ad });
                  }}
                  className="col-span-3 font-semibold text-[13px] cursor-pointer">
                  {ad.batchCode}
                </p>
                <div className="col-span-1 font-semibold text-[13px] cursor-pointer ">
                  <BsThreeDotsVertical
                    onClick={(event) => {
                      handleClick(event);
                      setIndex(idx);
                    }}
                  />
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}>
                    <MenuItem
                      onClick={() => {
                        dispatch({
                          type: GET_BATCH,
                          payload: batches[index],
                        });
                        window.open("/admin/batch/updatenbatch");
                      }}>
                      Update Batch
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-[#FAFBFF] w-[20%] flex flex-col px-5 py-5 rounded-3xl space-y-5">
        <ActiveBatch />
        <RecentNotification />
      </div>
    </div>
  );
};

export default Main;
