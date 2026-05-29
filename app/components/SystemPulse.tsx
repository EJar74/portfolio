"use client";
import { useEffect, useState } from "react";
import { subscribeSection, getActiveSection, type SectionId } from "../lib/ambientBus";
import { STATS_URL } from "../data/content";

/**
 * The Living Network — an ambient canvas of depth-layered nodes that fire tracer
 * packets at each other. It reacts to the cursor (gravity well + parallax tilt),
 * click-and-hold (charge a node, release a shockwave), scroll position (a camera
 * diving through the field) and velocity (system "load" → hotter), and the active
 * section. On the project section the field splits into 3 warring factions that
 * trade fire (ambient skirmishes). A cold-boot intro ignites the network on load,
 * and a ~11s "server tick" fires a synchronized burst.
 *
 * Canvas 2D, pre-baked colored glow sprites, object-pooled, DPR-capped, reduced-
 * motion aware (static frame), paused when the tab is hidden.
 */

const COLORS: Record<string, string> = {
  gold: "212,175,55",
  flux: "90,209,200",
  crimson: "229,72,77",
  violet: "163,113,247",
  amber: "245,165,36",
};
const FACTION_KEYS = ["crimson", "violet", "amber"] as const;

type SpriteKey = keyof typeof COLORS;

type Node = {
  fx: number; fy: number; z: number;
  bx: number; by: number;
  x: number; y: number; vx: number; vy: number;
  ignite: number;
  faction: 0 | 1 | 2;
};
type Packet = { active: boolean; ni: number; nj: number; t: number; speed: number; key: SpriteKey };
type Ring = { active: boolean; x: number; y: number; r: number; max: number; a: number; key: SpriteKey };

const SECTION_CFG: Record<SectionId, { energy: number; beat: boolean; factions: boolean }> = {
  home: { energy: 1.0, beat: true, factions: false },
  about: { energy: 0.42, beat: true, factions: false },
  project: { energy: 0.6, beat: true, factions: true },
  experience: { energy: 0.4, beat: true, factions: false },
  contact: { energy: 0.62, beat: true, factions: false },
};

