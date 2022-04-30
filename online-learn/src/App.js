import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Community from "./components/Community";
import Course from "./components/Course";
import Assignment from "./components/Assignment";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/community" exact element={<Community />} />
      <Route path="/course" exact element={<Course />} />
      <Route path="/assignment" exact element={<Assignment />} />
    </Routes>
  );
}

export default App;
