import Admin from "../models/admin.js";
import DeleteQuery from "../models/deleteQuery.js";
import Student from "../models/student.js";
import Batch from "../models/batch.js";
import Attendance from "../models/attendance.js";
import Course from "../models/course.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Assignment from "../models/assignment.js";

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
    const { firstName, lastName, contactNumber, avatar, email } = req.body;
    const updateAdmin = await Admin.findOne({ email });

    if (firstName) {
      updateAdmin.firstName = firstName;
      await updateAdmin.save();
    }
    if (lastName) {
      updateAdmin.lastName = lastName;
      await updateAdmin.save();
    }

    if (contactNumber) {
      updateAdmin.contactNumber = contactNumber;
      await updateAdmin.save();
    }

    if (avatar) {
      updateAdmin.avatar = avatar;
      await updateAdmin.save();
    }

    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      response: updateAdmin,
    });
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
      avatar,
      email,
      sub,
      organizationName,
    } = req.body;

    const errors = { emailError: String };
    const existingAdmin = await Admin.findOne({ email });

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
      avatar,
      contactNumber,
      dob,
      sub,
      organizationName: tempOrganizationName,
    });
    await newAdmin.save();
    return res.status(200).json({
      success: true,
      message: "Admin registerd successfully",
      response: newAdmin,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const addStudentQuery = async (req, res) => {
  try {
    const { code, subAdmin, avatar } = req.body;

    const errors = { deleteQueryError: String };
    const existingDeleteQuery = await DeleteQuery.findOne({ code, subAdmin });

    if (existingDeleteQuery) {
      errors.deleteQueryError = "Query already exists";
      return res.status(400).json(errors);
    }
    const newDeleteQuery = await new DeleteQuery({
      subAdmin,
      code,
      avatar,
    });
    await newDeleteQuery.save();
    return res.status(200).json({
      success: true,
      message: "Delete Query Added successfully",
      response: newDeleteQuery,
    });
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
      const student = await Student.findOneAndDelete({ email: code });
      return res.status(200).json("Student Deleted");
    }
    return res.status(200).json("Query Updated");
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getAllDeleteQuery = async (req, res) => {
  try {
    const deleteQueries = await DeleteQuery.find();
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
    const {
      firstName,
      lastName,
      email,
      avatar,
      batch,
      currentActiveBatch,
      contactNumber,
      dob,
    } = req.body;
    const errors = { studentError: String };
    const existingStudent = await Student.findOne({ email });

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
      batch,
      currentActiveBatch,
      contactNumber,
      dob,

      password: hashedPassword,
    });
    await newStudent.save();

    return res.status(200).json({
      success: true,
      message: "Student added successfully",
      response: newStudent,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const addStudentInBatch = async (req, res) => {
  try {
    const { email, batchCode } = req.body;
    const student = await Student.findOne({ email });
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
    const batch = await Batch.findOne({ batchCode });
    let alreadyStudent = batch.students.find((em) => em === email);
    if (alreadyStudent !== email) {
      batch.students.push(email);
      await batch.save();
    } else {
      errors.studentError = "Student Already Added";
      return res.status(400).json(errors);
    }
    return res.status(200).json({
      success: true,
      message: "Student added successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllStudent = async (req, res) => {
  try {
    const students = await Student.find();
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
export const getStudentsLengthByOrganizationName = async (req, res) => {
  try {
    const { organizationName, subAdmin } = req.body;
    const batches = await Batch.find({ organizationName: organizationName });

    const errors = { noStudentError: String };
    let students = [];

    for (let i = 0; i < batches.length; i++) {
      if (batches[i].subAdmin === subAdmin) {
        for (let j = 0; j < batches[i].students.length; j++) {
          const student = await Student.findOne({
            email: batches[i].students[j],
          });
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
    const students = await Student.find();

    res.status(200).json(students.length);
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
    const admins = await Admin.find();

    res.status(200).json(admins.length);
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
    const admins = await Admin.find({ organizationName: organizationName });

    res.status(200).json(admins.length);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

export const getStudentsByOrganizationName = async (req, res) => {
  try {
    const { organizationName, subAdmin } = req.body;
    const batches = await Batch.find({ organizationName: organizationName });

    const errors = { noStudentError: String };
    let students = [];

    for (let i = 0; i < batches.length; i++) {
      if (batches[i].subAdmin === subAdmin) {
        for (let j = 0; j < batches[i].students.length; j++) {
          const student = await Student.findOne({
            email: batches[i].students[j],
          });
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
    const courses = await Course.find();

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
    const existingCourse = await Course.findOne({ courseCode });

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
    return res.status(200).json({
      success: true,
      message: "Course Added successfully",
      response: newCourse,
    });
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
      let temp = await Course.findOne({ courseCode });
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
    const studentsData = [];
    for (let i = 0; i < emails.length; i++) {
      let email = emails[i];
      let temp = await Student.findOne({ email });
      studentsData.push(temp);
    }
    res.status(200).json(studentsData);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const deleteAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    await Admin.findOneAndDelete({ email });
    res.status(200).json({ message: "Admin Deleted" });
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
    const existingBatch = await Batch.findOne({ batchCode });

    if (existingBatch) {
      errors.batchError = "Batch already exists";
      return res.status(400).json(errors);
    }
    let stu = [];

    let courseData = [];

    for (let i = 0; i < courses.length; i++) {
      const course = await Course.findOne({ courseCode: courses[i] });

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
          lesson: [],
        };
        sum += course.section[i].lesson.length;
        for (let j = 0; j < course.section[i].lesson.length; j++) {
          let temp2 = {
            lessonNumber: course.section[i].lesson[j].lessonNumber,
            lessonCompleted: false,
            video: "",
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
        const student = await Student.findOne({ email: students[i][0] });
        if (student) {
          let alreadyBatch = student.batchCode.find(
            (code) => code === batchCode
          );
          console.log(alreadyBatch);
          if (alreadyBatch !== batchCode) {
            student.batchCode.push(batchCode);
          }
          for (let j = 0; j < courses.length; j++) {
            student.attendance.push({ courseCode: courses[j], attended: 0 });
          }
          stu.push(students[i][0]);
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

    return res.status(200).json({
      success: true,
      message: "Batch added successfully",
      response: newBatch,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all batches

export const getAllBatchCodes = async (req, res) => {
  try {
    const batches = await Batch.find();
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
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const getBatchCodesByOrganizationName = async (req, res) => {
  try {
    const { organizationName, subAdmin } = req.body;
    const batches = await Batch.find({ organizationName, subAdmin });
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
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};
export const getAllOrganizationName = async (req, res) => {
  try {
    const admin = await Admin.find();
    const errors = { noAdminError: String };
    if (admin.length === 0) {
      errors.noAdminError = "No Admin found";
      return res.status(400).json(errors);
    }
    let organizationName = [];

    for (let i = 0; i < admin.length; i++) {
      if (admin[i].organizationName) {
        organizationName.push(admin[i].organizationName);
      }
    }

    res.status(200).json(organizationName);
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};
export const getAllCourseCodes = async (req, res) => {
  try {
    const courses = await Course.find();
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
    const batch = await Batch.findOne({ batchCode });
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
    const batch = await Batch.findOne({ batchCode });

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
    const batch = await Batch.findOne({ batchCode });

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

    const batch = await Batch.findOne({ batchCode });

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

    const batch = await Batch.findOne({ batchCode });

    res.status(200).json(batch.schedule);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

export const getEventByCourseCode = async (req, res) => {
  try {
    const { batchCode, courseCode } = req.body;

    const batch = await Batch.findOne({ batchCode });
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
    // console.log(attendance);
    res.status(200).json(attendance);
  } catch (error) {
    console.log("Backend Error", error);
  }
};
export const getAttendanceStatus = async (req, res) => {
  try {
    const { batchCode } = req.body;
    const attendance = await Attendance.find({ batchCode });
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
            const student = await Student.findOne({
              email: attendance.students[j].email,
            });

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

          const student = await Student.findOne({
            email: attendanceRecord[i].student,
          });
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

        const student = await Student.findOne({
          email: attendanceRecord[i].student,
        });
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
    const existingAssignment = await Assignment.findOne({ assignmentCode });

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

    const currBatch = await Batch.findOne({ batchCode });
    for (let i = 0; i < currBatch.courses.length; i++) {
      if (currBatch.courses[i].courseCode === courseCode) {
        currBatch.courses[i].assignment.push(newBatchAssignment);
      }
    }
    await currBatch.save();

    return res.status(200).json({
      success: true,
      message: "Assignment Added successfully",
      response: newAssignment,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json(error);
  }
};

export const getStudentByAssignmentCode = async (req, res) => {
  try {
    const { assignmentCode } = req.body;

    const errors = { noAssignmentError: String };
    const assignment = await Assignment.findOne({ assignmentCode });
    if (assignment === null) {
      errors.noAssignmentError = "No Assignment Found";

      return res.status(404).json(errors);
    }

    let StudentList = [];
    for (let i = 0; i < assignment.student.length; i++) {
      const student = await Student.findOne({
        email: assignment.student[i].email,
      });
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
          assignment: assignmentPdf,
        };

        StudentList.push(tmp);
      }
    }
    res.status(200).json(StudentList);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

export const addScore = async (req, res) => {
  try {
    const { email, assignmentCode, checkedAssignment, score } = req.body;

    const errors = { noAssignmentError: String };
    const assignment = await Assignment.findOne({ assignmentCode });
    if (assignment === null) {
      errors.noAssignmentError = "No Assignment Found";
      return res.status(404).json(errors);
    }

    const student = await Student.findOne({ email });
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

    return res.status(200).json({
      success: true,
      message: "Marks Added successfully",
      response: student,
    });
  } catch (error) {
    console.log("Backend Error", error);
  }
};
