import axios from "axios";
import uniqueId from "../uuid_file"; // assuming you have a file that exports the deviceId

const useTextModel = (chatbotId) => {
  const submitMessage = async (text) => {
    try {
      // Call to server with deviceId, chatbotId, and message
      const gptResponse = await axios.post(
        "http://192.168.10.152:3000/chat-model/submit",
        {
          deviceId: uniqueId, // Use the unique deviceId
          chatbotId: chatbotId, // Pass the chatbotId that is used to initialize this hook
          message: text,
        }
      );
      return gptResponse.data.message;
    } catch (error) {
      console.error("Error with submitMessage:", error);
    }
  };
  return { submitMessage };
};

export default useTextModel;
