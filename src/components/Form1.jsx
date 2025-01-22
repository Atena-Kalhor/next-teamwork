"use client";
import {
  Box,
  Button,
  Grid2 as Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import NestedModal from "./Modal";
import { addQuestion } from "@/utils/actions";
import { useForm } from "react-hook-form";

function Form1() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);



  const onSubmit = (data) => {
    setFormData(data);
    console.log("form data modal open:", data); 
    setIsModalOpen(true);
  };
 
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleModalConfirm = async () => {
    console.log("form data before post:", formData); 
    try {
      await addQuestion(formData);
      console.log("question posted successfully!");
    } catch (error) {
      console.error("error submitting question:", error);
    } finally {
      setIsModalOpen(false);
      reset();
      setFormData(null);
    }
  };
  

  return (
    <Box
      container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
        mt: "50px",
        mb: 5,
      }}
    >
      <Typography variant="h5">Ask Your Question</Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ flexGrow: 1, width: "70%" }}
      >
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              sx={{ width: "100%" }}
              id="filled-basic"
              label="Title"
              variant="filled"
              {...register("title", { required: "Title is required" })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              id="filled-basic"
              label="Description"
              variant="filled"
              multiline
              rows={4}
              sx={{
                width: "100%",
              }}
              {...register("description", {
                required: "Description is required",
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
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
   
      <NestedModal
        open={isModalOpen}
        title={formData?.title}
        description={formData?.description}
        handleClose={handleModalClose}
        handleConfirm={handleModalConfirm}
      />
    </Box>
  );
}

export default Form1;
