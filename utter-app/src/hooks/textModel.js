import { useState } from "react";
import axios from "axios";

const apiKey = "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"; // Replace with your actual API key

const openaiInstance = axios.create({
  baseURL: "https://api.openai.com/v1/engines/text-davinci-003/completions",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
});

const useTextModel = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const submitMessage = async (text) => {
    setIsLoading(true); // Start loading
    const updatedMessages = [...messages, { text, sender: "user" }];
    setMessages(updatedMessages);
    // Construct the conversation history string
    const conversationHistory = updatedMessages
      .map((msg) =>
        msg.sender === "user" ? `User: ${msg.text}` : `AI: ${msg.text}`
      )
      .join("\n");
    const prompt = conversationHistory + "\nTim:";
    console.log(prompt);
    try {
      // OpenAI API call
      const gptResponse = await fetchAIResponse(prompt);

      const responseText = gptResponse.choices[0].text.trim();
      // const response = { text: responseText, sender: "ai" };

      // Add the response to messages
      setMessages((oldMessages) => [
        ...oldMessages,
        { text: responseText, sender: "Tim" },
      ]);

      setIsLoading(false); // End loading
      return responseText;
    } catch (error) {
      console.error("Error with OpenAI:", error);
      setIsLoading(false); // End loading in case of error
    }
  };

  const fetchAIResponse = async (prompt) => {
    // const apiKey = "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"; // Replace with your actual API key

    const dataPackage = {
      prompt,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.8,
    };

    try {
      const result = await openaiInstance.post("", dataPackage);
      const response = result.data;
      return response;
    } catch (error) {
      console.error("Error fetching AI response:", error);
      throw error; // Rethrow to handle it in the calling function
    }
  };

  return { messages, submitMessage, isLoading };
};

export default useTextModel;
