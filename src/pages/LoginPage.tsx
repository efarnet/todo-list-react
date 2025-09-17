// LoginPage.tsx
import { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { LoginForm } from "../components/UI/LoginForm";
import { SnackbarError } from "../components/UI/SnackbarError";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const navigate = useNavigate();

  const handleError = (msg: string) =>
    setSnackbar({ open: true, message: msg });

  const handleClose = () => setSnackbar({ ...snackbar, open: false });

  const handleSuccess = () => {
    navigate("/signup");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          minHeight: "45vh",
          maxWidth: 400,
          padding: { xs: 4, sm: 4 },
        }}
      >
        <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
          Login
        </Typography>
        <LoginForm onSuccess={handleSuccess} onError={handleError} />
        <Box
          sx={{
            width: "100%",
            paddingTop: { xs: 3, sm: 3 },
            textAlign: "center",
          }}
        >
          {"Don't have an account?"}
          <Link
            to="/signup"
            style={{
              marginLeft: "5px",
              textDecoration: "none",
              color: "#1976d2",
              fontWeight: "bold",
            }}
          >
            Sign up
          </Link>
        </Box>
      </Paper>

      <SnackbarError
        open={snackbar.open}
        message={snackbar.message}
        onClose={handleClose}
      />
    </Box>
  );
};

export default LoginPage;
