import Hero from "@/components/Hero";
import LogoGrid from "@/components/LogoGrid";
import GitHubStats from "@/components/GitHubStats";
import ScreenshotSlider from "@/components/ScreenshotSlider";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <LogoGrid />
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">
            Powerful Interface
          </h2>
          <ScreenshotSlider />
        </div>
      </section>
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">
            Community Driven
          </h2>
          <GitHubStats />
        </div>
      </section>
    </div>
  );
}
