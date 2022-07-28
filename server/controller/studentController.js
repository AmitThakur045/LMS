import Student from "../models/student.js";
import Course from "../models/course.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Batch from "../models/batch.js";
import Assignment from "../models/assignment.js";
import Problem from "../models/problem.js";
import Community from "../models/community.js";
import Organization from "../models/organization.js";
import { sendMail } from "../services/sendgrid.js";
import StudentAssignment from "../models/studentAssignment.js";

function calPerformance(assignment, totalAssignment) {
  let score = 0;

  if (assignment.length !== 0) {
    for (let i = 0; i < assignment.length; i++) {
      score += assignment[i].score;
    }

    score = score / totalAssignment;
  }
  let per = score;
  if (per >= 9.5) {
    return "A+";
  } else if (per < 9.5 && per >= 9) {
    return "A";
  } else if (per < 9 && per >= 8.5) {
    return "B+";
  } else if (per < 8.5 && per >= 8) {
    return "B";
  } else if (per < 8 && per >= 7.5) {
    return "C+";
  } else if (per < 7.5 && per >= 7) {
    return "C";
  } else if (per < 7 && per >= 6.5) {
    return "D+";
  } else if (per < 6.5 && per >= 6) {
    return "D";
  } else if (per < 6 && per >= 5.5) {
    return "E+";
  } else if (per < 5.5 && per >= 5) {
    return "E";
  } else {
    return "F";
  }
}

