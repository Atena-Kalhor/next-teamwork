
"use client";
import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";
import { getData, deleteQuestion } from "@/utils/actions";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useTheme } from "@mui/material/styles";

export default function Qcards() {
  const [questions, setQuestions] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const theme = useTheme();

  const fetchQuestions = async () => {
    try {
      const data = await getData("http://localhost:3000/api/v1/question");
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteQuestion(id);
      setQuestions(questions.filter((question) => question._id !== id));
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Failed to delete question. Please try again.");
    }
  };

  const sortedQuestions = [...questions].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div>
      <CssBaseline />
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Typography variant="h6">Filter By: </Typography>
        <Button
          onClick={() => setSortOrder("newest")}
          sx={{ color: theme.palette.text.primary }}
        >
          <ArrowDownwardIcon /> Newer
        </Button>
        <Button
          onClick={() => setSortOrder("oldest")}
          sx={{ color: theme.palette.text.primary, ml: 2 }}
        >
          <ArrowUpwardIcon />
          Older
        </Button>
      </Box>
      {sortedQuestions.map((item) => (
        <Container
          key={item._id}
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Button
            sx={{
              width: "60%",
              minHeight: "80px",
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.paper,
              boxShadow: "0px 2px 8px gray",
              my: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "Scale(1.02)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                m: "8px",
                maxWidth: "55%",
                textAlign: "left",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  mt: "5px",
                }}
              >
                {item.description}
              </Typography>
            </Box>
            <Box
              sx={{
                m: "10px",
                minWidth: "30%",
                color: "black",
              }}
            >
              <Typography variant="caption">
                {item.createdAt
                  ? format(new Date(item.createdAt), "dd MMMM yyyy, hh:mm a")
                  : "No date available"}
              </Typography>
            </Box>
          </Button>
          <Button
            sx={{
              width: "20%",
              maxWidth: "70px",
              minHeight: "80px",
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.paper,
              boxShadow: "0px 2px 8px gray",
              my: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                color: "red",
              },
            }}
            onClick={() => handleDelete(item._id)}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </Container>
      ))}
    </div>
  );
}
