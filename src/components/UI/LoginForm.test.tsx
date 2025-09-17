import { render, screen, fireEvent } from "@testing-library/react";
import { LoginForm } from "./LoginForm";
import { vi, describe, it, beforeEach, expect } from "vitest";
import * as authApi from "../../api/auth";

// Mock de l'API
vi.mock("../../api/auth");
const mockedLogin = vi.mocked(authApi.login);

describe("LoginForm", () => {
  const mockOnSuccess = vi.fn();
  const mockOnError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders email and password fields", () => {
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
});
