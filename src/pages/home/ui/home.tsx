import { Button, Center, Container, Flex } from "@mantine/core";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container size="md">
      <Flex h="100vh" direction="column" gap="md" justify="center" align="center">
        {LINKS.map(({ label, to }) => (
          <Link to={to} style={{ width: 300 }}>
            <Center>
              <Button fullWidth maw={300}>
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
  { label: "IT", to: "it" },
  { label: "Raqamli", to: "raqamli" },
  { label: "Karta", to: "karta" },
  { label: "Strategiya", to: "strategiya" },
  { label: "Test", to: "test" },
  { label: "Dev mode", to: "testing" },
];
