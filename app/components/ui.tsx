"use client";
import { ElementType, ReactNode } from "react";
import { useReveal } from "../lib/hooks";

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div" as ElementType,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const { ref, visible } = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      <p
        className={`mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-7 bg-gold/60" />
        {eyebrow}
      </p>
      <h2 className="font-display text-section font-bold">{title}</h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-dim">{intro}</p>}
    </div>
  );
}
