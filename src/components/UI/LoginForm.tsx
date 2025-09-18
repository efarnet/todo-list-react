import React, { useState, useCallback } from "react";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import { getErrorMessage } from "../../helpers/apiHelper";
import { useErrorStore } from "../../stores/useErrorStore";
import { RegexExpression } from "../../enums/RegexExpression";
import { useAuthStore } from "../../stores/useAuthStore";

interface LoginFormProps {
  onSuccess: () => void;
  onError: (msg: string) => void;
}

const LoginForm = ({ onSuccess, onError }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { errors, setError, clearError } = useErrorStore();
  const { login } = useAuthStore();

  const validate = useCallback((): boolean => {
    clearError();
    let valid = true;

    if (!email) {
      setError("email", "Email is required");
      valid = false;
    } else if (!RegexExpression.EMAIL.test(email)) {
      setError("email", "Invalid email");
      valid = false;
    }

    if (!password) {
      setError("password", "Password is required");
      valid = false;
    } else if (password.length < 8) {
      setError("password", "Password must be at least 8 characters");
      valid = false;
    }

    return valid;
  }, [email, password, clearError, setError]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validate()) return;

      setLoading(true);
      try {
        await login({ email, password });

        onSuccess();
      } catch (err) {
        onError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    },
    [email, password, validate, onSuccess, onError, login]
  );

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <TextField
        label="Email"
        type="email"
        fullWidth
        required
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        required
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        disabled={loading}
      >
        {loading ? <CircularProgress /> : "Login"}
      </Button>
    </Box>
  );
};

export default React.memo(LoginForm);
