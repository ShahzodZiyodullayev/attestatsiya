import { Group, Radio, Text } from "@mantine/core";

import classes from "./tests.module.pcss";

const TestCardOptions = (option: any, value: string | null) => {
  const bg = value
    ? value === option.text && !option.correct
      ? "#fbbab6"
      : !option.correct
        ? "#f2f4f6"
        : "#b8e3cf"
    : "#f2f4f6";

  return (
    <Radio.Card
      disabled={!!value}
      bg={bg}
      className={`${classes.root} ${value === option.text ? (option.correct ? classes.correct : classes.incorrect) : ""}`}
      radius="md"
      value={option.text}
      key={option.text}>
      <Group wrap="nowrap" align="flex-start">
        <Text className={classes.label}>{`${option.key}. ${option.text}`}</Text>
      </Group>
    </Radio.Card>
  );
};

export default TestCardOptions;
