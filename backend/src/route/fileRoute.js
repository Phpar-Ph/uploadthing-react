import {
  saveFileLink,
  getFile,
  deleteFile,
} from "../controller/fileController.js";
import express from "express";

const fileRouter = express.Router();

fileRouter.post("/saveFileLink", saveFileLink);
fileRouter.get("/getFileLink", getFile);
fileRouter.delete("/delete-file", deleteFile);

export default fileRouter;
