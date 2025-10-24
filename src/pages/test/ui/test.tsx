import { Container, Title, Stack, Modal, ScrollArea, Text, Flex } from "@mantine/core";
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
      setTimeout(() => {
        nextCard.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }, 100);
    }
  };

  useEffect(() => {
    if (quizType === "random") {
      const allTests = Object.values(data).reduce((acc: any[], category: any) => {
        return [...acc, ...category.items];
      }, []);

      const shuffled = allTests.sort(() => Math.random() - 0.5);
      const selectedTests = shuffled.slice(0, 50).map(test => {
        const shuffledOptions = [...test.options];
        shuffledOptions.sort(() => Math.random() - 0.5);
        const newCorrectIndex = shuffledOptions.findIndex(opt => opt.correct);
        const newOptions = shuffledOptions.map((opt, index) => ({
          ...opt,
          key: String.fromCharCode(65 + index),
        }));

        return {
          ...test,
          options: newOptions,
          answerKey: String.fromCharCode(65 + newCorrectIndex),
        };
      });

      setTests({
        title: "Tasodifiy Testlar",
        items: selectedTests,
      });

      dispatch(setResult({ total: 50 }));
    } else {
      const originalTests = data[quizType as keyof typeof data];
      const testsWithShuffledOptions = {
        ...originalTests,
        items: originalTests.items.map(test => {
          const shuffledOptions = [...test.options];
          shuffledOptions.sort(() => Math.random() - 0.5);
          const newCorrectIndex = shuffledOptions.findIndex(opt => opt.correct);
          const newOptions = shuffledOptions.map((opt, index) => ({
            ...opt,
            key: String.fromCharCode(65 + index),
          }));

          return {
            ...test,
            options: newOptions,
            answerKey: String.fromCharCode(65 + newCorrectIndex),
          };
        }),
      };

      setTests(testsWithShuffledOptions);
      dispatch(
        setResult({
          total: testsWithShuffledOptions.items.length || 0,
        }),
      );
    }
  }, [data, quizType]);

  useEffect(() => {
    let isEnd = res.correct + res.incorrect + res.unanswered === res.total;
    if (isEnd && !!res.total) open();
  }, [res]);

  return (
    <ScrollArea h="100vh" offsetScrollbars style={{ overflow: "auto" }}>
      <Container size="md" py="xl">
        <Title mb={30} ta="center">
          {tests?.title}
        </Title>
        <Stack gap="lg">
          {tests?.items?.length &&
            tests.items.map((test: any, index: number) => (
              <TestCard
                key={test.order}
                test={test}
                ref={(el: any) => (cardRefs.current[index] = el)}
                onOptionSelect={() => handleScrollToNext(index)}
              />
            ))}
        </Stack>

        <Modal opened={opened} onClose={close} title="Natijalar" centered>
          <Stack gap={0}>
            <Flex justify="space-between">
              <Text>To'g'ri javoblar: </Text>
              <Text>{res.correct}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>Noto'g'ri javoblar: </Text>
              <Text>{res.incorrect}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>Javobsiz qoldirilganlar: </Text>
              <Text>{res.unanswered}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>Foiz: </Text>
              <Text>{((res.correct / res.total) * 100).toFixed(1)} %</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>Jami savollar: </Text>
              <Text>{res.total}</Text>
            </Flex>
          </Stack>
        </Modal>
      </Container>
    </ScrollArea>
  );
};

export default Test;
