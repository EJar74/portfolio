"use client";
import { useEffect, useState } from "react";
import { HERO, SITE } from "../data/content";
import { useCountUp } from "../lib/hooks";

const Chip = ({
  value,
  suffix,
  label,
  start,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  start: boolean;
  delay: number;
}) => {
  const n = useCountUp(value, start);
  return (
    <div
      className="glass glass-hover rounded-full px-4 py-2 text-center animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="font-display text-base font-semibold text-gold">
        {n}
        {suffix}
      </span>
      <span className="ml-2 text-xs text-dim">{label}</span>
    </div>
  );
};

const Hero = () => {
  const [start, setStart] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStart(true), 400);
    return () => clearTimeout(t);
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 text-center"
    >
      <div className="mx-auto max-w-4xl">
        <p
          className="mb-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-gold animate-fade-up"
          style={{ animationDelay: "60ms" }}
        >
          <span className="h-px w-8 bg-gold/60" />
          {HERO.eyebrow}
          <span className="h-px w-8 bg-gold/60" />
        </p>

        <h1
          className="font-display text-hero font-bold animate-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          {HERO.line1}
        </h1>

        <p
          className="mx-auto mt-7 max-w-2xl text-balance text-lg leading-relaxed text-dim md:text-xl animate-fade-up"
          style={{ animationDelay: "220ms" }}
        >
          {HERO.hook.pre}
          <span className="font-semibold text-gold-grad">{HERO.hook.emph1}</span>
          {HERO.hook.mid}
          <span className="font-semibold text-gold-grad">{HERO.hook.emph2}</span>
          {HERO.hook.post}
        </p>

        {/* scale chips */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
          {HERO.chips.map((c, i) => (
            <Chip
              key={c.label}
              value={c.value}
              suffix={c.suffix}
              label={c.label}
              start={start}
              delay={320 + i * 90}
            />
          ))}
        </div>

        {/* CTAs */}
        <div
          className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-up"
          style={{ animationDelay: "640ms" }}
        >
          <a
            href="#project"
            onClick={(e) => go(e, "project")}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-soft to-gold px-7 py-3 font-medium text-ink shadow-gold-sm transition-all hover:shadow-gold"
          >
            See how it works
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href={SITE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3 font-medium text-white/90 transition-colors hover:border-gold/40 hover:text-gold"
          >
            Resume ↗
          </a>
        </div>
      </div>

      <a
        href="#about"
        onClick={(e) => go(e, "about")}
        aria-label="Scroll to about"
        className="absolute bottom-8 text-2xl text-white/40 animate-bounce-soft hover:text-gold"
      >
        ↓
      </a>
    </section>
  );
};

export default Hero;
