
import axios from 'axios';

const LANGFLOW_API_URL = "https://rag.aqyn.tech/api/v1/run/288955b1-06e0-4abe-a127-07402b078108?stream=false";
// Using the provided API key directly for testing
const LANGFLOW_API_KEY = "s47ac10b-58c0-4372-a567-0s02b2c3d422";
console.log("API Key length:", LANGFLOW_API_KEY.length);
console.log("API Key value:", LANGFLOW_API_KEY);

// Connect to the Langflow RAG backend
export async function generateChatResponse(messages: Array<{ role: string, content: string }>) {
  try {
    const lastMessage = messages[messages.length - 1];
    
    console.log("Sending request with API key:", LANGFLOW_API_KEY);
    const response = await axios.post(
      LANGFLOW_API_URL,
      {
        input_value: lastMessage.content,
        output_type: "chat",
        input_type: "chat",
        tweaks: {
          "OpenAIEmbeddings-Zv16Z": {},
          "QdrantVectorStoreComponent-2sWo4": {},
          "ParseData-2yCzQ": {},
          "OpenAIModel-YykcL": {},
          "Prompt (NLaI9)-5Fbbo": {},
          "ChatOutput-XyiQD": {},
          "ChatInput-DXe0c": {}
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': LANGFLOW_API_KEY
        }
      }
    );

    // Extract the response from Langflow
    return {
      message: response.data.result || "I couldn't find information about that in my knowledge base.",
      context: `You asked: ${lastMessage.content}`,
      suggestions: [
        "Tell me more about Aqyn's features",
        "How does RAG work in Aqyn?",
        "What integrations does Aqyn support?"
      ]
    };
  } catch (error) {
    console.error("Error connecting to Langflow:", error);
    return {
      message: "I'm sorry, I encountered an error while processing your request. Please try again later.",
      context: "Error connecting to knowledge base",
      suggestions: ["Try a simpler question", "Check documentation manually"]
    };
  }
}

export async function analyzeImage(base64Image: string): Promise<string> {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));

  return "This appears to be a technical diagram showing the RAGStack architecture. " +
    "I can see components for document processing, vector storage, and query handling. " +
    "The flow appears to demonstrate how documents are processed and stored for retrieval.";
}
