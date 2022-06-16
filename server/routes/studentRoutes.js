import express from "express";
import auth from "../middleware/auth.js";
import { studentLogin, getCourseByBatchCode } from "../controller/studentController.js";

const router = express.Router();

router.post("/login", studentLogin);
router.post("/getcoursebybatchcode", getCourseByBatchCode);
export default router;
