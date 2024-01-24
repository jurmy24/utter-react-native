import boto3
from botocore.exceptions import BotoCoreError, ClientError
import logging
from dotenv import load_dotenv
import os
import backoff

# Load environment variables
load_dotenv()

# Set up basic logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize the Polly client with the AWS credentials
def get_polly_client():
    return boto3.client('polly',
                        aws_access_key_id=os.getenv('AWS_ACC_KEY'),
                        aws_secret_access_key=os.getenv('AWS_SEC_ACC_KEY'),
                        region_name='eu-west-3')


@backoff.on_exception(backoff.expo, (BotoCoreError, ClientError), max_tries=10, max_time=300)
def synthesize_speech(text, voice_id='Matthew', language_code='en-US', output_format='mp3'):
    client = get_polly_client()
    try:
        response = client.synthesize_speech(VoiceId=voice_id,
                                            Engine='neural',
                                            OutputFormat=output_format,
                                            Text=text,
                                            LanguageCode=language_code)
        return response['AudioStream'].read()
    except (BotoCoreError, ClientError) as error:
        logger.error(f"Could not synthesize speech with Amazon Polly: {error}")
        raise
