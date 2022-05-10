import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/" });

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
export const deleteCourse = (data) => API.post("/api/admin/deletecourse", data);
export const addStudent = (student) => API.post("/api/admin/addstudent", student);
