import Student from "../models/student.js";
import Course from "../models/course.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Batch from "../models/batch.js";
import batch from "../models/batch.js";

export const studentLogin = async (req, res) => {
  const { email, password } = req.body;
  const errors = { emailError: String, passwordError: String };
  console.log(email);

  try {
    const existingStudent = await Student.findOne({ email });
    if (!existingStudent) {
      errors.emailError = "Learner doesn't exist.";
      return res.status(404).json(errors);
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingStudent.password
    );

    if (!isPasswordCorrect) {
      errors.passwordError = "Invalid Credentials";
      return res.status(404).json(errors);
    }

    const token = jwt.sign(
      {
        email: existingStudent.email,
        id: existingStudent._id,
      },
      "sEcReT",
      { expiresIn: "10h" }
    );

    res.status(200).json({ result: existingStudent, token: token });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getCourseByBatchCode = async (req, res) => {
  try {
    const { batchCode } = req.body;
    console.log("batchCode", batchCode);
    const courseCodeList = await Batch.findOne({ batchCode });

    const data = [];
    let len = courseCodeList.courses.length;

    for (let i = 0; i < len; i++) {
      const course = await Course.findOne({
        courseCode: courseCodeList.courses[i].courseCode,
      });
      data.push(course);
    }

    // console.log("data", data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const { batchCode } = req.body;
    console.log("batchCode", batchCode);

    let len = batchCode.length;
    let data = [];

    console.log("len", len);
    for (let i = 0; i < len; i++) {
      console.log("code", batchCode[i]);
      const batch = await Batch.findOne({ batchCode: batchCode[i] });
      batch.schedule.forEach((element) => {
        data.push(element);
      });
    }

    // console.log("data", data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
