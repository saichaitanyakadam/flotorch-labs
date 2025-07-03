from typing import Optional, Dict, Any
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.controller.dynamodb_controller import fetch_data_from_dynamodb, get_summary_for_call_log

# Initialize FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def get_all_rows() -> Optional[Dict[str, Any]]:
    """Fetch all contact center data from DynamoDB."""
    return fetch_data_from_dynamodb()


@app.get("/{id}")
def get_summary(id: str, service: str = "bedrock", model: str = "us.amazon.nova-lite-v1:0") -> Dict[str, Any]:
    """Get AI-generated summary for a specific call log."""
    return get_summary_for_call_log(id, service, model)
