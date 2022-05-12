import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Community from "./components/Community";
import Course from "./components/Course";
import Assignment from "./components/Assignment";
import LiveClasses from "./components/LiveClasses";
import Dashboard from "./components/Admin/Dashboard";
import Batch from "./components/Admin/Batch";
import Student from "./components/Admin/Student";
import AdminCourse from "./components/Admin/Course";
import Faculty from "./components/Admin/Faculty";
import Admin from "./components/Admin/Admin";
import AddAdmin from "./components/Admin/AdminSection/AddAdmin";
import SearchAdmin from "./components/Admin/AdminSection/SearchAdmin";
import UpdateAdmin from "./components/Admin/AdminSection/UpdateAdmin";
import AddFaculty from "./components/Admin/FacultySection/AddFaculty";
import SearchFaculty from "./components/Admin/FacultySection/SearchFaculty";
import AddCourse from "./components/Admin/CourseSection/AddCourse";
import SearchCourse from "./components/Admin/CourseSection/SearchCourse";
import AddStudent from "./components/Admin/StudentSection/AddStudent";
import SearchStudent from "./components/Admin/StudentSection/SearchStudent";
import StudentLogin from "./components/StudentLogin";
import AddBatch from "./components/Admin/BatchSection/AddBatch";

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
      <Route path="/admin/faculty" exact element={<Faculty />} />
      <Route path="/admin/admin" exact element={<Admin />} />
      <Route path="/admin/course" exact element={<AdminCourse />} />
      <Route path="/admin/admin/addadmin" exact element={<AddAdmin />} />
      <Route path="/admin/admin/searchadmin" exact element={<SearchAdmin />} />
      <Route path="/admin/faculty/addfaculty" exact element={<AddFaculty />} />
      <Route path="/admin/student/addstudent" exact element={<AddStudent />} />
      <Route
        path="/admin/faculty/searchfaculty"
        exact
        element={<SearchFaculty />}
      />
      <Route
        path="/admin/faculty/searchadmin/updateadmin"
        exact
        element={<UpdateAdmin />}
      />
      <Route path="/admin/course/addcourse" exact element={<AddCourse />} />
      <Route
        path="/admin/course/searchcourse"
        exact
        element={<SearchCourse />}
      />
      <Route
        path="/admin/student/searchstudent"
        exact
        element={<SearchStudent />}
      />
      <Route path="/admin/batch/addbatch" exact element={<AddBatch />} />
    </Routes>
  );
}

export default App;
