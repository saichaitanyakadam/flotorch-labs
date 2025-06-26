# Contact Center Analytics Application

A comprehensive contact center analytics platform that processes customer transcripts using AI to extract insights and generate performance metrics.

## Features

- **AI-Powered Transcript Analysis**: Automatically analyzes customer conversations to extract summaries and insights
- **Real-time Dashboard**: Interactive Streamlit dashboard for visualizing contact center metrics
- **Cost Tracking**: Monitors AI model usage costs and provides pricing insights
- **DynamoDB Integration**: Seamlessly connects to AWS DynamoDB for data storage and retrieval
- **Multi-Model Support**: Supports various AI models (OpenAI GPT-4, etc.) for transcript processing

## Architecture

- **Frontend**: Streamlit web application
- **Backend**: FastAPI REST API
- **Database**: AWS DynamoDB
- **AI Processing**: Flotorch Core with Gateway Inferencer
- **Deployment**: Python-based microservices

## Quick Start

### Prerequisites

- Python 3.8+
- AWS Account with DynamoDB access
- API keys for AI services

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

### Running the Application

1. Start the API server:
   ```bash
   cd api
   uvicorn src.api:app --host 0.0.0.0 --port 8003
   ```

2. Launch the Streamlit dashboard:
   ```bash
   streamlit run main.py
   ```

## Environment Variables

```
API_KEY=your_ai_api_key
BASE_URL=your_ai_base_url
TABLE_NAME=your_dynamodb_table_name
```

## API Endpoints

- `GET /` - Retrieve processed contact center data with analysis

## Project Structure

```
├── api/
│   └── src/
│       ├── agents/          # AI processing agents
│       ├── controller/      # Data handlers
│       ├── utils/          # Utility functions
│       └── api.py          # FastAPI application
├── main.py                 # Streamlit application
└── requirements.txt        # Dependencies
```

