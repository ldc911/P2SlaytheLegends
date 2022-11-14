import React, { useState } from "react";
import "../../assets/css/Header/ThemeButton.css";

export default function ThemeButton() {
  const [toggleSwitch, setToggleSwitch] = useState(true);

  const changeTheme = (toggleStatus) => {
    if (toggleStatus) {
      document.body.setAttribute("data-theme", "light");
      // localStorage.setItem("theme", "dark"); // add this
    } else {
      document.body.setAttribute("data-theme", "dark");
      // localStorage.setItem("theme", "light"); // add this
    }
  };

  const toggleFunction = () => {
    changeTheme(toggleSwitch);
    setToggleSwitch(!toggleSwitch);
  };

  return (
    <div className="theme-switch-wrapper">
      <span>🌙</span>
      <label htmlFor="checkbox" className="theme-switch">
        <input
          className="themeButton"
          type="checkbox"
          id="checkbox"
          onChange={() => toggleFunction()}
        />
        <div className="slider round" />
      </label>
      <span>☀️</span>
    </div>
  );
}
