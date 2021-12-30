import { Button } from "@chakra-ui/button";
import { VStack, Box, Heading, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { fetchCurrentUser } from "../../graphql/queries";
import { useFeedbackListContext } from "../../context/feedbacklist";

const Card = styled.div`
  padding: 1rem 1rem;
  background: #fff;
  border-radius: 10px;
`;

const GradientCard = styled(Card)`
  background: radial-gradient(
    128.88% 128.88% at 103.9% -10.39%,
    #e84d70 0%,
    #a337f6 53.09%,
    #28a7ed 100%
  );
  color: white;
  padding-top: 5rem;
`;

const RoadMap = styled(Card)`
  a {
    text-decoration: underline;
    font-size: 14px;
  }

  li {
    display: flex;
    align-items: center;

    span {
      margin-left: auto;
      font-weight: 600;
    }

    &::before {
      content: "";
      display: inline-block;
      background: var(--color, #ccc);
      width: 8px;
      height: 8px;
      border-radius: 10px;
      margin-right: 12px;
    }
  }
`;

export function WelcomeCard() {
  return (
    <GradientCard>
      <Heading color="white" size="md">
        Frontend Mentor
      </Heading>
      <Text>Feedback Board</Text>
    </GradientCard>
  );
}

let filterOptions = ["UI", "UX", "Enhancement", "Bug", "Feature"];

export function CategoryFilters() {
  let { selectedCategories, setSelectedCategories } = useFeedbackListContext();

  let toggleCategory = (category, selected) => {
    // clean category
    category = category.toLowerCase();
    setSelectedCategories((categories) =>
      selected
        ? categories.filter((cat) => cat !== category)
        : categories.concat(category)
    );
  };

  // explicitly or implicitly
  let allSelected =
    selectedCategories.length === 0 ||
    selectedCategories.length === filterOptions.length;

  return (
    <Card>
      <Box display="flex" flexWrap="wrap">
        <Box mr={2} mb={2}>
          <Button
            size="sm"
            colorScheme={allSelected ? "blue" : null}
            onClick={() => setSelectedCategories([])}
          >
            All
          </Button>
        </Box>
        {filterOptions.map((opt) => {
          let selected = selectedCategories.includes(opt.toLowerCase());
          return (
            <Box key={opt} mr={2} mb={2}>
              <Button
                size="sm"
                colorScheme={selected ? "blue" : null}
                key={opt}
                onClick={() => toggleCategory(opt, selected)}
              >
                {opt}
              </Button>
            </Box>
          );
        })}
      </Box>
    </Card>
  );
}

export function Roadmap() {
  return (
    <RoadMap>
      <Box as="header" mb={4} display="flex" justifyContent="space-between">
        <Heading size="sm">Roadmap</Heading>
        <Link to="/roadmap">View</Link>
      </Box>
      <VStack alignItems="stretch" as="ul" spacing={3}>
        <li style={{ "--color": "red" }}>
          Planned
          <span>2</span>
        </li>
        <li>
          In-Progress
          <span>3</span>
        </li>
        <li>
          Live
          <span>1</span>
        </li>
      </VStack>
    </RoadMap>
  );
}
let logoutMutation = gql`
  mutation logout {
    logout {
      id
    }
  }
`;

export default function Aside() {
  let [logout] = useMutation(logoutMutation);

  let handleLogout = () => {
    logout({
      refetchQueries: [
        {
          query: fetchCurrentUser,
        },
      ],
    }).then(() => {});
  };

  return (
    <Box>
      <WelcomeCard />
      <CategoryFilters />
      <RoadMap />
    </Box>
  );
}
