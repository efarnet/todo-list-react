import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import * as authApi from "../../api/auth";
import { vi } from "vitest";
import SignupForm from "./SignupForm";

vi.mock("../../api/auth");
const mockedSignup = (authApi.signup as unknown) as ReturnType<typeof vi.fn>;

describe("SignupForm", () => {
  const mockOnSuccess = vi.fn();
  const mockOnError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders all input fields and the button", () => {
    render(<SignupForm onSuccess={mockOnSuccess} onError={mockOnError} />);

    expect(screen.getByLabelText(/firstname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/lastname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  test("shows validation errors when fields are empty", async () => {
    render(<SignupForm onSuccess={mockOnSuccess} onError={mockOnError} />);

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(
      await screen.findByText(/firstname is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/lastname is required/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/gender is required/i)).toBeInTheDocument();
    expect(mockedSignup).not.toHaveBeenCalled();
  });

  test("shows validation error for invalid email and short password", async () => {
    render(<SignupForm onSuccess={mockOnSuccess} onError={mockOnError} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "short" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password must be at least 8 characters/i)
    ).toBeInTheDocument();
    expect(mockedSignup).not.toHaveBeenCalled();
  });

  test("calls signup API with correct data when form is valid", async () => {
    mockedSignup.mockResolvedValue({});
    render(<SignupForm onSuccess={mockOnSuccess} onError={mockOnError} />);

    fireEvent.change(screen.getByLabelText(/firstname/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/lastname/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "Password123" },
    });

    fireEvent.mouseDown(screen.getByLabelText(/gender/i));

    const listbox = await screen.findByRole("listbox");

    fireEvent.click(within(listbox).getByText("Men"));

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(mockedSignup).toHaveBeenCalledWith({
        firstname: "John",
        lastname: "Doe",
        email: "john@example.com",
        password: "Password123",
        gender: "MEN",
      });
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  test("shows error on signup API failure", async () => {
    mockedSignup.mockRejectedValue(new Error("Email already in use"));

    render(<SignupForm onSuccess={mockOnSuccess} onError={mockOnError} />);

    fireEvent.change(screen.getByLabelText(/firstname/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/lastname/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "Password123" },
    });
    fireEvent.mouseDown(screen.getByLabelText(/gender/i));

    const listbox = await screen.findByRole("listbox");

    fireEvent.click(within(listbox).getByText("Men"));

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalledWith("Email already in use");
    });
  });
});
