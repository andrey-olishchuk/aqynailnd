import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/">
          <a className="flex items-center space-x-2">
            <span className="font-bold">RAGStack</span>
          </a>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex justify-center space-x-4">
            <Link href="/docs">
              <Button variant="ghost">Documentation</Button>
            </Link>
            <Link href="/chat">
              <Button variant="ghost">AI Chat</Button>
            </Link>
          </div>
          <a 
            href="https://github.com/example/ragstack" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="outline">GitHub</Button>
          </a>
        </div>
      </div>
    </nav>
  );
}
