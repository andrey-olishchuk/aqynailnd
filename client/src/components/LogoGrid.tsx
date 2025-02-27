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
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-foreground">
          Powered by leading open source technologies
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {logos.map((logo) => (
            <Card key={logo.name} className="p-4 flex items-center justify-center">
              {logo.Icon ? (
                <logo.Icon className="h-8 w-8" />
              ) : (
                <span className="text-2xl">{logo.icon}</span>
              )}
              <span className="ml-2 text-sm font-medium">{logo.name}</span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
