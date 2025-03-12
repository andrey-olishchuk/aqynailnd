
import { z } from "zod";

export const insertChatMessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
  metadata: z.record(z.any()).optional()
});

export type ChatMessage = z.infer<typeof insertChatMessageSchema> & {
  id?: number;
  timestamp?: string;
};
