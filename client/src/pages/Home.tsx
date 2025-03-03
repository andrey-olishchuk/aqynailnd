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
    answer: "RAG (Retrieval Augmented Generation) enhances LLM responses by retrieving relevant context from your knowledge base. While LLMs excel at general knowledge, they lack understanding of your company's specific context, internal documentation, and proprietary information. RAG bridges this gap by automatically retrieving and injecting relevant internal context into the LLM's prompt, enabling accurate responses about your specific use cases, products, and documentation.",
  },
  {
    question: "Which data could be used as a knowledge base?",
    answer: "Aqyn supports a wide range of knowledge sources including technical documentation, code repositories, API specs, architectural diagrams, and internal wikis. Our document processors handle PDF, Markdown, HTML, JSON, YAML, and various programming language files with proper syntax parsing.",
  },
  {
    question: "How to integrate Aqyn to a website?",
    answer: "Integration is straightforward via our REST API or TypeScript/Python SDKs. The framework can be deployed as a microservice in your infrastructure.",
    code: `<!-- Add Aqyn Chat to your website -->
<div id="aqyn-chat">
  <textarea id="aqyn-input" placeholder="Ask a question..."></textarea>
  <button id="aqyn-send">Send</button>
</div>

<script src="https://snippet.aqyn.tech/v1/chat.js"></script>
<script>
  const aqynChat = new AqynChat({
    apiKey: 'YOUR_API_KEY',
    element: '#aqyn-chat',
    theme: 'light', // or 'dark'
    placeholder: 'Ask about our documentation...'
  });
</script>`
  },
  {
    question: "How to customize Aqyn pipelines?",
    answer: "Aqyn leverages Dagster for building data processing pipelines. Here's a basic example of a pipeline that loads an HTML file and removes email addresses from its content - demonstrating how you can process your documents before generating embeddings:",
    code: `from dagster import op, job
import re

@op
def load_html_file() -> str:
    """Loads content from example.html file"""
    with open("example.html", "r") as file:
        return file.read()

@op
def remove_emails(html_content: str) -> str:
    """Removes email addresses from the HTML content"""
    # Regular expression pattern for matching email addresses
    email_pattern = r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}'
    # Replace all email matches with empty string
    cleaned_content = re.sub(email_pattern, '', html_content)
    return cleaned_content

@job
def html_email_removal_pipeline():
    """Pipeline that loads HTML and removes emails"""
    html_content = load_html_file()
    cleaned_content = remove_emails(html_content)`,
  },
  {
    question: "Does it support multilanguage?",
    answer: "Yes, Aqyn supports multilingual processing and generation. The language support is inherited from the underlying LLM, with OpenAI models providing excellent multilingual capabilities. Document processing maintains language-specific features and metadata.",
  },
  {
    question: "Which LLM models are compatible?",
    answer: "Currently, Aqyn works with OpenAI's models (GPT-3.5, GPT-4) for both chat completion and embeddings. Our roadmap includes support for custom LLMs and embedding models in upcoming versions, enabling full model customization and local deployment options.",
  },
  {
    question: "Is data enclosed in custom infrastructure when installed on-prem?",
    answer: "In the current version, while document storage and vector embeddings are fully contained within your infrastructure using Qdrant and MinIO, LLM queries still rely on OpenAI's API. Our roadmap prioritizes complete data sovereignty with upcoming support for on-premise LLMs and embedding models, enabling fully isolated knowledge bases within your security perimeter.",
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
              <Button size="lg" onClick={() => focusChat()}>Ask Aqyn</Button>
              <a 
                href="https://github.com/vossmoos/aqynai" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline">View on GitHub</Button>
              </a>
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
git clone https://github.com/vossmoos/aqynai.git
cd aqyn/docker

# Start all services
docker compose up -d`}
                    language="bash"
                  />
                </div>
              </Card>
            </div>

            {/* Chat Column */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Ask About Aqyn</h2>
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
                        placeholder="Ask anything about the framework..."
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
              <h3 className="text-xl font-semibold mb-3">Automated Data Loaders</h3>
              <p className="text-muted-foreground">
                Seamlessly process and ingest data using LangChain's extensive collection of data loaders, supporting document types from PDFs to specialized formats with built-in parsing capabilities
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card">
              <h3 className="text-xl font-semibold mb-3">Visual Pipeline Editor</h3>
              <p className="text-muted-foreground">
                Intuitive visual interface for building and customizing RAG pipelines
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card">
              <h3 className="text-xl font-semibold mb-3">Python Extensibility</h3>
              <p className="text-muted-foreground">
                Extend and customize pipelines with your own Python components
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
                        language={item.question === "How to integrate Aqyn to a website?" ? "html" : "python"}
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