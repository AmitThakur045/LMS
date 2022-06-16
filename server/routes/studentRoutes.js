import express from "express";
import auth from "../middleware/auth.js";
import {
  studentLogin,
  getCourseByBatchCode,
  getAllEvents,
  getAssignmentByBatchCode,
} from "../controller/studentController.js";
const router = express.Router();

router.post("/login", studentLogin);
router.post("/getcoursebybatchcode", auth, getCourseByBatchCode);
router.post("/getallevents", auth, getAllEvents);
router.post("/getassignmentbybatchcode", auth, getAssignmentByBatchCode);
export default router;
