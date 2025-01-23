"use client";

import { deleteAnswer, getData } from "@/utils/actions";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

function page({ params }) {
  const { id } = params;
  const [answers, setAnswers] = useState([]);

  const fetchAnswers = async () => {
    try {
      const data = await getData(`http://localhost:3000/api/v1/question/${id}`);
      setAnswers(data.answer);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  useEffect(() => {
    fetchAnswers();
  }, []);

  const handleDeleteAnswer = async (index) => {
    try {
      await deleteAnswer(id, index);
      console.log("deleted");
      answers.splice(index, 1);
      setAnswers(answers);
    } catch (error) {
      console.error("Error deleting answer:", error);
      alert("Failed to delete answer. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
        gap: "20px",
      }}
    >
      {answers.map((item, index) => {
        return (
          <Button
            key={index}
            sx={{
              width: "100px",
              height: "50px",
              backgroundColor: "green",
              color: "black",
            }}
            onClick={() => handleDeleteAnswer(index)}
          >
            {item}
          </Button>
        );
      })}
    </div>
  );
}

export default page;
