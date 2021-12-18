import { Box, Button, Heading, Text, Grid, HStack } from "@chakra-ui/react";
import { FaChevronUp, FaComment  } from "react-icons/fa";
import { Link } from "react-router-dom";

export let Card = (props) => <Box bg="white" p={8} rounded="lg" {...props} />;

export let FeedbackCard = ({ feedback, disableLink = false }) => {
  return (
    <Card as="article">
      <Grid gridTemplateColumns="auto 1fr auto" gap={6}>
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
            <span>{feedback.upvotes}</span>
          </Button>
        </Box>
        <Box>
          <Heading size="h3" as="h3">
            {disableLink ? (
              <span>{feedback.title}</span>
            ) : (
              <Link to={`/feedback/${feedback.id}`}>{feedback.title}</Link>
            )}
          </Heading>
          <Text size="body1" mt={2} mb={3}>
            {feedback.detail}
          </Text>
          <Box className="feedback-category">
            <Button size="sm">{feedback.category}</Button>
          </Box>
        </Box>

        <Box>
          <HStack spacing={2}>
            <FaComment />
            <span>{feedback?.comments?.length}</span>
          </HStack>
        </Box>
      </Grid>
    </Card>
  );
};
