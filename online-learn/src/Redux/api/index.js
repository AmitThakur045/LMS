import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/" });
// const API = axios.create({ baseURL: "https://bessalani-lms.herokuapp.com/" });

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("user")) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("user")).token
//     }`;
//   }
//   return req;
// });

export const addAdmin = (admin) => API.post("/api/admin/addadmin", admin);
export const getAdmin = (data) => API.post("/api/admin/getadmin", data);
export const updateAdmin = (admin) => API.post("/api/admin/updateadmin", admin);
export const deleteAdmin = (data) => API.post("/api/admin/deleteadmin", data);

export const addCourse = (course) => API.post("/api/admin/addcourse", course);
export const getCourse = (data) => API.post("/api/admin/getcourse", data);
export const getCourses = (data) => API.post("/api/admin/getcourses", data);
export const getStudents = (data) => API.post("/api/admin/getstudents", data);
export const deleteCourse = (data) => API.post("/api/admin/deletecourse", data);
export const addStudent = (student) =>
  API.post("/api/admin/addstudent", student);
export const getAllStudent = () => API.get("/api/admin/getallstudent");
export const getAllAdmin = () => API.get("/api/admin/getalladmin");
export const getStudent = (data) => API.post("/api/admin/getstudent", data);
export const getAllCourse = () => API.get("/api/admin/getallcourse");

export const addBatch = (batch) => API.post("/api/admin/addbatch", batch);
export const getAllBatchCodes = () => API.get("/api/admin/getallbatchcodes");
export const getAllCourseCodes = () => API.get("/api/admin/getallcoursecodes");
export const getBatch = (data) => API.post("/api/admin/getbatch", data);
export const addEvent = (event) => API.post("/api/admin/addevent", event);
export const getBatchEvent = (batchCode) =>
  API.post("/api/admin/getbatchevent", batchCode);
export const uploadAttendance = (attendanceRecord) =>
  API.post("/api/admin/uploadattendance", attendanceRecord);
export const getAttendance = (data) =>
  API.post("/api/admin/getattendance", data);
export const addAssignment = (assignment) => API.post("/api/admin/addassignment", assignment);
export const getStudentByAssignmentCode = (data) =>
  API.post("/api/admin/getstudentbyassignmentcode", data);
export const addScore = (formData) => API.post("/api/admin/addscore", formData);