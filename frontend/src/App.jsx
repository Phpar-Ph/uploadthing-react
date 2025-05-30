import { UploadDropzone } from "../src/uploadthing/uploadthing";
import axios from "axios";
import { useState } from "react";
function App() {
  const BACKEND_URL = "http://localhost:5000";

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const saveProfilePicture = async (file) => {
    try {
      const { data } = await axios.post(
        BACKEND_URL + "/api/saveFileLink",
        {
          fileLink: file.ufsUrl,
          imageKey: file.key,
          name: file.name,
          size: file.size,
        },
        { withCredentials: true }
      );
      if (data.success) {
        console.log("file save to database");
        console.log("File save : ", file.ufsUrl);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleRemove = async (fileKey) => {
    console.log("File key : ", fileKey);
    try {
      const { data } = await axios.delete(
        BACKEND_URL + "/api/delete-file",
        { data: { imageKey: fileKey } },
        { withCredentials: true }
      );
      if (data.success) {
        setUploadedFiles((prev) => prev.filter((e) => e.key !== fileKey));
        console.log("file remove");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="max-w-4xl mx-auto">
        <div>
          <UploadDropzone
            endpoint={(routeRegistry) => routeRegistry.videoAndImage}
            onClientUploadComplete={async (res) => {
              if (!res) return;

              const files = Array.isArray(res) ? res : [res];
              for (const file of files) {
                if (file?.ufsUrl) {
                  await saveProfilePicture(file);
                  setUploadedFiles((prev) => [...prev, file]);
                }
              }
            }}
            onUploadError={(error) => {
              console.error(error, error.cause);
              alert("Upload failed");
            }}
          />
        </div>

        {/* Display uploaded files */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {uploadedFiles.map((file) => (
            <div key={file.key} className="relative">
              <img
                src={file.ufsUrl}
                alt={file.name}
                className="w-full rounded-lg"
              />
              <div className="m-4 flex justify-center">
                <button
                  onClick={() => handleRemove(file.key)}
                  className="bg-amber-700 p-4 rounded-2xl text-2xl font-bold text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
