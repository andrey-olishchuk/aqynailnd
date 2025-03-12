
import { useState, useEffect } from "react";

interface TypedResponseProps {
  text: string;
  typingSpeed?: number;
}

export function TypedResponse({ text, typingSpeed = 20 }: TypedResponseProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);
      
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, typingSpeed]);

  return <div>{displayedText}</div>;
}
