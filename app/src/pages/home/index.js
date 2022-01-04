import { useQuery } from "@apollo/client";
import {
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Button,
  Icon,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { useCurrentUser } from "../../context/currentuser";
import { fetchFeedbackList } from "../../graphql/queries";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ReactComponent as BulbIcon } from "../../assets/bulb.svg";
import { FeedbackCard } from "../../components/cards";
import { ReactComponent as NoFeedback } from "../../assets/no-feedback.svg";
import Header from "./header";
import { HomeContext } from "./context";

let sortOptions = [
  "Most Upvotes",
  "Least Upvotes",
  "Most Comments",
  "Least Comments",
];

export default function Home() {
  let currentUser = useCurrentUser();
  let { data, loading } = useQuery(fetchFeedbackList);
  let [sortKey, setSortKey] = useState("Most Upvotes");
  let [selectedCategory, setSelectedCategory] = useState("all");

  let feedbackList = useMemo(() => {
    let feedbackRequests = data?.feedbackRequests;
    if (feedbackRequests) {
      let result =
        selectedCategory === "all"
          ? [...data.feedbackRequests]
          : data.feedbackRequests.filter(
              (item) => item.category === selectedCategory
            );

      switch (sortKey) {
        case "Most Upvotes":
          result.sort((a, b) => b.upvotes - a.upvotes);
          break;

        case "Least Upvotes":
          result.sort((a, b) => a.upvotes - b.upvotes);
          break;

        case "Most Comments":
          result.sort((a, b) => b.comments.length - a.comments.length);
          break;

        case "Least Comments":
          result.sort((a, b) => a.comments.length - b.comments.length);
          break;
        default:
          break;
      }
      return result;
    }
    return [];
  }, [data, selectedCategory, sortKey]);

  let contextValue = useMemo(() => ({
    sortKey,
    setSortKey,
    selectedCategory,
    setSelectedCategory
  }), [selectedCategory, sortKey])

  return (
    <HomeContext.Provider value={contextValue}>
      <Box
        maxWidth="1080px"
        mx="auto"
        py={{ base: 0, md: 12 }}
        px={{ base: 0, md: 4 }}
      >
        <Box
          display="grid"
          gridTemplateColumns={{ base: "1fr", lg: "260px 1fr" }}
          gap={{ base: 0, md: 8 }}
        >
          <Header />
          <Box>
            <Box
              display="flex"
              alignItems="center"
              bg="#373F68"
              rounded={{ base: "none", md: "md" }}
              p={4}
              mb={4}
            >
              <Box
                display={{ base: "none", md: "flex" }}
                mr={8}
                color="white"
                alignItems="flex-start"
                gap={2}
              >
                <BulbIcon />
                <Text ml={1} fontSize="18px" fontWeight="bold">
                  {feedbackList.length} Suggestions
                </Text>
              </Box>
              <SortOptions value={sortKey} onChange={setSortKey} />
              <Box ml="auto">
                {currentUser && (
                  <Button as={Link} to="/feedback/new" leftIcon={<FaPlus />}>
                    Add Feedback
                  </Button>
                )}
              </Box>
            </Box>

            {loading ? (
              <Box>Loading</Box>
            ) : feedbackList.length === 0 ? (
              <Box
                textAlign="center"
                bg="white"
                display="flex"
                flexDirection="column"
                alignItems="center"
                py="14vh"
                px="4rem"
                rounded="lg"
              >
                <Icon
                  as={NoFeedback}
                  width={{ base: "100px", md: "150px" }}
                  height={{ base: "100px", md: "150px" }}
                />
                <Heading variant="h1" mt={{ base: 8, md: 12 }} mb={4}>
                  There is no feedback yet
                </Heading>
                <Box mb={10}>
                  <Text size="body1" maxWidth="450px">
                    Got a suggestion? Found a bug that needs to be squashed? We
                    love hearing about new ideas to improve our app.
                  </Text>
                </Box>
                {currentUser ? (
                  <Button as={Link} to="/feedback/new" leftIcon={<FaPlus />}>
                    Add Feedback
                  </Button>
                ) : (
                  <Button as={Link} to="/login">
                    Login to add feedback
                  </Button>
                )}
              </Box>
            ) : (
              <VStack
                alignItems="stretch"
                spacing={5}
                as="ul"
                listStyleType="none"
                px={{ base: 4, md: 0 }}
              >
                {feedbackList.map((feedback) => (
                  <li key={feedback.id}>
                    <FeedbackCard feedback={feedback} />
                  </li>
                ))}
              </VStack>
            )}
          </Box>
        </Box>
      </Box>
    </HomeContext.Provider>
  );
}

let SortOptions = ({ value, onChange = () => {} }) => {
  return (
    <Menu>
      <MenuButton fontSize="14" color="gray.1">
        <Text as="span" mr={2}>
          Sort by:
        </Text>
        <Text as="span" fontWeight="bold">
          {value}
        </Text>
      </MenuButton>
      <MenuList>
        <MenuOptionGroup value={value} type="radio" onChange={onChange}>
          {sortOptions.map((option) => (
            <MenuItemOption key={option} value={option}>
              {option}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
