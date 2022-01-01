import { VStack, Box, Heading, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
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

let filterOptions = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

function ToggleButton({ label, value, checked, onClick }) {
  return (
    <Box as="label" dsiplay="inline-block">
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={(e) => onClick(e.target.value)}
        style={{ display: "none" }}
      />
      <Box
        px={3}
        py={1}
        rounded="md"
        cursor="pointer"
        fontSize="sm"
        sx={{
          "&": checked
            ? {
                bg: "blue.500",
                color: "white",
              }
            : {
                bg: "gray.100",
              },
        }}
      >
        {label}
      </Box>
    </Box>
  );
}
export function CategoryFilters() {
  let { selectedCategory, setSelectedCategory } = useFeedbackListContext();

  return (
    <Card>
      <Box display="flex" flexWrap="wrap">
        {filterOptions.map((opt) => {
          let value = opt.toLowerCase();
          return (
            <Box key={opt} mr={2} mb={2}>
              <ToggleButton
                checked={selectedCategory === value}
                label={opt}
                value={value}
                onClick={setSelectedCategory}
              />
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