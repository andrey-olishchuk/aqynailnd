import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateChatResponse(messages: Array<{ role: string, content: string }>) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    throw new Error("Failed to generate response: " + error.message);
  }
}

export async function analyzeImage(base64Image: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Analyze this technical diagram or screenshot and explain its key components and purpose." },
          { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
        ],
      },
    ],
  });

  return response.choices[0].message.content;
}
