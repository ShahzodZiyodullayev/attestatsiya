export type Option = {
  key: string;
  text: string;
  correct: boolean;
};

export type QuizItem = {
  id: string;
  order: number;
  question: string;
  options: Option[];
  answerKey: string | null;
  explanation?: string;
  locale: "lat" | "cyr" | "mixed";
};

export type QuizPayload = {
  title: string;
  sourceFileName?: string;
  count: number;
  items: QuizItem[];
  createdAt: string;
  schema: "v1";
};
