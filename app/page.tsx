import SystemPulse from "./components/SystemPulse";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import FlagshipProject from "./components/FlagshipProject";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <SystemPulse />
      <Nav />
      <main className="relative z-10">
        {/* pinned hero scene: the hero holds while the background camera dives.
            Collapses to a normal screen for reduced-motion (no dead scroll). */}
        <div className="relative min-h-[160svh] motion-reduce:min-h-[100svh]">
          <div className="sticky top-0 min-h-[100svh]">
            <Hero />
          </div>
        </div>
        <About />
        <FlagshipProject />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
