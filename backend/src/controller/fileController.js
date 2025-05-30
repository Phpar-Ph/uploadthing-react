import File from "../model/fileSchema.js";
import { UTApi } from "uploadthing/server";
export const saveFileLink = async (req, res) => {
  const { fileLink, imageKey, name, size } = req.body;

  try {
    if (!fileLink) {
      return res.status(400).json({
        success: false,
        message: "File is empty",
      });
    }
    // Save a new document with one file entry
    const fileData = new File({
      file: [
        {
          fileLink,
          imageKey,
          name,
          size,
        },
      ],
    });

    await fileData.save();
    res.status(200).json({
      success: true,
      message: "Uploaded Successfully",
      fileLink,
      imageKey,
      name,
      size,
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
        message: "File key is required",
      });
    }
    await utApi.deleteFiles(imageKey);

    // Delete from MongoDB using imageKey
    const deletedFile = await File.findOneAndDelete({
      "file.imageKey": imageKey,
    });
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
