import type { IJwtRequest } from "../../utils/auth";
import { createJWT, protectRoute } from "../../utils/auth";
import type { Response } from "express";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn((payload: object, secret: string) => "mocked-token"),
  verify: jest.fn((token: string, secretOrPublicKey: string) => {
    if (token === "valid-token") return true;
    return false;
  }),
}));

describe("createJWT", () => {
  const mockUser = {
    id: "123",
    email: "test@example.com",
    name: "Test User",
    password: "test-password",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  test("should create a JWT token with the correct payload and return it", () => {
    const token = createJWT(mockUser);

    expect(jwt.sign).toHaveBeenCalledWith(
      { id: "123", email: "test@example.com" },
      expect.any(String)
    );

    expect(token).toEqual("mocked-token");
  });

  test("should call jwt.sign with the JWT payload and the provided secret", () => {
    createJWT(mockUser);

    expect(jwt.sign).toHaveBeenCalledWith(
      { id: "123", email: "test@example.com" },
      process.env.JWT_SECRET
    );
  });

  test("should throw an error if the JWT signing process fails", () => {
    jest.spyOn(jwt, "sign").mockImplementationOnce(() => {
      throw new Error("Mocked signing error");
    });

    expect(() => {
      createJWT(mockUser);
    }).toThrow("Mocked signing error");
  });
});

describe("protectRoute", () => {
  const mockRequest: Partial<IJwtRequest> = {
    cookies: {
      token: "valid-token",
    },
  };
  const mockResponse: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const mockNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should grant access if a valid token is provided", () => {
    protectRoute(
      mockRequest as IJwtRequest,
      mockResponse as Response,
      mockNext
    );

    expect(mockNext).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });

  test("should deny access if no token is provided", () => {
    const requestWithoutToken: Partial<IJwtRequest> = {
      cookies: {},
    };

    protectRoute(
      requestWithoutToken as IJwtRequest,
      mockResponse as Response,
      mockNext
    );

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Not authorized" });
  });

  test("should deny access if an invalid token is provided", () => {
    const requestWithInvalidToken: Partial<IJwtRequest> = {
      cookies: {
        token: "invalid-token",
      },
    };

    protectRoute(
      requestWithInvalidToken as IJwtRequest,
      mockResponse as Response,
      mockNext
    );

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Not authorized" });
  });

  test("should handle missing cookies property in the request", () => {
    const requestWithoutCookies: Partial<IJwtRequest> = {};

    protectRoute(
      requestWithoutCookies as IJwtRequest,
      mockResponse as Response,
      mockNext
    );

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Not authorized" });
  });
});
