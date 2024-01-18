import json
import os
from typing import Any
import openai
import backoff
import logging
from dotenv import load_dotenv

load_dotenv()

# Cache for storing API keys
api_key_cache = {}

# Set up basic logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# Decorator to automatically back off and retry on rate limit errors
@backoff.on_exception(backoff.expo, openai.RateLimitError, max_tries=10, max_time=300)
def openai_request(request_config: dict[str, Any], print_messages: bool=False):
    try:
        # Initialize the OpenAI client with the API key from environment variables
        client = openai.OpenAI(
            api_key=os.environ.get("OPENAI_API_KEY"),
        )

        # Print messages if the flag is True
        if print_messages:
            print(
                "messages sent to API: ",
                json.dumps(request_config["messages"], indent=2),
            )
        # Prepare arguments for the API request
        args: dict[str, Any] = {"temperature": 0, **request_config}
        # Make the request and return the result
        return client.chat.completions.create(**args)
    except openai.RateLimitError as e:
        # Log and re-raise rate limit errors
        logger.error(f"Rate limit error: {e}")
        raise
    except Exception as e:
        # Log and re-raise unexpected errors
        logger.error(f"Unexpected error: {e}")
        raise


# Asynchronous version of the above function
@backoff.on_exception(backoff.expo, openai.RateLimitError, max_tries=10, max_time=300)
async def async_openai_request(request_config: dict[str, Any], print_messages: bool=False):
    try:
        # Initialize the asynchronous OpenAI client
        client = openai.AsyncOpenAI(
            api_key=os.environ.get("OPENAI_API_KEY"),
        )

        if print_messages:
            print(
                "messages sent to API: ",
                json.dumps(request_config["messages"], indent=2),
            )
        args: dict[str, Any] = {"temperature": 0, **request_config}
        # Asynchronously make the request and await the response
        res = await client.chat.completions.create(**args)
        return res
    except openai.RateLimitError as e:
        logger.error(f"Rate limit error: {e}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise


# Function for making completion requests asynchronously
@backoff.on_exception(backoff.expo, openai.RateLimitError, max_tries=10, max_time=300)
async def async_openai_complete_request(request_config: dict[str, Any], print_messages: bool=False):
    try:
        # Initialize the asynchronous OpenAI client
        client = openai.AsyncOpenAI(
            api_key=os.environ.get("OPENAI_API_KEY"),
        )
        # Set up the arguments for the completion request
        args: dict[str, Any] = {
            "max_tokens": 1000,
            "model": "text-davinci-003",
            "temperature": 0,
            **request_config,
        }
        if print_messages:
            print(
                "messages sent to API: ", json.dumps(request_config["prompt"], indent=2)
            )
        # Asynchronously make the completion request and await the response
        res = await client.completions.create(**args)
        return res
    except openai.RateLimitError as e:
        logger.error(f"Rate limit error: {e}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise