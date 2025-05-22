import { createUploadthing } from "uploadthing/server";

const f = createUploadthing({
  errorFormatter: (err) => {
    console.log("Error uploading file", err.message);
    console.log("  - Above error caused by:", err.cause);

    return { message: err.message };
  },
});

export const uploadRouter = {
  videoAndImage: f(
    {
      image: {
        maxFileSize: "4MB",
        maxFileCount: 4,
      },
      video: {
        maxFileSize: "16MB",
      },
      blob: { maxFileSize: "8GB", maxFileCount: 10 },
    },
    {
      awaitServerData: true,
    }
  )
    .middleware(({ files }) => {
      files;
      // ^?
      return {
        uploadedBy: "fake-user-id-213",
      };
    })
    .onUploadError(({ error, fileKey }) => {
      console.log("upload error", { message: error.message, fileKey });
      throw error;
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("upload completed", metadata, file);
      // await new Promise((r) => setTimeout(r, 15000));
      return { foo: "bar", baz: "qux" };
    }),
};

export default uploadRouter;
