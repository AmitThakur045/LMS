import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/Admin/DashboardSection/Dashboard";
import Batch from "./components/Admin/BatchSection/Batch";
import AdminCourse from "./components/Admin/CourseSection/Course";
import Admin from "./components/Admin/AdminSection/Admin";
import AddAdmin from "./components/Admin/AdminSection/AddAdmin/AddAdmin";

import AddCourse from "./components/Admin/CourseSection/AddCourse/AddCourse";

import ViewAdmin from "./components/Admin/AdminSection/ViewAdmin/ViewAdmin";
import UpdateAdmin from "./components/Admin/AdminSection/UpdateAdmin/UpdateAdmin";
import ViewCourse from "./components/Admin/CourseSection/ViewCourse/ViewCourse";
import Student from "./components/Admin/StudentSection/Student";
import AddStudent from "./components/Admin/StudentSection/AddStudent/AddStudent";
import ViewStudent from "./components/Admin/StudentSection/ViewStudent/ViewStudent";
import ViewBatch from "./components/Admin/BatchSection/ViewBatch/ViewBatch";
import BatchCourse from "./components/Admin/BatchSection/ViewBatch/Course/BatchCourse";
import BatchAssignment from "./components/Admin/BatchSection/ViewBatch/Assignment/BatchAssignment";
import BatchCommunity from "./components/Admin/BatchSection/ViewBatch/Community/BatchCommunity";
import BatchStudent from "./components/Admin/BatchSection/ViewBatch/Student/BatchStudent";
import AddBatch from "./components/Admin/BatchSection/AddBatch/AddBatch";
import BatchDate from "./components/Admin/BatchSection/ViewBatch/Date/BatchDate";
import UpdateBatchCourse from "./components/Admin/BatchSection/ViewBatch/Course/Update/UpdateBatchCourse";
import Attendance from "./components/Admin/BatchSection/ViewBatch/Student/Attendance/Attendance";
import AdminLogin from "./components/Admin/AdminLogin";

import Course from "./components/Student/Course/MyLearning/Course";

import LiveClasses from "./components/Student/Course/LiveClasses/LiveClasses";
import Assignment from "./components/Student/Course/Assignment/Assignment";
import StudentLogin from "./components/Student/StudentLogin";
import StudentForgotPassword from "./components/Student/StudentForgotPassword";
import Home from "./components/Student/Home/Home";
import Community from "./components/Student/Community/Community";
import UpdateStudent from "./components/Admin/StudentSection/UpdateStudent/UpdateStudent";
import Certificate from "./components/Student/Course/Certificate/Certificate";
import Profile from "./components/Student/Profile/Profile";
import Labs from "./components/Student/Course/Labs/Labs";
import UpdateProfile from "./components/Student/Profile/UpdateProfile/UpdateProfile";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/login" exact element={<StudentLogin />} />
      <Route path="/studentforgotpassword" exact element={<StudentForgotPassword />} />
      <Route path="/community" exact element={<Community />} />
      <Route path="/profile" exact element={<Profile />} />
      <Route path="/course" exact element={<Course />} />
      <Route path="/lab" exact element={<Labs />} />
      <Route path="/assignment" exact element={<Assignment />} />
      <Route path="/liveclass" exact element={<LiveClasses />} />
      <Route path="/certificate" exact element={<Certificate />} />
      <Route path="/profile/updateprofile" exact element={<UpdateProfile />} />

      <Route path="/admin/login" exact element={<AdminLogin />} />
      <Route path="/admin/dashboard" exact element={<Dashboard />} />
      <Route path="/admin/batch" exact element={<Batch />} />
      <Route path="/admin/student" exact element={<Student />} />
      <Route path="/admin/admin" exact element={<Admin />} />
      <Route path="/admin/course" exact element={<AdminCourse />} />
      <Route path="/admin/admin/addadmin" exact element={<AddAdmin />} />
      <Route path="/admin/admin/viewadmin" exact element={<ViewAdmin />} />
      <Route path="/admin/admin/updateadmin" exact element={<UpdateAdmin />} />
      <Route path="/admin/student/addstudent" exact element={<AddStudent />} />
      <Route
        path="/admin/student/updatestudent"
        exact
        element={<UpdateStudent />}
      />

      <Route path="/admin/course/addcourse" exact element={<AddCourse />} />
      <Route path="/admin/course/viewcourse" exact element={<ViewCourse />} />
      <Route
        path="/admin/student/viewstudent"
        exact
        element={<ViewStudent />}
      />
      <Route path="/admin/batch/addbatch" exact element={<AddBatch />} />

      <Route path="/admin/batch/viewbatch" exact element={<ViewBatch />} />
      <Route path="admin/batch/course" exact element={<BatchCourse />} />
      <Route
        path="admin/batch/course/update"
        exact
        element={<UpdateBatchCourse />}
      />
      <Route
        path="admin/batch/assignment"
        exact
        element={<BatchAssignment />}
      />
      <Route path="admin/batch/community" exact element={<BatchCommunity />} />
      <Route path="admin/batch/student" exact element={<BatchStudent />} />
      <Route
        path="admin/batch/student/attendance"
        exact
        element={<Attendance />}
      />
      <Route path="admin/batch/date" exact element={<BatchDate />} />
      <Route
        path="admin/batch/assignment"
        exact
        element={<BatchAssignment />}
      />
    </Routes>
  );
}

export default App;
