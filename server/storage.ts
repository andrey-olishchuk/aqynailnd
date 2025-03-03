import { ChatMessage, InsertChatMessage } from "@shared/schema";

export interface IStorage {
  getChatMessages(): Promise<ChatMessage[]>;
  addChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
}

export class MemStorage implements IStorage {
  private messages: ChatMessage[];
  private currentId: number;

  constructor() {
    this.messages = [];
    this.currentId = 1;
  }

  async getChatMessages(): Promise<ChatMessage[]> {
    return this.messages;
  }

  async addChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const newMessage: ChatMessage = {
      id: this.currentId++,
      timestamp: new Date(),
      ...message
    };
    this.messages.push(newMessage);
    return newMessage;
  }
}

export const storage = new MemStorage();
