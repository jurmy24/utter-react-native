import { useState } from "react";
import axios from "axios";

const getFileExtension = (uri) => {
  const match = /\.(\w+)$/.exec(uri);
  return match ? match[1].toLowerCase() : null;
};

const useFileUpload = () => {
  const [uploadStatus, setUploadStatus] = useState(null);
  const [error, setError] = useState(null);

  const uploadAudioFile = async (audioFileUri) => {
    console.log(audioFileUri);
    const fileExtension = getFileExtension(audioFileUri);
    const formData = new FormData();
    formData.append("file", {
      uri: audioFileUri,
      type: "video/3gpp",
      name: `audiofile.${fileExtension}`,
    });

    try {
      const response = await axios.post(
        "http://130.229.177.235:3000/transcription/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus("success");
      // console.log(response.data);
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
