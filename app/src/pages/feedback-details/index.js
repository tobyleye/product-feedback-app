import { useQuery } from "@apollo/client";
import { Box, Button, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { fetchFeedback } from "../../graphql/queries";
import { BackButton } from "../../components/buttons";
import { Card, FeedbackCard } from "../../components/cards";
import CommentForm from "./comment-form";
import { Link } from "react-router-dom";
import { Padded } from "../../components/layouts";
import { Comment } from "./comment";
import { useCurrentUser } from "../../context/currentuser";
import { Helmet } from "react-helmet";

export default function FeedbackDetailsPage() {
  const { id } = useParams();

  const { data } = useQuery(fetchFeedback, {
    variables: {
      id,
    },
  });

  const currentUser = useCurrentUser();

  let feedback = data?.feedbackRequest;

  return (
    <Padded>
      <Helmet>
        <title>
          {feedback
            ? `${feedback.title} by @${feedback?.user?.username || "johndoe"}`
            : ""}
        </title>
      </Helmet>
      <Box maxWidth="800px" mx="auto">
        <Box as="header" display="flex" mb={5} justifyContent="space-between">
          <BackButton />
          {feedback && currentUser && feedback.user?.id === currentUser.id && (
            <Button
              as={Link}
              to={`/feedback/${feedback?.id}/edit`}
              variant="blue"
            >
              Edit Feedback
            </Button>
          )}
        </Box>
        {feedback && (
          <div>
            <Box as="section" mb={6}>
              <FeedbackCard feedback={feedback} disableLink />
            </Box>

            <CommentForm feedbackId={id} />

            <Box as="section" id="comments" mb={5}>
              <Card>
                <Heading size="md" mb={8}>
                  {feedback.comments.length} Comments
                </Heading>

                <div>
                  {feedback.comments.map((comment) => (
                    <Comment
                      key={comment.id}
                      id={comment.id}
                      user={comment.user}
                      body={comment.content}
                      replies={comment.replies}
                      feedbackId={id}
                    />
                  ))}
                </div>
              </Card>
            </Box>
          </div>
        )}
      </Box>
    </Padded>
  );
}
