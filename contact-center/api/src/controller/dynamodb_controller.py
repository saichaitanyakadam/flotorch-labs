import os
import boto3
import re
import pandas as pd
from datetime import datetime
from typing import Dict, Optional, Any, List
from dotenv import load_dotenv
from src.agents.summary_agent import process_transcript_row

load_dotenv()


def initialize_dynamo_db():
    """Initialize DynamoDB table connection."""
    dynamodb = boto3.resource('dynamodb', "us-west-2")
    return dynamodb.Table(os.getenv("TABLE_NAME"))

def parse_call_timestamp(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Parse call timestamp string into datetime object.

    Args:
        data: Dictionary containing callTimestamp field

    Returns:
        Updated data dictionary with parsed timestamp
    """
    # Remove timezone info in parentheses
    cleaned_str = re.split(r" \(", data['callTimestamp'])[0]

    try:
        dt = datetime.strptime(cleaned_str, "%a %b %d %Y %H:%M:%S GMT%z")
        data['callTimestamp'] = dt
    except ValueError as e:
        raise ValueError(f"Timestamp format mismatch: {e}")

    return data


def get_analysis(data: List[Dict[str, Any]]) -> Dict[str, int]:
    """
    Calculate analysis metrics from call data.
    
    Args:
        data: List of call records
        
    Returns:
        Analysis metrics with call counts
    """
    target_date = datetime.now().date()
    calls_per_day = len([row for row in data 
                        if datetime.strptime(row['callDate'], "%m/%d/%Y").date() == target_date])
    
    return {
        "todaysCalls": calls_per_day,
        "totalCustomers": len(data)
    }


def fetch_data_from_dynamodb() -> Optional[Dict[str, Any]]:
    """
    Fetch and process contact center data from DynamoDB.
        
    Returns:
        Processed data with table records and analysis metrics
    """
    table = initialize_dynamo_db()
    
    # Fetch all items with pagination
    response = table.scan()
    items = response['Items']
    
    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        items.extend(response['Items'])
    
    if not items:
        return None
        
    # Process timestamps
    df = pd.DataFrame(items)
    df['callTimestamp'] = df['callTimestamp'].str.extract(r'^(.*?GMT[+-]\d{4})')[0]
    df['callTimestamp'] = pd.to_datetime(df['callTimestamp'], format="%a %b %d %Y %H:%M:%S GMT%z")
    df_sorted = df.sort_values(by='callTimestamp', ascending=False)
    
    analysis = get_analysis(items)
    return {"tableData": df_sorted.to_dict(orient="records"), "analysisData": analysis}

def get_summary_for_call_log(id: str, service: str, model: str) -> Dict[str, Any]:
    """
    Get summary analysis for a specific call log.
    
    Args:
        id: Contact ID to retrieve
        service: AI service provider
        model: AI model identifier
        
    Returns:
        Combined call data with summary analysis
    """
    table = initialize_dynamo_db()
    response = table.get_item(Key={"contactId": id})
    data = response.get("Item")
    
    summary_data = process_transcript_row(data['conversation'], service, model)
    updated_timestamp_data = parse_call_timestamp(data)
    
    return {**updated_timestamp_data, **summary_data}

