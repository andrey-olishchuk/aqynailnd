import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { useToast } from "@/hooks/use-toast";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = "typescript", className }: CodeBlockProps) {
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const onCopy = async () => {
    await navigator.clipboard.writeText(code);
    setHasCopied(true);
    toast({
      title: "Copied!",
      description: "Code snippet copied to clipboard",
    });
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className={cn("relative group", className)}>
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onCopy}
      >
        {hasCopied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "1.5rem",
          borderRadius: "0.5rem",
          backgroundColor: "hsl(var(--muted))",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
