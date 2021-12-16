import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { FeedbackCard } from "../../components/cards";
import { ReactComponent as NoFeedback } from "../../assets/no-feedback.svg";
import { Link } from "react-router-dom";

export function FeedbackList({ data }) {
  if (data.length === 0) {
    return (
      <Box
        textAlign="center"
        bg="white"
        display="flex"
        flexDirection="column"
        alignItems="center"
        py="14vh"
        px="4rem"
        rounded="lg"
      >
        <NoFeedback />
        <Heading size="md" mt={12} mb={4}>
          There is no feedback yet
        </Heading>
        <Box mb={10}>
          <Text>
            Got a suggestion? Found a bug that needs to be squashed?<br /> We love
            hearing about new ideas to improve our app.
          </Text>
        </Box>
        <Button as={Link} to="/feedback/new" leftIcon={<FaPlus />}>Add Feedback</Button>
      </Box>
    );
  }
  return (
    <VStack alignItems="stretch" spacing={5} as="ul" listStyleType="none">
      {data.map((feedback) => (
        <li key={feedback.id}>
          <FeedbackCard feedback={feedback} />
        </li>
      ))}
    </VStack>
  );
}
