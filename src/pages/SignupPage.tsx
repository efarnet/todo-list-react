import { useState } from "react";
import { Container, Paper, Typography, Snackbar, Alert } from "@mui/material";
import SignupForm from "../components/UI/SignupForm";
import { useNavigate } from "react-router-dom";

export const SignupPage = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const navigate = useNavigate();

  const handleError = (msg: string) =>
    setSnackbar({ open: true, message: msg });

  const handleClose = () => setSnackbar({ ...snackbar, open: false });

  const handleSuccess = () => {
    navigate("/login");
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: { xs: 3, sm: 4 }, mt: 8, width: "100%", maxWidth: 400 }}
      >
        <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
          Sign Up
        </Typography>
        <SignupForm onSuccess={handleSuccess} onError={handleError} />
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignupPage;
