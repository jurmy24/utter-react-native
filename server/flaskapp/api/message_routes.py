from flask import Blueprint, request, jsonify
from flaskapp.services.transcription_service import transcribe_audio
from flaskapp.services.chat_generation_service import dialogue_with_openai
from flaskapp.services.speech_synthesis_service import synthesize_speech_with_polly
from flaskapp.services.message_history_service import get_message_history, update_message_history

message_blueprint = Blueprint('message_api', __name__)

@message_blueprint.route('/message/audio', methods=['POST'])
def handle_audio_message():
    # Extract audio file from the request
    audio_file = request.files.get('audio')

    # Transcribe the audio file
    transcription = transcribe_audio(audio_file)

    # Process dialogue and synthesis
    openai_reply, speech_file_url = process_dialogue_and_synthesis(transcription)

    # Return response
    return jsonify({
        'transcription': transcription,
        'reply': openai_reply,
        'speech_file_url': speech_file_url
    })

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
