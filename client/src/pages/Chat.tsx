import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

export default function Chat() {
  const [input, setInput] = useState("");
  const { toast } = useToast();

  const { data: messages, isLoading } = useQuery({
    queryKey: ["/api/chat"],
  });

  const mutation = useMutation({
    mutationFn: async (content: string) => {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "user", content, metadata: null }),
      });
      if (!res.ok) throw new Error("Failed to send message");
      return res.json();
    },
    onSuccess: () => {
      setInput("");
      queryClient.invalidateQueries({ queryKey: ["/api/chat"] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      mutation.mutate(input);
    }
  };

  return (
    <div className="container py-10">
      <Card className="w-full max-w-2xl mx-auto">
        <div className="h-[600px] flex flex-col">
          <ScrollArea className="flex-1 p-4">
            {isLoading ? (
              <div className="text-center">Loading...</div>
            ) : (
              messages?.map((msg: any) => (
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
              ))
            )}
          </ScrollArea>
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the documentation..."
                className="min-h-[60px]"
              />
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="self-end"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
