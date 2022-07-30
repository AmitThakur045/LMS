import React, { useEffect, useState } from "react";
import HomeSidebar from "../../HomeSidebar";
import Main from "./Main";
import decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { getStudent } from "../../../../Redux/actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../Utils/Loader";

const UpdateProfile = () => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("learner"))
  );
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [learner, setLearner] = useState({});
  const student = useSelector((state) => state.admin.student);
  const logOut = () => {
    alert("OOPS! Your session expired. Please Login again");
    navigate("/login");
  };

  useEffect(() => {
    if (Object.keys(student).length !== 0) {
      setIsLoading(false);

      setLearner(student);
    }
  }, [student]);
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logOut();
      }
    }
    if (JSON.parse(sessionStorage.getItem("learner")) === null) {
      navigate("/login");
    } else {
      dispatch(getStudent({ email: user.result.email }));
    }
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen w-full">
          <Loader isLoading={isLoading} />
        </div>
      ) : (
        <div className="bg-[#1a1a1a] w-full h-screen flex overflow-hidden">
          <HomeSidebar />
          <Main learner={learner} />
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
