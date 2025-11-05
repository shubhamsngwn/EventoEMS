import React, { useState, useEffect } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  // ✅ Fetch user details from localStorage
  const userName = localStorage.getItem("userName") || "User";
  const userEmail = localStorage.getItem("userEmail") || "Not Available";
  const userCategory = localStorage.getItem("userCategory") || "Unknown";

  // ✅ State for user image
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("userImage") || ""
  );

  // ✅ Format name & category
  const formattedName =
    userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();

  const formattedCategory =
    userCategory.charAt(0).toUpperCase() + userCategory.slice(1).toLowerCase();

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  // ✅ Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("userImage", reader.result);
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Personal Dashboard</h1>

      <div className="user-card">
        <div className="user-avatar">
          {/* ✅ If image exists, show it — otherwise show letter */}
          {profileImage ? (
            <div className="image-container">
              <img src={profileImage} alt="Profile" className="profile-image" />
              <label htmlFor="upload-image" className="edit-icon">
                <FontAwesomeIcon icon={faPen} />
              </label>
              <input
                type="file"
                id="upload-image"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </div>
          ) : (
            <div className="avatar-circle">
              {formattedName[0]}
              <label htmlFor="upload-image" className="edit-icon small">
                <FontAwesomeIcon icon={faPen} />
              </label>
              <input
                type="file"
                id="upload-image"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </div>
          )}
        </div>

        <div className="user-details">
          <h2>{formattedName}</h2>
          <p>Email: {userEmail}</p>
          <p>Category: {formattedCategory}</p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
