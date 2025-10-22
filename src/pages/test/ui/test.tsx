import { Container, Title, Stack, Modal } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useDisclosure } from "@mantine/hooks";

import { TestCard } from "@/shared/test-card";
import { data } from "@/features/quiz/data/data";
import { setResult } from "@/entities/result/model";

const Test = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { quizType } = useParams();
  const [tests, setTests] = useState<any>([]);
  const dispatch = useDispatch();
  const res = useSelector((state: any) => state.result);

  const handleScrollToNext = (currentIndex: number) => {
    const nextCard = cardRefs.current[currentIndex + 1];

    if (nextCard) {
      nextCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    setTests(data[quizType as keyof typeof data]);
    dispatch(
      setResult({
        total: data[quizType as keyof typeof data]?.items.length || 0,
      }),
    );
  }, [data, quizType]);

  useEffect(() => {
    let isEnd = res.correct + res.incorrect + res.unanswered === res.total;
    if (isEnd && !!res.total) open();
  }, [res]);

  return (
    <Container size="md" py="xl">
      <Title mb={30} ta="center">
        {tests?.title}
      </Title>
      <Stack gap="lg">
        {tests?.items?.length &&
          tests.items.slice(0, 10).map((test: any, index: number) => (
            <Stack key={test.order}>
              <TestCard
                key={test.order}
                test={test}
                ref={(el: any) => (cardRefs.current[index] = el)}
                onOptionSelect={() => handleScrollToNext(index)}
              />
            </Stack>
          ))}
      </Stack>

      <Modal opened={opened} onClose={close} title="Natijalar" centered>
        <Stack>
          <Title order={4}>To'g'ri javoblar: {res.correct}</Title>
          <Title order={4}>Noto'g'ri javoblar: {res.incorrect}</Title>
          <Title order={4}>Javobsiz qoldirilganlar: {res.unanswered}</Title>
          <Title order={4}>Foiz: {(res.correct / res.total) * 100} %</Title>
          <Title order={3}>Jami savollar: {res.total}</Title>
        </Stack>
      </Modal>
    </Container>
  );
};

export default Test;
