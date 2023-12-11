import axios from "axios";
import uniqueId from "../uuid_file"; // assuming you have a file that exports the deviceId

const useTextModel = (chatbotId) => {
  const submitMessage = async (text) => {
    try {
      // Call to server with deviceId, chatbotId, and message
      console.log("Here's some info");
      console.log("chatbotId", chatbotId);
      console.log("deviceId", uniqueId);
      console.log("message", text);

      const gptResponse = await axios.post(
        "http://130.229.140.197:3000/chat-model/submit",
        {
          deviceId: uniqueId, // Use the unique deviceId
          chatbotId: chatbotId, // Pass the chatbotId that is used to initialize this hook
          message: text,
        }
      );
      console.log("This is GPT's response:", gptResponse.data.message);

      return gptResponse.data.message;
    } catch (error) {
      console.error("Error with submitMessage:", error);
    }
  };
  return { submitMessage };
};

export default useTextModel;
