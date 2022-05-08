import Student from "../models/student";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const studentLogin = async (req, res) => {
  const { username, password } = req.body;
  const errors = { usernameError: String, passwordError: String };

  try {
    const existingStudent = await Student.findOne({ username });
    if (!existingStudent) {
      errors.usernameError = "Student doesn't exist.";
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
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingStudent, token: token });
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

    const student = await Student.findOne({ email });

    let hashedPassword = await bcrypt.hash(newPassword, 10);
    student.password = hashedPassword;
    await student.save();

    if (student.passwordUpdated === false) {
      student.passwordUpdated = true;
      await student.save();
    }

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      response: student,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateStudent = async (req, res) => {
  try {
    const {
      name,
      dob,
      contactNumber,
      avatar,
      email,
      batch,
      year,
      gender,
      fatherName,
      motherName,
      fatherContactNumber,
    } = req.body;

    const updatedStudent = await Student.findOne({ email });
    if (name) {
      updatedStudent.name = name;
      await updatedStudent.save();
    }

    if (dob) {
      updatedStudent.dob = dob;
      await updatedStudent.save();
    }

    if (contactNumber) {
      updatedStudent.contactNumber = contactNumber;
      await updatedStudent.save();
    }

    if (avatar) {
      updatedStudent.avatar = avatar;
      await updatedStudent.save();
    }

    if (batch) {
      updatedStudent.batch = batch;
      await updatedStudent.save();
    }

    if (gender) {
      updateStudent.gender = gender;
      await updateStudent.save();
    }

    if (year) {
      updateStudent.year = year;
      await updatedStudent.save();
    }

    if (motherName) {
      updatedStudent.motherName = motherName;
      await updatedStudent.save();
    }

    if (fatherName) {
      updatedStudent.fatherName = fatherName;
      await updatedStudent.save();
    }

    if (fatherContactNumber) {
      updatedStudent.fatherContactNumber = fatherContactNumber;
      await updatedStudent.save();
    }

    res.status(200).json(updateStudent);
  } catch (error) {}
};

