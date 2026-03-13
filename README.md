# CodePilot Assistant

CodePilot Assistant is a simple full-stack chat app for coding help, connected to a Hugging Face-hosted Llama model through the OpenAI-compatible API.

## Live Demo

https://code-pilot-virid.vercel.app/

## Features

- Chat-style coding assistant UI
- Express backend API endpoint at `/api/message`
- Hugging Face Router integration using OpenAI SDK
- Configurable model via environment variables

## Tech Stack

- Node.js
- Express
- OpenAI Node SDK (with Hugging Face Router base URL)
- Vanilla HTML/CSS/JS frontend

## Project Structure

```
.
|-- app.js
|-- package.json
|-- public/
|   |-- index.html
|   |-- script.js
|   `-- styles.css
`-- .env.example
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example` and set your Hugging Face token:

```env
HF_TOKEN=your_hugging_face_token_here
HF_MODEL=meta-llama/Llama-3.1-8B-Instruct:novita
PORT=3000
```

3. Start the server:

```bash
npm start
```

4. Open in browser:

http://localhost:3000

## API

### POST `/api/message`

Request body:

```json
{
  "prompt": "Explain quicksort in simple terms"
}
```

Response body:

```json
{
  "reply": "..."
}
```

## Notes

- Do not commit `.env` (already ignored in `.gitignore`).
- Keep `.env.example` committed so others know required variables.
