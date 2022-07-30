import Admin from "../models/admin.js";
import DeleteQuery from "../models/deleteQuery.js";
import Student from "../models/student.js";
import Schedule from "../models/schedule.js";
import BatchAssignment from "../models/batchAssignment.js";
import StudentAssignment from "../models/studentAssignment.js";
import BatchLessonVideo from "../models/batchLessonVideo.js";
import BatchCourse from "../models/batchCourse.js";
import Batch from "../models/batch.js";
import Attendance from "../models/attendance.js";
import Course from "../models/course.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Assignment from "../models/assignment.js";
import Organization from "../models/organization.js";
import { sendMail } from "../services/sendgrid.js";

function generateOTP() {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

// To facilitate the login of the admin
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const errors = { emailError: String, passwordError: String };

  try {
    // Check if the email is valid
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      errors.emailError = "Admin does not exist";
      return res.status(400).json(errors);
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingAdmin.password
    );

    // if password is incorrect return error
    if (!isPasswordCorrect) {
      errors.passwordError = "Password is incorrect";
      return res.status(400).json(errors);
    }

    // if password is correct, generate a token and return it
    const token = jwt.sign(
      {
        id: existingAdmin._id,
        email: existingAdmin.email,
      },
      "sEcReT",
      { expiresIn: "10h" }
    );

    res.status(200).json({ result: existingAdmin, token: token });
  } catch (error) {
    res.status(500).json(error);
  }
};

