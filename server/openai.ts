// Simulated OpenAI responses for development
export async function generateChatResponse(messages: Array<{ role: string, content: string }>) {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));

  const lastMessage = messages[messages.length - 1];
  const response = {
    message: "I am a simulated AI assistant. Here's what I found in the documentation:",
    context: `You asked: ${lastMessage.content}`,
    suggestions: [
      "Try using the LangChain integration",
      "Check out our Qdrant vector store setup",
      "Review the Dagster pipeline documentation"
    ],
    code_example: `
# Example RAG setup
from langchain import RAGChain
from qdrant import QdrantClient

client = QdrantClient()
rag_chain = RAGChain.from_components(
    retriever=client,
    prompt_template="Answer: {context}"
)
    `
  };

  return response;
}

export async function analyzeImage(base64Image: string): Promise<string> {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));

  return "This appears to be a technical diagram showing the RAGStack architecture. " +
    "I can see components for document processing, vector storage, and query handling. " +
    "The flow appears to demonstrate how documents are processed and stored for retrieval.";
}