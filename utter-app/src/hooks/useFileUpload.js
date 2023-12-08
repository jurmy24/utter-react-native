import { useState } from "react";
import axios from "axios";

const useFileUpload = () => {
  const [uploadStatus, setUploadStatus] = useState(null);
  const [error, setError] = useState(null);

  const uploadAudioFile = async (audioFileUri) => {
    const formData = new FormData();
    formData.append("file", {
      uri: audioFileUri,
      type: "audio/mp3",
      name: "audiofile.mp3",
    });

    try {
      const response = await axios.post(
        "http://[::1]:3000/transcription/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus("success");
      return response.data;
    } catch (err) {
      setUploadStatus("failed");
      setError(err);
      throw err; // rethrow the error for handling in the component
    }
  };

  return { uploadAudioFile, uploadStatus, error };
};

export default useFileUpload;
