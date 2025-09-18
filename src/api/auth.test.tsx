import { vi } from "vitest";
import type { User } from "../interfaces/user.interface";
import { fetchMe, login, logout, signup } from "./auth";


beforeEach(() => {
 global.fetch = vi.fn() as unknown as typeof fetch;
});

const mockUser: User = {
  firstname: "John",
  lastname: "Doe",
  email: "john@example.com",
  password: "Password123",
  gender: "MEN",
};

describe("Auth API", () => {
  test("login calls fetch correctly and returns user", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    const user = await login({ email: mockUser.email, password: mockUser.password });
    
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/auth/login"),
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: mockUser.email, password: mockUser.password }),
        credentials: "include",
      })
    );
    expect(user).toEqual(mockUser);
  });

  test("signup calls fetch correctly and returns user", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    const user = await signup(mockUser);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/auth/signup"),
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockUser),
      })
    );
    expect(user).toEqual(mockUser);
  });

  test("logout calls fetch and returns user", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    const user = await logout();
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/auth/logout"),
      expect.objectContaining({
        method: "POST",
        credentials: "include",
      })
    );
    expect(user).toEqual(mockUser);
  });

  test("fetchMe calls fetch and returns user", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    const user = await fetchMe();
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/auth/me"),
      expect.objectContaining({
        method: "GET",
        credentials: "include",
      })
    );
    expect(user).toEqual(mockUser);
  });

  test("fetchMe throws error if not authenticated", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(fetchMe()).rejects.toThrow("Not authenticated");
  });

  test("login throws error if response not ok", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, json: async () => ({ message: "Error" }) });

    await expect(login({ email: mockUser.email, password: mockUser.password })).rejects.toThrow();
  });
});