// To generate otp and send it to admin email while admin is performing the reset password operation
export const generateOtpForPasswordResetAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    const errors = { adminError: String };
    const existingAdmin = await Admin.countDocuments({ email });

    // return error if the admin does not exist
    if (!existingAdmin) {
      errors.adminError = "Admin doesn't exists";
      return res.status(400).json(errors);
    }

    const newOtp = generateOTP();

    // send the otp to the admin email for otp verification
    sendMail({
      to: email,
      from: {
        name: "Besslani",
        email: "at7129652@gmail.com", // Sender email address
      },
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

// To reset the password of the admin while admin is performing the forgot password operation
export const forgotPasswordAdmin = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const errors = { adminError: String };
    const existingAdmin = await Admin.findOne({ email }, { password: 1 });

    // return error if the admin does not exist
    if (!existingAdmin) {
      errors.adminError = "Admin doesn't exists";
      return res.status(400).json(errors);
    }

    // hash the new password and update the admin's password
    let hashedPassword = await bcrypt.hash(newPassword, 10);
    existingAdmin.password = hashedPassword;
    await existingAdmin.save();

    res.status(200).json("Password Updated");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const generateOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const errors = { adminError: String };
    const existingAdmin = await Admin.findOne({ email }, { password: 1 });

    if (!existingAdmin) {
      errors.adminError = "Admin does not exist";
      return res.status(400).json(errors);
    }

    const newOtp = generateOTP();

    sendMail({
      to: email,
      from: {
        name: "Besslani",
        email: "at7129652@gmail.com",
      },
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

export const resetPassword = async (req, res) => {
  try {
    // console.log("admin reset", req.body);
    const { oldPassword, newPassword, email } = req.body;
    const errors = { passwordError: String };

    const newAdmin = await Admin.findOne({ email }, { password: 1 });

    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      newAdmin.password
    );

    // if old password is incorrect
    if (!isPasswordCorrect) {
      errors.passwordError = "Invalid Password";
      return res.status(404).json(errors);
    }

    // if new password is not empty update the user password
    if (newPassword.length > 0) {
      let hashedPassword = await bcrypt.hash(newPassword, 10);
      newAdmin.password = hashedPassword;
      await newAdmin.save();
    } else {
      // if new password is empty
      errors.passwordError = "New Password is required";
      return res.status(404).json(errors);
    }

    // console.log("newAdmin", newAdmin);
    res.status(200).json("Password Updated");
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

// To get the admin details
export const getAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    const errors = { noAdminError: String };
    const admin = await Admin.findOne({ email });

    // if admin does not exist return error
    if (admin === null) {
      errors.noAdminError = "No Admin Found";
      return res.status(404).json(errors);
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json(error);
  }
};

// To update Admin details
export const updateAdmin = async (req, res) => {
  try {
    // fields to be updated in the admin
    const { firstName, lastName, email } = req.body;
    const updateAdmin = await Admin.findOne(
      { email },
      { firstName: 1, lastName: 1 }
    );

    // if firstName is not empty update the firstName
    if (firstName) {
      updateAdmin.firstName = firstName;
      await updateAdmin.save();
    }

    // if lastName is not empty update the lastName
    if (lastName) {
      updateAdmin.lastName = lastName;
      await updateAdmin.save();
    }

    res.status(200).json("Admin Updated");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// To update the student details by the admin
export const updateStudent = async (req, res) => {
  try {
    // fields to be updated in the student
    const { firstName, lastName, contactNumber, avatar, email } = req.body;
    const updatedStudent = await Student.findOne(
      { email },
      { firstName: 1, lastName: 1, contactNumber: 1, avatar: 1 }
    );

    // if firstName is not empty update the firstName
    if (firstName) {
      updatedStudent.firstName = firstName;
      await updatedStudent.save();
    }
    // if lastName is not empty update the lastName
    if (lastName) {
      updatedStudent.lastName = lastName;
      await updatedStudent.save();
    }
    // if contactNumber is not empty update the contactNumber
    if (contactNumber) {
      updatedStudent.contactNumber = contactNumber;
      await updatedStudent.save();
    }
    // if avatar is not empty update the avatar
    if (avatar) {
      updatedStudent.avatar = avatar;
      await updatedStudent.save();
    }

    res.status(200).json("Student Updated");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// To create new admin
export const addAdmin = async (req, res) => {
  try {
    // Necessary fields to be added in the admin
    const {
      firstName,
      lastName,
      dob,
      contactNumber,
      email,
      sub,
      organizationName,
      createdBy,
    } = req.body;

    const errors = { emailError: String };
    const existingAdmin = await Admin.countDocuments({ email });

    // if admin already exists return error
    if (existingAdmin) {
      errors.emailError = "Admin already exists";
      return res.status(400).json(errors);
    }

    let tempOrganizationName;
    // if sub === false then the given admin is Super admin
    if (sub === "false") {
      tempOrganizationName = "Super Admin";
    } else {
      tempOrganizationName = organizationName;
    }

    // New admin password will be always be their DOB eg-> dd-mm-yyyy
    let hashedPassword;
    const newDob = dob.split("-").reverse().join("-");
    // encrypt the password
    hashedPassword = await bcrypt.hash(newDob, 10);

    // create a new admin object and save it in the database
    const newAdmin = await new Admin({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      contactNumber,
      dob,
      sub,
      organizationName: tempOrganizationName,
      createdBy,
    });
    await newAdmin.save();
    return res.status(200).json("Admin Added Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

// To add the student delete query
export const addStudentQuery = async (req, res) => {
  try {
    const { code, subAdmin, avatar } = req.body;
    let updated = false;
    const errors = { deleteQueryError: String };
    const existingDeleteQuery = await DeleteQuery.countDocuments({
      code,
      subAdmin,
      updated,
    });

    // check if the delete query already exists in the database if true return error
    if (existingDeleteQuery) {
      errors.deleteQueryError = "Query already exists";
      return res.status(400).json(errors);
    }
    const subAdminData = await Admin.findOne(
      { email: subAdmin },
      { createdBy: 1 }
    );

    // add the delete query to the admin which created the student
    const newDeleteQuery = await new DeleteQuery({
      subAdmin,
      code,
      avatar,
      superAdmin: subAdminData.createdBy,
    });
    await newDeleteQuery.save();
    return res.status(200).json("Delete Query Added successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

// to update the delete student query
export const updateDeleteQuery = async (req, res) => {
  try {
    const { code, subAdmin, status } = req.body;

    const deleteQuery = await DeleteQuery.findOne({ code, subAdmin });
    deleteQuery.status = status;
    deleteQuery.updated = true;
    await deleteQuery.save();

    // if super admin confirm the delete query then delete the student
    if (status === true) {
      // find the student using the code (email) and populate its assignment
      const student = await Student.findOne(
        { email: code },
        { batchCode: 1, assignment: 1 }
      ).populate("assignment");

      // delete the student from the batches in which he is assigned
      for (let i = 0; i < student.batchCode.length; i++) {
        // find the batch using the batchCode
        const batch = await Batch.findOne(
          { batchCode: student.batchCode[i] },
          { students: 1 }
        );

        // remove the student from the batch if it exist
        if (batch) {
          let index = batch.students.findIndex((stu) => stu === code);
          batch.students.splice(index, 1);
        }
        // save the batch
        await batch.save();
      }

      // delete the student assignment from the database
      for (let i = 0; i < student.assignment.length; i++) {
        await StudentAssignment.findByIdAndDelete(student.assignment[i]._id);
      }

      // delete the student from the database
      student.remove();

      return res.status(200).json("Student Deleted");
    }
    return res.status(200).json("Query Updated");
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all the students delete queries
export const getAllDeleteQuery = async (req, res) => {
  try {
    // find all the delete queries
    const deleteQueries = await DeleteQuery.find({
      superAdmin: req.body.superAdmin,
      updated: false,
    });
    const errors = { deleteQueryError: String };

    // if no delete queries found return error
    if (deleteQueries.length === 0) {
      errors.deleteQueryError = "No Delete Query Found";
      return res.status(400).json(errors);
    }
    return res.status(200).json(deleteQueries);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all the students delete queries by sub admin
export const getAllDeleteQueryBySubAdmin = async (req, res) => {
  try {
    const { subAdmin } = req.body;
    // find all the delete queries by sub admin
    const deleteQueries = await DeleteQuery.find({ subAdmin });
    const errors = { deleteQueryError: String };

    // if no delete queries found return error
    if (deleteQueries.length === 0) {
      errors.deleteQueryError = "No Query Found";
      return res.status(400).json(errors);
    }
    return res.status(200).json(deleteQueries);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Add the students to the database
export const addStudent = async (req, res) => {
  try {
    // Necessary fields to be added in the student
    const { firstName, lastName, email, avatar, contactNumber, dob } = req.body;
    const errors = { studentError: String };
    const existingStudent = await Student.countDocuments({ email });

    // check if the student already exists in the database if true return error
    if (existingStudent) {
      errors.studentError = "Student already exists";
      return res.status(400).json(errors);
    }
    // new password the student which is created by admin will always be their DOB eg-> dd-mm-yyyy
    const newDob = dob.split("-").reverse().join("-");
    // encrypt the password
    let hashedPassword = await bcrypt.hash(newDob, 10);

    // save the student in the database
    const newStudent = await new Student({
      firstName,
      lastName,
      email,
      avatar,
      contactNumber,
      dob,
      password: hashedPassword,
    });
    await newStudent.save();

    return res.status(200).json("Student added successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

// add the student to the batch
export const addStudentInBatch = async (req, res) => {
  try {
    const { email, batchCode } = req.body;
    // find the student using the email
    const student = await Student.findOne(
      { email },
      { batchCode: 1, dateOfJoining: 1, attendance: 1 }
    );
    const errors = { studentError: String };
    // if no student found return error
    if (!student) {
      errors.studentError = "Student doesn't exists";
      return res.status(400).json(errors);
    }

    // find the batch using the batchCode
    let alreadyBatch = student.batchCode.find((code) => code === batchCode);

    // if the given batch is not present in student's batchCode array then add the current batch
    if (alreadyBatch !== batchCode) {
      student.batchCode.push(batchCode);
      await student.save();
    }

    const batch = await Batch.findOne(
      { batchCode },
      { students: 1, courses: 1 }
    ).populate("courses", "courseCode");

    // fint the student in the current batch using student email
    let alreadyStudent = batch.students.find((em) => em === email);
    // if the student is not present in the batch then add the student
    if (alreadyStudent !== email) {
      batch.students.push(email);
      await batch.save();

      // set the attendance of the student to 0 for all the courses if the current batch 
      // as he is recently added to the batch
      for (let j = 0; j < batch.courses.length; j++) {
        student.attendance.push({
          courseCode: batch.courses[j].courseCode,
          attended: 0,
          batchCode: batchCode,
        });
      }
      var d = Date(Date.now());
      // set date of joining of the student to current date
      student.dateOfJoining = d.toString();
      await student.save();
    } else {
      errors.studentError = "Student Already Added";
      return res.status(400).json(errors);
    }
    return res.status(200).json("Student added successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all the students in the database
export const getAllStudent = async (req, res) => {
  try {
    const students = await Student.find(
      {},
      {
        firstName: 1,
        lastName: 1,
        email: 1,
        contactNumber: 1,
        performance: 1,
        avatar: 1,
        batchCode: 1,
        dob: 1,
      }
    );
    const errors = { noStudentError: String };

    // if no student found return error
    if (students.length === 0) {
      errors.noStudentError = "No Student Found";
      return res.status(400).json(errors);
    }
    res.status(200).json(students);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

// get all the students in the database by sub admin
export const getStudentsLengthBySubAdmin = async (req, res) => {
  try {
    const { organizationName, subAdmin } = req.body;
    // find the batches under that organization name
    const batches = await Batch.find(
      { organizationName: organizationName },
      { students: 1, subAdmin: 1 }
    );

    const errors = { noStudentError: String };
    let students = [];

    for (let i = 0; i < batches.length; i++) {
      // if the subadmin are same then add the students to the students array
      if (batches[i].subAdmin === subAdmin) {
        for (let j = 0; j < batches[i].students.length; j++) {
          const student = await Student.findOne(
            {
              email: batches[i].students[j],
            },
            { email: 1 }
          );
          if (student) {
            students.push(student);
          }
        }
      }
    }

    res.status(200).json(students.length);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

// get all the students in the database
export const getAllStudentLength = async (req, res) => {
  try {
    const students = await Student.countDocuments();

    res.status(200).json(students);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

// get all the admin in the database 
export const getAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.find();

    const errors = { noAdminError: String };

    if (admins.length === 0) {
      errors.noAdminError = "No Admin Found";
      return res.status(400).json(errors);
    }
    res.status(200).json(admins);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

// get all the admin in the database
export const getAllAdminLength = async (req, res) => {
  try {
    const admins = await Admin.countDocuments();

    res.status(200).json(admins);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

// get all admin under the organization name
export const getAdminsByOrganizationName = async (req, res) => {
  try {
    const { organizationName } = req.body;
    // find all admin which are under the given organization name
    const admins = await Admin.find({ organizationName: organizationName });

    const errors = { noAdminError: String };

    // if no admin found return error
    if (admins.length === 0) {
      errors.noAdminError = "No Admin Found";
      return res.status(400).json(errors);
    }
    res.status(200).json(admins);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

// get admin length under the organization name
export const getAdminsLengthByOrganizationName = async (req, res) => {
  try {
    const { organizationName } = req.body;
    const admins = await Admin.find(
      { organizationName: organizationName },
      { email: 1 }
    );

    res.status(200).json(admins.length);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

// get all student under the organization name
export const getStudentsByOrganizationName = async (req, res) => {
  try {
    const { organizationName, subAdmin } = req.body;
    // find all batches under the given organization name
    const batches = await Batch.find(
      { organizationName: organizationName },
      { subAdmin: 1, students: 1 }
    );

    const errors = { noStudentError: String };
    let students = [];

    for (let i = 0; i < batches.length; i++) {
      // if the subadmin are same then add the students to the students array
      if (batches[i].subAdmin === subAdmin) {
        for (let j = 0; j < batches[i].students.length; j++) {
          const student = await Student.findOne(
            {
              email: batches[i].students[j],
            },
            {
              firstName: 1,
              lastName: 1,
              email: 1,
              contactNumber: 1,
              performance: 1,
              avatar: 1,
              batchCode: 1,
              dob: 1,
            }
          );
          if (student) {
            students.push(student);
          }
        }
      }
    }

    if (students.length === 0) {
      errors.noStudentError = "No Student Found";
      return res.status(400).json(errors);
    }
    res.status(200).json(students);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

// get all courses in database
export const getAllCourse = async (req, res) => {
  try {
    // find all courses in the database
    const courses = await Course.find();
    const errors = { courseError: String };

    // if no course found return error
    if (courses.length === 0) {
      errors.courseError = "No Course Found";
      return res.status(400).json(errors);
    }

    res.status(200).json(courses);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

// get the count of courses in database
export const getCoursesLength = async (req, res) => {
  try {
    const courses = await Course.countDocuments();

    res.status(200).json(courses.length);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

// get student in database using email
export const getStudent = async (req, res) => {
  try {
    const { email } = req.body;

    const errors = { noStudentError: String };
    // find the student and populate its assignmen only
    const student = await Student.findOne({ email }).populate("assignment");
    if (student === null) {
      errors.noStudentError = "No Student Found";
      return res.status(404).json(errors);
    }
    res.status(200).json(student);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

// add course to database
export const addCourse = async (req, res) => {
  try {
    // necessary fields to add a course
    const {
      courseName,
      courseCode,
      description,
      totalLectures,
      difficulty,
      section,
      courseImg,
    } = req.body;
    const errors = { courseCodeError: String };
    const existingCourse = await Course.countDocuments({ courseCode });
    
    // check if the course code is already in the database
    if (existingCourse) {
      errors.courseCodeError = "Course already exists";
      return res.status(400).json(errors);
    }

    // save the course
    const newCourse = await new Course({
      courseName,
      courseCode,
      description,
      totalLectures,
      difficulty,
      courseImg,
      section,
    });
    await newCourse.save();
    return res.status(200).json("Course Added successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

// get the course using the course code 
export const getCourse = async (req, res) => {
  try {
    const { courseCode } = req.body;
    const errors = { noCourseError: String };
    // find the course using the course code
    const course = await Course.findOne({ courseCode });
    if (course === null) {
      errors.noCourseError = "No Course Found";
      return res.status(404).json(errors);
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all the courses 
export const getCourses = async (req, res) => {
  try {
    const courses = req.body;

    const courseData = [];
    for (let i = 0; i < courses.length; i++) {
      let courseCode = courses[i];
      // find the course using course code
      let temp = await Course.findOne(
        { courseCode },
        {
          courseName: 1,
          courseCode: 1,
          section: 1,
          totalLectures: 1,
          courseImg: 1,
        }
      );
      courseData.push(temp);
    }

    // return array of courses 
    res.status(200).json(courseData);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get arrays of student using emails and batchcode
export const getStudents = async (req, res) => {
  try {
    const { emails, batchCode } = req.body;

    const errors = { noStudentError: String };
    const studentsData = [];

    for (let i = 0; i < emails.length; i++) {
      let email = emails[i];
      // find the student using email and populate the assignment
      const student = await Student.findOne({ email }).populate("assignment");
      let temp = student;

      // filter the attendance using batch code
      let attendanceData = temp.attendance.filter((att) => {
        return att.batchCode === batchCode;
      });
      temp.attendance = attendanceData;
      // filter the assignment using batch code
      let assignmentData = temp.assignment.filter((ass) => {
        return ass.batchCode === batchCode;
      });
      temp.assignment = assignmentData;

      // push the student attendance and asssignment to the studentsData array
      studentsData.push(temp);
    }

    // if no student found return error
    if (studentsData.length === 0) {
      errors.noStudentError = "No Student Found";
      return res.status(400).json(errors);
    }
    res.status(200).json(studentsData);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get the assignment of the given batch using batchcode
export const totalAssignment = async (req, res) => {
  try {
    const { batchCode } = req.body;
    // find the assignment of the given batch
    const assignments = await Assignment.countDocuments({ batchCode });

    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete admin from database
export const deleteAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    const batches = await Batch.countDocuments({ subAdmin: email });
    const errors = { adminError: String };

    // if given admin is not the subadmin of any active batch then delete it  
    if (batches.length === 0) {
      await Admin.findOneAndDelete({ email });
      res.status(200).json({ message: "Admin Deleted" });
    } else {
      errors.adminError =
        "Batch Found under this admin. Please change Admin for the respective Batches";
      return res.status(404).json(errors);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete course from the database
export const deleteCourse = async (req, res) => {
  try {
    const { courseCode } = req.body;
    await Course.findOneAndDelete({ courseCode });
    res.status(200).json({ message: "Course Deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Add batch to database
export const addBatch = async (req, res) => {
  try {
    // Necessary fields to add a batch
    const {
      batchName,
      batchCode,
      courses,
      students,
      organizationName,
      subAdmin,
    } = req.body;
    const errors = { batchError: String };
    const existingBatch = await Batch.countDocuments({ batchCode });

    // check if the batch code is already in the database
    if (existingBatch) {
      errors.batchError = "Batch already exists";
      return res.status(400).json(errors);
    }
    let stu = [];

    let courseData = [];

    // add courses to the batch and save the batch
    for (let i = 0; i < courses.length; i++) {
      // find the course using course code
      const course = await Course.findOne(
        { courseCode: courses[i] },
        { courseName: 1, section: 1 }
      );

      let couCode = courses[i];
      let cou = {};

      cou.courseCode = couCode;
      cou.courseName = course.courseName;
      cou.complete = {
        sectionCompleted: 0,
        lessonCompleted: 0,
        totalLesson: 0,
      };
      cou.lessonVideo = [];

      let sum = 0;

      for (let i = 0; i < course.section.length; i++) {
        let temp1 = {
          sectionNumber: course.section[i].sectionNumber,
          sectionCompleted: false,
          sectionName: course.section[i].sectionName,
          lesson: [],
        };
        sum += course.section[i].lesson.length;
        for (let j = 0; j < course.section[i].lesson.length; j++) {
          let temp2 = {
            lessonNumber: course.section[i].lesson[j].lessonNumber,
            lessonCompleted: false,
            video: "",
            lessonName: course.section[i].lesson[j].lessonName,
          };
          temp1.lesson.push(temp2);
        }
        const newBatchLessonVideo = await new BatchLessonVideo({
          sectionNumber: temp1.sectionNumber,
          sectionName: temp1.sectionName,
          sectionCompleted: temp1.sectionCompleted,
          lesson: temp1.lesson,
        });
        await newBatchLessonVideo.save();
        cou.lessonVideo.push(newBatchLessonVideo._id);
      }
      cou.complete.totalLesson = sum;

      const newBatchCourse = await new BatchCourse({
        courseCode: cou.courseCode,
        courseName: cou.courseName,
        complete: cou.complete,
        lessonVideo: cou.lessonVideo,
      });
      await newBatchCourse.save();
      courseData.push(newBatchCourse._id);
    }

    // Adding students to the batch
    for (let i = 0; i < students.length; i++) {
      if (students[i][0] !== "") {
        const student = await Student.findOne(
          { email: students[i][0] },
          { batchCode: 1, attendance: 1, dateOfJoining: 1 }
        );

        // If student laready singup for the batch
        if (student) {
          let alreadyBatch = student.batchCode.find(
            (code) => code === batchCode
          );

          if (alreadyBatch !== batchCode) {
            student.batchCode.push(batchCode);
          }
          for (let j = 0; j < courses.length; j++) {
            student.attendance.push({
              courseCode: courses[j],
              attended: 0,
              batchCode: batchCode,
            });
          }
          stu.push(students[i][0]);
          var d = Date(Date.now());
          student.dateOfJoining = d.toString();
          await student.save();
        } else {
          // if Student did not signup for the batch send an email to remid them
          const email = students[i][0];

          sendMail({
            to: email,
            from: {
              name: "Besslani",
              email: "at7129652@gmail.com",
            },
            subject: "SignUp to Bessalani",
            text: `Please signup to Bessalani for the batch allocation at your earliest.`,
            html: `<h1>Please signup to Bessalani for the batch allocation at your earliest.</h1>`,
          });
        }
      }
    }

    const newBatch = await new Batch({
      batchName,
      organizationName,
      subAdmin,
      batchCode,
      courses: courseData,
      students: stu,
    });

    await newBatch.save();

    return res.status(200).json("Batch added successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all batches
export const getAllBatchCodes = async (req, res) => {
  try {
    const batches = await Batch.find({}, { batchCode: 1 });

    let batchCodes = [];

    for (let i = 0; i < batches.length; i++) {
      batchCodes.push({
        label: batches[i].batchCode,
        value: batches[i].batchCode,
      });
    }

    if (batchCodes.length === 0) {
      res.status(400).json("No Batch Found");
    }

    res.status(200).json(batchCodes);
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

// get batches with given batch code
export const getBatchesByBatchCode = async (req, res) => {
  try {
    const { allBatches } = req.body;

    let list = [];

    for (let i = 0; i < allBatches.length; i++) {
      // if batch code is not empty and it exist in the database then push it to the list
      const batch = await Batch.findOne({
        batchCode: allBatches[i].value,
      }).populate({
        path: "courses",
        populate: { path: "lessonVideo" },
      });
      list.push(batch);
    }

    res.status(200).json(list);
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const getBatchCodesBySubAdmin = async (req, res) => {
  try {
    const { organizationName, subAdmin } = req.body;
    const batches = await Batch.find({ subAdmin }, { batchCode: 1 });
    const errors = { noBatchError: String };
    let batchCodes = [];

    for (let i = 0; i < batches.length; i++) {
      batchCodes.push({
        label: batches[i].batchCode,
        value: batches[i].batchCode,
      });
    }
    res.status(200).json(batchCodes);
  } catch (error) {
    console.log("error", error);
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

// get all the organization name
export const getAllOrganizationName = async (req, res) => {
  try {
    const organizations = await Organization.find();

    res.status(200).json(organizations);
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

// get all the courses code in given database
export const getAllCourseCodes = async (req, res) => {
  try {
    const courses = await Course.find({}, { courseCode: 1 });
    let courseCodes = [];

    for (let i = 0; i < courses.length; i++) {
      courseCodes.push({
        label: courses[i].courseCode,
        value: courses[i].courseCode,
      });
    }

    res.status(200).json(courseCodes);
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

// return batch details by batch code
export const getBatch = async (req, res) => {
  try {
    const { batchCode } = req.body;
    const errors = { noBatchError: String };
    const batch = await Batch.findOne(
      { batchCode },
      {
        batchCode: 1,
        batchName: 1,
        status: 1,
        subAdmin: 1,
        organizationName: 1,
        schedule: 1,
        students: 1,
        batchLink: 1,
        courses: 1,
      }
    )
      .populate("schedule")
      .populate({
        path: "courses",
        select: "courseCode courseName assignment complete",
        populate: { path: "assignment" },
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

// get lesson video from the given batch
export const getBatchLessonVideo = async (req, res) => {
  try {
    const { batchCode } = req.body;
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

// update schedule list in batch
export const addEvent = async (req, res) => {
  try {
    const { batchCode, newEvent } = req.body;

    const errors = { noBatchError: String };
    const batch = await Batch.findOne({ batchCode }, { schedule: 1 });
    const schedule = await new Schedule({
      title: newEvent.title,
      start: newEvent.start,
      end: newEvent.end,
      link: newEvent.link,
      courseCode: newEvent.courseCode,
    });
    await schedule.save();

    batch.schedule.push(schedule._id);
    await batch.save();
    res.status(200).json(batch);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

// update the meeting link for the given batch
export const addBatchLink = async (req, res) => {
  try {
    const { batchLink, batchCode } = req.body;
    const batch = await Batch.findOne({ batchCode }, { batchLink: 1 });

    batch.batchLink = batchLink;
    await batch.save();
    res.status(200).json(batch);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

// update the course data in the given batch 
export const updateCourseData = async (req, res) => {
  try {
    const { lessonVideo, complete, batchCode, courseCode } = req.body;

    // find the given course the current batch and update the data
    const batch = await Batch.findOne({ batchCode }, { courses: 1 }).populate(
      "courses",
      "courseCode"
    );

    let index = batch.courses.findIndex(
      (course) => course.courseCode === courseCode
    );
    const batchCourse = await BatchCourse.findById(batch.courses[index]._id, {
      lessonVideo: 1,
      complete: 1,
    }).populate("lessonVideo");

    for (let i = 0; i < lessonVideo.length; i++) {
      const batchLessonVideo = await BatchLessonVideo.findById(
        lessonVideo[i]._id
      );
      if (
        lessonVideo[i].sectionCompleted !==
        batchCourse.lessonVideo[i].sectionCompleted
      ) {
        batchLessonVideo.sectionCompleted = lessonVideo[i].sectionCompleted;
      }
      for (let j = 0; j < lessonVideo[i].lesson.length; j++) {
        if (
          lessonVideo[i].lesson[j].lessonCompleted !==
          batchLessonVideo.lesson[j].lessonCompleted
        ) {
          batchLessonVideo.lesson[j].lessonCompleted =
            lessonVideo[i].lesson[j].lessonCompleted;
        }
        if (
          lessonVideo[i].lesson[j].video !== batchLessonVideo.lesson[j].video
        ) {
          batchLessonVideo.lesson[j].video = lessonVideo[i].lesson[j].video;
        }
      }
      await batchLessonVideo.save();
    }

    // update the complete status of the course section
    if (complete.sectionCompleted !== batchCourse.complete.sectionCompleted) {
      batchCourse.complete.sectionCompleted = complete.sectionCompleted;
    }
    // update the complete status of the course section 
    if (complete.lessonCompleted !== batchCourse.complete.lessonCompleted) {
      batchCourse.complete.lessonCompleted = complete.lessonCompleted;
    }
    await batchCourse.save();

    res.status(200).json("Course Updated");
  } catch (error) {
    console.log("Backend Error", error);
  }
};

// get the event of the current batch
export const getBatchEvent = async (req, res) => {
  try {
    const { batchCode } = req.body;

    const batch = await Batch.findOne({ batchCode }, { schedule: 1 }).populate(
      "schedule"
    );

    res.status(200).json(batch.schedule);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

// get evenet of the course of the current batch
export const getEventByCourseCode = async (req, res) => {
  try {
    const { batchCode, courseCode } = req.body;

    const batch = await Batch.findOne({ batchCode }, { schedule: 1 }).populate(
      "schedule"
    );

    const schedule = [];
    schedule.push({});
    for (let i = 0; i < batch.schedule.length; i++) {
      if (batch.schedule[i].courseCode === courseCode) {
        let temp = batch.schedule[i].start; // start time of the event
        let str = temp.split("T")[0];

        let year = str.slice(0, 4); // get year

        let month = str.slice(5, 7); // get month

        let day = str.slice(8, 10); // get day

        schedule.push({
          day: parseInt(day),
          year: parseInt(year),
          month: parseInt(month) - 1,
        });
      }
    }

    res.status(200).json(schedule);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

// get attendance 
export const getAttendance = async (req, res) => {
  try {
    const { batchCode, courseCode } = req.body;
    // find the aattendance of the given batch code and course
    const attendance = await Attendance.find({ batchCode, courseCode });
    const errors = { noAttendanceError: String };

    if (attendance.length === 0) {
      errors.noAttendanceError = "No Attendance Found";
      return res.status(400).json(errors);
    }
    return res.status(200).json(attendance);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

// get attendance status of the current batch
export const getAttendanceStatus = async (req, res) => {
  try {
    const { batchCode } = req.body;
    const attendance = await Attendance.find({ batchCode }, { students: 1 });
    let LectureAttended = 0;
    let totalClasses = 0;

    // to find the total classes and lecture attendance 
    for (let i = 0; i < attendance.length; i++) {
      if (attendance[i].students.length !== 0) {
        totalClasses++;
      }
      for (let j = 0; j < attendance[i].students.length; j++) {
        if (attendance[i].students[j].present === true) {
          LectureAttended++;
        }
      }
    }
    res.status(200).json({ LectureAttended, totalClasses });
  } catch (error) {
    console.log("Backend Error", error);
  }
};

// get attendance status of the batches
export const getAttendanceByBatchCodes = async (req, res) => {
  try {
    const { allBatches } = req.body;

    let attendance = [];
    for (let i = 0; i < allBatches.length; i++) {
      // find the attendance of the given batch 
      const attendances = await Attendance.find({
        batchCode: allBatches[i].value,
      });
      // push the attendance of the given batch to the attendance array
      if (attendances.length !== 0) {
        attendance.push(attendances);
      }
    }

    return res.status(200).json(attendance[0]);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

export const uploadAttendance = async (req, res) => {
  try {
    const attendanceRecord = req.body;

    for (let i = 0; i < attendanceRecord.length; i++) {
      const attendance = await Attendance.findOne({
        batchCode: attendanceRecord[i].batchCode,
        courseCode: attendanceRecord[i].courseCode,
        date: attendanceRecord[i].date,
      });

      let flag = false;
      if (attendance) {
        for (let j = 0; j < attendance.students.length; j++) {
          if (attendance.students[j].email === attendanceRecord[i].student) {
            const student = await Student.findOne(
              {
                email: attendance.students[j].email,
              },
              { attendance: 1 }
            );

            for (let k = 0; k < student.attendance.length; k++) {
              if (student.attendance[k].courseCode === attendance.courseCode) {
                let temp = student.attendance[k].attended;

                if (attendanceRecord[i].present === true) {
                  if (attendance.students[j].present === true) {
                    continue;
                  } else {
                    if (attendanceRecord[i]) {
                      ++temp;

                      student.attendance[k].attended = temp;
                      await student.save();
                    }
                  }
                } else {
                  if (attendance.students[j].present === true) {
                    if (attendanceRecord[i]) {
                      --temp;
                      student.attendance[k].attended = temp;
                      await student.save();
                    }
                  } else {
                    continue;
                  }
                }
              }
            }
            attendance.students[j].present = attendanceRecord[i].present;
            await attendance.save();
            flag = true;
          }
        }
        if (flag === false) {
          attendance.students.push({
            email: attendanceRecord[i].student,
            present: attendanceRecord[i].present,
          });

          const student = await Student.findOne(
            {
              email: attendanceRecord[i].student,
            },
            { attendance: 1 }
          );
          for (let k = 0; k < student.attendance.length; k++) {
            if (
              student.attendance[k].courseCode ===
              attendanceRecord[i].courseCode
            ) {
              let temp = student.attendance[k].attended;
              if (attendanceRecord[i].present === true) {
                ++temp;

                student.attendance[k].attended = temp;
                await student.save();
              }
            }
          }
          await attendance.save();
          flag = false;
        }
      } else if (!attendance) {
        let students = [];
        students.push({
          email: attendanceRecord[i].student,
          present: attendanceRecord[i].present,
        });

        const newAttendance = await new Attendance({
          batchCode: attendanceRecord[i].batchCode,
          courseCode: attendanceRecord[i].courseCode,
          date: attendanceRecord[i].date,
          students: students,
        });
        await newAttendance.save();

        const student = await Student.findOne(
          {
            email: attendanceRecord[i].student,
          },
          { attendance: 1 }
        );
        for (let k = 0; k < student.attendance.length; k++) {
          if (
            student.attendance[k].courseCode === attendanceRecord[i].courseCode
          ) {
            let temp = student.attendance[k].attended;
            if (attendanceRecord[i].present === true) {
              ++temp;

              student.attendance[k].attended = temp;
              await student.save();
            }
          }
        }
      }
    }

    res.status(200).json("Attendance Uploaded");
  } catch (error) {
    console.log("Backend Error", error);
  }
};

// add assignment to the database
export const addAssignment = async (req, res) => {
  try {
    // necessary fields to be filled
    const {
      batchCode,
      courseCode,
      assignmentCode,
      assignmentName,
      assignmentDescription,
      assignmentDate,
      assignmentPdf,
    } = req.body;

    const errors = { assignmentCodeError: String };
    const existingAssignment = await Assignment.countDocuments({
      assignmentCode,
    });
    
    // check if the assignment code is already in the database
    if (existingAssignment) {
      errors.assignmentCodeError = "Assignment already exists";
      return res.status(400).json(errors);
    }

    const newAssignment = await new Assignment({
      batchCode,
      courseCode,
      assignmentCode,
      assignmentName,
      assignmentDescription,
      assignmentDate,
      assignmentPdf,
    });

    // save the new assignment to the database
    await newAssignment.save();

    const temp = {
      assignmentCode: assignmentCode,
      assignmentName: assignmentName,
      assignmentPdf: assignmentPdf,
    };

    const currBatch = await Batch.findOne(
      { batchCode },
      { courses: 1 }
    ).populate("courses");
    for (let i = 0; i < currBatch.courses.length; i++) {
      // if the coursecode is same as the coursecode of the assignment
      // then add the given assignment to the course
      if (currBatch.courses[i].courseCode === courseCode) {
        const batchCourse = await BatchCourse.findById(
          currBatch.courses[i]._id,
          { assignment: 1 }
        );
        const newBatchAssignment = await new BatchAssignment({
          assignmentName: temp.assignmentName,
          assignmentCode: temp.assignmentCode,
          assignmentPdf: temp.assignmentPdf,
        });
        await newBatchAssignment.save();
        batchCourse.assignment.push(newBatchAssignment._id);
        await batchCourse.save();
      }
    }

    return res.status(200).json("Assignment Added successfully");
  } catch (error) {
    console.log("error", error);
    res.status(500).json(error);
  }
};

// get all the student who submitted the assignment
export const getStudentByAssignmentCode = async (req, res) => {
  try {
    const { assignmentCode } = req.body;
    const errors = { noStudentFoundError: String };
    const assignment = await Assignment.findOne(
      { assignmentCode },
      { student: 1 }
    );

    let StudentList = [];
    for (let i = 0; i < assignment.student.length; i++) {
      // find the student from the database
      const student = await Student.findOne(
        {
          email: assignment.student[i].email,
        },
        { assignment: 1, email: 1, firstName: 1, lastName: 1, avatar: 1 }
      ).populate("assignment");

      // if student exists then push the student to the list
      if (student) {
        // find the student assignment answer from the student object
        const assignmentPdf = student.assignment.filter((item) => {
          return item.assignmentCode === assignmentCode;
        });

        // if the student has submitted the assignment then push the student to the list
        const tmp = {
          email: student.email,
          firstName: student.firstName,
          lastName: student.lastName,
          avatar: student.avatar,
          assignmentCode: assignmentCode,
          studentAnswer: assignmentPdf.studentAnswer,
          checkedAssignment: assignmentPdf[0].checkedAssignment,
          score: assignmentPdf[0].score,
          studentAnswer: assignmentPdf[0].studentAnswer,
        };

        StudentList.push(tmp);
      }
    }

    // if no student found then return error
    if (StudentList.length === 0) {
      errors.noStudentFoundError = "No Student Found";

      return res.status(400).json(errors);
    }
    // console.log(StudentList.length);
    res.status(200).json(StudentList);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

// add score to the student assignment submission
export const addScore = async (req, res) => {
  try {
    const { email, assignmentCode, checkedAssignment, score } = req.body;

    const errors = { noAssignmentError: String };
    const assignment = await Assignment.countDocuments({ assignmentCode });

    // if no such assignment exists then return error
    if (assignment === 0) {
      errors.noAssignmentError = "No Assignment Found";
      return res.status(404).json(errors);
    }

    // find the student from the database and populate its assignment
    const student = await Student.findOne(
      { email },
      { assignment: 1 }
    ).populate("assignment");
    
    // if no student found then return error
    if (student === null) {
      errors.noAssignmentError = "No Student Found";
      return res.status(404).json(errors);
    }

    for (let i = 0; i < student.assignment.length; i++) {
      // if the assignment code is same as the assignment code of the student
      if (student.assignment[i].assignmentCode === assignmentCode) {
        const studentAssignment = await StudentAssignment.findById(
          student.assignment[i]._id
        );
        // update the course 
        studentAssignment.checkedAssignment = checkedAssignment;
        studentAssignment.score = score;
        await studentAssignment.save();
      }
    }

    await student.save();

    return res.status(200).json("Marks Added successfully");
  } catch (error) {
    console.log("Backend Error", error);
  }
};

export const getAdminDashboardDataBySubAdmin = async (req, res) => {
  try {
    const { organizationName, email } = req.body;
    let data = {
      totalBatches: 0,
      totalAdmins: 0,
      totalStudents: 0,
      totalCourses: 0,
      dateOfJoinings: [],
      attendances: [],
      batchStrength: [],
    };
    const courses = await Course.countDocuments();
    if (courses) {
      data.totalCourses = courses;
    }
    // find all the batches for the given subadmin
    const batches = await Batch.find(
      { subAdmin: email },
      { batchCode: 1, students: 1 }
    );

    // if batches exist
    if (batches) {
      // update the batch length
      data.totalBatches = batches.length;
      let temp = [];
      for (let i = 0; i < batches.length; i++) {
        // add the batch code and no of student in that batch
        data.batchStrength.push({
          batchCode: batches[i].batchCode,
          students: batches[i].students.length,
        });

        // update the total students 
        data.totalStudents += batches[i].students.length;

        // find the date of joining of the students in the batches[i]
        for (let j = 0; j < batches[i].students.length; j++) {
          const student = await Student.findOne(
            {
              email: batches[i].students[j],
            },
            { dateOfJoining: 1 }
          );
          temp.push(student.dateOfJoining);
        }

        // find the attendance of the students in the batches[i]
        const attendances = await Attendance.find({
          batchCode: batches[i].batchCode,
        });
        attendances.forEach((att) => {
          data.attendances.push(att);
        });
      }
      data.dateOfJoinings = temp.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
    }
    // find the total no of admins in that organization
    const admins = await Admin.countDocuments({ organizationName });
    if (admins) {
      data.totalAdmins = admins;
    }
    return res.status(200).json(data);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

export const getAllAdminDashboardData = async (req, res) => {
  try {
    let data = {
      totalBatches: 0,
      totalAdmins: 0,
      totalStudents: 0,
      totalCourses: 0,
      dateOfJoinings: [],
      attendances: [],
      batchStrength: [],
    };

    // find the total course present in the data base
    const courses = await Course.countDocuments();
    if (courses) {
      data.totalCourses = courses;
    }

    // find the student with their date of joining
    const students = await Student.find({}, { dateOfJoining: 1 });
    if (students) {
      // update the total student in the database
      data.totalStudents = students.length;
      // push the date of joining so it can be used in frontend to display the data on graph
      students.forEach((student) => {
        data.dateOfJoinings.push(student.dateOfJoining);
      });
    }
    // find all the batches
    const batches = await Batch.find({}, { batchCode: 1, students: 1 });
    if (batches) {
      // add the total batches in the database
      data.totalBatches = batches.length;
      batches.forEach((batch) => {
        data.batchStrength.push({
          batchCode: batch.batchCode,
          students: batch.students.length,
        });
      });
    }
    // add the total admins in the database
    const admins = await Admin.countDocuments();
    if (admins) {
      data.totalAdmins = admins;
    }
    // find the attendance of the students
    const attendances = await Attendance.find();
    if (attendances) {
      data.attendances = attendances;
    }

    return res.status(200).json(data);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

export const getAdminDashboardDataByOrganizationName = async (req, res) => {
  try {
    const { organizationName } = req.body;
    let data = {
      totalBatches: 0,
      totalAdmins: 0,
      totalStudents: 0,
      totalCourses: 0,
      dateOfJoinings: [],
      attendances: [],
      batchStrength: [],
    };

    // need to update 
    const courses = await Course.countDocuments();
    if (courses) {
      data.totalCourses = courses;
    }
    // find all the batches for the given organization 
    const batches = await Batch.find(
      { organizationName },
      { batchCode: 1, students: 1 }
    );

    // if batches exist
    if (batches) {
      // update the batch length
      data.totalBatches = batches.length;
      let temp = [];
      for (let i = 0; i < batches.length; i++) {
        // add the batch code and no of student in that batch
        data.batchStrength.push({
          batchCode: batches[i].batchCode,
          students: batches[i].students.length,
        });

        // update the total students
        data.totalStudents += batches[i].students.length;
        for (let j = 0; j < batches[i].students.length; j++) {
          const student = await Student.findOne(
            {
              email: batches[i].students[j],
            },
            { dateOfJoining: 1 }
          );
          temp.push(student.dateOfJoining);
        }
        // find the attendance of the students in the batches[i]
        const attendances = await Attendance.find({
          batchCode: batches[i].batchCode,
        });

        attendances.forEach((att) => {
          data.attendances.push(att);
        });
      }
      data.dateOfJoinings = temp.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
    }
    // find the total no of admins in that organization
    const admins = await Admin.countDocuments({ organizationName });
    if (admins) {
      data.totalAdmins = admins;
    }
    return res.status(200).json(data);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

// update the status of the given batch
export const updateStatus = async (req, res) => {
  try {
    const { batchCode, status } = req.body;
    const batch = await Batch.findOne({ batchCode }, { status: 1 });
    if (batch) {
      batch.status = status;
      await batch.save();
    }

    return res.status(200).json("Batch Status Updated");
  } catch (error) {
    console.log("Backend Error", error);
  }
};

// update the batch admin of the given batch
export const updateBatchAdmin = async (req, res) => {
  try {
    const { batchCode, adminEmail } = req.body;
    const batch = await Batch.findOne({ batchCode }, { subAdmin: 1 });

    const admin = await Admin.countDocuments({ email: adminEmail });
    const errors = { noAdmin: String };

    // if admin exist then update the batch admin
    if (admin) {
      batch.subAdmin = adminEmail;
      await batch.save();
      return res.status(200).json("Batch Admin Updated");
    } else {
      errors.noAdmin = "Admin does not exist";
      return res.status(400).json(errors);
    }
  } catch (error) {
    console.log("Backend Error", error);
  }
};

// add organization name with their custom email domain name
export const addOrganizationName = async (req, res) => {
  try {
    const { organizationName, organizationEmails } = req.body;
    let temp = organizationName.toLowerCase();

    // find the organization name in the database
    const organization = await Organization.countDocuments({
      organizationName: temp,
    });
    const errors = { organizationNameError: String };

    // if organization name exist then return error
    if (organization) {
      errors.organizationNameError = "Organization Already Added";
      return res.status(400).json(errors);
    }

    // removing space from organization emails
    const emailsArray = [];
    for (let i = 0; i < organizationEmails.length; i++) {
      emailsArray.push(organizationEmails[i].trim());
    }

    const newOrganization = await new Organization({
      organizationName: temp,
      organizationEmails: emailsArray,
    });
    await newOrganization.save();
    return res.status(200).json("Organization Added successfully");
  } catch (error) {
    console.log("Backend Error", error);
  }
};
