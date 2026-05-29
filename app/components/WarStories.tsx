"use client";
import { useState } from "react";
import { WAR_STORIES, type WarStory } from "../data/content";
import { Reveal } from "./ui";

const Card = ({ story }: { story: WarStory }) => {
  const [flipped, setFlipped] = useState(false);

  // Back content is the taller face; an invisible copy in normal flow sizes the
  // card so neither face ever clips, regardless of copy length.
  const back = (
    <>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-wider text-flux">
          diagnosis
        </p>
        <p className="mt-1 text-sm leading-relaxed text-white/85">{story.diagnosis}</p>
      </div>
      <div className="mt-3 border-t border-white/10 pt-3">
        <p className="font-mono text-[10px] uppercase tracking-wider text-gold">fix</p>
        <p className="mt-1 text-sm leading-relaxed text-white/85">{story.fix}</p>
      </div>
    </>
  );

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      className="perspective group block w-full rounded-xl2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
    >
      <div
        className={`preserve-3d relative w-full transition-transform duration-700 ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* sizer (invisible) — gives the card the height of its tallest face */}
        <div aria-hidden className="invisible flex flex-col p-5">
          <div className="mb-3 h-4" />
          {back}
        </div>

        {/* front (opaque — no backdrop-filter, so backface-visibility works) */}
        <div className="backface-hidden absolute inset-0 flex flex-col rounded-xl2 border border-white/10 bg-[#0d0d13] p-5 shadow-[0_16px_50px_-18px_rgba(0,0,0,0.85)] transition-colors group-hover:border-gold/40">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-md bg-gold/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gold">
              bug
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-faint">
              symptom
            </span>
          </div>
          <h4 className="font-display text-lg font-semibold text-white">{story.title}</h4>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-dim">{story.symptom}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-gold">
            Diagnosis &amp; fix
            <span className="transition-transform group-hover:translate-x-0.5">↻</span>
          </span>
        </div>

        {/* back (opaque) */}
        <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col rounded-xl2 border border-gold/30 bg-[#14141d] p-5 shadow-[0_16px_50px_-18px_rgba(0,0,0,0.85)]">
          {back}
        </div>
      </div>
    </button>
  );
};

const WarStories = () => {
  return (
    <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {WAR_STORIES.map((s, i) => (
        <Reveal key={s.id} delay={i * 90}>
          <Card story={s} />
        </Reveal>
      ))}
    </div>
  );
};

export default WarStories;
