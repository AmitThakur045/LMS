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
export default router;
