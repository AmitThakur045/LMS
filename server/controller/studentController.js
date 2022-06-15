import Student from "../models/student.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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
