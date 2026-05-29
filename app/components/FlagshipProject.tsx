"use client";
import Image from "next/image";
import { METRICS, MODES, SITE } from "../data/content";
import { Reveal, SectionHeading } from "./ui";
import ArchitectureDiagram from "./ArchitectureDiagram";
import CaseStudies from "./CaseStudies";
import WarStories from "./WarStories";

const SubHeading = ({ kicker, title }: { kicker: string; title: string }) => (
  <div className="mb-7">
    <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold">{kicker}</p>
    <h3 className="mt-2 font-display text-2xl font-semibold text-white md:text-3xl">
      {title}
    </h3>
  </div>
);

const FlagshipProject = () => {
  return (
    <section id="project" className="section-pad relative mx-auto max-w-6xl px-5">
      {/* overview */}
      <Reveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <SectionHeading
            eyebrow="Flagship project"
            title={
              <>
                Siliconian <span className="text-gold-grad">Showdown</span>
              </>
            }
            intro="A full-stack real-time multiplayer game where you collect, customize, and battle digital creatures in timed turn-based rounds. I started it in 2020 and still run it today, and it's grown from 200 players to more than 1,300. These days I lead a small team on updates, but the architecture and the 86,000 lines underneath it were mine to build."
          />
          <div className="glass shrink-0 rounded-xl2 p-4">
            <Image
              src="/SSLogo.png"
              alt="Siliconian Showdown logo"
              width={150}
              height={150}
              className="mx-auto h-auto w-28 md:w-36"
            />
          </div>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <a
          href={SITE.links.game}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm text-gold hover:underline"
        >
          siliconianshowdown.com ↗
        </a>
      </Reveal>

      {/* scale metrics */}
      <div className="mt-14">
        <Reveal>
          <SubHeading kicker="By the numbers" title="What it adds up to" />
        </Reveal>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {METRICS.map((m, i) => (
            <Reveal key={m.label} delay={(i % 4) * 70}>
              <div className="glass glass-hover h-full rounded-xl2 p-4">
                <div className="font-display text-2xl font-bold text-gold-grad md:text-3xl">
                  {m.value}
                </div>
                <div className="mt-1 text-sm font-medium text-white/90">{m.label}</div>
                <div className="mt-0.5 text-xs text-faint">{m.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* mode families */}
        <Reveal delay={120}>
          <div className="mt-5 flex flex-wrap gap-2">
            {MODES.map((mode) => (
              <span
                key={mode.name}
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm"
              >
                <span className="font-medium text-gold">{mode.name}</span>
                <span className="text-xs text-faint">{mode.detail}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      {/* interactive centerpiece */}
      <div className="mt-16">
        <Reveal>
          <SubHeading
            kicker="The centerpiece"
            title="How one battle action flows"
          />
        </Reveal>
        <Reveal delay={60}>
          <ArchitectureDiagram />
        </Reveal>
      </div>

      {/* case studies */}
      <div className="mt-16">
        <Reveal>
          <SubHeading kicker="Strongest systems" title="Where the hard problems live" />
        </Reveal>
        <CaseStudies />
      </div>

      {/* war stories */}
      <div className="mt-16">
        <Reveal>
          <SubHeading kicker="War stories" title="Bugs that taught me something" />
          <p className="-mt-4 mb-7 text-sm text-faint">Tap a card for the diagnosis & fix.</p>
        </Reveal>
        <WarStories />
      </div>
    </section>
  );
};

export default FlagshipProject;
