import { useQuery } from "@apollo/client";
import { Box,  Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { fetchFeedback } from "../../graphql/queries";
import { BackButton } from "../../components/buttons";
import { FeedbackCard } from "../../components/cards";

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
      <Box as="header" display="flex" mb={4} justifyContent="space-between">
        <BackButton />
        <Button color="primary">Edit Feedback</Button>
      </Box>
      {feedback && (
        <div>
          <Box as="section" mb={4}>
            <FeedbackCard feedback={feedback} disableLink />
          </Box>

          <Box as="section" id="comments"></Box>
        </div>
      )}
    </Box>
  );
}
