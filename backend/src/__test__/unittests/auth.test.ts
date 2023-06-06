import {
  createJWT,
  decodeJWT,
  getBearerToken,
  protectRoute,
} from "../../utils/auth";
import type { Request, Response } from "express";
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
      { id: mockUser.id, name: mockUser.name },
      expect.any(String)
    );

    expect(token).toEqual("mocked-token");
  });

  test("should call jwt.sign with the JWT payload and the provided secret", () => {
    createJWT(mockUser);

    expect(jwt.sign).toHaveBeenCalledWith(
      { id: mockUser.id, name: mockUser.name },
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
  const mockRequest: Partial<Request> = {
    headers: {
      authorization: "Bearer valid-token",
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
    protectRoute(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });

  test("should deny access if no token is provided", () => {
    const requestWithoutToken: Partial<Request> = {
      headers: {},
    };

    protectRoute(
      requestWithoutToken as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Not authorized" });
  });

  test("should deny access if an invalid token is provided", () => {
    const requestWithInvalidToken: Partial<Request> = {
      headers: {
        authorization: "Bearer invalid-token",
      },
    };

    protectRoute(
      requestWithInvalidToken as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Not authorized" });
  });

  test("should handle missing cookies property in the request", () => {
    const requestWithoutCookies: Partial<Request> = {};

    protectRoute(
      requestWithoutCookies as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Not authorized" });
  });
});

describe("getBearerToken", () => {
  const bearerToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNhOGZiYmE1LWZiZGMtNGMyYy04MWVjLTIxNzY3MTgyMTgzMiIsIm5hbWUiOiJ3b3ciLCJpYXQiOjE2ODU4Njc3NzB9.dPctPvKIMqyvDGihUbVBQCR0ytHwZde615CI5CM4xDM";
  it("should return the bearer token from the request headers", () => {
    const req = {
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
    } as Request;

    const authToken = getBearerToken(req);

    expect(authToken).toBe(bearerToken);
  });

  it("should return undefined if the authorization header is missing", () => {
    const req = {} as Request;

    const authToken = getBearerToken(req);

    expect(authToken).toBeUndefined();
  });

  it("should return undefined if the bearer token is missing", () => {
    const req = {
      headers: {
        authorization: "Bearer",
      },
    } as Request;

    const authToken = getBearerToken(req);

    expect(authToken).toBeUndefined();
  });

  it("should return undefined if headers are missing", () => {
    const req = {
      headers: {},
    } as Request;

    const authToken = getBearerToken(req);

    expect(authToken).toBeUndefined();
  });
});

describe("decodeJWT", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should decode and return the decoded token if verification is successful", () => {
    const mockDecodedToken = { id: "user-id", name: "user-name" };
    const mockToken = "your-token";

    (jwt.verify as jest.Mock).mockReturnValueOnce(mockDecodedToken);

    const decodedToken = decodeJWT(mockToken);

    expect(jwt.verify).toHaveBeenCalledWith(mockToken, expect.any(String));
    expect(decodedToken).toBe(mockDecodedToken);
  });

  it("should return null if verification throws an error", () => {
    const mockToken = "your-token";

    (jwt.verify as jest.Mock).mockImplementationOnce(() => {
      throw new Error("Verification failed");
    });

    const decodedToken = decodeJWT(mockToken);

    expect(jwt.verify).toHaveBeenCalledWith(mockToken, expect.any(String));
    expect(decodedToken).toBeNull();
  });
});
