import "./App.css";
import CreateEvent from "./components/CreateEvent";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Main from "./components/Main";
import MyCalendar from "./components/MyCalendar";
import Dashboard from "./components/Dashboard";
import EventTemplate from "./components/EventTemplate";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/createevent" element={<CreateEvent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/calendar" element={<MyCalendar />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
