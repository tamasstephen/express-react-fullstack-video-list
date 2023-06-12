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
      if (file.fieldname === "thumbnail") {
        req.body.thumbnailPath = `${videoDir}/${fileName}`;
      } else if (file.fieldname === "video") {
        req.body.path = `${videoDir}/${fileName}`;
        req.body.fileName = fileName;
        req.body.originalFileName = file.originalname;
      }
      cb(null, fileName);
    } catch (err) {
      console.log(err);
      req.body.error = err;
    }
  },
});

export const videoUpload = multer({ storage: videoStorage });
