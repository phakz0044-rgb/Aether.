from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

MODEL = "llama-3.3-70b-versatile"

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

SYSTEM_PROMPT = """
Você é o Aether, um assistente inteligente, educado e objetivo.
Sempre responda em português brasileiro.
"""

def ask(messages):
    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },
            *messages
        ],
        temperature=0.7
    )

    return response.choices[0].message.content