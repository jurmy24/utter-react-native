# This module will handle the message history operations, like reading and updating the JSON file.
import json

def get_message_history():
    # Read the JSON file and return its contents
    with open('message_history.json', 'r') as file:
        return json.load(file)

def update_message_history(message):
    # Update the JSON file with the new message
    history = get_message_history()
    history.append(message)
    with open('message_history.json', 'w') as file:
        json.dump(history, file)
