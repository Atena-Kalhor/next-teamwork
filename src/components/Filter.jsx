"use client";

import React, { useState } from "react";
import Qcards from "./Qcards";
import { Box, Button, Container, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function Filter() {
  const [times, setTimes] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");

  const handleButtonClick = () => {
    const newTime = new Date().toLocaleTimeString();
    setTimes((prevTimes) => [...prevTimes, { id: Date.now(), time: newTime }]);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  const sortedTimes =
    sortOrder === "newest"
      ? [...times].sort((a, b) => b.id - a.id)
      : [...times].sort((a, b) => a.id - b.id);

  return (
    <Box
      sx={{
        width: 400,
        display: "flex",
        margin: "0 auto",
        justifyContent: "center",
        my: 5,
      }}
    >
      <Typography variant="h6">Filter By: </Typography>
      <Button onClick={handleButtonClick} />

      <Button
        onClick={() => handleSortOrderChange("newest")}
        sx={{ color: "black" }}
      >
        <ArrowDownwardIcon /> Newer
      </Button>
      <Button
        onClick={() => handleSortOrderChange("oldest")}
        sx={{ color: "black", ml: 2 }}
      >
        <ArrowUpwardIcon /> Older
      </Button>
      <div>
        {sortedTimes.map((card) => (
          <Qcards key={card.id} time={card.time} />
        ))}
      </div>
    </Box>
  );
}
