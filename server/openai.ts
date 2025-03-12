
import axios from 'axios';

const LANGFLOW_API_URL = "https://rag.aqyn.tech/api/v1/run/288955b1-06e0-4abe-a127-07402b078108?stream=false";
// Get API key from environment variable or use the new key
const LANGFLOW_API_KEY = process.env.LANGFLOW_API_KEY || "";
console.log("API Key available:", LANGFLOW_API_KEY ? "Yes" : "No");

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

    // Log the full response for debugging
    console.log("Langflow API response:", JSON.stringify(response.data, null, 2));
    
    // Extract the response from Langflow - based on the actual response structure
    let result = null;
    
    // Try to extract from the correct path based on the logs
    if (response.data?.outputs && 
        response.data.outputs[0]?.outputs && 
        response.data.outputs[0].outputs[0]?.artifacts?.message) {
      result = response.data.outputs[0].outputs[0].artifacts.message;
    }
    
    return {
      message: result 
        ? result 
        : "I couldn't find information about that in my knowledge base. (Response format may be unexpected)",
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
