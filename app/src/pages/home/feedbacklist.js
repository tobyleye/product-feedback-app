import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import {useContext} from "react"
import { FeedbackCard } from "../../components/cards";
import { ReactComponent as NoFeedback } from "../../assets/no-feedback.svg";
import { Link } from "react-router-dom";
import {HomeFiltersContext} from "../../App"

let ValidKeyRegex= /[+-].*/

let sortList = (data, key) => {
  if (data.length === 0) return data;
  if (!ValidKeyRegex.test(key)) return data;


  let direction = key[0]
  key = key.slice(1)

  return [...data].sort((a,b) => {
    if (direction === "+") {
      return b[key] - a[key] 
    } else {
      return a[key]-b[key]
    }
  })
}

export function FeedbackList({ data=[] }) {
  let { sortKey } = useContext(HomeFiltersContext)

  let sortedList = sortList(data, sortKey)

  if (data.length === 0) {
    return (
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
        <NoFeedback />
        <Heading size="h1" mt={12} mb={4}>
          There is no feedback yet
        
        </Heading>
        <Box mb={10}>
          <Text size="body1">
            Got a suggestion? Found a bug that needs to be squashed?<br /> We love
            hearing about new ideas to improve our app.
          </Text>
        </Box>
        <Button as={Link} to="/feedback/new" leftIcon={<FaPlus />}>Add Feedback</Button>
      </Box>
    );
  }

  return (
    <VStack alignItems="stretch" spacing={5} as="ul" listStyleType="none">
      {sortedList.map((feedback) => (
        <li key={feedback.id}>
          <FeedbackCard feedback={feedback} />
        </li>
      ))}
    </VStack>
  );
}