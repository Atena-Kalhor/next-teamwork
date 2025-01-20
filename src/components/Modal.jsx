"use client";
import React from "react";
import { Box, Modal, Button } from "@mui/material";
import { useRouter } from "next/navigation";


export default function NestedModal({ open, handleClose }) {
  const router = useRouter();

  const handleYes = () => {
    handleClose();
    router.push("/question");
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          pt: 2,
          px: 4,
          pb: 3,
          width: 400,
        }}
      >
        <p id="parent-modal-description">Are you sure?</p>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mt: 2,
          }}
        >
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleYes} variant="contained">
            Yes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
