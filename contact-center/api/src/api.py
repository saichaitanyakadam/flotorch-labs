from typing import Optional, Dict, Any
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.controller.dynamodb_handler import fetch_data_from_dynamodb

app=FastAPI()
app.add_middleware(CORSMiddleware,allow_origins=["*"],allow_credentials=True,allow_methods=["*"],allow_headers=["*"])


@app.get("/")
def get_all_rows(service: str = "openai", model: str = "gpt-4o") -> Optional[Dict[str, Any]]:
    return fetch_data_from_dynamodb(service,model)

