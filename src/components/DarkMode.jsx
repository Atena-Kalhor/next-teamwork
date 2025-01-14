"use client";
import React, { useState } from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import IconButton from "@mui/material/IconButton";

const DarkMode = ({ toggleTheme }) => {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = () => {
    setDarkMode((prev) => !prev); 
    toggleTheme();
  };

  return (
    <IconButton onClick={handleToggle} sx={{ mt: 2 }}>
      {darkMode ? (
        <WbSunnyIcon sx={{ fontSize: 25, color: "white" }} />
      ) : (
        <BedtimeIcon sx={{ fontSize: 25, color: " grey[800]" }} />
      )}
    </IconButton>
  );
};

export default DarkMode;

