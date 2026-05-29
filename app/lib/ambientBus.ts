// Tiny module-level bus so the active scroll section (owned by Nav) can drive
// the ambient background (SystemPulse) without prop-drilling or context re-renders.

export type SectionId = "home" | "about" | "project" | "experience" | "contact";

let current: SectionId = "home";
const listeners = new Set<(s: SectionId) => void>();

export function setActiveSection(id: SectionId) {
  if (id === current) return;
  current = id;
  listeners.forEach((fn) => fn(id));
}

export function getActiveSection(): SectionId {
  return current;
}

export function subscribeSection(fn: (s: SectionId) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
