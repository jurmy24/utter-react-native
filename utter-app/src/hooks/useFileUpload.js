import { useState } from "react";
import axios from "axios";
import uniqueId from "../uuid_file"; // Assuming you have a file that exports the unique deviceId

const getFileExtension = (uri) => {
  const match = /\.(\w+)$/.exec(uri);
  return match ? match[1].toLowerCase() : null;
};

const useFileUpload = (chatId) => {
  const [uploadStatus, setUploadStatus] = useState(null);
  const [error, setError] = useState(null);

  const uploadAudioFile = async (audioFileUri) => {
    console.log(audioFileUri);
    const fileExtension = getFileExtension(audioFileUri);
    const formData = new FormData();
    formData.append("file", {
      uri: audioFileUri,
      type: `audio/${fileExtension}`,
      name: `audiofile.${fileExtension}`,
    });
    formData.append("deviceId", uniqueId); // Add deviceId to FormData
    formData.append("chatbotId", chatId); // Add chatId to FormData

    try {
      const response = await axios.post(
        "http://130.229.140.197:3000/transcription/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus("success");
      return response.data.transcription;
    } catch (err) {
      setUploadStatus("failed");
      setError(err);
      throw err; // rethrow the error for handling in the component
    }
  };

  return { uploadAudioFile, uploadStatus, error };
};

export default useFileUpload;
