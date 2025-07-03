from typing import Dict, Any
import pandas as pd


def calculate_price_of_model(model_id: str, region: str, metadata: Dict[str, Any]) -> Dict[str, Any]:
    """
    Calculate token costs for AI model usage.
    
    Args:
        model_id: AI model identifier
        region: AWS region
        metadata: Usage metadata with token counts
        
    Returns:
        Extended metadata with cost calculations
    """
    df = pd.read_csv("src/docs/bedrock_limits_small.csv")
    filtered_df = df[(df['model'] == model_id) & (df['Region'] == region)]

    if filtered_df.empty:
        return {
            **metadata,
            "inputTokensCost": 0.0,
            "outputTokensCost": 0.0,
            "costForMillionSuchQuestions": 0.0,
            "error": f"No pricing info found for model '{model_id}' in region '{region}'"
        }

    # Get pricing rates
    model_input_price = float(filtered_df['input_price'].values[0])
    model_output_price = float(filtered_df['output_price'].values[0])

    # Calculate costs
    input_tokens = float(metadata.get("inputTokens", 0))
    output_tokens = float(metadata.get("outputTokens", 0))
    
    input_tokens_cost = round((model_input_price * input_tokens) / 1_000_000, 6)
    output_tokens_cost = round((model_output_price * output_tokens) / 1_000_000, 6)

    return {
        **metadata,
        "inputTokensCost": input_tokens_cost,
        "outputTokensCost": output_tokens_cost,
        "costForMillionSuchQuestions": round(
            1_000_000 * (input_tokens_cost + output_tokens_cost), 4
        )
    }