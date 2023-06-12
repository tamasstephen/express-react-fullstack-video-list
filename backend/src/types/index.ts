import type { Request } from "express";

export interface VideoParam {
  title: string;
  description: string;
  path: string;
  fileName: string;
  originalFileName: string;
  userId: string;
  thumbnailPath?: string;
}

export interface VideoRequest extends Request {
  body: Partial<Record<keyof VideoParam, string>> & { error?: string };
}
