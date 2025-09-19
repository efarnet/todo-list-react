import React from "react";
import { Box, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface TodoInputProps {
  value: string;
  error: string;
  onChange: (value: string) => void;
  onAdd: (value: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({
  value,
  error,
  onChange,
  onAdd,
}) => (
  <Box
    sx={{
      position: "sticky",
      top: 0,
      zIndex: 10,
      backgroundColor: "lightgray",
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      gap: 1,
      py: 1,
    }}
  >
    <TextField
      label="Add new task"
      variant="standard"
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onAdd(value)}
      size="small"
      error={!!error}
      helperText={error}
    />
    <Button
      onClick={() => onAdd(value)}
      sx={{
        height: { xs: "2.5rem", sm: "2.3rem" },
        minWidth: { xs: "100%", sm: "2.3rem" },
        backgroundColor: "black",
        mt: { xs: "0.5rem", sm: 0 },
      }}
    >
      <AddIcon sx={{ width: "1.5rem", height: "1.5rem", color: "#fff" }} />
    </Button>
  </Box>
);

export default React.memo(TodoInput);
