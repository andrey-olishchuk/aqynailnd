import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { SiGithub, SiDiscord, SiYoutube } from "react-icons/si";

// Simulated chat messages
const INITIAL_MESSAGES = [
  {
    id: 1,
    role: "assistant",
    content: "Hello! I'm your AI assistant. How can I help you understand our documentation?",
  },
];

export default function Home() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: input,
    };

    // Simulate AI response
    const aiResponse = {
      id: messages.length + 2,
      role: "assistant",
      content: "This is a simulated response. In the actual implementation, this would be replaced with real AI responses based on the documentation.",
    };

    setMessages([...messages, userMessage, aiResponse]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container pt-20 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Build AI-powered Applications
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            A modern framework for building AI applications with RAG capabilities
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">
              View on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Chat Section */}
      <section className="container py-16 bg-muted/30">
        <Card className="max-w-2xl mx-auto">
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
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about the documentation..."
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

      {/* Documentation Section */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-3">AI-Powered Search</h3>
            <p className="text-muted-foreground">
              Intelligent search capabilities powered by state-of-the-art language models
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-3">RAG Framework</h3>
            <p className="text-muted-foreground">
              Retrieval Augmented Generation for accurate and contextual responses
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-3">Easy Integration</h3>
            <p className="text-muted-foreground">
              Simple APIs and SDKs for seamless integration with your existing stack
            </p>
          </Card>
        </div>
      </section>

      {/* Logo Section */}
      <section className="container py-16 bg-muted/30">
        <h2 className="text-3xl font-bold text-center mb-12">Trusted By</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-70">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-center">
              <div className="w-32 h-16 bg-foreground/10 rounded-lg" />
            </div>
          ))}
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