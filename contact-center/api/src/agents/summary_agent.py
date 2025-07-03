import os
from typing import Dict, Any
import pandas as pd
from dotenv import load_dotenv
from flotorch_core.inferencer.gateway_inferencer import GatewayInferencer
from src.utils.calculate_price import calculate_price_of_model
load_dotenv()


prompt = {
    "system_prompt": (
        "You are an assistant analyzing job interview call transcripts between recruiters and candidates.\n\n"
        "Your task is to extract exactly three fields separated by '|||':\n"
        "1. A formal summary strictly based on what the candidate explicitly said — covering skills, experience, or role preferences.If the transcripts are not available, the summary should be 'Transcripts are not available for this call.'\n"
        "2. 'Yes' or 'No' — Did the candidate describe their background, experience, or skills?\n"
        "3. 'Yes' or 'No' — Did the candidate specify the role or position they are looking for?\n\n"
        "Important Notes:\n"
        "- DO NOT infer or assume any information that is not directly mentioned in the transcript.\n"
        "- DO NOT invent or guess intent if it is unclear.\n"
        "- Only summarize what is explicitly stated by the candidate.\n"
        "- Transcripts may have minor speech-to-text errors (e.g., 'ML' as 'email'). Use judgment only when the meaning is obvious.\n"
        "- Ignore speaker labels like 'spk_0' or 'spk_1'. Focus on the actual content.\n"
        "- The summary should be in a formal tone, like an agent note, but only include facts stated by the candidate.\n"
        "- Format output exactly as: <summary>|||<Yes/No>|||<Yes/No>\n"
        "- Never include more than 3 fields. Do not add extra commentary or explanation."
    ),
    "examples": [
        {
            "question": (
                "Transcript:\n\"\"\"\nspk_0: Hi, welcome to the interview. Tell me about yourself.\n"
                "spk_1: Sure! I have 5 years of experience in backend development, mostly in Python and Java. I love building scalable APIs.\n"
                "spk_0: What kind of role are you interested in?\n"
                "spk_1: I’m looking for a senior backend engineer position.\n\"\"\"\n\n"
                "What are the required outputs?"
            ),
            "answer": (
                "The candidate has 5 years of experience in backend development using Python and Java, and is looking for a senior backend engineer position.|||Yes|||Yes"
            )
        },
        {
            "question": (
                "Transcript:\n\"\"\"\nspk_0: Can you walk me through your resume?\n"
                "spk_1: I’d prefer to do that once I know more about the role.\n\"\"\"\n\n"
                "What are the required outputs?"
            ),
            "answer": (
                "The candidate declined to discuss their background or experience until more information about the role is provided.|||No|||No"
            )
        },
        {
            "question": (
                "Transcript:\n\"\"\"\nspk_0: Tell me what you’re looking for.\n"
                "spk_1: I’m mostly looking for a product-related role.\n\"\"\"\n\n"
                "What are the required outputs?"
            ),
            "answer": (
                "The candidate stated they are looking for a product-related role.|||No|||Yes"
            )
        }
    ]
}



def process_transcript_row(transcript: str, service: str, model: str) -> Dict[str, Any]:
    """
    Process a single transcript row using AI inference.
    
    Args:
        transcript: Call transcript text
        service: AI service provider
        model: AI model identifier
        
    Returns:
        Dictionary containing summary, flags, and metadata
    """
    # Initialize AI inferencer with configuration
    inferencer = GatewayInferencer(
        api_key=os.getenv("API_KEY"),
        base_url=os.getenv("BASE_URL"),
        model_id=f"{service}/{model}",
        n_shot_prompt_guide_obj=prompt,
        n_shot_prompts=3
    )
    
    # Generate analysis from transcript
    metadata, answer = inferencer.generate_text(
        "analyze this document",
        context=[{"text": transcript if transcript else "Transcripts are not available for this call."}]
    )
    
    # Calculate cost metrics
    metadata_with_cost = calculate_price_of_model(model_id=model, region="us-east-1", metadata=metadata)
    
    # Parse structured response
    parts = answer.split('|||')
    
    return {
        'summary': parts[0].strip() if len(parts) > 0 else '',
        'didCustomerBriefHimself': parts[1].strip() if len(parts) > 1 else 'No',
        'didCustomerMentionedRole': parts[2].strip() if len(parts) > 2 else 'No',
        'metadata': metadata_with_cost
    }
