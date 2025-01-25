import { Box, Button, Modal, Typography } from "@mui/material";

function NestedModal({ open, handleClose, handleConfirm }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6" component="h2">
          Are you sure?
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 4,
            gap: 2,
          }}
        >
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained"  onClick={handleConfirm}>
           yes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default NestedModal;
