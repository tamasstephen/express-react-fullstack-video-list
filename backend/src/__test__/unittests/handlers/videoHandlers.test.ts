import { saveVideo } from "../../../handlers/videoHandler";
import type { Response } from "express";
import { getBearerToken, decodeJWT } from "../../../utils/auth";
import { createVideo } from "../../../data/video";

jest.mock("../../../utils/auth.ts", () => ({
  getBearerToken: jest.fn(),
  decodeJWT: jest.fn(),
  createVideo: jest.fn(),
}));

jest.mock("../../../data/video.ts", () => ({
  createVideo: jest.fn(),
}));

describe("saveVideo", () => {
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    mockReq = {
      body: {
        title: "Test Title",
        description: "Test Description",
        path: "/path/to/video",
        fileName: "video.mp4",
        originalFileName: "video.mp4",
      },
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 status with an error message if any required field is missing", async () => {
    mockReq.body.title = "";
    await saveVideo(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Please provide all the required fields",
    });
  });

  it("should return 401 status with an error message if the token or user ID is missing", async () => {
    (getBearerToken as jest.Mock).mockReturnValueOnce("your-token");
    (decodeJWT as jest.Mock).mockReturnValueOnce(null);

    await saveVideo(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Not authorized" });
  });

  it("should save the video and return a success message if everything is valid", async () => {
    const mockToken = { id: "user-id" };
    const mockVideo = { id: "video-id" };

    (getBearerToken as jest.Mock).mockReturnValueOnce("your-token");
    (decodeJWT as jest.Mock).mockReturnValueOnce(mockToken);
    (createVideo as jest.Mock).mockResolvedValueOnce(mockVideo);

    await saveVideo(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Video saved successfully",
      video: { id: mockVideo.id },
    });
  });

  it("should return 500 status with an error message if an error occurs during video creation", async () => {
    const mockError = new Error("Failed to create video");

    (getBearerToken as jest.Mock).mockReturnValueOnce("your-token");
    (decodeJWT as jest.Mock).mockReturnValueOnce({ id: "user-id" });
    (createVideo as jest.Mock).mockRejectedValueOnce(mockError);

    await saveVideo(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: mockError });
  });
});
