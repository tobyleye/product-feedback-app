import { Heading, Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FormField } from "../../components/form";
import { Card } from "../../components/cards";
import { useMutation, gql } from "@apollo/client";
import { fetchFeedback } from "../../graphql/queries";
import { useCurrentUser } from "../../context/currentuser";
import { Link } from "react-router-dom"

const maxCharacter = 255;

let addComment = gql`
  mutation addComment($feedbackId: String!, $comment: String!) {
    addComment(feedbackId: $feedbackId, comment: $comment) {
      id
      content
    }
  }
`;
export default function CommentForm({ feedbackId }) {
  let [comment, setComment] = useState("");
  let [postComment, { loading }] = useMutation(addComment);
  let currentUser = useCurrentUser();

  return (
    <Card mb={6}>
      <Heading size="md" mb={6}>
        Add comment
      </Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          postComment({
            variables: {
              comment,
              feedbackId,
            },
            refetchQueries: [
              {
                query: fetchFeedback,
                variables: {
                  id: feedbackId,
                },
              },
            ],
          })
            .then(() => {
              setComment("");
            })
            .catch(() => {});
        }}
      >
        <FormField
          type="textarea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={!currentUser}
        />

        {currentUser ? (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text size="body2">
              {maxCharacter - comment.length} characters left
            </Text>

            <Button type="submit" isLoading={loading}>
              Post Comment
            </Button>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text size="body2">Login to comment</Text>

            <Button type="button" as={Link} to="/login" isLoading={loading}>
              Login
            </Button>
          </Box>
        )}
      </form>
    </Card>
  );
}
