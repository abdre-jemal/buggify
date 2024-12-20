import { Box, Container, Heading, Text } from "@radix-ui/themes";

function About() {
  return (
    <Container
      id="about"
      className="bg-slate-950 p-8 flex justify-center  min-h-screen"
    >
      <Box className="text-white max-w-2xl mx-auto">
        <Heading className="text-center underline text-p1 my-2" size="8">
          About
        </Heading>
        <Text className="text-white  z-50 text-center" size="4">
          The Buggy React Code Practice App is a one-person project created to
          help developers improve their React debugging skills. It allows users
          to pick a topic and difficulty level, then generates buggy React code
          for practice. With features like an integrated code editor,
          AI-generated solutions, and real-time code execution, this app makes
          learning to debug both fun and practical. Built with care and a
          passion for coding, this project is designed to make debugging easier
          and more engaging for everyone.
        </Text>
      </Box>
    </Container>
  );
}

export default About;
