import multer from "multer";
import path from "path";

const videoStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "./video");
  },
  filename: (req, file, cb) => {
    const videoDir = path.resolve(__dirname, "../../video");
    const fileName = `${Date.now()}${path.extname(file.originalname)}`;
    try {
      cb(null, fileName);
      req.body.path = `${videoDir}/${fileName}`;
      req.body.fileName = fileName;
      req.body.originalFileName = file.originalname;
    } catch (err) {
      console.log(err);
      req.body.error = err;
    }
  },
});

export const videoUpload = multer({ storage: videoStorage });
