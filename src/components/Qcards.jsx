"use client";


import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";
import { getData, deleteQuestion } from "@/utils/actions";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";


export default function Qcards() {


  const [questions, setQuestions] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const theme = useTheme();
  const router = useRouter();

  const fetchQuestions = async () => {
    try {
      const data = await getData("http://localhost:3000/api/v1/question");
      setQuestions(data);
      setFilteredQuestions(data);
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
      const updatedQuestions = questions.filter(
        (question) => question._id !== id
      );
      setQuestions(updatedQuestions);
      setFilteredQuestions(updatedQuestions);
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Failed to delete question. Please try again.");
    }
  };

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchValue(term);
    const filtered = questions.filter(
      (question) =>
        question.title.includes(term) || question.description.includes(term)
    );
    setFilteredQuestions(filtered);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
    const sorted = [...filteredQuestions].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return order === "newest" ? dateB - dateA : dateA - dateB;
    });
    setFilteredQuestions(sorted);
  };

  return (
    <div>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 2,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            marginBottom: "16px",
            marginTop: "16px",
            position: "relative",
          }}
        >
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchChange}
            style={{
              padding: "8px 40px 8px 30px",
              borderRadius: "4px",
              border: "1px solid gray",
              width: "500px",
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.paper,
            }}
          />
          <SearchIcon
            style={{
              position: "absolute",
              left: "5px",
              top: "50%",
              transform: "translateY(-50%)",
              color: theme.palette.text.primary,
              pointerEvents: "none",
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Typography variant="h6">Filter By: </Typography>
          <Button
            onClick={() => handleSortOrderChange("newest")}
            sx={{ color: theme.palette.text.primary }}
          >
            <ArrowDownwardIcon /> Newer
          </Button>
          <Button
            onClick={() => handleSortOrderChange("oldest")}
            sx={{ color: theme.palette.text.primary, ml: 2 }}
          >
            <ArrowUpwardIcon />
            Older
          </Button>
        </Box>
      </Box>

      {filteredQuestions.map((item) => (
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
            onClick={() => router.push(`/question/${item._id}`)}
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
                color: theme.palette.text.primary,
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