const SystemPulse = () => {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const canvas = document.getElementById("living-network") as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const hoverCapable = window.matchMedia("(hover: hover)").matches;
    const cores = (navigator as any).hardwareConcurrency || 8;
    const mem = (navigator as any).deviceMemory || 8;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const mobile = window.innerWidth < 768 || coarse;
    const low = mem < 4 || cores <= 4;

    let NODES = mobile ? (low ? 24 : 38) : 64;
    let MAX_PACKETS = mobile ? (low ? 14 : 22) : 46;
    const MAX_RINGS = mobile ? 10 : 20;
    const TRAIL = mobile ? 5 : 8;
    const dprCap = mobile ? 1.5 : 2;
    const fpsCap = mobile ? 33 : 0;
    const bloom = !mobile;

    let width = 0, height = 0, dpr = 1, maxScroll = 0;

    // pre-baked colored glow sprites
    const makeGlow = (size: number, rgb: string) => {
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const g = c.getContext("2d")!;
      const cx = size / 2;
      const grad = g.createRadialGradient(cx, cx, 0, cx, cx, cx);
      grad.addColorStop(0, `rgba(${rgb},0.95)`);
      grad.addColorStop(0.35, `rgba(${rgb},0.35)`);
      grad.addColorStop(1, `rgba(${rgb},0)`);
      g.fillStyle = grad;
      g.fillRect(0, 0, size, size);
      return c;
    };
    const sprites: Record<SpriteKey, HTMLCanvasElement> = {
      gold: makeGlow(64, COLORS.gold),
      flux: makeGlow(64, COLORS.flux),
      crimson: makeGlow(64, COLORS.crimson),
      violet: makeGlow(64, COLORS.violet),
      amber: makeGlow(64, COLORS.amber),
    };

    const nodes: Node[] = [];
    let edges: [number, number][] = [];
    const packets: Packet[] = Array.from({ length: MAX_PACKETS }, () => ({
      active: false, ni: 0, nj: 0, t: 0, speed: 0, key: "gold" as SpriteKey,
    }));
    const rings: Ring[] = Array.from({ length: MAX_RINGS }, () => ({
      active: false, x: 0, y: 0, r: 0, max: 0, a: 0, key: "gold" as SpriteKey,
    }));

    const env = {
      mx: -9999, my: -9999, tiltX: 0, tiltY: 0,
      scrollVel: 0, lastY: window.scrollY, progress: 0,
      load: 0, energy: 1, energyTarget: 1, beat: true,
      factionBlend: 0, factionTarget: 0,
      liveLoad: -1,
      charge: null as { ni: number; t: number } | null,
    };

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const factionKey = (n: Node): SpriteKey => FACTION_KEYS[n.faction];

    const buildNodes = () => {
      nodes.length = 0;
      for (let i = 0; i < NODES; i++) {
        const fx = rand(0.04, 0.96), fy = rand(0.05, 0.95), z = Math.random();
        nodes.push({
          fx, fy, z, bx: fx * width, by: fy * height, x: fx * width, y: fy * height,
          vx: 0, vy: 0, ignite: 0, faction: (i % 3) as 0 | 1 | 2,
        });
      }
    };
    const buildEdges = () => {
      const set = new Set<string>();
      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        const d: { j: number; v: number }[] = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const dx = nodes[i].bx - nodes[j].bx, dy = nodes[i].by - nodes[j].by;
          d.push({ j, v: dx * dx + dy * dy });
        }
        d.sort((a, b) => a.v - b.v);
        for (let n = 0; n < Math.min(2, d.length); n++) {
          const j = d[n].j;
          const key = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (!set.has(key)) { set.add(key); edges.push([i, j]); }
        }
      }
    };
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      width = window.innerWidth; height = window.innerHeight;
      canvas.width = Math.floor(width * dpr); canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      maxScroll = Math.max(0, document.documentElement.scrollHeight - height);
      if (nodes.length === 0) buildNodes();
      else nodes.forEach((n) => { n.bx = n.fx * width; n.by = n.fy * height; });
      buildEdges();
    };

    const countActive = () => { let c = 0; for (const p of packets) if (p.active) c++; return c; };
    const packetKey = (srcNode: Node): SpriteKey => {
      if (env.factionBlend > 0.4) return factionKey(srcNode);
      return Math.random() < 0.4 + env.load * 0.5 ? "gold" : "flux";
    };
    const spawnPacket = (ni: number, nj: number) => {
      if (countActive() >= MAX_PACKETS) return;
      const p = packets.find((q) => !q.active);
      if (!p) return;
      p.active = true; p.ni = ni; p.nj = nj; p.t = 0;
      p.speed = rand(0.45, 0.85) / 1000;
      p.key = packetKey(nodes[ni]);
    };
    const spawnRandom = () => {
      if (!edges.length) return;
      const [i, j] = edges[(Math.random() * edges.length) | 0];
      // in faction mode, bias toward same-faction "allied" fire for a war feel
      spawnPacket(Math.random() > 0.5 ? i : j, Math.random() > 0.5 ? j : i);
    };
    const spawnBurst = (n: number) => { for (let k = 0; k < n; k++) spawnRandom(); };
    const spawnRing = (x: number, y: number, key: SpriteKey, max: number) => {
      const r = rings.find((q) => !q.active);
      if (!r) return;
      r.active = true; r.x = x; r.y = y; r.r = 3; r.max = max; r.a = 0.6; r.key = key;
    };

    const camY = (z: number) => -env.progress * 130 * (0.25 + z * 0.75); // camera dive parallax
    const rx = (n: Node) => n.x + env.tiltX * (1 - n.z) * 22;
    const ry = (n: Node) => n.y + env.tiltY * (1 - n.z) * 22 + camY(n.z);
    const bez = (a: number, c: number, b: number, t: number) => {
      const q = 1 - t; return q * q * a + 2 * q * t * c + t * t * b;
    };
    const nearest = (px: number, py: number) => {
      let best = -1, bd = Infinity;
      for (let i = 0; i < nodes.length; i++) {
        const dx = rx(nodes[i]) - px, dy = ry(nodes[i]) - py, d = dx * dx + dy * dy;
        if (d < bd) { bd = d; best = i; }
      }
      return best;
    };

    // listeners (window-level; canvas is pointer-events:none)
    const onMove = (e: PointerEvent) => { env.mx = e.clientX; env.my = e.clientY; };
    const onDown = (e: PointerEvent) => {
      const n = nearest(e.clientX, e.clientY);
      if (n >= 0) env.charge = { ni: n, t: 0 };
    };
    const release = () => {
      const c = env.charge;
      env.charge = null;
      if (!c) return;
      const n = nodes[c.ni];
      if (!n) return;
      const power = Math.min(1, c.t / 700);
      if (c.t < 170) {
        // quick tap → single packet to a neighbour
        const edge = edges.find((ed) => ed[0] === c.ni || ed[1] === c.ni);
        if (edge) spawnPacket(c.ni, edge[0] === c.ni ? edge[1] : edge[0]);
        return;
      }
      // charged release → shockwave + burst proportional to charge
      const key = env.factionBlend > 0.4 ? factionKey(n) : "gold";
      spawnRing(rx(n), ry(n), key, 50 + power * 90);
      n.ignite = 1;
      const shots = Math.round(2 + power * (mobile ? 4 : 8));
      for (let k = 0; k < shots; k++) {
        const edge = edges[(Math.random() * edges.length) | 0];
        if (edge) spawnPacket(c.ni, edge[0] === c.ni ? edge[1] : edge[0]);
      }
    };
    const onScroll = () => {
      const y = window.scrollY;
      env.scrollVel = Math.min(1, env.scrollVel + Math.abs(y - env.lastY) * 0.006);
      env.lastY = y;
      env.progress = maxScroll > 0 ? Math.min(1, y / maxScroll) : 0;
    };

    const applySection = (s: SectionId) => {
      env.energyTarget = SECTION_CFG[s].energy;
      env.beat = SECTION_CFG[s].beat;
      env.factionTarget = SECTION_CFG[s].factions ? 1 : 0;
    };
    applySection(getActiveSection());
    const unsub = subscribeSection(applySection);

    let statsTimer: ReturnType<typeof setInterval> | undefined;
    const ac = new AbortController();
    if (STATS_URL) {
      const pull = () =>
        fetch(STATS_URL, { signal: ac.signal })
          .then((r) => r.json())
          .then((d) => {
            const n = Number(d.playersNow ?? d.players);
            if (!Number.isNaN(n)) env.liveLoad = Math.min(1, Math.log1p(n) / Math.log1p(300));
          })
          .catch(() => {});
      pull();
      statsTimer = setInterval(pull, 30000);
    }

    const drawGlow = (key: SpriteKey, x: number, y: number, size: number, alpha: number) => {
      ctx.globalAlpha = alpha;
      ctx.drawImage(sprites[key], x - size / 2, y - size / 2, size, size);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";
      ctx.lineWidth = 1;
      edges.forEach(([i, j]) => {
        ctx.strokeStyle = `rgba(${COLORS.gold},0.07)`;
        ctx.beginPath();
        ctx.moveTo(nodes[i].bx, nodes[i].by);
        ctx.lineTo(nodes[j].bx, nodes[j].by);
        ctx.stroke();
      });
      ctx.globalCompositeOperation = "lighter";
      nodes.forEach((n) => drawGlow("gold", n.bx, n.by, 16 + n.z * 22, 0.18 + n.z * 0.32));
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    let raf = 0, running = false;
    let last = performance.now(), lastDraw = 0;
    let beatAcc = 0, spawnAcc = 0, beatGap = 11000, emaDt = 16;
    const introStart = performance.now();
    const INTRO_MS = 1500;
    const cx = () => width / 2, cy = () => height / 2;
    const maxDist = () => Math.hypot(width, height) / 2;

    const start = () => { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    const frame = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      if (fpsCap && now - lastDraw < fpsCap) return;
      const dt = Math.min(now - last, 50);
      last = now; lastDraw = now;
      emaDt = emaDt * 0.95 + dt * 0.05;
      if (emaDt > 24 && MAX_PACKETS > 8) MAX_PACKETS -= 1;

      const intro = Math.min(1, (now - introStart) / INTRO_MS);

      env.scrollVel *= 0.92;
      const baseLoad = env.liveLoad >= 0 ? env.liveLoad : 0.12;
      env.load += (Math.min(1, baseLoad + env.scrollVel) - env.load) * 0.08;
      env.energy += (env.energyTarget - env.energy) * 0.06;
      env.factionBlend += (env.factionTarget - env.factionBlend) * 0.05;
      if (hoverCapable) {
        const tx = env.mx < 0 ? 0 : env.mx / width - 0.5;
        const ty = env.my < 0 ? 0 : env.my / height - 0.5;
        env.tiltX += (tx * 2 - env.tiltX) * 0.05;
        env.tiltY += (ty * 2 - env.tiltY) * 0.05;
      }
      if (env.charge) env.charge.t += dt;

      // node physics
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (hoverCapable && env.mx > 0) {
          const dx = env.mx - rx(n), dy = env.my - ry(n), d2 = dx * dx + dy * dy;
          if (d2 < 28000) { const f = (1 - Math.sqrt(d2) / 167) * 0.05; n.vx += dx * f; n.vy += dy * f; }
        }
        n.vx += (n.bx - n.x) * 0.01; n.vy += (n.by - n.y) * 0.01;
        n.vx *= 0.86; n.vy *= 0.86; n.x += n.vx; n.y += n.vy;
        if (env.charge && env.charge.ni === i) {
          n.ignite = Math.min(1, env.charge.t / 700);
        } else if (n.ignite > 0) {
          n.ignite = Math.max(0, n.ignite - dt / 520);
        }
      }

      // spawning
      beatAcc += dt;
      if (env.beat && intro >= 1 && beatAcc > beatGap) { beatAcc = 0; beatGap = rand(10000, 12500); spawnBurst(mobile ? 5 : 9); }
      spawnAcc += dt;
      const spawnEvery = (900 - env.load * 600) * (1.6 - env.energy);
      if (intro >= 1 && spawnAcc > spawnEvery) { spawnAcc = 0; spawnRandom(); }
      // fire a boot burst as the network ignites
      if (intro < 1 && intro > 0.45 && beatAcc > 120) { beatAcc = 0; spawnRandom(); }

      // ---- draw ----
      ctx.clearRect(0, 0, width, height);
      const e = env.energy;
      const blend = env.factionBlend;

      // edges
      ctx.globalCompositeOperation = "source-over";
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${COLORS.gold},${0.05 * e * intro})`;
      for (const [i, j] of edges) {
        ctx.beginPath();
        ctx.moveTo(rx(nodes[i]), ry(nodes[i]));
        ctx.lineTo(rx(nodes[j]), ry(nodes[j]));
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "lighter";

      // nodes (cold-boot wave + faction blend + bloom)
      const mc = maxDist(), cX = cx(), cY = cy();
      for (const n of nodes) {
        const px = rx(n), py = ry(n);
        const distN = Math.hypot(n.bx - cX, n.by - cY) / mc;
        const boot = intro >= 1 ? 1 : Math.max(0, Math.min(1, (intro - distN * 0.6) / 0.4));
        if (boot <= 0) continue;
        const baseA = (0.14 + n.z * 0.34 + n.ignite * 0.55) * e * boot;
        const s = (14 + n.z * 20) * (1 + n.ignite * 1.4);
        if (bloom) drawGlow(blend > 0.5 ? factionKey(n) : "gold", px, py, s * 1.9, baseA * 0.35);
        if (blend < 0.999) drawGlow("gold", px, py, s, baseA * (1 - blend));
        if (blend > 0.001) drawGlow(factionKey(n), px, py, s, baseA * blend);
      }

      // rings
      for (const r of rings) {
        if (!r.active) continue;
        r.r += dt * 0.06; r.a -= dt / 700;
        if (r.a <= 0 || r.r >= r.max) { r.active = false; continue; }
        ctx.globalAlpha = 1;
        ctx.strokeStyle = `rgba(${COLORS[r.key]},${r.a * e})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // packets + trails
      for (const p of packets) {
        if (!p.active) continue;
        p.t += p.speed * dt;
        const A = nodes[p.ni], B = nodes[p.nj];
        const ax = rx(A), ay = ry(A), bx = rx(B), by = ry(B);
        const mxp = (ax + bx) / 2, myp = (ay + by) / 2;
        let cxp = mxp - (by - ay) * 0.18, cyp = myp + (bx - ax) * 0.18;
        if (hoverCapable && env.mx > 0) { cxp += (env.mx - mxp) * 0.06; cyp += (env.my - myp) * 0.06; }
        for (let s = 0; s < TRAIL; s++) {
          const tt = p.t - s * 0.05;
          if (tt < 0) break;
          const x = bez(ax, cxp, bx, tt), y = bez(ay, cyp, by, tt);
          const sz = (9 - s * 0.9) * (s === 0 ? 1.5 : 1);
          drawGlow(p.key, x, y, sz, (1 - s / TRAIL) * 0.5 * e);
        }
        if (bloom) drawGlow(p.key, bez(ax, cxp, bx, p.t), bez(ay, cyp, by, p.t), 22, 0.18 * e);
        if (p.t >= 1) { p.active = false; B.ignite = 1; spawnRing(bx, by, p.key, rand(34, 56)); }
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      drawStatic();
      const onResizeStatic = () => { resize(); drawStatic(); };
      window.addEventListener("resize", onResizeStatic);
      return () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("resize", onResizeStatic);
        unsub(); ac.abort(); if (statsTimer) clearInterval(statsTimer);
      };
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    window.addEventListener("pointercancel", release, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const onVisibility = () => { if (document.hidden) stop(); else start(); };
    document.addEventListener("visibilitychange", onVisibility);

    start();

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      unsub(); ac.abort(); if (statsTimer) clearInterval(statsTimer);
    };
  }, [reduced]);

  return (
    <canvas
      id="living-network"
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none"
    />
  );
};

export default SystemPulse;
