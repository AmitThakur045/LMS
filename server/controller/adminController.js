import Admin from "../models/admin.js";
import DeleteQuery from "../models/deleteQuery.js";
import Student from "../models/student.js";
import Batch from "../models/batch.js";
import Attendance from "../models/attendance.js";
import Course from "../models/course.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Assignment from "../models/assignment.js";
import Organization from "../models/organization.js";
import { sendMail } from "../services/sendgrid.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const errors = { emailError: String, passwordError: String };

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      errors.emailError = "Admin does not exist";
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
      { expiresIn: "10h" }
    );

    res.status(200).json({ result: existingAdmin, token: token });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const generateOtpForPasswordResetAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    const errors = { adminError: String };
    const existingAdmin = await Admin.countDocuments({ email });

    if (!existingAdmin) {
      errors.adminError = "Admin doesn't exists";
      return res.status(400).json(errors);
    }

    const newOtp = Math.floor(Math.random() * 10000);

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

export const forgotPasswordAdmin = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const errors = { adminError: String };
    const existingAdmin = await Admin.findOne({ email }, { password: 1 });

    if (!existingAdmin) {
      errors.adminError = "Admin doesn't exists";
      return res.status(400).json(errors);
    }

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
    const existingAdmin = await Admin.countDocuments({ email });

    if (!existingAdmin) {
      errors.adminError = "Admin does not exist";
      return res.status(400).json(errors);
    }

    const newOtp = Math.floor(Math.random() * 10000);

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

