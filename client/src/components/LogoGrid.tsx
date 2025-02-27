import { Card } from "@/components/ui/card";
import { SiPython, SiDocker, SiKubernetes, SiHelm } from "react-icons/si";

const logos = [
  { name: "LangFlow", icon: "⚡" },
  { name: "LangChain", icon: "🦜" },
  { name: "Dagster", icon: "📊" },
  { name: "Python", Icon: SiPython },
  { name: "Qdrant", icon: "🔍" },
  { name: "Docker", Icon: SiDocker },
  { name: "Kubernetes", Icon: SiKubernetes },
  { name: "Helm", Icon: SiHelm }
];

export default function LogoGrid() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <h2 className="text-center text-lg font-semibold leading-8 text-foreground mb-8">
          Powered by leading open source technologies
        </h2>
        <div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-6 sm:max-w-xl sm:grid-cols-3 lg:max-w-none lg:grid-cols-4">
          {logos.map((logo) => (
            <Card key={logo.name} className="p-3 flex items-center justify-center">
              {logo.Icon ? (
                <logo.Icon className="h-6 w-6" />
              ) : (
                <span className="text-xl">{logo.icon}</span>
              )}
              <span className="ml-2 text-sm font-medium">{logo.name}</span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}