"use client";
import Image from "next/image";
import { SITE, OTHER_PROJECTS } from "../data/content";
import { Reveal, SectionHeading } from "./ui";

const LINKS = [
  { label: "Email", href: `mailto:${SITE.email}`, sub: SITE.email },
  { label: "LinkedIn", href: SITE.links.linkedin, sub: "in/eli-jaramillo" },
  { label: "GitHub", href: SITE.links.github, sub: "@EJar74" },
];

const Contact = () => {
  return (
    <section id="contact" className="section-pad relative mx-auto max-w-6xl px-5">
      {/* secondary projects */}
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold">Also built</p>
      </Reveal>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {OTHER_PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={i * 70}>
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-hover group block h-full overflow-hidden rounded-xl2"
            >
              <div className="relative h-32 w-full overflow-hidden bg-black/40">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h4 className="font-display text-base font-semibold text-white">
                  {p.title}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-faint">{p.description}</p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      {/* contact */}
      <Reveal>
        <div className="mt-20 text-center">
          <SectionHeading
            align="center"
            eyebrow="Contact"
            title={
              <>
                Let&apos;s <span className="text-gold-grad">talk</span>.
              </>
            }
            intro="I'm open to engineering and product roles, and to people who like hard problems. Email is the fastest way to reach me."
          />
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="mx-auto mt-9 grid max-w-2xl gap-3 sm:grid-cols-3">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="glass glass-hover flex flex-col items-center rounded-xl2 px-4 py-5 text-center"
            >
              <span className="font-display text-base font-semibold text-white">
                {l.label}
              </span>
              <span className="mt-1 break-all text-xs text-faint">{l.sub}</span>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal delay={140}>
        <div className="mt-8 flex justify-center">
          <a
            href={SITE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-soft to-gold px-7 py-3 font-medium text-ink shadow-gold-sm transition-all hover:shadow-gold"
          >
            View résumé ↗
          </a>
        </div>
      </Reveal>

      <footer className="mt-20 border-t border-white/8 pt-6 text-center">
        <p className="text-xs text-faint">
          © {new Date().getFullYear()} Eli Jaramillo · Designed & built by me ·
          Next.js · Tailwind
        </p>
      </footer>
    </section>
  );
};

export default Contact;
