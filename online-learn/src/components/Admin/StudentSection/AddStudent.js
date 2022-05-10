import React, { useEffect, useState } from "react";
import Spinner from "../../../Utils/Spinner";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Sidebar from "../Sidebar";
import { ADD_STUDENT, SET_ERRORS } from "../../../Redux/actionTypes";
import { addStudent } from "../../../Redux/actions/adminActions";
import { Link } from "react-router-dom";

const dummyBatch = [
  {
    batchNumber: 1,
    batchName: "Batch-001",
    course: [
      {
        courseName: "JavaScript1",
      },
      {
        courseName: "React1",
      },
      {
        courseName: "NodeJS1",
      },
    ],
  },
  {
    batchNumber: 2,
    batchName: "Batch-002",
    course: [
      {
        courseName: "JavaScript2",
      },
      {
        courseName: "React2",
      },
      {
        courseName: "NodeJS2",
      },
    ],
  },
  {
    batchNumber: 3,
    batchName: "Batch-003",
    course: [
      {
        courseName: "JavaScript3",
      },
      {
        courseName: "React3",
      },
      {
        courseName: "NodeJS3",
      },
    ],
  },
  {
    batchNumber: 4,
    batchName: "Batch-004",
    course: [
      {
        courseName: "JavaScript4",
      },
      {
        courseName: "React4",
      },
      {
        courseName: "NodeJS4",
      },
    ],
  },
];

