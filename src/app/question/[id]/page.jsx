"use client";

import {
  deleteAnswer,
  editAnswer,
  getQuestionById,
  patchAnswer,
} from "@/utils/actions";
import {
  Box,
  Button,
  Grid2 as Grid,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "@mui/material/styles";

function Page({ params }) {
  const { id } = params;
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      answer: "",
    },
  });

  const fetchData = async () => {
    try {
      const data = await getQuestionById(id);
      setQuestion(data);
      setAnswers(data?.answer || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const newAnswer = data.answer;
      console.log(id, newAnswer);
      await patchAnswer(id, newAnswer);
      setAnswers([...answers, newAnswer]);
      reset();
    } catch (error) {
      console.error("Error adding answer:", error);
      alert("Failed to add answer. Please try again.");
    }
  };

  function handleEdit(e, index) {
    editAnswer(id, index, e.target.value);
  }
  const handleDeleteAnswer = async (index) => {
    try {
      await deleteAnswer(id, index);
      const updatedAnswers = [...answers];
      updatedAnswers.splice(index, 1);
      setAnswers(updatedAnswers);
    } catch (error) {
      console.error("Error deleting answer:", error);
      alert("Failed to delete answer. Please try again.");
    }
  };

  if (!question) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
        gap: "20px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "left",
          width: "70%",
          marginBottom: "-10px",
        }}
      >
        {question.title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "left",
          width: "70%",
          borderBottom: "1px solid #ccc",
          // paddingBottom: "10px",
          marginBottom: "10px",
        }}
      >
        {question.description}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          textAlign: "left",
          width: "70%",
        }}
      >
        Answers:
      </Typography>

      {answers.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "70%",
            border: "1px solid #ccc",

            padding: "5px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            marginBottom: "10px",
          }}
        >
          <textarea
            style={{
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.paper,
              fontSize: "14px",
              width: "100%",
              border: `1px solid ${theme.palette.divider}`,
              padding: "30px",
              borderRadius: "8px",
            }}
            onChange={(e) => handleEdit(e, index)}
            defaultValue={item}
          ></textarea>

          <Button
            sx={{
              width: "20%",
              maxWidth: "70px",
              minHeight: "80px",
              my: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: theme.palette.text.primary,
              "&:hover": {
                color: "red",
                backgroundColor: theme.palette.background.paper,
              },
            }}
            onClick={() => handleDeleteAnswer(index)}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </div>
      ))}

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ flexGrow: 1, width: "70%", marginBottom: "50px" }}
      >
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              id="filled-basic"
              label="answer"
              variant="filled"
              multiline
              rows={2}
              sx={{
                width: "100%",
              }}
              {...register("answer", {
                required: "answer is required",
              })}
              error={!!errors.answer}
            />
          </Grid>
          <Grid size={12}>
            <Button
              variant="contained"
              sx={{
                width: "100%",
              }}
              type="submit"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Page;
