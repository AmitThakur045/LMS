import Faculty from "../models/faculty.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const facultyLogin = async (req, res) => {
  const { username, password } = req.body;
  const errors = { usernameError: String, passwordError: String };

  try {
    const existingFaculty = await Faculty.findOne({ username });
    if (!existingFaculty) {
      errors.usernameError = "Faculty doesn't exist.";
      return res.status(404).json(errors);
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingFaculty.password
    );

    if (!isPasswordCorrect) {
      errors.passwordError = "Invalid Credentials";
      return res.status(404).json(errors);
    }

    const token = jwt.sign(
      {
        email: existingFaculty.email,
        id: existingFaculty._id,
      },
      "sEcReT",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingFaculty, token: token });
  } catch (error) {
    console.log(error);
  }
};

export const updatedPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, email } = req.body;
    const errors = { mismatchError: String };
    if (newPassword !== confirmPassword) {
      errors.mismatchError =
        "Your password and confirmation password do not match";
      return res.status(400).json(errors);
    }

    const faculty = await Faculty.findOne({ email });
    let hashedPassword = await bcrypt.hash(newPassword, 10);
    faculty.password = hashedPassword;
    await faculty.save();
    if (faculty.passwordUpdated === false) {
      faculty.passwordUpdated = true;
      await faculty.save();
    }
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      response: faculty,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const updateFaculty = async (req, res) => {
  try {
    const { name, dob, batch, contactNumer, email, avatar, designation } =
      req.body;
    const updatedFaculty = await Faculty.findOne({ email });

    if (name) {
      updatedFaculty.name = name;
      await updateFaculty.save();
    }
    if (dob) {
      updatedFaculty.dob = dob;
      await updateFaculty.save();
    }
    if (batch) {
      updatedFaculty.batch = batch;
      await updateFaculty.save();
    }
    if (contactNumer) {
      updateFaculty.contactNumer = contactNumer;
      await updateFaculty.save();
    }
    if (avatar) {
      updatedFaculty.avatar = avatar;
      await updateFaculty.save();
    }
    if (designation) {
      updatedFaculty.designation = designation;
      await updateFaculty.save();
    }
    res.status(200).json(updateFaculty);
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const createAssignment = async (req, res) => {
  try {
    const {
      assignmentCode,
      courseCode,
      batchCode,
      year,
      date,
      totalMarks,
      assignment,
    } = req.body;

    const errors = { testError: String };
    const existingTest = await Test.findOne({
      assignmentCode,
      courseCode,
      batchCode,
      year,
    });

    if (existingTest) {
      errors.testError = "Test already exists";
      return res.status(400).json(errors);
    }

    const newTest = new Test({
      assignmentCode,
      courseCode,
      totalMarks,
      assignment,
      date,
      year,
      batchCode,
    });

    await newTest.save();

    const students = await Student.find({ batchCode, year, courseCode });
    students.forEach((student) => {
      student.assignment.push({
        assignmentCode,
        courseCode,
        batchCode,
      });
    });

    return res.status(200).json({
      success: true,
      message: "Test created successfully",
      response: newTest,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const getStudent = async (req, res) => {
  try {
    const { batchCode, year, courseCode } = req.body;
    const errors = { studentError: String };
    const students = await Student.find({ batchCode, year, courseCode });

    if (!students) {
      errors.studentError = "No students found";
      return res.status(404).json(errors);
    }

    res.status(200).json(students);
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

// upload marks

// marks attendance