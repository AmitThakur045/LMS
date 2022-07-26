import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getPresignedUrl } from "../../../../../../Redux/actions/awsActions";
import { GET_PRESIGNED_URL } from "../../../../../../Redux/actionTypes";

const SingleLesson = ({
  lessonData,
  lessonIdx,
  tempBatchData,
  sectionIdx,
  indexCounter,
  handleIconClickDecrease,
  handleIconClickIncrease,
  sectionLessonNumber,
  setSectionLessonNumber,
  setTempBatchData,
  setDisableSubmit,
}) => {
  const [video, setVideo] = useState({});
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const s3PresignedUrl = store.aws.presignedUrl;
  const [videoUploaded, setVideoUploaded] = useState(false);

  const [uploadingVideo, setUploadingVideo] = useState(false);
  const handleVideoUploadButton = async (e) => {
    setUploadingVideo(true);
    setDisableSubmit(true);
    dispatch(
      getPresignedUrl({ fileType: "videos", fileName: e.target.files[0].name })
    );
    const file = e.target.files[0];

    setVideo(file);
  };
  useEffect(() => {
    if (s3PresignedUrl !== "") {
      async function fetchApi() {
        await fetch(s3PresignedUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "video/*",
          },
          body: video,
        })
          .then((response) => {
            const videoUrl = s3PresignedUrl.split("?")[0];

            let temp = tempBatchData;

            temp.courses[indexCounter].lessonVideo[
              sectionLessonNumber.sectionNumber
            ].lesson[sectionLessonNumber.lessonNumber].video = videoUrl;
            setTempBatchData(temp);
            setUploadingVideo(false);
            setVideoUploaded(true);
            setDisableSubmit(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      fetchApi();
      dispatch({ type: GET_PRESIGNED_URL, payload: "" });
    }
  }, [s3PresignedUrl]);
  useEffect(() => {
    if (
      tempBatchData.courses[indexCounter].lessonVideo[sectionIdx].lesson[
        lessonIdx
      ].video !== ""
    ) {
      setVideoUploaded(true);
    }
  }, []);

  return (
    <div
      key={lessonIdx}
      className="flex justify-between shadow-sm rounded-sm shadow-gray-400 py-4 px-4">
      <div className="flex items-center space-x-3">
        {tempBatchData.courses[indexCounter].lessonVideo[sectionIdx].lesson[
          lessonIdx
        ].lessonCompleted ? (
          <BsFillCheckCircleFill
            onClick={() => handleIconClickDecrease(sectionIdx, lessonIdx)}
            fontSize={20}
            className="text-[#1bca72]"
          />
        ) : (
          <AiOutlineCheckCircle
            onClick={() => handleIconClickIncrease(sectionIdx, lessonIdx)}
            fontSize={20}
            className="text-[#]"
          />
        )}
        <Typography>{lessonData.lessonName}</Typography>
      </div>
      <label htmlFor={`video-${sectionIdx}-${lessonIdx}`}>
        {!videoUploaded ? (
          <>
            {uploadingVideo ? (
              <div className="text-white bg-[#1976d2] px-3  h-[2rem] flex items-center justify-center rounded-md cursor-pointer hover:bg-[#0d539a] transition-all duration-150">
                Uploading...
              </div>
            ) : (
              <div className="text-white bg-[#1976d2] px-3  h-[2rem] flex items-center justify-center rounded-md cursor-pointer hover:bg-[#0d539a] transition-all duration-150">
                Upload Video
              </div>
            )}
          </>
        ) : (
          <>
            {uploadingVideo ? (
              <div className="text-white bg-[#1976d2] px-3  h-[2rem] flex items-center justify-center rounded-md cursor-pointer hover:bg-[#0d539a] transition-all duration-150">
                Uploading...
              </div>
            ) : (
              <div className="text-white bg-[#1976d2] px-3  h-[2rem] flex items-center justify-center rounded-md cursor-pointer hover:bg-[#0d539a] transition-all duration-150">
                Upload Another Video
              </div>
            )}
          </>
        )}
      </label>
      <input
        disabled={uploadingVideo}
        className="hidden"
        id={`video-${sectionIdx}-${lessonIdx}`}
        type="file"
        accept="video/*"
        onChange={(e) => {
          setSectionLessonNumber({
            sectionNumber: sectionIdx,
            lessonNumber: lessonIdx,
          });
          handleVideoUploadButton(e);
        }}
      />
    </div>
  );
};

export default SingleLesson;
