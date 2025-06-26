from typing import Dict, Any

def calculate_price_of_model(model_id: str, region: str, metadata: Dict[str, Any]) -> Dict[str, Any]:
    import pandas as pd

    df = pd.read_csv("src/docs/bedrock_limits_small.csv")

    # Filter once and reuse
    filtered_df = df[(df['model'] == model_id) & (df['Region'] == region)]

    if filtered_df.empty:
        return {
            **metadata,
            "input_tokens_cost": 0.0,
            "output_tokens_cost": 0.0,
            "cost_for_million_such_questions": 0.0,
            "error": f"No pricing info found for model '{model_id}' in region '{region}'"
        }

    model_input_price = float(filtered_df['input_price'].values[0])
    model_output_price = float(filtered_df['output_price'].values[0])

    input_tokens = float(metadata.get("inputTokens", 0))
    output_tokens = float(metadata.get("outputTokens", 0))

    input_tokens_cost = round((model_input_price * input_tokens) / 1_000_000, 6)
    output_tokens_cost = round((model_output_price * output_tokens) / 1_000_000, 6)

    extended_metadata = {
        **metadata,
        "inputTokensCost": input_tokens_cost,
        "outputTokensCost": output_tokens_cost,
        "costForMillionSuchQuestions": round(
            1_000_000 * (input_tokens_cost + output_tokens_cost), 4
        )
    }

    return extended_metadata