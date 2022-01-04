import { useState } from "react"
import { FormField } from "../../components/form";
import {Box,Button,} from "@chakra-ui/react"
import {gql, useMutation} from "@apollo/client"
import { fetchFeedback } from "../../graphql/queries";


let replyMutation = gql`
  mutation replyComment(
    $feedbackId: String!
    $commentId: String!
    $reply: String!
  ) {
    replyComment(
      feedbackId: $feedbackId
      commentId: $commentId
      reply: $reply
    ) {
      id
    }
  }
`;


export default function ReplyForm({ feedbackId, commentId, onClose}) {
    let [body, setBody] = useState('')
    let [postReply, { loading }] = useMutation(replyMutation);

    let submit = (e) => {
      e.preventDefault();
      postReply({
        variables: {
          feedbackId: feedbackId,
          commentId: commentId,
          reply: body,
        },
        refetchQueries: [
          {
            query: fetchFeedback,
            variables: {
              id: feedbackId,
            },
          },
        ],
      }).then(() => {
        setBody("");
        onClose()
      });
    };

    return (
        <form onSubmit={submit}>
        <FormField
          type="textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          mb={14}
          required
        />
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <Button
            size="sm"
            variant="red"
            onClick={onClose}
            type="button"
            disabled={loading}
          >
            Cancel
          </Button>
          <Box w={2} h={2} />
          <Button size="sm" isLoading={loading} type="submit">
            Submit
          </Button>
        </Box>
      </form>
    )
}