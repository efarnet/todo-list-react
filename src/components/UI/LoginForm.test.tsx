import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "./LoginForm";
import * as authApi from "../../api/auth";
import { vi, describe, it, beforeEach, expect } from "vitest";

// Mock de l'API
vi.mock("../../api/auth");
const mockedLogin = (authApi.login as unknown) as ReturnType<typeof vi.fn>;

describe("LoginForm", () => {
  const mockOnSuccess = vi.fn();
  const mockOnError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders email and password fields", () => {
    render(<LoginForm onSuccess={mockOnSuccess} onError={mockOnError} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("shows validation errors when fields are empty", async () => {
    render(<LoginForm onSuccess={mockOnSuccess} onError={mockOnError} />);

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
    expect(mockedLogin).not.toHaveBeenCalled();
  });

  it("calls login function with correct data", async () => {
    mockedLogin.mockResolvedValue({}); // mock resolved value

    render(<LoginForm onSuccess={mockOnSuccess} onError={mockOnError} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "Password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() =>
      expect(mockedLogin).toHaveBeenCalledWith(
        "test@example.com",
        "Password123"
      )
    );
    expect(mockOnSuccess).toHaveBeenCalled();
  });

  it("shows error snackbar on login failure", async () => {
    mockedLogin.mockRejectedValue(new Error("Invalid credentials"));

    render(<LoginForm onSuccess={mockOnSuccess} onError={mockOnError} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() =>
      expect(mockOnError).toHaveBeenCalledWith("Invalid credentials")
    );
  });
});
