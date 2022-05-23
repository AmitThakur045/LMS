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
  getAllBatch,
  getBatch,
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
router.post("/addstudent", addStudent);
router.get("/getallstudent", getAllStudent);
router.get("/getalladmin", getAllAdmin);
router.post("/getstudent", getStudent);
router.get("/getallcourse", getAllCourse);
router.post("/addbatch", addBatch);
router.get("/getallbatch", getAllBatch);
router.post("/getbatch", getBatch);
export default router;
