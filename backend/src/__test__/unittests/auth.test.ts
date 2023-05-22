import { createJWT } from "../../utils/auth";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn((payload: object, secret: string) => "mocked-token"),
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
