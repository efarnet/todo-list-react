// src/components/UI/SignupForm.tsx
import React, { useState } from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import { signup } from "../../api/auth";
import { getErrorMessage } from "../../helpers/apiHelper";
import { useErrorStore } from "../../stores/useErrorStore";
import { RegexExpression } from "../../enums/RegexExpression";

interface SignupFormProps {
  onSuccess: () => void;
  onError: (msg: string) => void;
}

const SignupForm = ({ onSuccess, onError }: SignupFormProps) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  const { errors, setError, clearError } = useErrorStore();

  const validate = (): boolean => {
    clearError();
    let valid = true;

    if (!firstname) {
      setError("firstname", "Firstname is required");
      valid = false;
    }

    if (!lastname) {
      setError("lastname", "Lastname is required");
      valid = false;
    }

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

    if (!gender) {
      setError("gender", "Gender is required");
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      await signup({ firstname, lastname, email, password, gender });
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
        label="Firstname"
        fullWidth
        margin="normal"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        error={!!errors.firstname}
        helperText={errors.firstname}
      />
      <TextField
        label="Lastname"
        fullWidth
        margin="normal"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        error={!!errors.lastname}
        helperText={errors.lastname}
      />
      <TextField
        label="Email"
        type="email"
        fullWidth
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
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
      />
      <TextField
        label="Gender"
        select
        fullWidth
        margin="normal"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        error={!!errors.gender}
        helperText={errors.gender}
      >
        <MenuItem value="MEN">Men</MenuItem>
        <MenuItem value="WOMEN">Women</MenuItem>
      </TextField>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </Button>
    </Box>
  );
};

export default React.memo(SignupForm);
