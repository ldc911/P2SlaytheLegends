import React, { useState } from "react";
import "@assets/css/Header/ThemeButton.css";

export default function ThemeButton() {
  const [toggleState, setToggleState] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const toggleFunction = () => {
    setToggleState(!toggleState);
  };

  return (
    <div className="theme-switch-wrapper">
      <label htmlFor="checkbox" className="theme-switch">
        {/* <button className="themeButton" type="submit"></button> */}
        <div className="slider round" />
      </label>
      <em>Enable Light Mode!</em>
    </div>
  );
}
