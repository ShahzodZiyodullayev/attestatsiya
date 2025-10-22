import { Button, Card, Stack, Title, Text, Progress, Group, Badge } from "@mantine/core";
import { motion } from "framer-motion";

import { useQuiz } from "@/features/quiz";

export default function QuizPage() {
  const quiz = useQuiz();

  if (!quiz.current) return <Text>Test yuklanmadi 😢</Text>;

  if (quiz.finished) {
    return (
      <Stack align="center" justify="center" h="100vh">
        <Card shadow="sm" radius="lg" withBorder p="xl">
          <Title order={2} ta="center">
            ✅ Test yakunlandi
          </Title>
          <Text mt="sm" ta="center">
            Siz {quiz.total} ta savoldan {quiz.score} tasiga to‘g‘ri javob berdingiz.
          </Text>
          <Button mt="xl" onClick={quiz.reset}>
            Qayta boshlash
          </Button>
        </Card>
      </Stack>
    );
  }

  const q = quiz.current;

  return (
    <Stack align="center" justify="center" h="100vh" p="lg">
      <Card withBorder shadow="sm" radius="lg" w={600}>
        <Group justify="space-between" mb="xs">
          <Badge color="blue">
            {quiz.index + 1}/{quiz.total}
          </Badge>
          <Text c="dimmed">{q.locale === "cyr" ? "Кирилл" : "Lotin"}</Text>
        </Group>

        <Title order={4} mb="md">
          {q.order}) {q.question}
        </Title>

        <Stack>
          {q.options.map((opt: any) => (
            <motion.div key={opt.key} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button fullWidth variant="outline" color="blue" onClick={() => quiz.answer(opt.key)}>
                {opt.key}) {opt.text}
              </Button>
            </motion.div>
          ))}
        </Stack>

        <Progress value={((quiz.index + 1) / quiz.total) * 100} mt="md" />
      </Card>
    </Stack>
  );
}
