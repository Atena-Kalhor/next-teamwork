"use client";
import {
  Box,
  Button,
  Grid2 as Grid,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import NestedModal from "./Modal";

function Form1() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    setFormData({
      title: "",
      description: "",
    });
    setIsModalOpen(false);
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
        // backgroundColor: "pink",
      }}
    >
      <Typography variant="h5">Ask Your Question</Typography>
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{ flexGrow: 1, width: "70%" }}
      >
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              sx={{ width: "100%" }}
              id="filled-basic"
              label="Title"
              variant="filled"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            ></TextField>
          </Grid>
          <Grid size={12}>
            <TextField
              id="filled-basic"
              label="Discription"
              variant="filled"
              multiline
              rows={4}
              sx={{
                width: "100%",
              }}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            ></TextField>
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
        handleClose={handleModalClose}
        handleConfirm={handleModalConfirm}
      />
    </Box>
  );
}

export default Form1;
