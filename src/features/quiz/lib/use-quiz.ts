import { useState } from "react";

import type { QuizItem } from "@/shared/types/quiz";
import questionsData from "@/features/quiz/data/IT.json";

export function useQuiz() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [finished, setFinished] = useState(false);

  const questions: QuizItem[] | any = questionsData.items;
  const current = questions[index];
  const total = questions.length;

  const answer = (key: string) => {
    setAnswers(prev => ({ ...prev, [current.id]: key }));
    if (index + 1 < total) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  const reset = () => {
    setAnswers({});
    setIndex(0);
    setFinished(false);
  };

  const score = Object.entries(answers).reduce((sum, [id, key]) => {
    const q = questions.find((q: any) => q.id === id);
    if (q && q.answerKey === key) return sum + 1;
    return sum;
  }, 0);

  return {
    questions,
    current,
    index,
    total,
    finished,
    answers,
    answer,
    score,
    reset,
  };
}
