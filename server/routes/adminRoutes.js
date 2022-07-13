import express from "express";
import auth from "../middleware/auth.js";
import {
  adminLogin,
  addAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  addCourse,
  getCourse,
  deleteCourse,
  addStudent,
  getAllStudent,
  getStudent,
  getAllCourse,
  addBatch,
  getAllAdmin,
  getAllBatchCodes,
  getBatch,
  getAllCourseCodes,
  getCourses,
  addEvent,
  getBatchEvent,
  getStudents,
  uploadAttendance,
  getAttendance,
  getAttendanceByBatchCodes,
  addAssignment,
  getStudentByAssignmentCode,
  addScore,
  getEventByCourseCode,
  getAllOrganizationName,
  addBatchLink,
  getAdminsByOrganizationName,
  getStudentsByOrganizationName,
  getCoursesLength,
  getAllStudentLength,
  getStudentsLengthBySubAdmin,
  getAllAdminLength,
  getAdminsLengthByOrganizationName,
  addStudentInBatch,
  updateCourseData,
  getAttendanceStatus,
  addStudentQuery,
  getAllDeleteQuery,
  updateDeleteQuery,
  getAllDeleteQueryBySubAdmin,
  getBatchesByBatchCode,
  getBatchCodesBySubAdmin,
  getAdminDashboardDataBySubAdmin,
  getAllAdminDashboardData,
  getAdminDashboardDataByOrganizationName,
  updateStudent,
  totalAssignment,
  updateStatus,
  updateBatchAdmin,
  addOrganizationName,
  getBatchLessonVideo,
} from "../controller/adminController.js";
const router = express.Router();

router.post("/login", adminLogin);
router.post("/addadmin", auth, addAdmin);
router.post("/addstudentquery", auth, addStudentQuery);
router.post("/updatedeletequery", auth, updateDeleteQuery);
router.post("/getadmin", auth, getAdmin);
router.post("/getalldeletequery", auth, getAllDeleteQuery);
router.post("/getalldeletequerybysubadmin", auth, getAllDeleteQueryBySubAdmin);
router.post("/updateadmin", auth, updateAdmin);
router.post("/updatestudent", auth, updateStudent);
router.post("/deleteadmin", auth, deleteAdmin);
router.post("/addcourse", auth, addCourse);
router.post("/getcourse", auth, getCourse);
router.post("/getcourses", auth, getCourses);
router.post("/getstudents", auth, getStudents);
router.post("/deletecourse", auth, deleteCourse);
router.post("/addstudent", auth, addStudent);
router.post("/addstudentinbatch", auth, addStudentInBatch);
router.post("/totalassignment", auth, totalAssignment);
router.get("/getallstudentlength", auth, getAllStudentLength);
router.post("/getstudentslengthbysubadmin", auth, getStudentsLengthBySubAdmin);
router.get("/getallstudent", auth, getAllStudent);
router.get("/getalladmin", auth, getAllAdmin);
router.post("/getadminsbyorganizationname", auth, getAdminsByOrganizationName);
router.get("/getalladminlength", auth, getAllAdminLength);
router.post(
  "/getadminslengthbyorganizationname",
  auth,
  getAdminsLengthByOrganizationName
);
router.post(
  "/getstudentsbyorganizationname",
  auth,
  getStudentsByOrganizationName
);
router.post("/getstudent", auth, getStudent);
router.get("/getcourseslength", auth, getCoursesLength);
router.get("/getallcourse", auth, getAllCourse);
router.post("/addbatch", auth, addBatch);
router.get("/getallorganizationname", auth, getAllOrganizationName);
router.get("/getallbatchcodes", auth, getAllBatchCodes);
router.post("/getbatchcodesbysubadmin", auth, getBatchCodesBySubAdmin);
router.get("/getallcoursecodes", auth, getAllCourseCodes);
router.post("/getbatch", auth, getBatch);
router.post("/getbatchlessonvideo", auth, getBatchLessonVideo);
router.post("/addevent", auth, addEvent);
router.post("/getbatchevent", auth, getBatchEvent);
router.post("/uploadattendance", auth, uploadAttendance);
router.post("/getattendance", auth, getAttendance);
router.post("/getattendancebybatchcodes", auth, getAttendanceByBatchCodes);
router.post("/getattendancestatus", auth, getAttendanceStatus);
router.post("/addAssignment", auth, addAssignment);
router.post("/getstudentbyassignmentcode", auth, getStudentByAssignmentCode);
router.post("/geteventbycoursecode", auth, getEventByCourseCode);
router.post("/addscore", auth, addScore);
router.post("/addbatchlink", auth, addBatchLink);
router.post("/updatecoursedata", auth, updateCourseData);
router.post("/getbatchesbybatchcode", auth, getBatchesByBatchCode);
router.post(
  "/getadmindashboarddatabysubadmin",
  auth,
  getAdminDashboardDataBySubAdmin
);
router.post(
  "/getadmindashboarddatabyorganizationname",
  auth,
  getAdminDashboardDataByOrganizationName
);
router.get("/getalladmindashboarddata", auth, getAllAdminDashboardData);
router.post("/updatestatus", auth, updateStatus);
router.post("/updatebatchadmin", auth, updateBatchAdmin);
router.post("/addorganizationname", auth, addOrganizationName);
export default router;
