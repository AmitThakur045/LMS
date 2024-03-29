import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/" });
// const API = axios.create({ baseURL: "https://bessalani-lms.herokuapp.com/" });
API.interceptors.request.use((req) => {
  if (sessionStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(sessionStorage.getItem("user")).token
    }`;
  }
  return req;
});

export const adminSignIn = (formData) => API.post("/api/admin/login", formData);

export const addAdmin = (admin) => API.post("/api/admin/addadmin", admin);
export const generateOtpForPasswordResetAdmin = (formData) =>
  API.post("/api/admin/generateotpforpasswordresetadmin", formData);
export const forgotPasswordAdmin = (formData) =>
  API.post("/api/admin/forgotpasswordadmin", formData);
export const addStudentQuery = (data) =>
  API.post("/api/admin/addstudentquery", data);
export const updateDeleteQuery = (data) =>
  API.post("/api/admin/updatedeletequery", data);
export const getAdmin = (data) => API.post("/api/admin/getadmin", data);
export const updateAdmin = (admin) => API.post("/api/admin/updateadmin", admin);
export const updateStudent = (student) =>
  API.post("/api/admin/updatestudent", student);
export const deleteAdmin = (data) => API.post("/api/admin/deleteadmin", data);
export const generateAdminOtp = (data) =>
  API.post("/api/admin/generateotp", data);
export const resetPassword = (data) =>
  API.post("/api/admin/resetpassword", data);
export const addCourse = (course) => API.post("/api/admin/addcourse", course);
export const getCourse = (data) => API.post("/api/admin/getcourse", data);
export const getCourses = (data) => API.post("/api/admin/getcourses", data);
export const getStudents = (data) => API.post("/api/admin/getstudents", data);
export const totalAssignment = (data) =>
  API.post("/api/admin/totalassignment", data);
export const deleteCourse = (data) => API.post("/api/admin/deletecourse", data);
export const addStudent = (student) =>
  API.post("/api/admin/addstudent", student);
export const addStudentInBatch = (student) =>
  API.post("/api/admin/addstudentinbatch", student);
export const getAllStudent = () => API.get("/api/admin/getallstudent");
export const getAllStudentLength = () =>
  API.get("/api/admin/getallstudentlength");
export const getStudentsLengthBySubAdmin = (data) =>
  API.post("/api/admin/getstudentslengthbysubadmin", data);
export const getAllAdmin = () => API.get("/api/admin/getalladmin");
export const getAllAdminLength = () => API.get("/api/admin/getalladminlength");
export const getAdminsByOrganizationName = (data) =>
  API.post("/api/admin/getadminsbyorganizationname", data);
export const getAdminsLengthByOrganizationName = (data) =>
  API.post("/api/admin/getadminslengthbyorganizationname", data);
export const getStudentsByOrganizationName = (data) =>
  API.post("/api/admin/getstudentsbyorganizationname", data);
export const getStudent = (data) => API.post("/api/admin/getstudent", data);
export const getAllCourse = () => API.get("/api/admin/getallcourse");

export const addBatch = (batch) => API.post("/api/admin/addbatch", batch);
export const getAllBatchCodes = () => API.get("/api/admin/getallbatchcodes");
export const getCoursesLength = () => API.get("/api/admin/getcourseslength");
export const getAllDeleteQuery = (data) =>
  API.post("/api/admin/getalldeletequery", data);
export const getAllDeleteQueryBySubAdmin = (data) =>
  API.post("/api/admin/getalldeletequerybysubadmin", data);
export const getBatchCodesBySubAdmin = (data) =>
  API.post("/api/admin/getbatchcodesbysubadmin", data);
export const getAllCourseCodes = () => API.get("/api/admin/getallcoursecodes");
export const getAllOrganizationName = () =>
  API.get("/api/admin/getallorganizationname");
export const getBatch = (data) => API.post("/api/admin/getbatch", data);
export const getBatchLessonVideo = (data) =>
  API.post("/api/admin/getbatchlessonvideo", data);
export const addEvent = (event) => API.post("/api/admin/addevent", event);
export const getBatchEvent = (batchCode) =>
  API.post("/api/admin/getbatchevent", batchCode);
export const getBatchesByBatchCode = (allBatches) =>
  API.post("/api/admin/getbatchesbybatchcode", allBatches);
export const getEventByCourseCode = (data) =>
  API.post("/api/admin/geteventbycoursecode", data);
export const uploadAttendance = (attendanceRecord) =>
  API.post("/api/admin/uploadattendance", attendanceRecord);
export const getAttendance = (data) =>
  API.post("/api/admin/getattendance", data);
export const getAttendanceByBatchCodes = (allBatches) =>
  API.post("/api/admin/getattendancebybatchcodes", allBatches);
export const getAttendanceStatus = (data) =>
  API.post("/api/admin/getattendancestatus", data);
export const addAssignment = (assignment) =>
  API.post("/api/admin/addassignment", assignment);
export const addBatchLink = (data) => API.post("/api/admin/addbatchlink", data);
export const getStudentByAssignmentCode = (data) =>
  API.post("/api/admin/getstudentbyassignmentcode", data);
export const addScore = (formData) => API.post("/api/admin/addscore", formData);
export const updateCourseData = (formData) =>
  API.post("/api/admin/updatecoursedata", formData);
export const getAdminDashboardDataBySubAdmin = (formData) =>
  API.post("/api/admin/getadmindashboarddatabysubadmin", formData);
export const getCourseByOrganizationName = (formData) =>
  API.post("/api/admin/getcoursebyorganizationname", formData);
export const getCourseBySubAdmin = (formData) =>
  API.post("/api/admin/getcoursebysubadmin", formData);
export const getAdminDashboardDataByOrganizationName = (formData) =>
  API.post("/api/admin/getadmindashboarddatabyorganizationname", formData);
export const getAllAdminDashboardData = () =>
  API.get("/api/admin/getalladmindashboarddata");
export const updateStatus = (formData) =>
  API.post("/api/admin/updatestatus", formData);
export const updateBatchAdmin = (formData) =>
  API.post("/api/admin/updatebatchadmin", formData);
export const addOrganizationName = (formData) =>
  API.post("/api/admin/addorganizationname", formData);

//Student

export const studentSignIn = (formData) =>
  API.post("/api/student/login", formData);
export const getCourseByBatchCode = (batchCode) =>
  API.post("/api/student/getcoursebybatchcode", batchCode);
export const getAllEvents = (batchCode) =>
  API.post("/api/student/getallevents", batchCode);
export const getAssignmentByBatchCode = (data) =>
  API.post("/api/student/getassignmentbybatchcode", data);
export const submitAssignment = (formData) =>
  API.post("/api/student/submitassignment", formData);
export const generateOtp = (formData) =>
  API.post("/api/student/generateotp", formData);
export const studentSignUp = (formData) =>
  API.post("/api/student/studentsignup", formData);
export const getBatchLessonVideoByCourse = (data) =>
  API.post("/api/student/getbatchlessonvideobycourse", data);
export const updateLearner = (student) =>
  API.post("/api/student/updatelearner", student);
export const resetPasswordStudent = (formData) =>
  API.post("/api/student/resetpasswordstudent", formData);
export const generateOtpForPasswordReset = (formData) =>
  API.post("/api/student/generateotpforpasswordreset", formData);
export const addThread = (formData) =>
  API.post("/api/student/addthread", formData);
export const getStudentData = (formData) =>
  API.post("/api/student/getstudentdata", formData);
export const addThreadReply = (formData) =>
  API.post("/api/student/addthreadreply", formData);
export const addProblemCategory = (formData) =>
  API.post("/api/student/addproblemcategory", formData);
export const deleteProblemCategory = (formData) =>
  API.post("/api/student/deleteproblemcategory", formData);
export const getThreads = (formData) =>
  API.post("/api/student/getthreads", formData);
export const getProblemCategories = (formData) =>
  API.post("/api/student/getproblemcategories", formData);
export const forgotPassword = (formData) =>
  API.post("/api/student/forgotpassword", formData);

//AWS
export const getPresignedUrl = (data) =>
  API.post("/api/s3/getpresignedurl", data);
