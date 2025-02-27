import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Globe } from "lucide-react";
import { SiGithub, SiLinkedin, SiPython, SiMinio, SiDocker, SiKubernetes } from "react-icons/si";
import { CodeBlock } from "@/components/ui/code-block";
import WaveBackground from "@/components/WaveBackground";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Custom SVG icons for logos not available in react-icons
const LangFlowIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 transition-transform hover:scale-110">
    <path
      fill="currentColor"
      d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
      strokeWidth="2"
      stroke="currentColor"
      fillOpacity="0.2"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      d="M20 80 L80 20 M30 90 L90 30 M10 70 L70 10"
    />
  </svg>
);

const LangChainIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 transition-transform hover:scale-110">
    <path
      fill="currentColor"
      d="M20 20 L50 10 L80 20 L80 80 L50 90 L20 80 Z"
      strokeWidth="2"
      stroke="currentColor"
      fillOpacity="0.2"
    />
    <text
      x="50"
      y="60"
      fontSize="40"
      textAnchor="middle"
      fill="currentColor"
      fontFamily="Arial"
    >
      🦜
    </text>
  </svg>
);

const DagsterIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 transition-transform hover:scale-110">
    <circle
      cx="50"
      cy="50"
      r="40"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      fill="currentColor"
      d="M30 50 L70 50 M50 30 L50 70"
      strokeWidth="4"
      stroke="currentColor"
    />
  </svg>
);

const QdrantIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 transition-transform hover:scale-110">
    <g transform="translate(20, 20) scale(0.6)">
      {/* Front face */}
      <path
        fill="currentColor"
        fillOpacity="0.8"
        d="M50 20 L80 35 L80 65 L50 80 L20 65 L20 35 Z"
      />
      {/* Top edge */}
      <path
        fill="currentColor"
        fillOpacity="0.6"
        d="M50 20 L80 35 L65 45 L35 30 Z"
      />
      {/* Side edge */}
      <path
        fill="currentColor"
        fillOpacity="0.4"
        d="M80 35 L80 65 L65 75 L65 45 Z"
      />
    </g>
  </svg>
);


// Simulated chat messages
const INITIAL_MESSAGES = [
  {
    id: 1,
    role: "assistant",
    content: "Hello! I'm your AI assistant. How can I help you understand our framework?",
  },
];

// Updated FAQ_ITEMS with code examples
const FAQ_ITEMS = [
  {
    question: "What is RAG and how does it work?",
    answer: "RAG (Retrieval Augmented Generation) combines document retrieval with language model generation. It first retrieves relevant information from a knowledge base, then uses this context to generate accurate responses. Here's a basic example:",
    code: `// Initialize RAG components
const documentStore = new VectorStore();
const embeddings = new Embeddings();
const llm = new LanguageModel();

async function queryWithRAG(query: string) {
  // 1. Convert query to embedding
  const queryEmbedding = await embeddings.embed(query);

  // 2. Retrieve relevant documents
  const relevantDocs = await documentStore.search(queryEmbedding);

  // 3. Generate response using context
  const response = await llm.generate(query, relevantDocs);

  return response;
}`
  },
  {
    question: "What types of documents can be processed?",
    answer: "Our framework supports various document formats including PDF, DOCX, Markdown, and plain text files. We also support code snippets and technical documentation."
  },
  {
    question: "How is the data stored and secured?",
    answer: "Documents are processed and stored using industry-standard encryption. We use vector databases for efficient retrieval and support both cloud and on-premise deployments."
  },
  {
    question: "What language models are supported?",
    answer: "We support integration with major language models including GPT-4, Claude, and open-source models like Llama 2 and Mistral."
  },
  {
    question: "Can I customize the RAG pipeline?",
    answer: "Yes, our framework is highly customizable. You can modify document processing, embedding generation, and retrieval strategies."
  },
  {
    question: "What's the typical response time?",
    answer: "Response times typically range from 0.5-2 seconds, depending on document complexity and chosen language model."
  },
  {
    question: "How does context window management work?",
    answer: "We use dynamic context window management to optimize token usage while maintaining response quality."
  },
  {
    question: "Is there support for multiple languages?",
    answer: "Yes, our framework supports multilingual document processing and generation in over 100 languages."
  },
  {
    question: "What about API rate limiting and quotas?",
    answer: "We provide configurable rate limiting and usage monitoring to help manage API costs and quotas."
  },
  {
    question: "Can I deploy this in production?",
    answer: "Yes, our framework is production-ready with support for high availability, monitoring, and scaling."
  },
  {
    question: "How do I integrate Aqyn with my application?",
    answer: "Integration is straightforward with our SDK. Here's a quick example:",
    code: `import { AqynClient } from '@aqyn/sdk';

// Initialize the client
const aqyn = new AqynClient({
  apiKey: process.env.AQYN_API_KEY,
  embeddingModel: 'openai',
  storageType: 'local'
});

// Index your documents
await aqyn.addDocuments([
  { content: 'Your document text here', metadata: { source: 'docs' } }
]);

// Query the knowledge base
const response = await aqyn.query('How does feature X work?');`
  }
];

