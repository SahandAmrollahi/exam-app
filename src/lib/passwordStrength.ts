export type StrengthLevel = 0 | 1 | 2 | 3 | 4;

export function passwordStrength(pwd: string): StrengthLevel {
  const s = pwd ?? "";
  if (s.length === 0) return 0;

  const hasMin8 = s.length >= 8;
  const hasLettersAndNumbers = /[A-Za-z]/.test(s) && /\d/.test(s);
  const hasSpecial = /[^A-Za-z0-9\s]/.test(s);
  const noSpaces = !/\s/.test(s);

  const score =
    (hasMin8 ? 1 : 0) +
    (hasLettersAndNumbers ? 1 : 0) +
    (hasSpecial ? 1 : 0) +
    (noSpaces ? 1 : 0);

  return Math.max(0, Math.min(score, 4)) as StrengthLevel;
}

export const strengthMeta: Record<
  StrengthLevel,
  { label: string; color: string; ring: string }
> = {
  0: { label: "—", color: "#4C4C4C", ring: "rgba(0,0,0,0)" },
  1: { label: "معمولی", color: "#ef4444", ring: "rgba(239,68,68,0.20)" },
  2: { label: "نایاب", color: "#f59e0b", ring: "rgba(245,158,11,0.20)" },
  3: { label: "حماسی", color: "#facc15", ring: "rgba(250,204,21,0.20)" },
  4: { label: "افسانه ای", color: "#22c55e", ring: "rgba(34,197,94,0.20)" },
};
