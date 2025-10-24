import { Button, Center, Container, Flex } from "@mantine/core";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container size="md">
      <Flex h="100vh" direction="column" gap="md" justify="center" align="center">
        {LINKS.map(({ label, to }) => (
          <Link to={to} style={{ width: 300 }}>
            <Center>
              <Button fullWidth maw={300} color="dark">
                {label}
              </Button>
            </Center>
          </Link>
        ))}
      </Flex>
    </Container>
  );
};

export default Home;

const LINKS = [
  { label: "Raqamli texnologiyalar", to: "raqamli" },
  { label: "Ijro", to: "ijro" },
  { label: "Strategiya", to: "strategiya" },
  { label: "Axborot xizmati", to: "axborot" },
  { label: "Yuridik departament", to: "yuridik" },
  { label: "Tasodifiy 50 ta", to: "random" },
  // { label: "Dev mode", to: "testing" },
];
