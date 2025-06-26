import os
import boto3
import pandas as pd
from typing import Dict, Optional, Any
from dotenv import load_dotenv
from src.agents.summary_agent import generate_columns

load_dotenv()


def get_analysis(df: pd.DataFrame) -> Dict[str, int]:
    """
    Calculate analysis metrics from processed transcript data.
    
    Args:
        df (pd.DataFrame): DataFrame containing processed transcript data
        
    Returns:
        Dict[str, int]: Analysis metrics including customer counts and totals
    """
    customers_mentioned_positions = df[df['didCustomerMentionedRole'] == 'Yes'].shape[0]
    customers_briefed_themselves = df[df['didCustomerBriefHimself'] == 'Yes'].shape[0]
    total_customers = df.shape[0]
    
    return {
        "no_of_customers_mentioned_positions": customers_mentioned_positions,
        "no_of_customers_brief_theirself": customers_briefed_themselves,
        "total_customers": total_customers,
    }


def fetch_data_from_dynamodb(service: str, model: str) -> Optional[Dict[str, Any]]:
    """
    Fetch and process contact center data from DynamoDB.
    
    Args:
        service (str): AI service provider to use for processing
        model (str): AI model to use for processing
        
    Returns:
        Optional[Dict[str, Any]]: Processed data with summary, metadata, and analysis
    """
    # Initialize DynamoDB connection
    dynamodb = boto3.resource('dynamodb', "us-west-2")
    table = dynamodb.Table(os.getenv("TABLE_NAME"))
    
    # Fetch all items with pagination handling
    response = table.scan()
    items = response['Items']
    
    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        items.extend(response['Items'])
    
    if not items:
        return None
        
    # Process data
    data_frame = pd.DataFrame(items)
    required_columns = ["contactId", "customerPhoneNumber", "callDate", 
                       "callTimestamp", "conversation", "contactTranscriptFromCustomer"]
    data_subset = data_frame[required_columns]
    
    # Generate AI-powered summaries and analysis
    summary_data = generate_columns(data_subset, service, model)
    analysis = get_analysis(summary_data)
    
    # Convert to records with metadata included in each record
    records = summary_data.to_dict(orient="records")
    
    return {
        "summary_data": records,
        "analysis": analysis
    }