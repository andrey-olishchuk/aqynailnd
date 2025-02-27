import { Card } from "@/components/ui/card";

const sections = [
  {
    title: "Getting Started",
    content: `
# Quick Start

\`\`\`bash
# Clone the repository
git clone https://github.com/vossmoos/aqynai.git
cd aqynai/docker

# Start all services
docker compose up -d
\`\`\`

# Installation

For manual installation:

\`\`\`bash
npm install ragstack
\`\`\`

# Configuration

Essential environment variables:
- OPENAI_API_KEY
- QDRANT_URL
- LANGFLOW_API_KEY
    `
  },
  {
    title: "Advanced Topics",
    content: `
# Custom Embeddings

Learn how to create and use custom embeddings for your specific use case.

# Vector Store Configuration

Detailed guide on configuring and optimizing your vector store.

# Performance Optimization

Tips and best practices for production deployments.
    `
  }
];

export default function Documentation() {
  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-8">Documentation</h1>
      <div className="grid gap-8">
        {sections.map((section) => (
          <Card key={section.title} className="p-6">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <div className="prose prose-invert">
              <pre>{section.content}</pre>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}