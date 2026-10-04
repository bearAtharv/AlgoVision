import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(join(__dirname, '.')));

app.post("/analyze", async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ summary: "Please enter some code first." });
  }

  const prompt = `Summarize the following code in short, concise Markdown format and if asked for code write the code, explain and define the topic in brief and explain as well in simple english language.:

${code}`;
  const ollamaApiUrl = "http://localhost:11434/api/generate";
  const modelName = "tinyllama:1.1b";

  try {
    const ollamaResponse = await fetch(ollamaApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelName,
        prompt: prompt,
        stream: false, // We want the full response at once
      }),
    });

    if (!ollamaResponse.ok) {
      const errorText = await ollamaResponse.text();
      console.error(`Ollama API error: ${ollamaResponse.status} - ${errorText}`);
      return res.status(ollamaResponse.status).json({ summary: `Failed to get explanation from Ollama. Status: ${ollamaResponse.status}, Error: ${errorText}` });
    }

    const data = await ollamaResponse.json();
    if (data && data.response) {
      res.json({ summary: data.response.trim() });
    } else {
      console.error("Ollama API response missing 'response' field:", data);
      res.status(500).json({ summary: "Ollama returned an unexpected response format." });
    }
  } catch (error) {
    console.error("Error communicating with Ollama API:", error);
    let errorMessage = "Could not connect to Ollama. Please ensure Ollama is running and the model is downloaded.";
    if (error.cause && error.cause.code === 'ECONNREFUSED') {
        errorMessage = "Connection to Ollama API refused. Is Ollama running on http://localhost:11434?";
    }
    res.status(500).json({ summary: errorMessage });
  }
});

app.listen(3000, () => console.log("LLM summary server running on port 3000"));
