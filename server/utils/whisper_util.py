import whisper
import os
import tempfile
from scipy.io.wavfile import write

def transcribe_audio_with_whisper(audio_data, model_name='base'):
    # Load the model
    model = whisper.load_model(model_name)

    # Create a temporary directory to store the audio file
    with tempfile.TemporaryDirectory() as temp_dir:
        # Create a temporary WAV file with the audio data
        temp_wav_path = os.path.join(temp_dir, "temp_audio.wav")
        write(temp_wav_path, 16000, audio_data)  # Assuming audio_data is a numpy array and 16000 is the sample rate

        # Transcribe the audio file
        result = model.transcribe(temp_wav_path)
        transcript = result['text']

    return transcript
