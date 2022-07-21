import express from "express";
import auth from "../middleware/auth.js";
import { getPresignedUrl } from "../controller/s3Controller.js";

const router = express.Router();

router.post("/getpresignedurl", auth, getPresignedUrl);
export default router;
