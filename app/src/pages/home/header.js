import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ReactComponent as BulbIcon } from "../../assets/bulb.svg";

let sortOptions = {
  most_upvotes: "Most Upvotes",
  least_upvotes: "Least Upvotes",
  most_comments: "Most Comments",
  least_comments: "Least Comments",
};

export default function Header() {
  let [sortKey, setSortKey] = useState("");

  let changeSortKey = (newSortKey) => {
    if (sortKey === newSortKey) {
      newSortKey = null;
    }
    setSortKey(newSortKey);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      bg="#373F68"
      rounded="lg"
      p={4}
      mb={6}
    >
      <Box mr={6} color="white" display="flex" alignItems="flex-start" gap={2}>
        <BulbIcon />
        <Text fontSize="18px" fontWeight="bold">
          6 Suggestions
        </Text>
      </Box>
      <div>
        <Menu>
          <MenuButton color="#F2F4FE">
            <Text size="body2" as="span" mr={2}>
              Sort by:
            </Text>
            <Text as="span" fontWeight="700">
              {sortOptions[sortKey]}
            </Text>
          </MenuButton>
          <MenuList border="1px solid red">
            <MenuOptionGroup
              value={sortKey}
              type="radio"
              onChange={changeSortKey}
            >
              {Object.entries(sortOptions).map(([value, label]) => (
                <MenuItemOption value={value}>{label}</MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </div>
      <Box ml="auto">
        <Button as={Link} to="/feedback/new" leftIcon={<FaPlus />}>
          Add Feedback
        </Button>
      </Box>
    </Box>
  );
}
