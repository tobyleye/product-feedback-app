import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { Padded } from "../../components/layouts";
import { fetchFeedbackList } from "../../graphql/queries";
import Aside from "./aside";
import { FeedbackList } from "./feedbacklist";
import Header from "./header";

export default function Home() {
  const { data } = useQuery(fetchFeedbackList);

  return (
    <Padded>
      <Box maxW="920px" mx="auto">
        <Box display="grid" gridTemplateColumns="auto 1fr" gap={8}>
          <Aside />
          <div>
            <Header />
            {data && <FeedbackList data={data.feedbackRequests} />}
          </div>
        </Box>
      </Box>
    </Padded>
  );
}
