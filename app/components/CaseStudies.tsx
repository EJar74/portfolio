"use client";
import { useState } from "react";
import { CASE_STUDIES } from "../data/content";
import { Reveal } from "./ui";

const CaseStudies = () => {
  const [open, setOpen] = useState<string | null>(CASE_STUDIES[0].id);

  return (
    <div className="space-y-4">
      {CASE_STUDIES.map((cs, i) => {
        const isOpen = open === cs.id;
        return (
          <Reveal key={cs.id} delay={i * 70}>
            <div
              className={`glass overflow-hidden rounded-xl2 transition-all duration-300 ${
                isOpen ? "ring-1 ring-gold/30" : ""
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : cs.id)}
                aria-expanded={isOpen}
                className="flex w-full items-start gap-4 p-5 text-left md:p-6"
              >
                <span className="mt-1 font-mono text-sm text-gold">
                  0{i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h4 className="font-display text-lg font-semibold text-white md:text-xl">
                      {cs.title}
                    </h4>
                    <span className="rounded-full border border-gold/30 bg-gold/5 px-2.5 py-0.5 text-xs text-gold">
                      {cs.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-dim md:text-base">
                    {cs.summary}
                  </p>
                </div>
                <span
                  className={`mt-1 shrink-0 text-xl text-gold transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`grid transition-all duration-500 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-white/8 px-5 pb-5 pt-4 md:px-6 md:pl-[3.4rem]">
                    <ul className="space-y-2.5">
                      {cs.detail.map((d, j) => (
                        <li key={j} className="flex gap-3 text-sm leading-relaxed text-white/80">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                          {d}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 font-mono text-xs uppercase tracking-wider text-flux">
                      → {cs.analog}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
};

export default CaseStudies;
