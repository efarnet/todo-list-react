// LoginForm.tsx
import { useState } from "react";
import { login } from "../../api/auth";
import { Box, TextField, Button } from "@mui/material";
import { getErrorMessage } from "../../helpers/apiHelper";
import { useErrorStore } from "../../stores/useErrorStore";

interface LoginFormProps {
  onSuccess: () => void;
  onError: (msg: string) => void;
}

export const LoginForm = ({ onSuccess, onError }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { errors, setError, clearError } = useErrorStore();

  const validate = (): boolean => {
    clearError();
    let valid = true;

    if (!email) {
      setError("email", "Email is required");
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
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
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      await login(email, password);
      onSuccess();
    } catch (err) {
      onError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

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
        {loading ? "Logging in..." : "Login"}
      </Button>
    </Box>
  );
};
