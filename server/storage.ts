
interface ChatMessage {
  id?: number;
  role: string;
  content: string;
  metadata?: Record<string, any>;
  timestamp?: string;
}

class InMemoryStorage {
  private messages: ChatMessage[] = [];
  private nextId = 1;

  async getChatMessages(): Promise<ChatMessage[]> {
    return [...this.messages];
  }

  async addChatMessage(message: ChatMessage): Promise<ChatMessage> {
    const newMessage = {
      ...message,
      id: this.nextId++,
      timestamp: message.timestamp || new Date().toISOString()
    };
    this.messages.push(newMessage);
    return newMessage;
  }
}

export const storage = new InMemoryStorage();
