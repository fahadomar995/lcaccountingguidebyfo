const KEY = "lc-ai-usage";
const DAILY_LIMIT = 10;

interface Usage { day: string; count: number; }

function today(): string { return new Date().toISOString().slice(0, 10); }

function read(): Usage {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { day: today(), count: 0 };
    const u = JSON.parse(raw) as Usage;
    if (u.day !== today()) return { day: today(), count: 0 };
    return u;
  } catch { return { day: today(), count: 0 }; }
}

export function getRemaining(): number {
  return Math.max(0, DAILY_LIMIT - read().count);
}

export function tryConsume(): boolean {
  const u = read();
  if (u.count >= DAILY_LIMIT) return false;
  const next = { day: today(), count: u.count + 1 };
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  return true;
}

export const AI_DAILY_LIMIT = DAILY_LIMIT;