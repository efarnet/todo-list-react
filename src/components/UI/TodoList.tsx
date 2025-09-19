import React from "react";
import { Box } from "@mui/material";
import TodoCard from "./TodoCard";
import type { Todo } from "../../api/todos";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => (
  <Box
    sx={{
      flex: 1,
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 1,
      py: 1,
    }}
  >
    {todos.map((todo) => (
      <TodoCard
        key={todo._id}
        todo={todo}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    ))}
  </Box>
);

export default React.memo(TodoList);
