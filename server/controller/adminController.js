import Admin from "../models/admin.js";
import Faculty from "../models/faculty.js";
import Student from "../models/student.js";
import Batch from "../models/batch.js";
import Attendance from "../models/attendance.js";
import Course from "../models/course.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  const errors = { usernameError: String, passwordError: String };

  try {
    const existingAdmin = await Admin.findOne({ username });
    if (!existingAdmin) {
      errors.usernameError = "Admin does not exist";
      return res.status(400).json(errors);
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingAdmin.password
    );

    if (!isPasswordCorrect) {
      errors.passwordError = "Password is incorrect";
      return res.status(400).json(errors);
    }

    const token = jwt.sign(
      {
        id: existingAdmin._id,
        email: existingAdmin.email,
      },
      "sEcReT",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingAdmin, token: token });
  } catch (error) {
    console.log(error);
  }
};

export const updatedPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, email } = req.body;
    const errors = { mismatchError: String };

    if (newPassword !== confirmPassword) {
      errors.mismatchError = "Passwords do not match";
      return res.status(400).json(errors);
    }

    const admin = await Admin.findOne({ email });
    let hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();

    if (admin.passwordUpdated === false) {
      admin.passwordUpdated = true;
      await admin.save();
    }

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      response: admin,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { name, dob, contactNumber, avatar, email } = req.body;
    const updatedAdmin = await Admin.findOne({ email });

    if (name) {
      updatedAdmin.name = name;
      await updatedAdmin.save();
    }

    if (dob) {
      updatedAdmin.dob = dob;
      await updatedAdmin.save();
    }

    if (contactNumber) {
      updatedAdmin.contactNumber = contactNumber;
      await updatedAdmin.save();
    }

    if (avatar) {
      updatedAdmin.avatar = avatar;
      await updatedAdmin.save();
    }

    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      response: updatedAdmin,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const addAdmin = async (req, res) => {
  try {
    const { name, dob, contactNumber, avatar, email, joiningYear } = req.body;

    const errors = { emailError: String };
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      errors.emailError = "Admin already exists";
      return res.status(400).json(errors);
    }

    // batch details

    var username = email.split("@")[0];

    let hashedPassword;
    const newDob = dob.split("-").reverse().join("-");

    hashedPassword = await bcrypt.hash(newDob, 10);
    var passwordUpdated = false;

    const newAdmin = await new Admin({
      name,
      email,
      password: hashedPassword,
      joiningYear,
      username,
      department,
      avatar,
      contactNumber,
      dob,
      passwordUpdated,
    });
    await newAdmin.save();
    return res.status(200).json({
      success: true,
      message: "Admin registerd successfully",
      response: newAdmin,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const addFaculty = async (req, res) => {
  try {
    const { name, dob, contactNumber, avatar, email, joiningYear, gender, designation, batch } = req.body;
    const errors = { emailError: String };
    
    const existingFaculty = await Faculty.findOne({ email });
    if (existingFaculty) {
      errors.emailError = "Faculty already exists";
      return res.status(400).json(errors);
    }

    // batch details

    var username = email.split("@")[0];
    let hashedPassword;
    const newDob = dob.split("-").reverse().join("-");

    hashedPassword = await bcrypt.hash(newDob, 10);
    var passwordUpdated = false;

    const newFaculty = await new Faculty({
      name,
      email,
      password: hashedPassword,
      joiningYear,
      username,
      department,
      avatar,
      contactNumber,
      dob,
      gender,
      designation,
      passwordUpdated,
    });
    await newFaculty.save();
    return res.status(200).json({
      success: true,
      message: "Faculty registerd successfully",
      response: newFaculty,
    });

  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
}

export const getFaculty = async (req, res) => {
  try {
    const { batch } = req.body;
    const errors = { noFacultyError: String };
    const faculties = await Faculty.find({ batch });

    if(faculties.length === 0) {
      errors.noFacultyError = "No faculty found";
      return res.status(400).json(errors);
    }

    res.status(200).json({ result: faculties });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
}