import Admin from "../models/admin.js";
import Faculty from "../models/faculty.js";
import Student from "../models/student.js";
import Batch from "../models/batch.js";
import Attendance from "../models/attendance.js";
import Course from "../models/course.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Assignment from "../models/assignment.js";

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
      domain,
    } = req.body;

    const errors = { emailError: String };
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      errors.emailError = "Admin already exists";
      return res.status(400).json(errors);
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
      domain,
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
      performance,
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
      performance,
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
    const { batchName, batchCode, courses, students } = req.body;
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
          lesson: [],
        };
        sum += course.section[i].lesson.length;
        for (let j = 0; j < course.section[i].lesson.length; j++) {
          let temp2 = {
            lessonNumber: course.section[i].lesson[j].lessonNumber,
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

        student.batch.push(batchCode);
        stu.push(students[i][0]);
        await student.save();
      }
    }
    const newBatch = await new Batch({
      batchName,
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

export const addCourseInBatch = async (req, res) => {
  try {
    const {
      batchCode,
      courseCode,
      co1urseName,
      description,
      totalLectures,
      rating,
      difficulty,
      year,
    } = req.body;
    const errors = { batchCodeError: String };

    const existingBatch = await Batch.findOne({
      batchCode,
      coursees: { courseCode },
    });

    if (existingBatch) {
      errors.batchCodeError = "Course already exists in batch";
      return res.status(400).json(errors);
    }

    const newCourse = await new Course({
      courseCode,
      courseName,
      description,
      totalLectures,
      rating,
      difficulty,
      year,
    });

    await newCourse.save();

    Batch.findOneAndUpdate(
      batchCode,
      { $push: { coursees: newCourse } },
      { new: true }
    );
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const addFaculty = async (req, res) => {
  try {
    const {
      name,
      dob,
      contactNumber,
      avatar,
      email,
      joiningYear,
      gender,
      designation,
      batch,
    } = req.body;
    const errors = { emailError: String };

    const existingFaculty = await Faculty.findOne({ email });
    if (existingFaculty) {
      errors.emailError = "Faculty already exists";
      return res.status(400).json(errors);
    }

    let hashedPassword;
    const newDob = dob.split("-").reverse().join("-");

    hashedPassword = await bcrypt.hash(newDob, 10);
    var passwordUpdated = false;

    const newFaculty = await new Faculty({
      name,
      email,
      password: hashedPassword,
      joiningYear,
      department,
      avatar,
      contactNumber,
      dob,
      batch,
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
};

export const getFacultyByBatchCode = async (req, res) => {
  try {
    const { batchCode } = req.body;
    const errors = { noFacultyError: String };
    const faculties = await Faculty.find({ batch: { batchCode } });

    if (faculties.length === 0) {
      errors.noFacultyError = "No faculty found";
      return res.status(400).json(errors);
    }

    res.status(200).json({ result: faculties });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const getFacultyByCourseCode = async (req, res) => {
  try {
    const { batchCode, courseCode } = req.body;
    const errors = { noFacultyError: String };

    const faculties = await Faculty.find({
      batch: { batchCode, course: { courseCode } },
    });

    if (faculties.length === 0) {
      errors.noFacultyError = "No faculty found";
      return res.status(400).json(errors);
    }

    res.status(200).json({ result: faculties });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const getStudentByBatchCode = async (req, res) => {
  try {
    const { batchCode } = req.body;
    const errors = { noStudentError: String };
    const students = await Student.find({ batch: { batchCode } });

    if (students.length === 0) {
      errors.noStudentError = "No student found";
      return res.status(400).json(errors);
    }

    res.status(200).json({ result: students });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const getStudentByCourseCode = async (req, res) => {
  try {
    const { batchCode, courseCode } = req.body;
    const errors = { noStudentError: String };

    const students = await Student.find({
      batch: { batchCode, course: { courseCode } },
    });

    if (students.length === 0) {
      errors.noStudentError = "No student found";
      return res.status(400).json(errors);
    }

    res.status(200).json({ result: students });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
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

export const getBatchEvent = async (req, res) => {
  try {
    const { batchCode } = req.body;

    const batch = await Batch.findOne({ batchCode });

    res.status(200).json(batch.schedule);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

export const getAttendance = async (req, res) => {
  try {
    const { batchCode, courseCode } = req.body;
    const attendance = await Attendance.find({ batchCode, courseCode });
    res.status(200).json(attendance);
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
          await attendance.save();
          flag = false;
        }
      } else if (!attendance) {
        let student = [];
        student.push({
          email: attendanceRecord[i].student,
          present: attendanceRecord[i].present,
        });

        const newAttendance = await new Attendance({
          batchCode: attendanceRecord[i].batchCode,
          courseCode: attendanceRecord[i].courseCode,
          date: attendanceRecord[i].date,
          students: student,
        });
        await newAttendance.save();
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
      // console.log("noAssignmentError", errors.noAssignmentError);
      return res.status(404).json(errors);
    }

    let StudentList = [];
    for (let i = 0; i < assignment.student.length; i++) {
      const student = await Student.findOne({
        email: assignment.student[i].email,
      });
      if (student) {
        const assignmentPdf = await student.assignment.filter((item) => {
          return item.assignmentCode === assignmentCode;
        });
        const tmp = {
          email: student.email,
          firstName: student.firstName,
          lastName: student.lastName,
          avatar: student.avatar,
          assignmentCode: assignmentCode,
          studentAnswer: assignmentPdf.studentAnswer,
        };

        // console.log(tmp);
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
