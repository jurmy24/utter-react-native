from server.utils.whisper_util import transcribe_audio_with_whisper

def transcribe_audio_service(audio_data, model='base'):
    try:
        # Call the utility function to transcribe the audio
        transcript = transcribe_audio_with_whisper(audio_data, model_name=model)
        return transcript
    except Exception as e:
        print(f"An error occurred during transcription: {e}")
        raise
