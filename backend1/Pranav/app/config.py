# app/config.py
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os

load_dotenv()

class Settings(BaseSettings):
    imap_server: str = "imap.example.com"
    email_user: str = "invoice@example.com"
    email_password: str = "password"
    upload_dir: str = "./uploads"
    huggingface_token: str
    llm_model: str = "meta-llama/Meta-Llama-3-8B-Instruct"
    embed_model: str = "BAAI/bge-small-en-v1.5"

    class Config:
        env_file = ".env"

settings = Settings()