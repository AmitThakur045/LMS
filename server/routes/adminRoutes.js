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
} from "../controller/adminController.js";
const router = express.Router();

router.post("/login", adminLogin);
router.post("/addadmin", addAdmin);
router.post("/getadmin", getAdmin);
router.post("/updateadmin", updateAdmin);
router.post("/deleteadmin", deleteAdmin);
router.post("/addcourse", addCourse);
router.post("/getcourse", getCourse);
router.post("/deletecourse", deleteCourse);
export default router;
