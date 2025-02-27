import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { generateChatResponse, analyzeImage } from "./openai";
import { insertChatMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.get("/api/chat", async (_req, res) => {
    const messages = await storage.getChatMessages();
    res.json(messages);
  });

  app.post("/api/chat", async (req, res) => {
    const validation = insertChatMessageSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error });
    }

    const newMessage = await storage.addChatMessage(validation.data);

    const messages = await storage.getChatMessages();
    const aiResponse = await generateChatResponse(
      messages.map(m => ({ role: m.role, content: m.content }))
    );

    const aiMessage = await storage.addChatMessage({
      role: "assistant",
      content: JSON.stringify(aiResponse),
      metadata: {
        type: "simulated_response",
        timestamp: new Date().toISOString()
      }
    });

    res.json({ userMessage: newMessage, aiMessage });
  });

  app.post("/api/analyze-image", async (req, res) => {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: "Image data required" });
    }

    const analysis = await analyzeImage(image);
    res.json({ analysis });
  });

  const httpServer = createServer(app);
  return httpServer;
}