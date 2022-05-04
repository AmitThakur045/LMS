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
      <Route path="/admin/course" exact element={<AdminCourse />} />
    </Routes>
  );
}

export default App;
