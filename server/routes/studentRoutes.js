import express from "express";
import auth from "../middleware/auth.js";
import {
  studentLogin,
  generateOtp,
  getCourseByBatchCode,
  getAllEvents,
  getAssignmentByBatchCode,
  submitAssignment,
  studentSignUp,
  getBatchLessonVideoByCourse,
  updateLearner,
  resetPasswordStudent,
  forgotPassword,
  generateOtpForPasswordReset,
  addThread,
  getThreads,
  addThreadReply,
  addProblemCategory,
  getProblemCategories,
  deleteProblemCategory,
  getStudentData,
} from "../controller/studentController.js";
const router = express.Router();

router.post("/login", studentLogin);
router.post("/generateotp", generateOtp);
router.post("/studentsignup", studentSignUp);
router.post("/getcoursebybatchcode", auth, getCourseByBatchCode);
router.post("/getallevents", auth, getAllEvents);
router.post("/getassignmentbybatchcode", auth, getAssignmentByBatchCode);
router.post("/submitassignment", auth, submitAssignment);
router.post("/getbatchlessonvideobycourse", auth, getBatchLessonVideoByCourse);
router.post("/updatelearner", auth, updateLearner);
router.post("/resetpasswordstudent", auth, resetPasswordStudent);
router.post("/generateotpforpasswordreset", generateOtpForPasswordReset);
router.post("/forgotpassword", forgotPassword);
router.post("/addthread", addThread);
router.post("/addthreadreply", addThreadReply);
router.post("/addproblemcategory", addProblemCategory);
router.post("/deleteproblemcategory", deleteProblemCategory);
router.post("/getthreads", getThreads);
router.post("/getproblemcategories", getProblemCategories);
router.post("/getstudentdata", getStudentData);
export default router;
