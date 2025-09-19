import React, { useMemo } from "react";
import { Card, CardContent, Typography, Checkbox, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Todos } from "../../enums/Todos";
import type { Todo } from "../../api/todos";

interface TodoCardProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onToggle, onDelete }) => {
  const displayText = useMemo(() => {
    return todo.title.length > Todos.MAX_CARACTERS
      ? todo.title.slice(0, Todos.MAX_CARACTERS) + "..."
      : todo.title;
  }, [todo.title]);

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "flex-start",
        p: 1,
        width: "100%",
        flexDirection: "row",
        wordBreak: "break-word",
        backgroundColor: "black",
      }}
    >
      <Checkbox
        checked={todo.isCompleted}
        onChange={() => onToggle(todo._id)}
        sx={{ color: "white", "&.Mui-checked": { color: "white" } }}
      />
      <CardContent sx={{ flex: "1 1 auto", minWidth: 0, py: 1 }}>
        <Typography
          variant="body1"
          sx={{
            textDecoration: todo.isCompleted ? "line-through" : "none",
            color: todo.isCompleted ? "gray" : "white",
            wordBreak: "break-word",
          }}
        >
          {displayText}
        </Typography>
      </CardContent>
      <Button onClick={() => onDelete(todo._id)} color="error">
        <DeleteIcon />
      </Button>
    </Card>
  );
};

export default React.memo(TodoCard);
