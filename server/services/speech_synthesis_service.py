import os
import boto3
import time

def amazon_polly(text, params, language):
    client = boto3.client('polly', 
                          aws_access_key_id=params['aws_access_key_id'], 
                          aws_secret_access_key=params['aws_secret_access_key'],
                          region_name='eu-west-3')
    voices = {'English':'Matthew', 'French':'Lea', 'German':'Daniel', 'Spanish':'Lucia', 'Swedish':'Elin'}
    response = client.synthesize_speech(VoiceId=voices[language],
                                        Engine='neural',
                                        OutputFormat='mp3', 
                                        Text=text)
    
    audio_data = response['AudioStream'].read()
    
    return audio_data


# TTS service configurations (API keys, endpoints, etc.)
tts_service = {
    "Amazon_Polly": {"function": amazon_polly, "params": {'aws_access_key_id':os.getenv('AWS_ACC_KEY'), 'aws_secret_access_key':os.getenv('AWS_SEC_ACC_KEY')}},
}

def synthesize_speech_with_polly(text, language= "English"):
    for service_name, service_info in tts_service.items():

            start_time = time.time()
            audio_output = service_info["function"](text, service_info["params"], language)
            end_time = time.time()
            duration = end_time - start_time
            print("Speech generated with Polly in (sec): ")
    pass





# Sample text
text_samples = {
    "English": "Welcome to our language learning app. Today, we will explore the beautiful intricacies of the English language. From Shakespeare's poetic verses to modern-day colloquialisms, English is a language rich in history and diversity.",
}





