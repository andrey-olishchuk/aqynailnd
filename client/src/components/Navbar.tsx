import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/">
          <a className="mr-8 flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-primary"></div>
            <span className="text-xl font-bold tracking-wider">
              RAGStack
            </span>
          </a>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2">
          <div className="flex items-center space-x-6">
            <Link href="/docs">
              <a className="text-sm font-medium transition-colors hover:text-primary">
                Documentation
              </a>
            </Link>
            <Link href="/chat">
              <a className="text-sm font-medium transition-colors hover:text-primary">
                AI Chat
              </a>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/example/ragstack" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm"
            >
              <Button variant="ghost" size="sm" className="gap-2">
                <GithubIcon className="h-4 w-4" />
                GitHub
              </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}