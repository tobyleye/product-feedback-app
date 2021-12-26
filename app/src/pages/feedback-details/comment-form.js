import { Heading, Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import { FormField } from "../../components/form";
import { Card } from "../../components/cards";
import { useMutation, gql } from "@apollo/client";
import { fetchFeedback } from "../../graphql/queries";

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

  return (
    <Card>
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
        />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <p>{maxCharacter - comment.length} characters left</p>
          <Button type="submit" isLoading={loading}>
            Post Comment
          </Button>
        </Box>
      </form>
    </Card>
  );
}
