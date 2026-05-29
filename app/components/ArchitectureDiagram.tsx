"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ARCH_NODES, FLOW_STEPS, type FlowStep } from "../data/content";

const STEP_MS = 1000;
const DONE = FLOW_STEPS.length;

type View = {
  node: "client" | "relay" | "engine";
  seg: 0 | 1 | null;
  dir: "fwd" | "rev";
  color: "gold" | "flux";
};

function viewFor(step: FlowStep): View {
  let seg: 0 | 1 | null = null;
  let dir: "fwd" | "rev" = "fwd";
  if (step.from === "client" && step.to === "relay") (seg = 0), (dir = "fwd");
  else if (step.from === "relay" && step.to === "client") (seg = 0), (dir = "rev");
  else if (step.from === "relay" && step.to === "engine") (seg = 1), (dir = "fwd");
  else if (step.from === "engine" && step.to === "relay") (seg = 1), (dir = "rev");
  const node = (step.to === "player" ? "client" : step.to) as View["node"];
  const color: View["color"] =
    step.to === "engine" || step.from === "engine" ? "flux" : "gold";
  return { node, seg, dir, color };
}

const COLOR_RGB = { gold: "212,175,55", flux: "90,209,200" };

const NodeCard = ({
  idx,
  active,
  color,
}: {
  idx: number;
  active: boolean;
  color: "gold" | "flux";
}) => {
  const n = ARCH_NODES[idx];
  const rgb = COLOR_RGB[color];
  return (
    <div
      className="glass relative flex-1 rounded-xl2 p-4 transition-all duration-300 md:p-5"
      style={
        active
          ? {
              borderColor: `rgba(${rgb},0.6)`,
              boxShadow: `0 0 0 1px rgba(${rgb},0.4), 0 0 30px -6px rgba(${rgb},0.5)`,
            }
          : undefined
      }
    >
      {active && (
        <span
          className="absolute right-3 top-3 h-2 w-2 rounded-full"
          style={{ background: `rgb(${rgb})`, boxShadow: `0 0 10px rgb(${rgb})` }}
        />
      )}
      <h4 className="font-display text-base font-semibold text-white">{n.title}</h4>
      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-gold">
        {n.stack}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-dim">{n.owns}</p>
    </div>
  );
};

const Connector = ({
  active,
  dir,
  color,
  stepKey,
}: {
  active: boolean;
  dir: "fwd" | "rev";
  color: "gold" | "flux";
  stepKey: number;
}) => {
  const rgb = active ? COLOR_RGB[color] : "255,255,255";
  const dotStyle = {
    background: `rgb(${COLOR_RGB[color]})`,
    boxShadow: `0 0 12px 2px rgba(${COLOR_RGB[color]},0.9)`,
    ["--beam-dur" as string]: `${STEP_MS}ms`,
  } as React.CSSProperties;

  return (
    <div className="flex items-center justify-center py-1 md:flex-1 md:py-0 md:px-2">
      <div
        className="relative h-10 w-px transition-colors duration-300 md:h-px md:w-full"
        style={{ background: `rgba(${rgb},${active ? 0.45 : 0.12})` }}
      >
        {active && (
          <>
            {/* desktop: horizontal traversal */}
            <span
              key={`h-${stepKey}`}
              aria-hidden
              className={`absolute top-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full md:block ${
                dir === "fwd" ? "dot-x-fwd" : "dot-x-rev"
              }`}
              style={dotStyle}
            />
            {/* mobile: vertical traversal */}
            <span
              key={`v-${stepKey}`}
              aria-hidden
              className={`absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full md:hidden ${
                dir === "fwd" ? "dot-y-fwd" : "dot-y-rev"
              }`}
              style={dotStyle}
            />
          </>
        )}
      </div>
    </div>
  );
};

const ArchitectureDiagram = () => {
  const [step, setStep] = useState(-1); // -1 idle, 0..DONE-1 playing, DONE finished
  const rootRef = useRef<HTMLDivElement>(null);
  const autoRan = useRef(false);

  const playing = step >= 0 && step < DONE;
  const current = playing ? viewFor(FLOW_STEPS[step]) : null;

  const run = useCallback(() => setStep(0), []);

  // advance steps on a timer
  useEffect(() => {
    if (step < 0 || step >= DONE) return;
    const t = setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [step]);

  // auto-run once when scrolled into view
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !autoRan.current) {
            autoRan.current = true;
            run();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [run]);

  const visibleLogs = step < 0 ? [] : FLOW_STEPS.slice(0, step + 1);
  const totalMs = visibleLogs.reduce((a, s) => a + s.ms, 0);
  const finished = step >= DONE;

  const segActive = (seg: 0 | 1) => current?.seg === seg;

  return (
    <div ref={rootRef} className="glass rounded-xl2 p-5 md:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-white">
            Anatomy of a turn
          </h3>
          <p className="text-sm text-dim">
            Follow one real battle action through all three tiers.
          </p>
        </div>
        <button
          onClick={run}
          disabled={playing}
          className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-medium text-gold transition-all hover:bg-gold/20 hover:shadow-gold-sm disabled:opacity-40"
        >
          {playing ? "Running…" : finished ? "Replay ↺" : "▶ Send a battle action"}
        </button>
      </div>

      {/* diagram rail */}
      <div className="flex flex-col items-stretch md:flex-row md:items-center">
        <NodeCard idx={0} active={current?.node === "client"} color={current?.color ?? "gold"} />
        <Connector
          active={!!current && segActive(0)}
          dir={current?.dir ?? "fwd"}
          color={current?.color ?? "gold"}
          stepKey={step}
        />
        <NodeCard idx={1} active={current?.node === "relay"} color={current?.color ?? "gold"} />
        <Connector
          active={!!current && segActive(1)}
          dir={current?.dir ?? "fwd"}
          color={current?.color ?? "flux"}
          stepKey={step}
        />
        <NodeCard idx={2} active={current?.node === "engine"} color={current?.color ?? "flux"} />
      </div>

      {/* log readout */}
      <div className="mt-6 rounded-xl border border-white/8 bg-black/40 p-4 font-mono text-xs leading-relaxed">
        <div className="mb-2 flex items-center justify-between text-faint">
          <span className="uppercase tracking-widest">trace</span>
          {step >= 0 && (
            <span className="text-flux">round-trip ≈ {totalMs}ms</span>
          )}
        </div>
        {visibleLogs.length === 0 ? (
          <p className="text-faint">
            <span className="text-gold">$</span> press “Send a battle action” to trace a turn…
          </p>
        ) : (
          <ul className="space-y-1">
            {visibleLogs.map((s, i) => {
              const v = viewFor(s);
              const rgb = COLOR_RGB[v.color];
              return (
                <li key={i} className="flex gap-3">
                  <span className="w-14 shrink-0 text-faint">+{s.ms}ms</span>
                  <span
                    className="w-20 shrink-0"
                    style={{ color: `rgb(${rgb})` }}
                  >
                    [{s.channel}]
                  </span>
                  <span className="text-white/80">{s.log}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <p className="mt-3 text-xs text-faint">
        The path is real; the timings are representative. Node owns real-time,
        Python owns the rules, the client only renders.
      </p>
    </div>
  );
};

export default ArchitectureDiagram;
