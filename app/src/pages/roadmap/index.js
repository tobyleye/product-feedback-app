import { Center, Heading, Button } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function Roadmap() {
  return (
    <Center h="100vh" textAlign="center">
      <Helmet>
        <title>Roadmap: Work in progress</title>
        </Helmet>
      <div>
        <Heading mb={4}>WIP</Heading>
        <Button as={Link} to="/">Take me home</Button>
      </div>
    </Center>
  );
}
