import { Box, Button, Heading, Text, HStack, Icon, useToast} from "@chakra-ui/react";
import { FaChevronUp, FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { fetchFeedbackList } from "../graphql/queries";
import { useUpvoted } from "../context/upvoted-feedback";
import { useCurrentUser } from "../context/currentuser"


export let Card = (props) => <Box bg="white" p={8} rounded="lg" {...props} />;

let upvoteMutation = gql`
  mutation upvote($id: String!) {
    upvoteFeedbackRequest(id: $id) {
      upvotes
    }
  }
`;

let noop = () => undefined;

let UpvoteButton = ({
  checked,
  onClick = noop,
  upvotes = "",
  horizontal = false,
}) => {
  return (
    <Button
      aria-checked={checked}
      variant="interactive"
      flexDirection={horizontal ? "row" : "column"}
      height="auto"
      rounded="lg"
      _checked={{
        bg: "blue.1",
        color: "white",
      }}
      onClick={onClick}
    >
      <FaChevronUp />
      <Box w={1} h={1} />
      <Text color={checked ? 'white': "gray.5"}>{upvotes}</Text>
    </Button>
  );
};

export let FeedbackCard = ({ feedback, disableLink = false }) => {
  let [upvote] = useMutation(upvoteMutation);
  let [upvotedRequests, setUpvotedRequests] = useUpvoted();
  let [currentUser] = useCurrentUser()
  let toast = useToast()

  let handleUpvote = () => {
    if (!currentUser) {
      toast({
        status: 'error',
        description: 'You have to be logged in to upvote a feedback request'
      })
      return
    }
    if (upvotedRequests.includes(feedback.id)) return;
    upvote({
      variables: {
        id: feedback.id,
      },
      refetchQueries: [
        {
          query: fetchFeedbackList,
        },
      ],
    }).then(() => {
      setUpvotedRequests((requests) => requests.concat(feedback.id));
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
          <UpvoteButton
            checked={upvotedRequests.includes(feedback.id)}
            upvotes={feedback.upvotes}
            onClick={handleUpvote}
          />
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
            <Box
              as="span"
              px="14px"
              py="10px"
              fontWeight="700"
              fontSize="13px"
              color="blue.1"
              bg="gray.1"
              rounded="10px"
            >
              {feedback.category}
            </Box>
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
              checked={upvotedRequests.includes(feedback.id)}
              horizontal
              upvotes={feedback.upvotes}
              onClick={handleUpvote}
            />
          </Box>
          <HStack spacing={2}>
            <Icon as={FaComment} color="#CDD2EE" />
            <Text fontWeight="800" fontSize="md" color="gray.5">
              {feedback.commentCount}
            </Text>
          </HStack>
        </Box>
      </Box>
    </Card>
  );
};
