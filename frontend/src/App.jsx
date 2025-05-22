import { UploadDropzone } from "../src/uploadthing/uploadthing";
import axios from "axios";
import { useState } from "react";
function App() {
  const BACKEND_URL = "http://localhost:5000";
  const [profilePicture, setProfilePicture] = useState(null);
  // const [imageKey, setImageKey] = useState();
  const [fileKey, setFileKey] = useState(null);

  const saveProfilePicture = async (fileUrl, fileKey) => {
    try {
      const { data } = await axios.post(
        BACKEND_URL + "/api/saveFileLink",
        { fileLink: fileUrl, imageKey: fileKey },
        { withCredentials: true }
      );
      if (data.success) {
        alert("file save to database");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleRemove = async (fileKey) => {
    try {
      const { data } = await axios.delete(
        BACKEND_URL + "/api/delete-file",
        { data: { imageKey: fileKey } },
        { withCredentials: true }
      );
      if (data.success) {
        alert("file remove");
      }
      console.log("Removing..");
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
            onClientUploadComplete={(res) => {
              if (res?.[0]?.ufsUrl) {
                saveProfilePicture(res[0].ufsUrl, res[0].key);
                setFileKey(res[0].key);
                setProfilePicture(res[0].ufsUrl);
              }
            }}
            onUploadError={(error) => {
              console.error(error, error.cause);
              alert("Upload failed");
            }}
          />
        </div>
        <div className="m-4 flex justify-center">
          <button
            onClick={() => handleRemove(fileKey)}
            className="bg-amber-700 p-4 rounded-2xl text-2xl font-bold text-white"
          >
            Delete
          </button>
        </div>
        <div className="">
          <img src={profilePicture} alt="" />
        </div>
      </div>
    </div>
  );
}

export default App;