const AddStudent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  let courseCount = 1;

  const [batch, setBatch] = useState({
    batchNumber: "",
    batchName: "",
    batchAdded: false,
    course: [],
  });

  const [batchNumber, setBatchNumber] = useState("");
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    contactNumber: "",
    avatar: "",
    year: "",
    batch: {},
    gender: "",
    fatherName: "",
    motherName: "",
    fatherContactNumber: "",
    assignment: [],
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        contactNumber: "",
        avatar: "",
        year: "",
        batch: {},
        gender: "",
        fatherName: "",
        motherName: "",
        fatherContactNumber: "",
        assignment: [],
      });
    }
  }, [store.errors]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  useEffect(() => {
    if (store.errors || store.admin.studentAdded) {
      setLoading(false);
      if (store.admin.studentAdded) {
        setValue({
          firstName: "",
          lastName: "",
          email: "",
          dob: "",
          contactNumber: "",
          avatar: "",
          year: "",
          batch: {},
          gender: "",
          fatherName: "",
          motherName: "",
          fatherContactNumber: "",
          assignment: [],
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_STUDENT, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.studentAdded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    console.log(value);
  };

  const handleBatchNumber = (e) => {
    setBatchNumber(e.target.value);
    courseCount = 1;
  };

  const addNewCourse = (e) => {
    let newCourse = {
      courseNumber: ++courseCount,
      courseName: "",
    };

    newCourse.courseName = e.target.value;

    let newBatch = { ...batch };
    newBatch.batchNumber = batchNumber;
    newBatch.batchName = dummyBatch[batchNumber - 1].batchName;
    newBatch.course.push(newCourse);
    newBatch.batchAdded = true;
    setBatch(newBatch);
    setValue({ ...value, batch: newBatch });
  };

  return (
    <div className="h-screen w-full bg-[#f1f2f6] flex">
      <Sidebar />
      <div className="flex-[0.85] flex flex-col">
        <Header />
        <Link to="/admin/admin">
          <ArrowBackIcon className="mx-3 mt-3 cursor-pointer" />
        </Link>
        <div className="flex-[0.9] w-[50%] mx-auto bg-white mb-10 mt-5 shadow-lg rounded-lg flex flex-col overflow-y-auto">
          <h1 className="self-center mt-4 font-bold text-xl">Add Student</h1>
          <form
            className="flex w-4/6 mx-auto my-6 flex-col space-y-8"
            onSubmit={handleSubmit}
          >
            <div className="flex space-x-5">
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">First Name</p>
                <input
                  required
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="text"
                  value={value.firstName}
                  onChange={(e) =>
                    setValue({ ...value, firstName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">Last Name</p>
                <input
                  required
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="text"
                  value={value.lastName}
                  onChange={(e) =>
                    setValue({ ...value, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex space-x-5">
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">Father Name</p>
                <input
                  required
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="text"
                  value={value.fatherName}
                  onChange={(e) =>
                    setValue({ ...value, fatherName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">Mother Name</p>
                <input
                  required
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="text"
                  value={value.motherName}
                  onChange={(e) =>
                    setValue({ ...value, motherName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex space-x-5">
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">
                  Father's Contact Number
                </p>
                <input
                  required
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="number"
                  value={value.fatherContactNumber}
                  onChange={(e) =>
                    setValue({ ...value, fatherContactNumber: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex space-x-5">
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">Email</p>
                <input
                  required
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="text"
                  value={value.email}
                  onChange={(e) =>
                    setValue({ ...value, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">DOB</p>
                <input
                  required
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="date"
                  value={value.dob}
                  onChange={(e) => setValue({ ...value, dob: e.target.value })}
                />
              </div>
            </div>
            <div className="flex space-x-5">
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">Contact Number</p>
                <input
                  required
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="number"
                  value={value.contactNumber}
                  onChange={(e) =>
                    setValue({ ...value, contactNumber: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">Profile Picture</p>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setValue({ ...value, avatar: base64 })
                  }
                />
              </div>
            </div>
            <div className="flex space-x-5">
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">Student Gender</p>
                <input
                  required
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="text"
                  value={value.gender}
                  onChange={(e) =>
                    setValue({ ...value, gender: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-[#7e7e7e]">Year of Joining</p>
                <input
                  required
                  className="border-gray-400 border-2 rounded-sm px-2 py-1 outline-[#ed6e9e]"
                  type="text"
                  value={value.year}
                  onChange={(e) => setValue({ ...value, year: e.target.value })}
                />
              </div>
            </div>
            <div className="flex-col space-y-5">
              <div>
                <div>
                  <p className="text-sm text-[#7e7e7e]">Select a Batch</p>
                </div>
                <select
                  value={value.batchName}
                  style={{ width: "205px", border: "2px solid #a0a9ad" }}
                  onChange={handleBatchNumber}
                >
                  {dummyBatch.map((batch, index) => (
                    <option key={index} className="" value={batch.batchNumber}>
                      {batch.batchName}
                    </option>
                  ))}
                </select>
              </div>
              <div></div>
              {batchNumber.length > 0 && (
                <div>
                  <div>
                    <p className="text-sm text-[#7e7e7e]">Select Course</p>
                  </div>
                  <select
                    style={{ width: "205px", border: "2px solid #a0a9ad" }}
                    onChange={addNewCourse}
                  >
                    {dummyBatch[batchNumber - 1].course.map((item, index) => (
                      <option key={index} value={item.courseName}>
                        {item.courseName}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="flex space-x-5">
              <button
                type="submit"
                className="bg-[#ed6e9e] text-white h-10 flex-[0.5] hover:scale-105 transition-all duration-150"
              >
                Submit
              </button>
              <button
                type="button"
                className="bg-[#25642b] text-white h-10 flex-[0.5] hover:scale-105 transition-all duration-150"
                onClick={() => {
                  setValue({
                    firstName: "",
                    lastName: "",
                    email: "",
                    dob: "",
                    contactNumber: "",
                    avatar: "",
                    year: "",
                    batch: {},
                    gender: "",
                    fatherName: "",
                    motherName: "",
                    fatherContactNumber: "",
                    assignment: [],
                  });
                  setError({});
                }}
              >
                Clear
              </button>
            </div>
          </form>
          {loading && <Spinner message="Adding Admin" />}
          {error.emailError && (
            <p className="text-red-500 flex self-center">{error.emailError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
