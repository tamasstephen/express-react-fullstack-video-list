import { saveVideo, streamVideo } from "../../../handlers/videoHandler";
import type { Request, Response } from "express";
import { getBearerToken, decodeJWT } from "../../../utils/auth";
import { createVideo, getVideoById } from "../../../data/video";
import fs from "fs";

jest.mock("../../../utils/auth.ts", () => ({
  getBearerToken: jest.fn(),
  decodeJWT: jest.fn(),
  createVideo: jest.fn(),
}));

jest.mock("../../../data/video.ts", () => ({
  createVideo: jest.fn(),
  getVideoById: jest.fn(),
}));

jest.mock("fs", () => ({
  statSync: jest.fn(),
  createReadStream: jest.fn(),
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

describe("streamVideo", () => {
  let mockReq: any;
  let mockRes: any;
  let mockReturnStream: any;

  beforeEach(() => {
    mockReq = {
      headers: {},
    };

    mockRes = {
      writeHead: jest.fn(),
      sendStatus: jest.fn(),
      pipe: jest.fn(),
    };

    mockReturnStream = {
      pipe: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should stream the video content when the video exists and range header is provided", async () => {
    const mockVideo = { id: "video-id", path: "/path/to/video.mp4" };
    const mockRange = "bytes=0-100";

    (getVideoById as jest.Mock).mockResolvedValueOnce(mockVideo);
    (fs.statSync as jest.Mock).mockReturnValueOnce({ size: 200 });
    (fs.createReadStream as jest.Mock).mockReturnValueOnce(mockReturnStream);

    mockReq.headers.range = mockRange;

    await streamVideo(mockVideo.id, mockReq, mockRes);

    expect(mockRes.writeHead).toHaveBeenCalledWith(206, {
      "Content-Range": "bytes 0-100/200",
      "Accept-Ranges": "bytes",
      "Content-Length": 101,
      "Content-Type": "video/mp4",
    });
    expect(fs.createReadStream).toHaveBeenCalledWith(mockVideo.path, {
      start: 0,
      end: 100,
    });
    expect(mockReturnStream.pipe).toHaveBeenCalled();
  });

  it("should stream the entire video when the video exists and range header is not provided", async () => {
    const mockVideo = { id: "video-id", path: "/path/to/video.mp4" };
    const mockSize = 200;

    (getVideoById as jest.Mock).mockResolvedValueOnce(mockVideo);
    (fs.statSync as jest.Mock).mockReturnValueOnce({ size: mockSize });
    (fs.createReadStream as jest.Mock).mockReturnValueOnce(mockReturnStream);

    await streamVideo(mockVideo.id, mockReq, mockRes);

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Length": mockSize,
      "Content-Type": "video/mp4",
    });
    expect(fs.createReadStream).toHaveBeenCalledWith(mockVideo.path);
    expect(mockReturnStream.pipe).toHaveBeenCalled();
  });

  it("should send a 404 status when the video does not exist", async () => {
    const mockVideoId = "non-existent-video-id";

    (getVideoById as jest.Mock).mockResolvedValueOnce(null);

    await streamVideo(mockVideoId, mockReq, mockRes);

    expect(mockRes.sendStatus).toHaveBeenCalledWith(404);
  });
});
