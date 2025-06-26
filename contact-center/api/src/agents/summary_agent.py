import os
from typing import Dict, Any
import pandas as pd
from dotenv import load_dotenv
from flotorch_core.inferencer.gateway_inferencer import GatewayInferencer
from src.utils.calculate_price import calculate_price_of_model
load_dotenv()


prompts = {
    "system_prompt": (
    "You are an assistant analyzing job interview call transcripts between recruiters and candidates.\n\n"
    "Your goal is to extract exactly three fields separated by '|||':\n"
    "1. A concise summary of conversation.\n"
    "2. 'Yes' or 'No' — Did the candidate describe their background, experience, or skills?\n"
    "3. 'Yes' or 'No' — Did the candidate specify the role or position they are looking for?\n\n"
    "Important Notes:\n"
    "- The transcripts may include speech-to-text errors (e.g., 'ML' transcribed as 'email', 'frontend' as 'front and'). Use your best judgment to interpret these.\n"
    "- Identify the candidate's speech by context — speaker labels may be unreliable.\n"
    "- Be forgiving of minor transcription errors but do not guess if intent is unclear.\n"
    "- Never assume details beyond what's clearly stated.\n"
    "- Format output exactly as: <summary>|||<Yes/No>|||<Yes/No>\n"
    "- Do not add any commentary or explanation.\n"
    "- Always return exactly 3 fields with 2 '|||' separators."
),
    "examples": [
        {
            "question": (
                "Transcript:\n\"\"\"\nspk_0: Hi, welcome to the interview. Tell me about yourself.\n"
                "spk_1: Sure! I have 5 years of experience in backend development, mostly in Python and Java. I love building scalable APIs.\n"
                "spk_0: What kind of role are you interested in?\n"
                "spk_1: I’m looking for a senior backend engineer position, preferably in a fast-paced tech company.\n\"\"\"\n\n"
                "What are the required outputs?"
            ),
            "answer": "5 years of backend development experience in Python and Java|||Yes|||Yes"
        },
        {
            "question": (
                "Transcript:\n\"\"\"\nspk_0: Can you walk me through your resume?\n"
                "spk_1: I’d prefer to do that once I know more about the role.\n\"\"\"\n\n"
                "What are the required outputs?"
            ),
            "answer": "Candidate withheld background until learning more about the role|||No|||No"
        },
        {
            "question": (
                "Transcript:\n\"\"\"\nspk_0: What are you looking for?\n"
                "spk_1: I’m hoping to work with a company that values AI research.\n"
                "spk_0: What's your experience like?\n"
                "spk_1: I’ve worked in software testing but recently completed a course in deep learning.\n\"\"\"\n\n"
                "What are the required outputs?"
            ),
            "answer": "Completed deep learning course with software testing background|||Yes|||Yes"
        }
    ]
}


def process_transcript_row(transcript: str, service: str, model: str) -> Dict[str, Any]:
    inferencer=GatewayInferencer(api_key=os.getenv("API_KEY"),base_url=os.getenv("BASE_URL"),model_id=f"{service}/{model}",n_shot_prompt_guide_obj=prompts,n_shot_prompts=3)
    metadata,answer=inferencer.generate_text("analyze this document",context=[{"text":transcript}])
    metadata_with_cost=calculate_price_of_model(model_id=model,region="us-east-1",metadata=metadata)
    
    parts = answer.split('|||')
    
    return {
        'summary': parts[0].strip() if len(parts) > 0 else '',
        'didCustomerBriefHimself': parts[1].strip() if len(parts) > 1 else 'No',
        'didCustomerMentionedRole': parts[2].strip() if len(parts) > 2 else 'No',
        'metadata': metadata_with_cost
    }

def generate_columns(df: pd.DataFrame, service: str, model: str) -> pd.DataFrame:
    results = df['conversation'].apply(lambda row: process_transcript_row(row, service, model))
    df=df.copy()
    
    df.loc[:,'summary'] = [r['summary'] for r in results]
    df.loc[:,'didCustomerBriefHimself'] = [r['didCustomerBriefHimself'] for r in results]
    df.loc[:,'didCustomerMentionedRole'] = [r['didCustomerMentionedRole'] for r in results]
    df.loc[:,'metadata'] = [r['metadata'] for r in results]

    return df
