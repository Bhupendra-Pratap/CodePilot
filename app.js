const path = require("path");
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const model = process.env.HF_MODEL || "meta-llama/Llama-3.1-8B-Instruct:novita";

if (!process.env.HF_TOKEN) {
  console.error("Missing HF_TOKEN. Add it to a .env file.");
  process.exit(1);
}

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/message", async (req, res) => {
  const prompt = req.body && typeof req.body.prompt === "string" ? req.body.prompt.trim() : "";

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const chatCompletion = await client.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
    });

    const reply =
      chatCompletion.choices?.[0]?.message?.content || "No response text returned.";
    return res.json({ reply });
  } catch (error) {
    console.error("Hugging Face request failed:", error.message);
    return res.status(500).json({ error: "Failed to get response from Hugging Face." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});