export default function Home() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const chatInputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: input,
    };

    const aiResponse = {
      id: messages.length + 2,
      role: "assistant",
      content: "This is a simulated response. In the actual implementation, this would be replaced with real AI responses based on the documentation.",
    };

    setMessages([...messages, userMessage, aiResponse]);
    setInput("");
  };

  const focusChat = () => {
    chatInputRef.current?.focus();
    chatInputRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[600px]">
        <WaveBackground />

        <div className="container mx-auto px-4 py-24 relative z-10">
          {/* Logo */}
          <div className="flex items-center justify-center mb-16">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <div className="size-8 rounded bg-primary"></div>
              Aqyn
            </div>
          </div>

          {/* Hero Content */}
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold tracking-tight mb-6">
              Build AI-powered Applications
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A framework for building self-hosted Retrieval-Augmented Generation (RAG) applications 
              with preconfigured, production-ready components based on Python LangFlow, LangChain, 
              Qdrant vector store, MinIO object storage, and Dagster data pipelines.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">View on GitHub</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start and Chat Sections in Two Columns */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Quick Start Column */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Quick Start</h2>
              <Card className="backdrop-blur-sm bg-card/50">
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">Get started with Aqyn in minutes:</p>
                  <CodeBlock
                    code={`# Clone the repository
git clone https://github.com/your-org/aqyn.git
cd aqyn

# Start all services
docker compose up -d`}
                    language="bash"
                  />
                </div>
              </Card>
            </div>

            {/* Chat Column */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Try it Now</h2>
              <Card className="backdrop-blur-sm bg-card/50">
                <div className="h-[500px] flex flex-col">
                  <ScrollArea className="flex-1 p-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`mb-4 ${
                          msg.role === "user" ? "text-right" : "text-left"
                        }`}
                      >
                        <div
                          className={`inline-block p-3 rounded-lg ${
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                  <form onSubmit={handleSubmit} className="p-4 border-t">
                    <div className="flex gap-2">
                      <Textarea
                        ref={chatInputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about the framework..."
                        className="min-h-[60px]"
                      />
                      <Button type="submit" className="self-end">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-card">
              <h3 className="text-xl font-semibold mb-3">AI-Powered Search</h3>
              <p className="text-muted-foreground">
                Intelligent search capabilities powered by state-of-the-art language models
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card">
              <h3 className="text-xl font-semibold mb-3">RAG Framework</h3>
              <p className="text-muted-foreground">
                Retrieval Augmented Generation for accurate and contextual responses
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card">
              <h3 className="text-xl font-semibold mb-3">Easy Integration</h3>
              <p className="text-muted-foreground">
                Simple APIs and SDKs for seamless integration with your existing stack
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Technical FAQ</h2>
          <div className="w-full">
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">{item.answer}</p>
                    {item.code && (
                      <CodeBlock
                        code={item.code}
                        language="typescript"
                        className="mt-4"
                      />
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Technology Stack</h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 place-items-center text-primary">
              <div className="flex flex-col items-center gap-3">
                <LangFlowIcon />
                <span>LangFlow</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <LangChainIcon />
                <span>LangChain</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <SiPython className="w-12 h-12 transition-transform hover:scale-110" />
                <span>Python</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <QdrantIcon />
                <span>Qdrant</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <DagsterIcon />
                <span>Dagster</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <SiMinio className="w-12 h-12 transition-transform hover:scale-110" />
                <span>MinIO</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <SiDocker className="w-12 h-12 transition-transform hover:scale-110" />
                <span>Docker</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <SiKubernetes className="w-12 h-12 transition-transform hover:scale-110" />
                <span>Kubernetes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Connect With Us</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            <a 
              href="https://github.com/vossmoos/aqynai" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg">
                <SiGithub className="mr-2 h-5 w-5" />
                GitHub
              </Button>
            </a>
            <a 
              href="https://www.linkedin.com/company/vossmoos" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg">
                <SiLinkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </Button>
            </a>
            <a 
              href="https://vossmoos.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg">
                <Globe className="mr-2 h-5 w-5" />
                VossMoos
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}