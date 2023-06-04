import multer from "multer";
import path from "path";

const videoStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "./video");
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}${path.extname(file.originalname)}`;
    try {
      cb(null, fileName);
      req.body.filePath = `http://localhost:4000/video/${fileName}`;
    } catch (err) {
      console.log(err);
      req.body.error = err;
    }
  },
});

export const videoUpload = multer({ storage: videoStorage });
