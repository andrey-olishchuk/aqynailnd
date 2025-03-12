
import React from 'react';
import { Loader2 } from 'lucide-react';

interface ChatMessageProps {
  message: {
    role: string;
    content: string;
    isLoading?: boolean;
    suggestions?: string[];
    context?: string;
  };
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`py-4 ${isUser ? 'bg-muted/50' : 'bg-background'}`}>
      <div className="container mx-auto px-4">
        <div className="flex gap-4">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium">
            {isUser ? 'U' : 'A'}
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold mb-1">
              {isUser ? 'You' : 'Aqyn Assistant'}
            </div>
            <div className="prose dark:prose-invert max-w-none">
              {message.isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-muted-foreground">Thinking...</span>
                </div>
              ) : (
                <>
                  <p>{message.content}</p>
                  
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-2">Suggested questions:</p>
                      <div className="flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, i) => (
                          <button
                            key={i}
                            className="text-xs px-3 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { AnimatedDots } from "./AnimatedDots";
import { TypedResponse } from "./TypedResponse";

interface ChatMessageProps {
  message: {
    role: string;
    content: string;
    isLoading?: boolean;
    suggestions?: string[];
    context?: string;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  
  return (
    <div
      className={`mb-4 ${
        isUser ? "text-right" : "text-left"
      }`}
    >
      <div
        className={`inline-block p-3 rounded-lg ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        }`}
      >
        {message.isLoading ? (
          <AnimatedDots />
        ) : isUser ? (
          message.content
        ) : (
          <TypedResponse text={message.content} />
        )}
      </div>
    </div>
  );
}
