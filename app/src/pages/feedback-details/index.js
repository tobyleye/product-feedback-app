import { useQuery } from "@apollo/client";
import { Box, Button, Heading, Text, HStack, Avatar } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { fetchFeedback } from "../../graphql/queries";
import { BackButton } from "../../components/buttons";
import { Card, FeedbackCard } from "../../components/cards";
import CommentForm from "./comment-form";
import { Link } from "react-router-dom";
import { Padded } from "../../components/layouts";
import { useState } from "react";
import { FormField } from "../../components/form";

export default function FeedbackDetailsPage() {
  const { id } = useParams();

  const { data } = useQuery(fetchFeedback, {
    variables: {
      id,
    },
  });

  let feedback = data?.feedbackRequest;

  return (
    <Padded>
      <Box maxWidth="800px" mx="auto">
        <Box as="header" display="flex" mb={5} justifyContent="space-between">
          <BackButton />
          {feedback && (
            <Button
              as={Link}
              to={`/feedback/${feedback.id}/edit`}
              color="primary"
            >
              Edit Feedback
            </Button>
          )}
        </Box>
        {feedback && (
          <div>
            <Box as="section" mb={4}>
              <FeedbackCard feedback={feedback} disableLink />
            </Box>

            <Box as="section" id="comments" mb={5}>
              <Card>
                <Heading size="md" mb={8}>
                  {feedback.comments.length} Comments
                </Heading>

                <div>
                  {feedback.comments.map((comment, index) => (
                    <Comment comment={comment} key={index} />
                  ))}
                </div>
              </Card>
            </Box>

            <CommentForm />
          </div>
        )}
      </Box>
    </Padded>
  );
}

function Comment({ comment }) {
  let [show, setShow] = useState(false);
  let [body, setBody] = useState("");

  let submit = (e) => {
    e.preventDefault();
  };

  return (
    <Box display="flex">
      <Box flexShrink={0} mr={8}>
        <Avatar size="md" name="John Doe" />
      </Box>
      <Box flex="1">
        <Box
          mb={4}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <div>
            <Heading size="h4">John Doe</Heading>
            <Text size="body2">@hexagon.bestagon</Text>
          </div>
          <Button variant="link" onClick={() => setShow((show) => !show)}>
            Reply
          </Button>
        </Box>

        <Text mb={4}>{comment.content}</Text>

        {show && (
          <form onSubmit={submit}>
            <FormField
              type="textarea"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              mb={0}
            />
            <Box display="flex" justifyContent="flex-end">
              <HStack spacing={2}>
                <Button
                  onClick={() => setShow(false)}
                  type="button"
                  colorScheme="red"
                >
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </HStack>
            </Box>
          </form>
        )}
      </Box>
    </Box>
  );
}
