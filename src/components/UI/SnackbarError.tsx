import { Snackbar, Alert } from "@mui/material";

interface SnackbarErrorProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export const SnackbarError = ({
  open,
  message,
  onClose,
}: SnackbarErrorProps) => (
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
