import { Snackbar, Alert } from "@mui/material";
import React from "react";

interface SnackbarErrorProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

const SnackbarError = ({ open, message, onClose }: SnackbarErrorProps) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
  >
    <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
      {message}
    </Alert>
  </Snackbar>
);

export default React.memo(SnackbarError);
