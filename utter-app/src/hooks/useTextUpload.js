import axios from "axios";
import uniqueId from "../uuid_file"; // assuming you have a file that exports the deviceId

const useTextUpload = (chatbotId) => {
  const submitMessage = async (text) => {
    try {
      console.log("Sending text message to server...")
      // Call to server with deviceId, chatbotId, and message
      const gptResponse = await axios.post(
        "http://192.168.1.189:5000/message/text",
        {
          // deviceId: uniqueId, // Use the unique deviceId
          // chatbotId: chatbotId, // Pass the chatbotId that is used to initialize this hook
          // message: text,
          text: "Hello there!"
        }
      );
      return gptResponse.data.message;
    } catch (error) {
      console.error("Error with useTextUpload.submitMessage:", error);
    }
  };
  return { submitMessage };
};

export default useTextUpload;
