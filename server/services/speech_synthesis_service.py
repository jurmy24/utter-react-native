import os
from utils.polly_util import synthesize_speech
import time

# Map languages to Amazon Polly voices and language codes
voices = {
    'English': {'voice_id': 'Matthew', 'language_code': 'en-US'},
    'French': {'voice_id': 'Lea', 'language_code': 'fr-FR'},
    # Add other languages and voices as needed
}

def synthesize_speech_with_polly(text, language="English"):
    voice_info = voices.get(language, voices['English'])  # Default to English if not found
    try:
        start_time = time.time()
        audio_output = synthesize_speech(text, voice_id=voice_info['voice_id'], language_code=voice_info['language_code'])
        end_time = time.time()
        print(f"Speech generated with Polly in (sec): {end_time - start_time}")
        return audio_output
    except Exception as e:
        print(f"An error occurred: {e}")
        raise
