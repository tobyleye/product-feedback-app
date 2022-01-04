import { Box, Button, Heading, Text, HStack, Icon } from "@chakra-ui/react";
import { FaChevronUp, FaComment} from "react-icons/fa";
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
      variant="interactive"
      flexDirection={horizontal ? "row" : "column"}
      
      height="auto"
      rounded="lg"
      onClick={onClick}
    >
      <FaChevronUp />
      <Box w={1} h={1} />
      <Text color="gray.5">{upvotes}</Text>
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
        gap={8}
      >
        <Box display={["none", "block"]}>
          <UpvoteButton upvotes={feedback.upvotes} onClick={handleUpvote} />
        </Box>
        <Box>
          <Heading variant="h3" as="h3" mb={1}>
            {disableLink ? (
              <span>{feedback.title}</span>
            ) : (
              <Link to={`/feedback/${feedback.id}`}>{feedback.title}</Link>
            )}
          </Heading>
          <Text variant="body1" mb={4}>
            {feedback.detail}
          </Text>
          <Box className="feedback-category">
            <Box as="span" px="14px" py="10px" fontWeight="700"  fontSize="13px" color="blue.1" bg="gray.1" rounded="10px" >{feedback.category}</Box>
          </Box>
        </Box>

        <Box
          mt={[6, 0]}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display={["block", "none"]}>
            <UpvoteButton
              horizontal
              upvotes={feedback.upvotes}
              onClick={handleUpvote}
            />
          </Box>
          <HStack spacing={2}>
            <Icon as={FaComment} color="#CDD2EE" />
            <Text fontWeight="800" fontSize="md" color="gray.5" >{feedback?.comments?.length}</Text>
          </HStack>
        </Box>
      </Box>
    </Card>
  );
};
