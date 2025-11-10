import "./App.css";
import CreateEvent from "./components/CreateEvent";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Main from "./components/Main";
import MyCalendar from "./components/MyCalendar";
import Dashboard from "./components/Dashboard";
import Wallet from "./components/Wallet";
import EditEvent from "./components/EditEvent";

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
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
