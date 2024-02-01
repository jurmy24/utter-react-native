import { useState } from "react";
import axios from "axios";
import uniqueId from "../uuid_file"; // Assuming you have a file that exports the unique deviceId
import handleAudio from "./useAudioHandler"

const getFileExtension = (uri) => {
  const match = /\.(\w+)$/.exec(uri);
  return match ? match[1].toLowerCase() : null;
};

const useAudioUpload = (chatId) => {
  const [uploadStatus, setUploadStatus] = useState(null);
  const [error, setError] = useState(null);

  const uploadAudioFile = async (audioFileUri) => {
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
        "http://localhost:5000/message/audio",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadStatus("success");

      audioFilePath = handleAudio(response)
      
      return audioFilePath;


    } catch (err) {
      setUploadStatus("failed");
      setError(err);
      throw err; // rethrow the error for handling in the component
    }
  };

  return { uploadAudioFile, uploadStatus, error };
};

export default useFileUpload;
