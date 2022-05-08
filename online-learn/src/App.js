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

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
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
      <Route
        path="/admin/admin/searchadmin/updateadmin"
        exact
        element={<UpdateAdmin />}
      />
    </Routes>
  );
}

export default App;
