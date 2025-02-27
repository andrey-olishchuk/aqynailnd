import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const screenshots = [
  {
    url: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1",
    alt: "AI Interface 1"
  },
  {
    url: "https://images.unsplash.com/photo-1586953208448-b95a79798f07",
    alt: "AI Interface 2"
  },
  {
    url: "https://images.unsplash.com/photo-1616161560417-66d4db5892ec",
    alt: "AI Interface 3"
  }
];

export default function ScreenshotSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((current) =>
      current === screenshots.length - 1 ? 0 : current + 1
    );
  };

  const previous = () => {
    setCurrentIndex((current) =>
      current === 0 ? screenshots.length - 1 : current - 1
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-16">
      <Card className="overflow-hidden">
        <div className="relative aspect-video">
          <img
            src={screenshots[currentIndex].url}
            alt={screenshots[currentIndex].alt}
            className="object-cover w-full h-full"
          />
        </div>
      </Card>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <Button
          variant="secondary"
          size="icon"
          onClick={previous}
          className="h-8 w-8 rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={next}
          className="h-8 w-8 rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
