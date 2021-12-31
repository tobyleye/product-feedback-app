import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { Padded } from "../../components/layouts";
import { fetchFeedbackList } from "../../graphql/queries";
import { WelcomeCard, CategoryFilters, Roadmap } from "./aside";
import { FeedbackList } from "./feedbacklist";
import Header from "./header";
import { MobileMenu } from "./mobilemenu";
import { useCurrentUser } from "../../context/currentuser";

export default function Home() {
  const { data } = useQuery(fetchFeedbackList);
  const currentUser = useCurrentUser();

  return (
    <Box>
      <Box display={{ base: "block", md: "none" }}>
        <MobileMenu />
        <Header totalSuggestions={data?.feedbackRequests?.length} />
      </Box>
      <Padded>
        {JSON.stringify(currentUser)}
        <Box maxW="1080" mx="auto">
          <Box display="grid" gridTemplateColumns={{ lg: "auto 1fr" }} gap={8}>
            <Box
              alignSelf="flex-start"
              width={{ lg: "260px" }}
              position={{ lg: "sticky" }}
              top={{ lg: "16px" }}
              display={{ base: "none", md: "grid" }}
              gridTemplateColumns={{ base: "repeat(3, 1fr)", lg: "1fr" }}
              gap={4}
            >
              <WelcomeCard />
              <CategoryFilters />
              <Roadmap />
            </Box>
            <div>
              <Box display={{ base: "none", md: "block" }} mb={6}>
                <Header totalSuggestions={data?.feedbackRequests?.length} />
              </Box>
              {data && <FeedbackList data={data.feedbackRequests} />}
            </div>
          </Box>
        </Box>
      </Padded>
    </Box>
  );
}
