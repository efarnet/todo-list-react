// LoginPage.tsx
import { useState, useCallback, Suspense, lazy } from "react";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = lazy(() => import("../components/UI/LoginForm"));
const SnackbarError = lazy(() => import("../components/UI/SnackbarError"));

export const LoginPage = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const navigate = useNavigate();

  const handleError = useCallback(
    (msg: string) => setSnackbar({ open: true, message: msg }),
    []
  );

  const handleClose = useCallback(
    () => setSnackbar((prev) => ({ ...prev, open: false })),
    []
  );

  const handleSuccess = useCallback(() => {
    navigate("/");
  }, [navigate]);

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

        <Suspense fallback={<CircularProgress />}>
          <LoginForm onSuccess={handleSuccess} onError={handleError} />
        </Suspense>

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

      <Suspense fallback={null}>
        <SnackbarError
          open={snackbar.open}
          message={snackbar.message}
          onClose={handleClose}
        />
      </Suspense>
    </Box>
  );
};

export default LoginPage;
