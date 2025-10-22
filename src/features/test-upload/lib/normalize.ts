export function normalizeRawText(raw: string): string {
  let text = raw.replace(/\r\n/g, "\n");

  text = text.replace(/\u00A0/g, " ");
  text = text.replace(/[✔✅]/g, "✔");

  text = text.replace(/^([A-Za-zА-Яа-я])\s*[\)\.\-]\s+/gm, "$1) ");

  text = text.replace(/^(\d+)\s*[\)\.\-]\s+/gm, "$1) ");

  return text.trim();
}

export function detectLocale(text: string): "lat" | "cyr" | "mixed" {
  const hasCyr = /[А-Яа-яЁёҚқҒғЎўҲҳ]/.test(text);
  const hasLat = /[A-Za-z]/.test(text);
  if (hasCyr && hasLat) return "mixed";
  if (hasCyr) return "cyr";
  return "lat";
}
