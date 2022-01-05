import { Center, Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Roadmap() {
  return (
    <Center h="100vh" textAlign="center">
      <div>
        <Heading mb={4}>WIP</Heading>
        <Button as={Link} to="/">Take me home</Button>
      </div>
    </Center>
  );
}
