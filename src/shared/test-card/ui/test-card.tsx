import { Card, Radio, Stack, Title } from "@mantine/core";
import { forwardRef, useState } from "react";
import { useDispatch } from "react-redux";

import classes from "@/pages/test/ui/tests.module.pcss";
import { TestCardOptions } from "@/shared/test-card";
import { setResult } from "@/entities/result/model";

const TestCard = forwardRef<HTMLInputElement, { test: any; onOptionSelect: any }>(
  ({ test, onOptionSelect }, ref) => {
    const [value, setValue] = useState<string | null>(null);
    const [correctOption, setCorrectOption] = useState<boolean | null>(null);
    const dispatch = useDispatch();

    const handleOptionChange = (val: string) => {
      setValue(val);
      onOptionSelect?.();
      const selectedOption = test?.options.find((option: any) => option.text === val)?.correct;
      dispatch(setResult(selectedOption));
    };

    return (
      <Card
        padding="sm"
        radius="md"
        withBorder
        ref={ref}
        style={{
          transition: "border 150ms",
          border: `2px solid ${value ? (correctOption ? "rgb(51, 204, 129)" : "rgb(234, 56, 51)") : "white"}`,
        }}>
        <Title order={3} className={classes.title}>
          {test.order}. {test.question}
        </Title>
        <Radio.Group
          value={value}
          onChange={val => {
            handleOptionChange(val);
            setCorrectOption(test?.options.find((option: any) => option.text === val)?.correct);
            setValue(val);
          }}>
          <Stack pt="md" gap="xs">
            {test.options.map((option: any) => TestCardOptions(option, value))}
          </Stack>
        </Radio.Group>
      </Card>
    );
  },
);

export default TestCard;
