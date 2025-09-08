import React from "react";
import { useNavigate } from "react-router-dom";
import EventImg from "../images/logo.png";
import "../App.css";

export default function CreateEventNavbar() {

  const handleMainPage = () => {
    navigate("/");
  };
  
  const navigate = useNavigate();
  const category = localStorage.getItem("userCategory");
  const email = localStorage.getItem("userEmail");

  const openLoginPage = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="create-event-nav-main">
        <div className="create-event-nav-img">
          <img src={EventImg} alt="#" onClick={handleMainPage} />
        </div>
        <div className="create-event-signin">
          {category && email ? (
            <Avatar />
          ) : (
            <div className="create-event-sign-in-btn">
              <button onClick={openLoginPage}>Sign in</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
