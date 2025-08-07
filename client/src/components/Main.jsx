import React from "react";
import MainImg from "../images/hero.jpg";
import Navbar from "./Navbar";

export default function Main() {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="main-image">
          <img src={MainImg} alt="" />
        </div>
      </div>
    </>
  );
}
