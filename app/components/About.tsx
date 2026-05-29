"use client";
import Image from "next/image";
import { ABOUT } from "../data/content";
import { Reveal, SectionHeading } from "./ui";

const About = () => {
  return (
    <section id="about" className="section-pad relative mx-auto max-w-6xl px-5">
      <Reveal>
        <SectionHeading eyebrow="About" title="The short version." />
      </Reveal>

      <div className="mt-12 grid items-start gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
        {/* portrait */}
        <Reveal className="order-2 md:order-1">
          <div className="glass relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-xl2 md:max-w-sm">
            <Image
              src="/portrait.png"
              alt="Eli Jaramillo"
              fill
              sizes="(max-width: 768px) 80vw, 360px"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          </div>
        </Reveal>

        {/* copy */}
        <div className="order-1 md:order-2">
          {ABOUT.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <p className="mb-5 text-lg leading-relaxed text-dim">{p}</p>
            </Reveal>
          ))}

          {/* bridge pull-quote */}
          <Reveal delay={160}>
            <blockquote className="glass mt-2 rounded-xl2 border-l-2 border-l-gold/70 p-5 md:p-6">
              <p className="text-base leading-relaxed text-white/90 md:text-lg">
                {ABOUT.bridge}
              </p>
            </blockquote>
          </Reveal>

          {/* core stack, kept understated on purpose */}
          <Reveal delay={220}>
            <div className="mt-8">
              <p className="font-mono text-xs uppercase tracking-wider text-faint">
                Core stack
              </p>
              <p className="mt-2 text-sm leading-relaxed text-dim">
                {ABOUT.stack.join("   ·   ")}
              </p>
              <p className="mt-3 text-sm text-gold/80">{ABOUT.languages}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