// Function to generate OTP
function generateOTP() {
  // Declare a digits variable 
  // which stores all digits
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 4; i++ ) {
      OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

export const studentLogin = async (req, res) => {
  const { email, password } = req.body;
  const errors = {
    emailError: String,
    passwordError: String,
    batchError: String,
  };

  try {
    const existingStudent = await Student.findOne(
      { email },
      { email: 1, firstName: 1, lastName: 1, batchCode: 1, password: 1 }
    );
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

    res.status(200).json({
      result: {
        firstName: existingStudent.firstName,
        lastName: existingStudent.lastName,
        batchCode: existingStudent.batchCode,
        email: existingStudent.email,
      },
      token: token,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getCourseByBatchCode = async (req, res) => {
  try {
    const { batchCode } = req.body;
    const courseCodeList = await Batch.findOne(
      { batchCode },
      { courses: 1 }
    ).populate("courses", "courseCode");

    const data = [];
    let len = courseCodeList.courses.length;

    for (let i = 0; i < len; i++) {
      const course = await Course.findOne({
        courseCode: courseCodeList.courses[i].courseCode,
      });
      data.push(course);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const { batchCode } = req.body;

    let len = batchCode.length;
    let data = [];

    for (let i = 0; i < len; i++) {
      const batch = await Batch.findOne(
        { batchCode: batchCode[i] },
        { schedule: 1 }
      ).populate("schedule");
      if (batch.schedule.length === 0) {
        return res.status(404).json({
          noEventError: "No events found",
        });
      }
      batch.schedule.forEach((element) => {
        data.push(element);
      });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAssignmentByBatchCode = async (req, res) => {
  try {
    const { batchCode, courseCode } = req.body;
    const errors = {
      noAssignmentError: String,
    };
    let len = batchCode.length;
    let data = [];

    const assignment = await Assignment.find({ batchCode, courseCode });
    assignment.forEach((element) => {
      data.push(element);
    });

    if (data.length === 0) {
      errors.noAssignmentError = "No Assignment Found";
      return res.status(400).json(errors);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const submitAssignment = async (req, res) => {
  try {
    const { assignmentCode, studentAnswer, email } = req.body;
    const assignment = await Assignment.findOne({ assignmentCode });

    let flag = false;
    if (assignment) {
      for (let i = 0; i < assignment.student.length; i++) {
        if (assignment.student[i].email === email) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        assignment.student.push({ email: email });
        await assignment.save();
      }
    }

    const student = await Student.findOne(
      { email },
      { assignment: 1, performance: 1 }
    ).populate("assignment");
    flag = false;

    if (student) {
      for (let i = 0; i < student.assignment.length; i++) {
        if (student.assignment[i].assignmentCode === assignmentCode) {
          const studentAssignment = await StudentAssignment.findById(
            student.assignment[i]._id
          );
          studentAssignment.studentAnswer = studentAnswer;
          await studentAssignment.save();
          flag = true;
          break;
        }
      }
      if (!flag) {
        const studentAssignment = new StudentAssignment({
          assignmentCode: assignmentCode,
          studentAnswer: studentAnswer,
          checkedAssignment: "",
          score: "",
        });
        await studentAssignment.save();
        student.assignment.push(studentAssignment._id);
      }
    }

    const assignments = await Assignment.find({
      batchCode: assignment.batchCode,
    });
    let totalAssignment = assignments.length;

    const performance = calPerformance(student.assignment, totalAssignment);
    student.performance = performance;
    await student.save();

    res.status(200).json("Assignment Submitted");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const generateOtp = async (req, res) => {
  try {
    const { email, organization } = req.body;
    const errors = { studentError: String };
    // check if organization exists
    const existingOrganization = await Organization.countDocuments({
      organizationName: organization,
    });

    if (!existingOrganization) {
      errors.studentError = "Organization doesn't exist";
      return res.status(400).json(errors);
    }

    // check if student exists
    const existingStudent = await Student.countDocuments({ email });

    if (existingStudent) {
      errors.studentError = "Student already exists";
      return res.status(400).json(errors);
    }

    // check if email domain is present in organization or not
    const organizationDomain = await Organization.findOne({
      organizationName: organization,
    });

    const emailDomain = email.split("@")[1];
    const organizationEmailList = organizationDomain.organizationEmails;

    let flag = false;
    for (let i = 0; i < organizationEmailList.length; i++) {
      if (organizationEmailList[i] == emailDomain) {
        flag = true;
        break;
      }
    }

    if (!flag) {
      errors.studentError = "Email domain is not present in organization";
      return res.status(400).json(errors);
    }

    const newOtp = generateOTP();

    sendMail({
      to: email,
      from: "at7129652@gmail.com",
      subject: "Welcome to Bessalani",
      text: `Welcome to Bessalani Your OTP is ${newOtp}`,
      html: `<h1>Welcome to Bessalani</h1>
      <p>Your OTP is ${newOtp}</p>`,
    });

    res.status(200).json(newOtp);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const studentSignUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, dob } = req.body;
    const errors = { studentError: String };
    const existingStudent = await Student.countDocuments({ email });

    if (existingStudent) {
      errors.studentError = "Student already exists";
      return res.status(400).json(errors);
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = await new Student({
      firstName,
      lastName,
      email,
      dob,
      password: hashedPassword,
    });
    await newStudent.save();

    return res.status(200).json({ email: email, password: password });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getBatchLessonVideoByCourse = async (req, res) => {
  try {
    const { batchCode, index } = req.body;
    // console.log(index);
    const errors = { noBatchError: String };

    const batch = await Batch.findOne(
      { batchCode },
      {
        batchCode: 1,
        batchName: 1,
        status: 1,
        subAdmin: 1,
        organizationName: 1,
        courses: 1,
      }
    ).populate({
      path: "courses",
      select: "courseCode courseName lessonVideo complete",
      populate: { path: "lessonVideo" },
    });

    if (batch === null) {
      errors.noBatchError = "No Batch Found";
      return res.status(404).json(errors);
    }
    res.status(200).json(batch);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

export const updateLearner = async (req, res) => {
  try {
    const { firstName, lastName, contactNumber, avatar, email } = req.body;
    const updatedLearner = await Student.findOne(
      { email },
      { firstName: 1, lastName: 1, contactNumber: 1, avatar: 1 }
    );
    const errors = { passwordError: String };

    // if first name is not empty update the user first name
    if (firstName) {
      updatedLearner.firstName = firstName;
      await updatedLearner.save();
    }

    // if last name is not empty update the user last name
    if (lastName) {
      updatedLearner.lastName = lastName;
      await updatedLearner.save();
    }

    // if contact number is not empty update the user contact number
    if (contactNumber) {
      updatedLearner.contactNumber = contactNumber;
      await updatedLearner.save();
    }

    // if avatar is not empty update the user avatar
    if (avatar !== "") {
      updatedLearner.avatar = avatar;
      await updatedLearner.save();
    }

    res.status(200).json("Student Updated");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const resetPasswordStudent = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    // console.log("req", req.body);
    const errors = { passwordError: String };
    const updatedLearner = await Student.findOne({ email }, { password: 1 });

    // check if old password lenght !== 0
    if (oldPassword.length > 0) {
      // check to compare old password with user password in db
      const isPasswordCorrect = await bcrypt.compare(
        oldPassword,
        updatedLearner.password
      );
      // if old password is incorrect
      if (!isPasswordCorrect) {
        errors.passwordError = "Invalid Password";
        return res.status(404).json(errors);
      }

      // if new password is not empty update the user password
      if (newPassword.length > 0) {
        let hashedPassword = await bcrypt.hash(newPassword, 10);
        updatedLearner.password = hashedPassword;
        await updatedLearner.save();
      } else {
        // if new password is empty
        errors.passwordError = "New Password is required";
        return res.status(404).json(errors);
      }
    }

    res.status(200).json("Password Updated");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const generateOtpForPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const errors = { studentError: String };
    const existingStudent = await Student.countDocuments({ email });

    if (!existingStudent) {
      errors.studentError = "Student doesn't exists";
      return res.status(400).json(errors);
    }

    const newOtp = generateOTP();

    sendMail({
      to: email,
      from: "at7129652@gmail.com",
      subject: "Welcome to Bessalani",
      text: `Welcome to Bessalani Your OTP is ${newOtp}`,
      html: `<h1>Welcome to Bessalani</h1>
      <p>Your OTP is ${newOtp}</p>`,
    });

    res.status(200).json(newOtp);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const errors = { studentError: String };
    const existingStudent = await Student.findOne({ email }, { password: 1 });

    if (!existingStudent) {
      errors.studentError = "Student doesn't exists";
      return res.status(400).json(errors);
    }

    let hashedPassword = await bcrypt.hash(newPassword, 10);
    existingStudent.password = hashedPassword;
    await existingStudent.save();

    res.status(200).json("Password Updated");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const addThread = async (req, res) => {
  try {
    const {
      problemName,
      problemDescription,
      problemCategory,
      by,
      communityType,
      batchCode,
    } = req.body;

    if (communityType === "All") {
      const newProblem = await new Problem({
        problemName,
        problemDescription,
        problemCategory,
        by,
        time: new Date(),
      });
      await newProblem.save();

      const existingCommunity = await Community.findOne({
        communityType: communityType,
      });
      if (existingCommunity) {
        existingCommunity.problem.push(newProblem._id);
        await existingCommunity.save();
      } else {
        let temp = [];
        temp.push(newProblem._id);
        const newCommunity = await new Community({
          communityType: communityType,
          problem: temp,
        });
        await newCommunity.save();
      }
    } else {
      const newProblem = await new Problem({
        problemName,
        problemDescription,
        problemCategory,
        by,
        time: new Date(),
      });
      await newProblem.save();

      const existingCommunity = await Community.findOne({
        communityType: communityType,
        batchCode: batchCode,
      });
      if (existingCommunity) {
        existingCommunity.problem.push(newProblem._id);
        await existingCommunity.save();
      } else {
        let temp = [];
        temp.push(newProblem._id);
        const newCommunity = await new Community({
          communityType: communityType,
          batchCode: batchCode,
          problem: temp,
        });
        await newCommunity.save();
      }
    }
    res.status(200).json("Thread Added");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
export const addThreadReply = async (req, res) => {
  try {
    const { threadId, reply, by } = req.body;

    const problem = await Problem.findById(threadId);
    problem.reply.push({ solution: reply, by });
    await problem.save();
    res.status(200).json("Thread Reply Added");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
export const addProblemCategory = async (req, res) => {
  try {
    const { category, communityType, batchCode } = req.body;

    if (communityType === "All") {
      const existingCommunity = await Community.findOne(
        {
          communityType: communityType,
        },
        { problemCategories: 1 }
      );
      if (existingCommunity) {
        let check = false;
        check = existingCommunity.problemCategories.find((cat) => {
          if (cat.category === category) {
            return true;
          }
        });
        if (!check) {
          existingCommunity.problemCategories.push({ category: category });
          await existingCommunity.save();
        }
      } else {
        let temp = [];
        temp.push({ category: category });
        const newCommunity = await new Community({
          communityType: communityType,
          problemCategories: temp,
        });
        await newCommunity.save();
      }
    } else {
      const existingCommunity = await Community.findOne(
        {
          communityType: communityType,
          batchCode: batchCode,
        },
        { problemCategories: 1 }
      );
      if (existingCommunity) {
        let check = false;
        check = existingCommunity.problemCategories.find((cat) => {
          if (cat.category === category) {
            return true;
          }
        });
        if (!check) {
          existingCommunity.problemCategories.push({ category: category });
          await existingCommunity.save();
        }
      } else {
        let temp = [];
        temp.push({ category: category });
        const newCommunity = await new Community({
          communityType: communityType,
          batchCode: batchCode,
          problemCategories: temp,
        });
        await newCommunity.save();
      }
    }
    return res.status(200).json("Category Added");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
export const deleteProblemCategory = async (req, res) => {
  try {
    const { category, communityType, batchCode } = req.body;
    if (communityType === "All") {
      const community = await Community.findOne(
        { communityType: communityType },
        { problemCategories: 1 }
      );

      for (let i = 0; i < community.problemCategories.length; i++) {
        if (community.problemCategories[i].category === category) {
          community.problemCategories.splice(i, 1);
        }
      }
      await community.save();
    } else {
      const community = await Community.findOne(
        { communityType: communityType, batchCode: batchCode },
        { problemCategories: 1 }
      );

      for (let i = 0; i < community.problemCategories.length; i++) {
        if (community.problemCategories[i].category === category) {
          community.problemCategories.splice(i, 1);
        }
      }
      await community.save();
    }

    return res.status(200).json("Category Deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getThreads = async (req, res) => {
  try {
    const { communityType, batchCode } = req.body;
    const errors = { noCommunityError: String };
    if (communityType === "All") {
      const community = await Community.findOne(
        { communityType },
        {
          problem: 1,
        }
      ).populate("problem");

      if (community === null) {
        errors.noCommunityError = "No Thread Found";
        return res.status(404).json(errors);
      } else {
        if (community.problem.length === 0) {
          errors.noCommunityError = "No Thread Found";
          return res.status(404).json(errors);
        }
      }

      res.status(200).json(community.problem);
    } else {
      const community = await Community.findOne(
        { communityType, batchCode: batchCode },
        {
          problem: 1,
        }
      ).populate("problem");

      if (community === null) {
        errors.noCommunityError = "No Thread Found";
        return res.status(404).json(errors);
      } else {
        if (community.problem.length === 0) {
          errors.noCommunityError = "No Thread Found";
          return res.status(404).json(errors);
        }
      }

      res.status(200).json(community.problem);
    }
  } catch (error) {
    console.log("Backend Error", error);
  }
};
export const getProblemCategories = async (req, res) => {
  try {
    const { communityType, batchCode } = req.body;

    if (communityType === "All") {
      const community = await Community.findOne(
        { communityType },
        {
          problemCategories: 1,
        }
      );

      if (community === null) {
        return res.status(200).json([]);
      } else {
        if (community.problemCategories.length === 0) {
          return res.status(200).json([]);
        }
      }

      res.status(200).json(community.problemCategories);
    } else {
      const community = await Community.findOne(
        { communityType, batchCode: batchCode },
        {
          problemCategories: 1,
        }
      );

      if (community === null) {
        return res.status(200).json([]);
      } else {
        if (community.problemCategories.length === 0) {
          return res.status(200).json([]);
        }
      }

      res.status(200).json(community.problemCategories);
    }
  } catch (error) {
    console.log("Backend Error", error);
  }
};
