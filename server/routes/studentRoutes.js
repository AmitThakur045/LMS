import express from "express";
import auth from "../middleware/auth.js";
import {
  studentLogin,
  getCourseByBatchCode,
  getAllEvents,
  getAssignmentByBatchCode,
  submitAssignment,
  studentSignUp,
} from "../controller/studentController.js";
const router = express.Router();

router.post("/login", studentLogin);
router.post("/studentsignup", studentSignUp);
router.post("/getcoursebybatchcode", auth, getCourseByBatchCode);
router.post("/getallevents", auth, getAllEvents);
router.post("/getassignmentbybatchcode", auth, getAssignmentByBatchCode);
router.post("/submitassignment", auth, submitAssignment);
export default router;
