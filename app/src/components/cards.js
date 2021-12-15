import {
  Box,
  Button,
  Heading,
  Text,
  Grid,
  HStack,
} from "@chakra-ui/react";
import { FaChevronUp, FaComment, } from "react-icons/fa";
import { Link } from "react-router-dom";

export let FeedbackCard = ({ feedback, disableLink = false }) => {
  return (
    <article>
      <Grid
        p={8}
        bg="white"
        rounded="lg"
        gridTemplateColumns="auto 1fr auto"
        gap={6}
      >
        <Box>
          <Button
            flexDirection="column"
            py={2}
            px={2}
            height="auto"
            rounded="lg"
          >
            <Box mb={2}>
              <FaChevronUp />
            </Box>
            <span>99</span>
          </Button>
        </Box>
        <Box>
          <Heading size="md">
            {disableLink ? (
              <span>{feedback.title}</span>
            ) : (
              <Link to={`/feedback/${feedback.id}`}>{feedback.title}</Link>
            )}
          </Heading>
          <Text size="sm" my={2}>
            {feedback.detail}
          </Text>
          <Box className="feedback-category">
            <Button size="sm">Feature</Button>
          </Box>
        </Box>

        <Box>
          <HStack spacing={2}>
            <FaComment />
            <span>2</span>
          </HStack>
        </Box>
      </Grid>
    </article>
  );
};
