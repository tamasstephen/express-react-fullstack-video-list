import { handleLogin, handleRegister } from "../../handlers/userHandler";
import { createJWT } from "../../utils/auth"; // Import the necessary helper functions
import type { Request, Response } from "express";
import { createUser, getUserByEmail, userAlreadyExists } from "../../data/user";
import bcrypt from "bcrypt";

// Mock the Express Request and Response objects
const reqMock = {} as Request;
const resMock = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
  cookie: jest.fn().mockReturnThis(),
} as unknown as Response;

// Mock the jwt token creation function
jest.mock("../../utils/auth", () => ({
  createJWT: jest.fn((data: { id: string; name: string }) => "token"),
}));

// Mock the user data functions
jest.mock("../../data/user", () => ({
  getUserByEmail: jest.fn((email: string) => ({
    id: "1",
    name: "John Doe",
    email,
    password: "hashedPassword",
  })),
  createUser: jest.fn(
    ({
      email,
      password,
      username,
    }: {
      email: string;
      password: string;
      username: string;
    }) => ({ id: "1", name: username })
  ),
  userAlreadyExists: jest.fn((email: string, name: string) => {
    if (email === "test@example.com") {
      return false;
    }
    return true;
  }),
}));

// Mock the bcrypt functions
jest.mock("bcrypt", () => ({
  compare: jest.fn((password: string, hashedPassword: string) => true),
  hash: jest.fn((password: string, salt: number) => "hashedPassword"),
}));

// Login tests
describe("handleLogin", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should log in a user successfully", async () => {
    const validUser = {
      id: "1",
      name: "John Doe",
      email: "test@example.com",
      password: "hashedPassword",
    };

    (getUserByEmail as jest.Mock).mockResolvedValueOnce({
      id: "1",
      name: "John Doe",
      email: "test@example.com",
    });

    (createJWT as jest.Mock).mockReturnValueOnce("token");

    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);

    reqMock.body = {
      email: "test@example.com",
      password: "password",
    };

    await handleLogin(reqMock, resMock);

    expect(getUserByEmail).toHaveBeenCalledWith(reqMock.body.email);
    expect(createJWT).toHaveBeenCalledWith({
      id: validUser.id,
      name: validUser.name,
      email: validUser.email,
    });
    expect(resMock.cookie).toHaveBeenCalledWith("token", "token", {
      httpOnly: true,
    });
    expect(resMock.json).toHaveBeenCalledWith({
      message: "Logged in",
      user: { name: validUser.name },
    });
    expect(resMock.status).not.toHaveBeenCalled();
  });

  it("should return an error for invalid email or password", async () => {
    (getUserByEmail as jest.Mock).mockResolvedValueOnce(null);

    reqMock.body = {
      email: "invalid@example.com",
      password: "password",
    };

    await handleLogin(reqMock, resMock);

    expect(getUserByEmail).toHaveBeenCalledWith(reqMock.body.email);
    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.json).toHaveBeenCalledWith({
      error: "Invalid email or password",
    });
    expect(resMock.cookie).not.toHaveBeenCalled();
    expect(resMock.json).toHaveBeenCalledTimes(1);
  });

  it("should return an error for internal server error", async () => {
    (getUserByEmail as jest.Mock).mockRejectedValueOnce(new Error());

    reqMock.body = {
      email: "test@example.com",
      password: "password",
    };

    await handleLogin(reqMock, resMock);

    expect(getUserByEmail).toHaveBeenCalledWith(reqMock.body.email);
    expect(resMock.status).toHaveBeenCalledWith(500);
    expect(resMock.json).toHaveBeenCalledWith({
      error: "Internal server error",
    });
    expect(resMock.cookie).not.toHaveBeenCalled();
    expect(resMock.json).toHaveBeenCalledTimes(1);
  });
});

const reqRegMock = {
  body: {
    email: "test@example.com",
    username: "testuser",
    password: "password123",
    name: "Test User",
  },
} as unknown as Request;

const resRegMock = {
  status: jest.fn(() => resMock),
  json: jest.fn(),
  cookie: jest.fn(),
} as unknown as Response;

describe("handleRegister", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should handle successful user creation", async () => {
    // Mock utility function responses
    (userAlreadyExists as jest.Mock).mockResolvedValueOnce(false);
    (createUser as jest.Mock).mockResolvedValueOnce({ name: "Test User" });
    (createJWT as jest.Mock).mockReturnValueOnce("token");

    await handleRegister(reqRegMock, resRegMock);

    // Check the response
    expect(resRegMock.cookie).toHaveBeenCalledWith("token", "token", {
      httpOnly: true,
    });
    expect(resRegMock.json).toHaveBeenCalledWith({
      user: { name: "Test User" },
      message: "Logged in",
    });
  });

  test("should handle user already exists with the given username", async () => {
    // Mock utility function response
    (userAlreadyExists as jest.Mock).mockResolvedValueOnce(true);

    await handleRegister(reqRegMock, resRegMock);

    // Check the response
    expect(resRegMock.status).toHaveBeenCalledWith(400);
    expect(resRegMock.json).toHaveBeenCalledWith({
      error: "User already exists",
    });
  });

  test("should handle user already exists with the provided email address", async () => {
    // Mock utility function responses
    (userAlreadyExists as jest.Mock).mockResolvedValueOnce(false);
    (createUser as jest.Mock).mockRejectedValueOnce(
      new Error("User creation failed")
    );

    await handleRegister(reqRegMock, resRegMock);

    // Check the response
    expect(resRegMock.status).toHaveBeenCalledWith(500);
    expect(resRegMock.json).toHaveBeenCalledWith({
      error: "Internal server error",
    });
  });

  test("should handle an error during user creation", async () => {
    // Mock utility function responses

    (userAlreadyExists as jest.Mock).mockRejectedValueOnce(
      new Error("User creation failed")
    );

    await handleRegister(reqRegMock, resRegMock);

    // Check the response
    expect(resRegMock.status).toHaveBeenCalledWith(500);
    expect(resRegMock.json).toHaveBeenCalledWith({
      error: "Internal server error",
    });
  });
});
