import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { SiGithub, SiDiscord, SiYoutube, SiTypescript, SiReact, SiTailwindcss, SiOpenai } from "react-icons/si";
import { CodeBlock } from "@/components/ui/code-block";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      {/* Hero Section with Graphical Elements */}
      <div className="relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <section className="container pt-8 pb-16">
          {/* Logo with margin */}
          <div className="flex items-center mb-16 px-4">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <div className="size-8 rounded bg-primary"></div>
              Aqyn
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto relative">
            <h1 className="text-5xl font-bold tracking-tight mb-6">
              Build AI-powered Applications
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A battle-tested set of components to deploy your own RAG-powered knowledge base in minutes. 
              Secure, scalable, and ready for production use.
              Install your own Aqyn instance today.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={focusChat}>Ask our Aqyn</Button>
              <Button size="lg" variant="outline">
                View on GitHub
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Chat Section */}
      <section className="container py-16">
        <Card className="max-w-2xl mx-auto backdrop-blur-sm bg-card/50">
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
      </section>

      {/* Feature Cards */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 backdrop-blur-sm bg-card/50">
            <h3 className="text-xl font-semibold mb-3">AI-Powered Search</h3>
            <p className="text-muted-foreground">
              Intelligent search capabilities powered by state-of-the-art language models
            </p>
          </Card>
          <Card className="p-6 backdrop-blur-sm bg-card/50">
            <h3 className="text-xl font-semibold mb-3">RAG Framework</h3>
            <p className="text-muted-foreground">
              Retrieval Augmented Generation for accurate and contextual responses
            </p>
          </Card>
          <Card className="p-6 backdrop-blur-sm bg-card/50">
            <h3 className="text-xl font-semibold mb-3">Easy Integration</h3>
            <p className="text-muted-foreground">
              Simple APIs and SDKs for seamless integration with your existing stack
            </p>
          </Card>
        </div>
      </section>

      {/* Technical FAQ Section */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Technical FAQ</h2>
        <div className="max-w-3xl mx-auto">
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
      </section>

      {/* Technology Stack Section */}
      <section className="container py-16 bg-muted/30">
        <h2 className="text-3xl font-bold text-center mb-12">Technology Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto text-primary">
          <div className="flex flex-col items-center gap-2">
            <SiTypescript className="w-12 h-12" />
            <span>TypeScript</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <SiReact className="w-12 h-12" />
            <span>React</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <SiTailwindcss className="w-12 h-12" />
            <span>Tailwind</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <SiOpenai className="w-12 h-12" />
            <span>OpenAI</span>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="container py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Join Our Community</h2>
          <div className="flex gap-6 justify-center">
            <Button variant="outline" size="lg">
              <SiGithub className="mr-2 h-5 w-5" />
              GitHub
            </Button>
            <Button variant="outline" size="lg">
              <SiDiscord className="mr-2 h-5 w-5" />
              Discord
            </Button>
            <Button variant="outline" size="lg">
              <SiYoutube className="mr-2 h-5 w-5" />
              YouTube
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}