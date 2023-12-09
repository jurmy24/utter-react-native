import axios from "axios";

const useTextModel = () => {
  const submitMessage = async (text) => {
    // NOTE: Server picks up the rest of the message history to send to GPT
    try {
      // Call to server
      const gptResponse = await axios.post(
        "http://130.229.177.235:3000/chat-model/submit",
        {
          message: text,
        }
      );
      console.log("This is GPT's response:", gptResponse);
    } catch (error) {
      console.error("Error with OpenAI:", error);
    }
  };
  return { submitMessage };
};

export default useTextModel;
