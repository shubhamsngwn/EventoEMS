// import React from "react";
// import "../App.css";

// export default function Dashboard() {
//   const userName = localStorage.getItem("userName") || "Guest";
//   const userEmail = localStorage.getItem("userEmail") || "Not provided";
//   let userCategory = localStorage.getItem("userCategory") || "Not specified";

//   userCategory = userCategory
//     .split(" ")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//     .join(" ");

//   return (
//     <div className="dashboard-container">
//       <h1 className="dashboard-title">Personal Dashboard</h1>

//       <div className="user-card">
//         <div className="user-avatar">
//           <div className="avatar-circle">{userName[0]}</div>
//         </div>
//         <div className="user-details">
//           <h2>{userName}</h2>
//           <p>Email: {userEmail}</p>
//           <p>Category: {userCategory}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import "../App.css";

export default function Dashboard() {
  userName = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
  userCategory =
    userCategory.charAt(0).toUpperCase() + userCategory.slice(1).toLowerCase();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Personal Dashboard</h1>

      <div className="user-card">
        <div className="user-avatar">
          <div className="avatar-circle">{userName[0]}</div>
        </div>
        <div className="user-details">
          <h2>{userName}</h2>
          <p>Email: {userEmail}</p>
          <p>Category: {userCategory}</p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
