import app from "./app";
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + "/.env" });

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
