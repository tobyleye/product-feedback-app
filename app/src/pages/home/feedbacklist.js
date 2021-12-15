import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import {  FaPlus } from "react-icons/fa";
import { FeedbackCard  } from "../../components/cards"; 

export function FeedbackList({ data }) {
  if (data.length === 0) {
    return (
      <Box bg="white">
        <Box>
          <Heading size="md" mb={2}>
            There's no feedback yet
          </Heading>
          <Text mb={4}>
            Got a suggestion? Found a bug that needs to be squashed? We love
            hearing about new ideas to improve our app.
          </Text>
          <Button leftIcon={<FaPlus />}>Add Feedback</Button>
        </Box>
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
