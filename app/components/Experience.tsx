"use client";
import { EXPERIENCE, EDUCATION } from "../data/content";
import { Reveal, SectionHeading } from "./ui";

const Experience = () => {
  return (
    <section id="experience" className="section-pad relative mx-auto max-w-4xl px-5">
      <Reveal>
        <SectionHeading
          eyebrow="Experience"
          title="The track record."
          intro="Most recent first."
        />
      </Reveal>

      <div className="relative mt-12 pl-8 md:pl-10">
        {/* rail */}
        <span className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/50 via-white/10 to-transparent md:left-[9px]" />

        <ol className="space-y-5">
          {EXPERIENCE.map((role, i) => (
            <Reveal as="li" key={`${role.company}-${i}`} delay={i * 60} className="relative">
              {/* node */}
              <span
                className={`absolute -left-[1.85rem] top-5 h-3.5 w-3.5 rounded-full border-2 md:-left-[2.15rem] ${
                  i === 0
                    ? "border-gold bg-gold shadow-gold-sm"
                    : "border-gold/50 bg-ink"
                }`}
              />
              <div className="glass glass-hover rounded-xl2 p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-lg font-semibold text-white">
                    {role.position}
                  </h3>
                  <span className="font-mono text-xs text-gold">{role.period}</span>
                </div>
                <p className="mt-0.5 text-sm font-medium text-gold/90">
                  {role.company}
                  {role.location && (
                    <span className="text-faint"> · {role.location}</span>
                  )}
                </p>

                {role.bullets ? (
                  <ul className="mt-3 space-y-2">
                    {role.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2.5 text-sm leading-relaxed text-dim">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold/70" />
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-dim">{role.summary}</p>
                )}
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={80}>
          <div className="mt-6 flex items-center gap-3 text-sm text-faint">
            <span className="font-mono text-xs uppercase tracking-wider text-gold">
              Education
            </span>
            <span>
              {EDUCATION.degrees} · {EDUCATION.school} · {EDUCATION.year}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Experience;
