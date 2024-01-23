from flask import Blueprint, request, jsonify
from services.transcription_service import transcribe_audio_service
from services.chat_generation_service import dialogue_with_openai
from services.speech_synthesis_service import synthesize_speech_with_polly
from services.message_history_service import get_message_history, update_message_history
import numpy as np

message_blueprint = Blueprint('message_api', __name__)

@message_blueprint.route('/message/audio', methods=['POST'])
def handle_audio_message():
    if 'audio' in request.files:
        # Read the file and convert it into the required format
        audio_file = request.files['audio']
        audio_data = np.fromstring(audio_file.read(), np.int16)  # Update the data type and reading method based on the actual audio file

        # Transcribe the audio
        transcription = transcribe_audio_service(audio_data, model='base')

        return jsonify({'transcription': transcription})

    return jsonify({'error': 'No audio file provided'}), 400


@message_blueprint.route('/message/text', methods=['POST'])
def handle_text_message():
    # Extract text message from the request
    text_message = request.json.get('text')

    # Process dialogue and synthesis
    openai_reply, speech_file_url = process_dialogue_and_synthesis(text_message)

    # Return response
    return jsonify({
        'reply': openai_reply,
        'speech_file_url': speech_file_url
    })

@message_blueprint.route('/message/history', methods=['GET'])
def get_history():
    # Retrieve message history
    history = get_message_history()
    return jsonify(history)


def process_dialogue_and_synthesis(input_text):
    # Send the input text to OpenAI's GPT-3.5
    openai_reply = dialogue_with_openai(input_text)

    # Synthesize the OpenAI reply into speech
    speech_file = synthesize_speech_with_polly(openai_reply)

    # Update the message history
    update_message_history({'input': input_text, 'reply': openai_reply})

    # Return OpenAI's reply and the speech file URL
    return openai_reply, speech_file
