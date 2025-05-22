import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import cors from "cors";
import uploadRouter from "./src/route/router.js";
import { createRouteHandler } from "uploadthing/express";
import fileRouter from "./src/route/fileRoute.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
connectDB();

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());

app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use("/api", fileRouter);
app.get("/api", (req, res) => {
  res.send("Hello from Express!");
});
app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
  })
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
