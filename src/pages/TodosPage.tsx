import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Todos } from "../enums/Todos";
import { useTodosStore } from "../stores/useTodoStore";
import { useErrorStore } from "../stores/useErrorStore";
import { withAuth } from "../hoc/withAuth";

const TodoInput = lazy(() => import("../components/UI/TodoInput"));
const TodoList = lazy(() => import("../components/UI/TodoList"));

const TodosPage: React.FC = () => {
  const {
    todos,
    remaining,
    addTodo,
    toggleTodo,
    deleteTodo,
    fetchTodos,
  } = useTodosStore();
  const { errors, setError, clearError } = useErrorStore();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAdd = useCallback(() => {
    const trimmed = inputValue.trim();

    if (!trimmed) {
      setError("todos", "Todo cannot be empty.");
      return;
    }
    if (remaining <= 0) {
      setError(
        "todos",
        `You have reached the maximum number of todos ${Todos.MAX_REMAINING}.`
      );
      return;
    }
    addTodo(trimmed);

    clearError("todos");
    setInputValue("");
  }, [inputValue, addTodo, remaining, setError, clearError]);

  const handleToggle = useCallback(
    (id: number) => {
      toggleTodo(id);
    },
    [toggleTodo]
  );

  const handleChange = useCallback(
    (value: string) => {
      setInputValue(value);
    },
    [setInputValue]
  );

  const handleDelete = useCallback(
    (id: number) => {
      deleteTodo(id);
    },
    [deleteTodo]
  );

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "lightgray",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "95%", md: "60%" },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
          borderRadius: { xs: 0, md: 2 },
          backgroundColor: "transparent",
          boxShadow: { xs: "none", md: "0 4px 12px rgba(0,0,0,0.1)" },
          marginX: "auto",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontSize: "1.5rem", mb: 1, textAlign: "center" }}
        >
          Todo List
        </Typography>

        <Suspense fallback={<div>Loading input...</div>}>
          <TodoInput
            onChange={handleChange}
            value={inputValue}
            onAdd={handleAdd}
            error={errors["todos"] || ""}
          />
        </Suspense>

        <Suspense fallback={<div>Loading todos...</div>}>
          <TodoList
            todos={todos}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </Suspense>

        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: 550,
            fontStyle: "italic",
            mt: 1,
            textAlign: "center",
            color: !remaining ? "red" : "",
          }}
        >
          Your remaining todos: {remaining}
        </Typography>
      </Box>
    </Box>
  );
};

const AuthTodosPage = withAuth(TodosPage);

export default AuthTodosPage;
