import { saveAs } from "file-saver";

import type { QuizPayload } from "@/shared/types/quiz";

export function downloadJson(payload: QuizPayload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json;charset=utf-8",
  });
  const name = `${slugify(payload.title)}.quiz.json`;
  saveAs(blob, name);
}

export async function saveJsonToDirectory(payload: QuizPayload) {
  // @ts-ignore: experimental
  if (!window.showDirectoryPicker)
    throw new Error("File System Access API not supported in this browser");

  // @ts-ignore
  const dirHandle = await window.showDirectoryPicker();
  const fileName = `${slugify(payload.title)}.quiz.json`;
  const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(JSON.stringify(payload, null, 2));
  await writable.close();
  return fileName;
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^\w\-]+/g, "-")
    .replace(/\-+/g, "-")
    .replace(/^\-+|\-+$/g, "");
}
