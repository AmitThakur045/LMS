import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Community from "./components/Community";
import Course from "./components/Course";
import Assignment from "./components/Assignment";
import LiveClasses from "./components/LiveClasses";
import Dashboard from "./components/Admin/DashboardSection/Dashboard";
import Batch from "./components/Admin/BatchSection/Batch";
import AdminCourse from "./components/Admin/CourseSection/Course";
import Admin from "./components/Admin/AdminSection/Admin";
import AddAdmin from "./components/Admin/AdminSection/AddAdmin/AddAdmin";

import AddCourse from "./components/Admin/CourseSection/AddCourse/AddCourse";
import StudentLogin from "./components/StudentLogin";
import ViewAdmin from "./components/Admin/AdminSection/ViewAdmin/ViewAdmin";
import UpdateAdmin from "./components/Admin/AdminSection/UpdateAdmin/UpdateAdmin";
import ViewCourse from "./components/Admin/CourseSection/ViewCourse/ViewCourse";
import Student from "./components/Admin/StudentSection/Student";
import AddStudent from "./components/Admin/StudentSection/AddStudent/AddStudent";
import ViewStudent from "./components/Admin/StudentSection/ViewStudent/ViewStudent";
import ViewBatch from "./components/Admin/BatchSection/ViewBatch/ViewBatch";
import BatchCourse from "./components/Admin/BatchSection/ViewBatch/BatchCourse";
import BatchAssignment from "./components/Admin/BatchSection/ViewBatch/BatchAssignment";
import BatchCommunity from "./components/Admin/BatchSection/ViewBatch/BatchCommunity";
import BatchStudent from "./components/Admin/BatchSection/ViewBatch/BatchStudent";
import SearchBatch from "./components/Admin/BatchSection/SearchBatch/SearchBatch";
import AddBatch from "./components/Admin/BatchSection/AddBatch/AddBatch";
import BatchDate from "./components/Admin/BatchSection/ViewBatch/BatchDate";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/login" exact element={<StudentLogin />} />
      <Route path="/community" exact element={<Community />} />
      <Route path="/course" exact element={<Course />} />
      <Route path="/assignment" exact element={<Assignment />} />
      <Route path="/liveclass" exact element={<LiveClasses />} />

      <Route path="/admin/dashboard" exact element={<Dashboard />} />
      <Route path="/admin/batch" exact element={<Batch />} />
      <Route path="/admin/student" exact element={<Student />} />
      <Route path="/admin/admin" exact element={<Admin />} />
      <Route path="/admin/course" exact element={<AdminCourse />} />
      <Route path="/admin/admin/addadmin" exact element={<AddAdmin />} />
      <Route path="/admin/admin/viewadmin" exact element={<ViewAdmin />} />
      <Route path="/admin/admin/updateadmin" exact element={<UpdateAdmin />} />
      <Route path="/admin/student/addstudent" exact element={<AddStudent />} />

      <Route path="/admin/course/addcourse" exact element={<AddCourse />} />
      <Route path="/admin/course/viewcourse" exact element={<ViewCourse />} />
      <Route
        path="/admin/student/viewstudent"
        exact
        element={<ViewStudent />}
      />
      <Route path="/admin/batch/addbatch" exact element={<AddBatch />} />
      <Route path="/admin/batch/searchbatch" exact element={<SearchBatch />} />
      <Route path="/admin/batch/viewbatch" exact element={<ViewBatch />} />
      <Route path="admin/batch/course" exact element={<BatchCourse />} />
      <Route
        path="admin/batch/assignment"
        exact
        element={<BatchAssignment />}
      />
      <Route path="admin/batch/community" exact element={<BatchCommunity />} />
      <Route path="admin/batch/student" exact element={<BatchStudent />} />
      <Route path="admin/batch/date" exact element={<BatchDate />} />
    </Routes>
  );
}

export default App;
