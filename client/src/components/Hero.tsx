import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
            RAGStack
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A modern framework for building production-ready RAG applications.
            Combine the power of LangChain, LangFlow, and more in a seamless development experience.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              View on GitHub
            </Button>
          </div>
        </motion.div>
      </div>
      <div className="absolute inset-0 -z-10 opacity-30">
        <img
          src="https://images.unsplash.com/photo-1594632110477-aba45f9db4c1"
          alt="AI Network"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
