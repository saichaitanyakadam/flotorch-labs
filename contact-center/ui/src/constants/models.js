export const models= [
    {"label": "OpenAI/o3-mini", "value": "o3-mini", "service": "openai"},
    {"label": "OpenAI/gpt-4-turbo", "value": "gpt-4-turbo", "service": "openai"},
    {"label": "OpenAI/gpt-4.1", "value": "gpt-4.1", "service": "openai"},
    {"label": "OpenAI/gpt-4.1-mini", "value": "gpt-4.1-mini", "service": "openai"},
    {"label": "OpenAI/gpt-4.1-nano", "value": "gpt-4.1-nano", "service": "openai"},
    {"label": "OpenAI/gpt-4o", "value": "gpt-4o", "service": "openai"},
    {"label": "OpenAI/gpt-4o-mini", "value": "gpt-4o-mini", "service": "openai"},
    {"label": "OpenAI/gpt-3.5-turbo", "value": "gpt-3.5-turbo", "service": "openai"},
    {"label": "OpenAI/gpt-3.5-turbo-16k", "value": "gpt-3.5-turbo-16k", "service": "openai"},
    {"label": "OpenAI/gpt-3.5-turbo-instruct", "value": "gpt-3.5-turbo-instruct", "service": "openai"},

    {"label": "Amazon/amazon.titan-text-lite-v1", "value": "amazon.titan-text-lite-v1", "service": "bedrock"},
    {"label": "Amazon/amazon.titan-text-express-v1", "value": "amazon.titan-text-express-v1", "service": "bedrock"},
    {"label": "Amazon/amazon.nova-lite-v1:0", "value": "us.amazon.nova-lite-v1:0", "service": "bedrock"},
    {"label": "Amazon/amazon.nova-micro-v1:0", "value": "us.amazon.nova-micro-v1:0", "service": "bedrock"},
    {"label": "Amazon/amazon.nova-pro-v1:0", "value": "us.amazon.nova-pro-v1:0", "service": "bedrock"},

    {"label": "Anthropic/anthropic.claude-3-5-sonnet-20241022-v2:0", "value": "us.anthropic.claude-3-5-sonnet-20241022-v2:0", "service": "bedrock"},
    {"label": "Anthropic/anthropic.claude-3-5-sonnet-20240620-v1:0", "value": "anthropic.claude-3-5-sonnet-20240620-v1:0", "service": "bedrock"},
    {"label": "Anthropic/us.anthropic.claude-3-5-haiku-20241022-v1:0", "value": "us.anthropic.claude-3-5-haiku-20241022-v1:0", "service": "bedrock"},
    {"label": "Anthropic/us.anthropic.claude-3-7-sonnet-20250219-v1:0", "value": "us.anthropic.claude-3-7-sonnet-20250219-v1:0", "service": "bedrock"},

    {"label": "Cohere/cohere.command-r-plus-v1:0", "value": "cohere.command-r-plus-v1:0", "service": "bedrock"},
    {"label": "Cohere/cohere.command-r-v1:0", "value": "cohere.command-r-v1:0", "service": "bedrock"},

    {"label": "Meta/meta.llama3-2-1b-instruct-v1:0", "value": "us.meta.llama3-2-1b-instruct-v1:0", "service": "bedrock"},
    {"label": "Meta/meta.llama3-2-3b-instruct-v1:0", "value": "us.meta.llama3-2-3b-instruct-v1:0", "service": "bedrock"},
    {"label": "Meta/meta.llama3-2-11b-instruct-v1:0", "value": "us.meta.llama3-2-11b-instruct-v1:0", "service": "bedrock"},
    {"label": "Meta/meta.llama3-2-90b-instruct-v1:0", "value": "us.meta.llama3-2-90b-instruct-v1:0", "service": "bedrock"},

    {"label": "Mistral AI/mistral.mistral-7b-instruct-v0:2", "value": "mistral.mistral-7b-instruct-v0:2", "service": "bedrock"},
    {"label": "Mistral AI/mistral.mistral-large-2402-v1:0", "value": "mistral.mistral-large-2402-v1:0", "service": "bedrock"},

    {"label": "Groq/gemma2-9b-it", "value": "gemma2-9b-it", "service": "groq"},
    {"label": "Groq/llama-3.3-70b-versatile", "value": "llama-3.3-70b-versatile", "service": "groq"},
    {"label": "Groq/llama-3.1-70b-versatile", "value": "llama-3.1-70b-versatile", "service": "groq"},
    {"label": "Groq/llama-3.1-8b-instant", "value": "llama-3.1-8b-instant", "service": "groq"},
    {"label": "Groq/llama3-70b-8192", "value": "llama3-70b-8192", "service": "groq"},
    {"label": "Groq/llama3-8b-8192", "value": "llama3-8b-8192", "service": "groq"},
    {"label": "Groq/llama-4-Scout-17B-16E-Instruct", "value": "llama-4-Scout-17B-16E-Instruct", "service": "groq"},
    {"label": "Groq/meta-llama/llama-4-maverick-17b-128e-instruct", "value": "meta-llama/llama-4-maverick-17b-128e-instruct", "service": "groq"},

    {"label": "DeepSeek/deepseek-chat", "value": "deepseek-chat", "service": "deepseek"},
    {"label": "DeepSeek/deepseek-ai/DeepSeek-R1", "value": "us.deepseek.r1-v1:0", "service": "bedrock"},

    {"label": "Google/gemini-2.0-flash", "value": "gemini-2.0-flash", "service": "openai-compatible"},
    {"label": "Google/gemini-2.0-flash-lite", "value": "gemini-2.0-flash-lite", "service": "openai-compatible"},
    {"label": "Google/gemini-1.5-flash", "value": "gemini-1.5-flash", "service": "openai-compatible"},
    {"label": "Google/gemini-1.5-flash-8b", "value": "gemini-1.5-flash-8b", "service": "openai-compatible"},
    {"label": "Google/gemini-2.5-pro-preview-05-06", "value": "gemini-2.5-pro-preview-05-06", "service": "openai-compatible"},
    {"label": "Google/gemini-2.5-flash-preview-05-20", "value": "gemini-2.5-flash-preview-05-20", "service": "openai-compatible"},
    {"label": "Google/gemini-1.5-pro", "value": "gemini-1.5-pro", "service": "openai-compatible"}
];
