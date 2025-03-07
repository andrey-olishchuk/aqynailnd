import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative min-h-screen bg-background overflow-hidden">
        <div 
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
          aria-hidden="true"
        />
        <div className="relative z-10">
          <main>
            <Home />
          </main>
        </div>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;