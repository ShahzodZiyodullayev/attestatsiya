import type { QuizItem } from "@/shared/types/quiz";

import { normalizeRawText, detectLocale } from "./normalize";

/**
 * DOCX test faylni JSONga aylantiruvchi parser.
 * Har bir savolda 2–6 ta variant bo‘lishi mumkin.
 * Variantlar bitta qatorda yozilgan bo‘lsa ham ajratadi.
 */
export function parseTestText(raw: string, fileName?: string) {
  const text = normalizeRawText(raw);
  const locale = detectLocale(text);

  // Savollarni raqam bo‘yicha ajratamiz
  const blocks = text
    .split(/\n?\s*(?=\d+[\.\)])/g)
    .map(b => b.trim())
    .filter(Boolean);

  const items: QuizItem[] = [];
  let globalId = 1;

  // Har bir savol blokini tahlil qilamiz
  for (const block of blocks) {
    const questionMatch = block.match(/^(\d+)[\.\)]\s*(.+?)((?=[A-Za-zА-Яа-я]\))|$)/s);
    if (!questionMatch) continue;

    const order = globalId++;
    const questionText = questionMatch[2].trim();

    // ✅ Eng muhim regex — bitta qatordagi barcha variantlarni ajratadi
    const optionRegex =
      /([A-Da-dА-Га-г])[\)\.:\-]\s*([\s\S]*?)(?=(?:\s*[A-Da-dА-Га-г][\)\.:\-])|$)/g;

    const options: { key: string; text: string; correct: boolean }[] = [];
    let answerKey: string | null = null;
    let match;

    // Variantlarni topamiz
    while ((match = optionRegex.exec(block)) !== null) {
      const key = toLatinOptionKey(match[1]);
      let text = match[2].trim();

      const correct =
        /✔|✅|️|to['‘`]?g['‘`]?ri|true|правиль/i.test(text) ||
        new RegExp(`^${key}\\)\\s*✔`, "i").test(text);

      if (correct && !answerKey) answerKey = key;

      text = text.replace(/✔|✅|️/g, "").trim();

      options.push({
        key,
        text,
        correct,
      });
    }

    // Agar to‘g‘ri javob "to‘g‘ri javob: C" formatida berilgan bo‘lsa
    if (!answerKey) {
      const hint = block.match(/to['‘`]?g['‘`]?ri\s+javob\s*[:\-–]\s*([A-DА-Г])/i);
      if (hint) {
        answerKey = toLatinOptionKey(hint[1]);
        const found = options.find(o => o.key === toLatinOptionKey(hint[1]));
        if (found) found.correct = true;
      }
    }

    // Yakuniy savol obyektini qo‘shamiz
    items.push({
      id: String(order),
      order,
      question: questionText,
      options,
      answerKey,
      locale,
    });
  }

  return {
    title: (fileName ?? "Parsed Test").replace(/\.[^.]+$/, ""),
    sourceFileName: fileName,
    count: items.length,
    items,
    createdAt: new Date().toISOString(),
    schema: "v1" as const,
  };
}

/** Kirill variant harflarini mos lotinga o‘giradi */
function toLatinOptionKey(ch: string): string {
  const c = ch.toUpperCase();
  const map: Record<string, string> = { А: "A", В: "B", С: "C", Д: "D" };
  return map[c] || c;
}
