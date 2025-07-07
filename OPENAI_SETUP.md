# 🤖 OpenAI API Setup Guide

## Overview

The narration feature can optionally use OpenAI's API to generate dynamic, AI-powered commentary. If the OpenAI API is not available, it falls back to local narration with predefined Spanish slang.

## 🚀 Quick Setup

### 1. Set Environment Variable

Create a `.env` file in the `frontend/` directory:

```bash
cd frontend
cp env.example .env
```

Edit the `.env` file to point to your local OpenAI API endpoint:

```env
VITE_OPENAI_API_URL=http://localhost:1234/v1/chat/completions
```

### 2. Common Local OpenAI Endpoints

Depending on your setup, you might use:

- **Ollama**: `http://localhost:11434/v1/chat/completions`
- **LM Studio**: `http://localhost:1234/v1/chat/completions`
- **LocalAI**: `http://localhost:8080/v1/chat/completions`
- **Custom**: `http://localhost:YOUR_PORT/v1/chat/completions`

### 3. Test the Integration

1. Start your local OpenAI API server
2. Start the frontend: `npm run dev`
3. Enable narration using the toggle in the header
4. Cast some votes to see AI-generated narration

## 🔧 How It Works

### Fallback Behavior

If the OpenAI API is unavailable:
- ✅ Falls back to local narration with Spanish slang
- ✅ No errors or broken functionality
- ✅ Still provides engaging commentary

### AI Narration Features

- **Dynamic Content**: AI generates unique commentary for each score
- **Spanish Slang**: Incorporates Spanish expressions for authenticity
- **Context-Aware**: Considers current score and voting percentages
- **Engaging Style**: Lively sports commentator tone

### Example AI Prompts

The system sends prompts like:
```
Generate a lively narration for the current score: Barcelona 15 - Real Madrid 8. Include some Spanish slang for flavor.
```

## 🛠️ Troubleshooting

### API Not Responding
- Check if your local OpenAI server is running
- Verify the endpoint URL in `.env`
- Check browser console for error messages
- The app will automatically fall back to local narration

### CORS Issues
If you get CORS errors, ensure your local OpenAI server allows requests from your frontend domain.

### Performance
- AI narration takes a moment to generate
- Loading indicator shows while generating
- Subsequent votes use cached responses when possible

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_OPENAI_API_URL` | OpenAI API endpoint | `http://localhost:1234/v1/chat/completions` |

## 🎯 Features

- ✅ **Toggle Control**: Enable/disable narration in the header
- ✅ **Real-time Updates**: Narration updates with each vote
- ✅ **Text-to-Speech**: Audible announcements
- ✅ **Visual Feedback**: Loading and speaking indicators
- ✅ **Graceful Fallback**: Works without OpenAI API
- ✅ **Spanish Flavor**: Incorporates Spanish slang and expressions 