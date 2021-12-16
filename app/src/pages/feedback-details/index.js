import { useQuery } from "@apollo/client";
import { Box, Button, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { fetchFeedback } from "../../graphql/queries";
import { BackButton } from "../../components/buttons";
import { Card, FeedbackCard } from "../../components/cards";
import CommentForm from "./comment-form";
import { Link } from "react-router-dom";

export default function FeedbackDetailsPage() {
  const { id } = useParams();

  const { data } = useQuery(fetchFeedback, {
    variables: {
      id,
    },
  });

  let feedback = data?.feedbackRequest;

  return (
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
              <Heading size="md">{feedback.comments.length} Comments</Heading>
            </Card>
          </Box>

          <CommentForm />
        </div>
      )}
    </Box>
  );
}
