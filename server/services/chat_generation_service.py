"""Imports"""
import os
import openai
from dotenv import load_dotenv
import json
import time
from server.utils.openai import openai_request


"""Setup"""
# Fetch the openai api key
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
CONVERSATION_FILE = "conversation_history.json"

# Set model
MODEL = "gpt-3.5-turbo"
TEMPERATURE = 0.6
MAX_TOKENS = 200

# Set API admin behaviour
admin_prompt = """
You are "Tim," a friendly language partner who loves engaging in casual and interesting conversations, especially about sports. You're here to support users in learning English by correcting major mistakes and helping them think of words when asked. You are not a formal assistant, so your interactions should be light, easy-going, and reflective of everyday conversation. Avoid being overly explanatory or giving excessively long responses. Be open to sharing about yourself, just like a normal human would, and engage in typical small talk rather than offering formal assistance or asking if you can help today. In addition, you should try to use filler words like 'ah', 'umm', 'hmm', and some common english expressions.

Example Interaction:

User: Hi! I'm trying to remember a word... It's something you use to cover yourself when it's raining.

Tim: Hey! Hmm, I think you might be thinking of an umbrella. Right?

User: Ah yes, an umbrella.

Tim: Anyways, how's your day going? Have you been caught in the rain lately?
               """

# Create the admin prompt for the model to adhere to.
messages = [{"role": "system", "content": admin_prompt}]
timestamps=[time.time()]



"""Helper Functions"""
def send_message(messages):
    # Use the openai_request function from utils
    response = openai_request({
        "model": MODEL,
        "messages": messages,
        "temperature": TEMPERATURE,
        "max_tokens": MAX_TOKENS
    })
    
    # Return the chat response from the API response.
    return response['choices'][0]['message']['content']

def save_conversation(messages, timestamps):
    conversation_data = {
        "messages": messages,
        "timestamps": timestamps
    }
    with open(CONVERSATION_FILE, 'w') as f:
        json.dump(conversation_data, f)

def load_conversation():
    if os.path.exists(CONVERSATION_FILE):
        with open(CONVERSATION_FILE, 'r') as f:
            return json.load(f)
    return {"messages":None, "timestamps":None}


def chat(content: str) -> str:
    # Load the conversation if it exists
    conversation = load_conversation()
    if conversation["messages"]:
        messages = conversation["messages"]
        timestamps = conversation["timestamps"]
    else:
        messages = [{"role": "system", "content": admin_prompt}]
        timestamps = [time.time()]

    messages.append({"role": "user", "content": content})
    timestamps.append(time.time())
    response = send_message(messages)
    messages.append({"role": "assistant", "content": response})
    timestamps.append(time.time())

    # Saving everything except the system prompt
    save_conversation(messages[1:], timestamps[1:])
    return response


def dialogue_with_openai(transcription):
    response = chat(transcription)
    return response



if __name__ == "__main__":
    # Start the conversation with a greeting from Tim.
    # start_greeting = start_conversation()
    # print(start_greeting)
    # Continue the conversation with the user.
    while True:
        # User creates content by writing to terminal and this is appended to messages
        content = input("User: ")
        messages.append({"role": "user", "content": content})

        # Use the OpenAI GPT-3.5 model to generate a response to the user's input.
        chat_response = send_message(messages)

        # Print the response.
        print(f'ChatGPT: {chat_response}') 

        # Append the response to the messages with the role "assistant" to store the chat history.
        messages.append({"role": "assistant", "content": chat_response})