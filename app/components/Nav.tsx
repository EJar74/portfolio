"use client";
import { useEffect, useState } from "react";
import { SITE } from "../data/content";
import { setActiveSection, type SectionId } from "../lib/ambientBus";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "project", label: "Project" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", ...SECTIONS.map((s) => s.id)];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id);
            setActiveSection(e.target.id as SectionId);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2.5" : "py-4"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 ${
          scrolled
            ? "glass-strong mx-3 rounded-full md:mx-auto"
            : "bg-transparent"
        }`}
        style={scrolled ? { paddingTop: "0.6rem", paddingBottom: "0.6rem" } : {}}
      >
        <a
          href="#home"
          onClick={(e) => go(e, "home")}
          className="font-display text-lg font-semibold tracking-tight"
        >
          Eli<span className="text-gold">.</span>Jaramillo
        </a>

        {/* desktop links */}
        <nav className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => go(e, s.id)}
              className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                active === s.id
                  ? "text-gold"
                  : "text-dim hover:text-white"
              }`}
            >
              {s.label}
            </a>
          ))}
          <a
            href={SITE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold transition-all hover:bg-gold/20 hover:shadow-gold-sm"
          >
            Resume
          </a>
        </nav>

        {/* mobile trigger */}
        <button
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-1.5 text-white"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="glass-strong mx-3 mt-2 flex flex-col rounded-2xl p-2">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => go(e, s.id)}
              className={`rounded-xl px-4 py-3 text-base ${
                active === s.id ? "text-gold" : "text-dim"
              }`}
            >
              {s.label}
            </a>
          ))}
          <a
            href={SITE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-center text-base font-medium text-gold"
          >
            Resume ↗
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
