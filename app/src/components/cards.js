import { Box, Button, Heading, Text, HStack } from "@chakra-ui/react";

import { FaChevronUp, FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { fetchFeedbackList } from "../graphql/queries";

export let Card = (props) => <Box bg="white" p={8} rounded="lg" {...props} />;

let upvoteMutation = gql`
  mutation upvote($id: String!) {
    upvoteFeedbackRequest(id: $id) {
      upvotes
    }
  }
`;

let noop = () => undefined;

let UpvoteButton = ({ onClick = noop, upvotes = "", horizontal = false }) => {
  return (
    <Button
      flexDirection={horizontal ? "row" : "column"}
      py={2}
      px={2}
      height="auto"
      rounded="lg"
      onClick={onClick}
    >
      <FaChevronUp />
      <Box w={2} h={2} />
      <span>{upvotes}</span>
    </Button>
  );
};

export let FeedbackCard = ({ feedback, disableLink = false }) => {
  let [upvote] = useMutation(upvoteMutation);

  let handleUpvote = () => {
    upvote({
      variables: {
        id: feedback.id,
      },
      refetchQueries: [
        {
          query: fetchFeedbackList,
        },
      ],
    });
  };
  return (
    <Card as="article">
      <Box
        display={["block", "grid"]}
        gridTemplateColumns={[null, "auto 1fr auto"]}
        gap={6}
      >
        <Box display={["none", "block"]}>
          <UpvoteButton upvotes={feedback.upvotes} onClick={handleUpvote} />
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

        <Box mt={[4,null]} display="flex" justifyContent="space-between" alignItems="center">
          <Box display={["block", "none"]}>
            <UpvoteButton
              horizontal
              upvotes={feedback.upvotes}
              onClick={handleUpvote}
            />
          </Box>
          <HStack spacing={2}>
            <FaComment />
            <span>{feedback?.comments?.length}</span>
          </HStack>
        </Box>
      </Box>
    </Card>
  );
};
