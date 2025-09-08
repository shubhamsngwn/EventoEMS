// import React from "react";
// import Avatar from 'react-avatar';

// export default function UserAvatar() {
//   const userName = localStorage.getItem("userName") || "Guest";

//   return (
//     <div className="client">
//       <Avatar name={userName} size="40" round="20%"/>
//     </div>
//   );
// }

import React, { useState } from "react";
import AvatarLib from "react-avatar";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function UserAvatar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "Guest";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="user-avatar">
      {/* Avatar */}
      <div className="avatar-img" onClick={() => setOpen(!open)}>
        <AvatarLib name={userName} size="40" round={true} />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="dropdown">
          <button onClick={handleDashboard}>Personal Dashboard</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
