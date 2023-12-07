import { useState } from "react";
import axios from "axios";

const useTextModel = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTextSubmit = async (text) => {
    setMessages((oldMessages) => [...oldMessages, { text, sender: "user" }]);
    setIsLoading(true); // Start loading

    try {
      // OpenAI API call
      const gptResponse = await fetchAIResponse(text);

      const responseText = gptResponse.choices[0].text.trim();
      const newMessage = { text: responseText, sender: "ai" };

      // Add the response to messages
      setMessages((oldMessages) => [...oldMessages, newMessage]);

      setIsLoading(false); // End loading
    } catch (error) {
      console.error("Error with OpenAI:", error);
      setIsLoading(false); // End loading in case of error
    }
  };

  const fetchAIResponse = async (text) => {
    const apiKey = "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"; // Replace with your actual API key
    const prompt = text;

    try {
      const result = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          prompt: prompt,
          max_tokens: 50,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      return result.data;
    } catch (error) {
      console.error("Error fetching AI response:", error);
      throw error; // Rethrow to handle it in the calling function
    }
  };

  return { messages, handleTextSubmit, isLoading };
};

export default useTextModel;
