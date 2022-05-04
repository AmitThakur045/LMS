import express from "express";
import auth from "../middleware/auth.js";
import { adminLogin } from "../controller/adminController.js";
const router = express.Router();

router.post("/login", adminLogin);

export default router;
