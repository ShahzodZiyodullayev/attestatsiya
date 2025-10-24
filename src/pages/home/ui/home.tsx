import { Button, Center, Container, Flex, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons/faCopyright";

const Home = () => {
  return (
    <Container size="md">
      <Flex h="100vh" direction="column" gap="md" justify="center" align="center">
        {LINKS.map(({ label, to }) => (
          <Link to={to} style={{ width: 300, textDecoration: "none" }} key={to}>
            <Center>
              <Button fullWidth maw={300} color="dark">
                {label}
              </Button>
            </Center>
          </Link>
        ))}
        <Text fz={14} style={{ position: "absolute", bottom: 10 }}>
          <FontAwesomeIcon icon={faCopyright} size="xs" /> Innovatsion va raqamli texnologiyalari
          departamenti
        </Text>
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
  { label: "Fil set", to: "fil" },
  { label: "Komplens", to: "komplens" },
  { label: "Tasodifiy 50 ta", to: "random" },
  // { label: "Dev mode", to: "testing" },
];
