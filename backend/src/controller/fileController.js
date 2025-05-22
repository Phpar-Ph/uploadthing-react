import File from "../model/fileSchema.js";
import { UTApi } from "uploadthing/server";
export const saveFileLink = async (req, res) => {
  const { fileLink, imageKey } = req.body;

  try {
    if (!fileLink) {
      return res.status(400).json({
        success: false,
        message: "File is empty",
      });
    }
    const file = new File({
      fileLink,
      imageKey,
    });
    await file.save();
    res.status(200).json({
      success: true,
      message: "Uploaded Successfully",
      fileLink,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getFile = async (req, res) => {
  try {
    const file = await File.findById(req.userId);
    if (!file) {
      return res.json({
        success: false,
        message: "File is empty",
      });
    }
    return res.json({
      success: true,
      fileLink,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteFile = async (req, res) => {
  const utApi = new UTApi();
  const { imageKey } = req.body;
  try {
    if (!imageKey) {
      return res.status(400).json({
        success: false,
        message: "File link is required",
      });
    }
    await utApi.deleteFiles(imageKey);

    // Delete from MongoDB using imageKey
    const deletedFile = await File.findOneAndDelete({ imageKey });
    if (!deletedFile) {
      return res.status(404).json({
        success: false,
        message: "File not found in database",
      });
    }

    return res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