export const getAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    const errors = { noAdminError: String };
    const admin = await Admin.findOne({ email });
    if (admin === null) {
      errors.noAdminError = "No Admin Found";
      return res.status(404).json(errors);
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const updateAdmin = await Admin.findOne(
      { email },
      { firstName: 1, lastName: 1 }
    );

    if (firstName) {
      updateAdmin.firstName = firstName;
      await updateAdmin.save();
    }
    if (lastName) {
      updateAdmin.lastName = lastName;
      await updateAdmin.save();
    }

    res.status(200).json("Admin Updated");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const updateStudent = async (req, res) => {
  try {
    const { firstName, lastName, contactNumber, avatar, email } = req.body;
    const updatedStudent = await Student.findOne(
      { email },
      { firstName: 1, lastName: 1, contactNumber: 1, avatar: 1 }
    );

    if (firstName) {
      updatedStudent.firstName = firstName;
      await updatedStudent.save();
    }
    if (lastName) {
      updatedStudent.lastName = lastName;
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

    res.status(200).json("Student Updated");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const addAdmin = async (req, res) => {
  try {
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

    if (existingAdmin) {
      errors.emailError = "Admin already exists";
      return res.status(400).json(errors);
    }

    let tempOrganizationName;
    if (sub === "false") {
      tempOrganizationName = "Super Admin";
    } else {
      tempOrganizationName = organizationName;
    }

    let hashedPassword;
    const newDob = dob.split("-").reverse().join("-");

    hashedPassword = await bcrypt.hash(newDob, 10);

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

    if (existingDeleteQuery) {
      errors.deleteQueryError = "Query already exists";
      return res.status(400).json(errors);
    }
    const subAdminData = await Admin.findOne(
      { email: subAdmin },
      { createdBy: 1 }
    );
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
export const updateDeleteQuery = async (req, res) => {
  try {
    const { code, subAdmin, status } = req.body;

    const deleteQuery = await DeleteQuery.findOne({ code, subAdmin });
    deleteQuery.status = status;
    deleteQuery.updated = true;
    await deleteQuery.save();
    if (status === true) {
      const student = await Student.findOne({ email: code }, { batchCode: 1 });
      for (let i = 0; i < student.batchCode.length; i++) {
        const batch = await Batch.findOne(
          { batchCode: student.batchCode[i] },
          { students: 1 }
        );
        if (batch) {
          let index = batch.students.findIndex((stu) => stu === code);
          batch.students.splice(index, 1);
        }
        await batch.save();
      }

      student.remove();

      return res.status(200).json("Student Deleted");
    }
    return res.status(200).json("Query Updated");
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getAllDeleteQuery = async (req, res) => {
  try {
    const deleteQueries = await DeleteQuery.find({
      superAdmin: req.body.superAdmin,
      updated: false,
    });
    const errors = { deleteQueryError: String };
    if (deleteQueries.length === 0) {
      errors.deleteQueryError = "No Delete Query Found";
      return res.status(400).json(errors);
    }
    return res.status(200).json(deleteQueries);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getAllDeleteQueryBySubAdmin = async (req, res) => {
  try {
    const { subAdmin } = req.body;
    const deleteQueries = await DeleteQuery.find({ subAdmin });
    const errors = { deleteQueryError: String };
    if (deleteQueries.length === 0) {
      errors.deleteQueryError = "No Query Found";
      return res.status(400).json(errors);
    }
    return res.status(200).json(deleteQueries);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, avatar, contactNumber, dob } = req.body;
    const errors = { studentError: String };
    const existingStudent = await Student.countDocuments({ email });

    if (existingStudent) {
      errors.studentError = "Student already exists";
      return res.status(400).json(errors);
    }
    const newDob = dob.split("-").reverse().join("-");
    let hashedPassword = await bcrypt.hash(newDob, 10);

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
export const addStudentInBatch = async (req, res) => {
  try {
    const { email, batchCode } = req.body;
    const student = await Student.findOne(
      { email },
      { batchCode: 1, dateOfJoining: 1, attendance: 1 }
    );
    const errors = { studentError: String };
    if (!student) {
      errors.studentError = "Student doesn't exists";
      return res.status(400).json(errors);
    }
    let alreadyBatch = student.batchCode.find((code) => code === batchCode);
    if (alreadyBatch !== batchCode) {
      student.batchCode.push(batchCode);

      await student.save();
    }
    const batch = await Batch.findOne(
      { batchCode },
      { students: 1, courses: 1 }
    );

    let alreadyStudent = batch.students.find((em) => em === email);
    if (alreadyStudent !== email) {
      batch.students.push(email);
      await batch.save();
      for (let j = 0; j < batch.courses.length; j++) {
        student.attendance.push({
          courseCode: batch.courses[j].courseCode,
          attended: 0,
        });
      }
      var d = Date(Date.now());
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

    if (students.length === 0) {
      errors.noStudentError = "No Student Found";
      return res.status(400).json(errors);
    }
    res.status(200).json(students);
  } catch (error) {
    console.log("Backend Error", error);
  }
};
export const getStudentsLengthBySubAdmin = async (req, res) => {
  try {
    const { organizationName, subAdmin } = req.body;
    const batches = await Batch.find(
      { organizationName: organizationName },
      { students: 1, subAdmin: 1 }
    );

    const errors = { noStudentError: String };
    let students = [];

    for (let i = 0; i < batches.length; i++) {
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
export const getAllStudentLength = async (req, res) => {
  try {
    const students = await Student.countDocuments();

    res.status(200).json(students);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

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
export const getAllAdminLength = async (req, res) => {
  try {
    const admins = await Admin.countDocuments();

    res.status(200).json(admins);
  } catch (error) {
    console.log("Backend Error", error);
  }
};
export const getAdminsByOrganizationName = async (req, res) => {
  try {
    const { organizationName } = req.body;
    const admins = await Admin.find({ organizationName: organizationName });

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

export const getStudentsByOrganizationName = async (req, res) => {
  try {
    const { organizationName, subAdmin } = req.body;
    const batches = await Batch.find(
      { organizationName: organizationName },
      { subAdmin: 1, students: 1 }
    );

    const errors = { noStudentError: String };
    let students = [];

    for (let i = 0; i < batches.length; i++) {
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

export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    const errors = { courseError: String };

    if (courses.length === 0) {
      errors.courseError = "No Course Found";
      return res.status(400).json(errors);
    }

    res.status(200).json(courses);
  } catch (error) {
    console.log("Backend Error", error);
  }
};
export const getCoursesLength = async (req, res) => {
  try {
    const courses = await Course.countDocuments();

    res.status(200).json(courses.length);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

export const getStudent = async (req, res) => {
  try {
    const { email } = req.body;

    const errors = { noStudentError: String };
    const student = await Student.findOne({ email });
    if (student === null) {
      errors.noStudentError = "No Student Found";
      return res.status(404).json(errors);
    }
    res.status(200).json(student);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

export const addCourse = async (req, res) => {
  try {
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

    if (existingCourse) {
      errors.courseCodeError = "Course already exists";
      return res.status(400).json(errors);
    }

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

export const getCourse = async (req, res) => {
  try {
    const { courseCode } = req.body;
    const errors = { noCourseError: String };
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
export const getCourses = async (req, res) => {
  try {
    const courses = req.body;

    const courseData = [];
    for (let i = 0; i < courses.length; i++) {
      let courseCode = courses[i];
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
    res.status(200).json(courseData);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getStudents = async (req, res) => {
  try {
    const { emails } = req.body;

    const errors = { noStudentError: String };
    const studentsData = [];
    for (let i = 0; i < emails.length; i++) {
      let email = emails[i];
      const temp = await Student.findOne({ email });
      studentsData.push(temp);
    }
    if (studentsData.length === 0) {
      errors.noStudentError = "No Student Found";
      return res.status(400).json(errors);
    }
    res.status(200).json(studentsData);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const totalAssignment = async (req, res) => {
  try {
    const { batchCode } = req.body;
    // console.log(batchCode);
    const assignments = await Assignment.countDocuments({ batchCode });
    // console.log(assignments);

    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const deleteAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    const batches = await Batch.countDocuments({ subAdmin: email });
    const errors = { adminError: String };
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
export const deleteCourse = async (req, res) => {
  try {
    const { courseCode } = req.body;
    await Course.findOneAndDelete({ courseCode });
    res.status(200).json({ message: "Course Deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addBatch = async (req, res) => {
  try {
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

    if (existingBatch) {
      errors.batchError = "Batch already exists";
      return res.status(400).json(errors);
    }
    let stu = [];

    let courseData = [];

    for (let i = 0; i < courses.length; i++) {
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
        cou.lessonVideo.push(temp1);
      }
      cou.complete.totalLesson = sum;
      courseData.push(cou);
    }

    for (let i = 0; i < students.length; i++) {
      if (students[i][0] !== "") {
        const student = await Student.findOne(
          { email: students[i][0] },
          { batchCode: 1, attendance: 1, dateOfJoining: 1 }
        );
        if (student) {
          let alreadyBatch = student.batchCode.find(
            (code) => code === batchCode
          );

          if (alreadyBatch !== batchCode) {
            student.batchCode.push(batchCode);
          }
          for (let j = 0; j < courses.length; j++) {
            student.attendance.push({ courseCode: courses[j], attended: 0 });
          }
          stu.push(students[i][0]);
          var d = Date(Date.now());
          student.dateOfJoining = d.toString();
          await student.save();
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

export const getBatchesByBatchCode = async (req, res) => {
  try {
    const { allBatches } = req.body;

    let list = [];

    for (let i = 0; i < allBatches.length; i++) {
      const batch = await Batch.findOne({ batchCode: allBatches[i].value });
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
        courses: {
          courseCode: 1,
          courseName: 1,
          assignment: 1,
          complete: 1,
        },
      }
    );
    if (batch === null) {
      errors.noBatchError = "No Batch Found";
      return res.status(404).json(errors);
    }
    res.status(200).json(batch);
  } catch (error) {
    console.log("Backend Error", error);
  }
};
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
        courses: { courseCode: 1, courseName: 1, lessonVideo: 1, complete: 1 },
      }
    );
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

    batch.schedule.push(newEvent);
    await batch.save();
    res.status(200).json(batch);
  } catch (error) {
    console.log("Backend Error", error);
  }
};
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
export const updateCourseData = async (req, res) => {
  try {
    const { lessonVideo, complete, batchCode, courseCode } = req.body;

    const batch = await Batch.findOne({ batchCode }, { courses: 1 });

    let index = batch.courses.findIndex(
      (course) => course.courseCode === courseCode
    );
    for (let i = 0; i < lessonVideo.length; i++) {
      if (
        lessonVideo[i].sectionCompleted !==
        batch.courses[index].lessonVideo[i].sectionCompleted
      ) {
        batch.courses[index].lessonVideo[i].sectionCompleted =
          lessonVideo[i].sectionCompleted;
      }
      for (let j = 0; j < lessonVideo[i].lesson.length; j++) {
        if (
          lessonVideo[i].lesson[j].lessonCompleted !==
          batch.courses[index].lessonVideo[i].lesson[j].lessonCompleted
        ) {
          batch.courses[index].lessonVideo[i].lesson[j].lessonCompleted =
            lessonVideo[i].lesson[j].lessonCompleted;
        }
        if (
          lessonVideo[i].lesson[j].video !==
          batch.courses[index].lessonVideo[i].lesson[j].video
        ) {
          batch.courses[index].lessonVideo[i].lesson[j].video =
            lessonVideo[i].lesson[j].video;
        }
      }
    }

    if (
      complete.sectionCompleted !==
      batch.courses[index].complete.sectionCompleted
    ) {
      batch.courses[index].complete.sectionCompleted =
        complete.sectionCompleted;
    }
    if (
      complete.lessonCompleted !== batch.courses[index].complete.lessonCompleted
    ) {
      batch.courses[index].complete.lessonCompleted = complete.lessonCompleted;
    }
    await batch.save();

    res.status(200).json("Course Updated");
  } catch (error) {
    console.log("Backend Error", error);
  }
};

export const getBatchEvent = async (req, res) => {
  try {
    const { batchCode } = req.body;

    const batch = await Batch.findOne({ batchCode }, { schedule: 1 });

    res.status(200).json(batch.schedule);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

export const getEventByCourseCode = async (req, res) => {
  try {
    const { batchCode, courseCode } = req.body;

    const batch = await Batch.findOne({ batchCode }, { schedule: 1 });
    const schedule = [];
    schedule.push({});
    for (let i = 0; i < batch.schedule.length; i++) {
      if (batch.schedule[i].courseCode === courseCode) {
        let temp = batch.schedule[i].start;
        let str = temp.split("T")[0];

        let year = str.slice(0, 4);

        let month = str.slice(5, 7);

        let day = str.slice(8, 10);

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

export const getAttendance = async (req, res) => {
  try {
    const { batchCode, courseCode } = req.body;
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
export const getAttendanceStatus = async (req, res) => {
  try {
    const { batchCode } = req.body;
    const attendance = await Attendance.find({ batchCode }, { students: 1 });
    let LectureAttended = 0;
    let totalClasses = 0;
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

export const getAttendanceByBatchCodes = async (req, res) => {
  try {
    const { allBatches } = req.body;

    let attendance = [];
    for (let i = 0; i < allBatches.length; i++) {
      const attendances = await Attendance.find({
        batchCode: allBatches[i].value,
      });
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

export const addAssignment = async (req, res) => {
  try {
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

    await newAssignment.save();

    const newBatchAssignment = {
      assignmentCode: assignmentCode,
      assignmentName: assignmentName,
      assignmentPdf: assignmentPdf,
    };

    const currBatch = await Batch.findOne({ batchCode }, { courses: 1 });
    for (let i = 0; i < currBatch.courses.length; i++) {
      if (currBatch.courses[i].courseCode === courseCode) {
        currBatch.courses[i].assignment.push(newBatchAssignment);
      }
    }
    await currBatch.save();

    return res.status(200).json("Assignment Added successfully");
  } catch (error) {
    console.log("error", error);
    res.status(500).json(error);
  }
};

export const getStudentByAssignmentCode = async (req, res) => {
  try {
    const { assignmentCode } = req.body;
    // console.log(assignmentCode);
    const errors = { noStudentFoundError: String };
    const assignment = await Assignment.findOne(
      { assignmentCode },
      { student: 1 }
    );

    let StudentList = [];
    for (let i = 0; i < assignment.student.length; i++) {
      const student = await Student.findOne(
        {
          email: assignment.student[i].email,
        },
        { assignment: 1, email: 1, firstName: 1, lastName: 1, avatar: 1 }
      );
      if (student) {
        const assignmentPdf = student.assignment.filter((item) => {
          return item.assignmentCode === assignmentCode;
        });

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

export const addScore = async (req, res) => {
  try {
    const { email, assignmentCode, checkedAssignment, score } = req.body;

    const errors = { noAssignmentError: String };
    const assignment = await Assignment.countDocuments({ assignmentCode });
    if (assignment === 0) {
      errors.noAssignmentError = "No Assignment Found";
      return res.status(404).json(errors);
    }

    const student = await Student.findOne({ email }, { assignment: 1 });
    if (student === null) {
      errors.noAssignmentError = "No Student Found";
      return res.status(404).json(errors);
    }

    for (let i = 0; i < student.assignment.length; i++) {
      if (student.assignment[i].assignmentCode === assignmentCode) {
        student.assignment[i].checkedAssignment = checkedAssignment;
        student.assignment[i].score = score;
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
    const batches = await Batch.find(
      { subAdmin: email },
      { batchCode: 1, students: 1 }
    );
    if (batches) {
      data.totalBatches = batches.length;
      let temp = [];
      for (let i = 0; i < batches.length; i++) {
        data.batchStrength.push({
          batchCode: batches[i].batchCode,
          students: batches[i].students.length,
        });

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

    const courses = await Course.countDocuments();
    if (courses) {
      data.totalCourses = courses;
    }
    const students = await Student.find({}, { dateOfJoining: 1 });
    if (students) {
      data.totalStudents = students.length;
      students.forEach((student) => {
        data.dateOfJoinings.push(student.dateOfJoining);
      });
    }
    const batches = await Batch.find({}, { batchCode: 1, students: 1 });
    if (batches) {
      data.totalBatches = batches.length;
      batches.forEach((batch) => {
        data.batchStrength.push({
          batchCode: batch.batchCode,
          students: batch.students.length,
        });
      });
    }
    const admins = await Admin.countDocuments();
    if (admins) {
      data.totalAdmins = admins;
    }
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
    const courses = await Course.countDocuments();
    if (courses) {
      data.totalCourses = courses;
    }
    const batches = await Batch.find(
      { organizationName },
      { batchCode: 1, students: 1 }
    );
    if (batches) {
      data.totalBatches = batches.length;
      let temp = [];
      for (let i = 0; i < batches.length; i++) {
        data.batchStrength.push({
          batchCode: batches[i].batchCode,
          students: batches[i].students.length,
        });

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
    const admins = await Admin.countDocuments({ organizationName });
    if (admins) {
      data.totalAdmins = admins;
    }
    return res.status(200).json(data);
  } catch (error) {
    console.log("Backend Error", error);
  }
};
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
export const updateBatchAdmin = async (req, res) => {
  try {
    const { batchCode, adminEmail } = req.body;
    const batch = await Batch.findOne({ batchCode }, { subAdmin: 1 });

    const admin = await Admin.countDocuments({ email: adminEmail });
    const errors = { noAdmin: String };

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
export const addOrganizationName = async (req, res) => {
  try {
    const { organizationName, organizationEmails } = req.body;

    const organization = await Organization.countDocuments({
      organizationName,
    });
    const errors = { organizationNameError: String };
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
      organizationName,
      organizationEmails: emailsArray,
    });
    await newOrganization.save();
    return res.status(200).json("Organization Added successfully");
  } catch (error) {
    console.log("Backend Error", error);
  }
};
