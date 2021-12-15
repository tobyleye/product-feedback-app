import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Button,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function Header() {
    let [sortKey, setSortKey] =useState('')

  let changeSortKey = (newSortKey) => {
      console.log({ newSortKey })
      if (sortKey === newSortKey) {
          newSortKey = null
      }
      setSortKey(newSortKey)
      
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      bg="#373F68"
      rounded="lg"
      p={4}
      mb={6}
    >
      <Box mr={6} color="white">
        <span />
        <span>6 Suggestions</span>
      </Box>
      <div>
        <Menu>
          <MenuButton color="white">
            <Box as="span" fontWeight="300" mr={2}>
              Sort by:
            </Box>
            <Box as="span" fontWeight="700">
              {sortKey}
            </Box>
          </MenuButton>
          <MenuList border="1px solid red">
            <MenuOptionGroup value={sortKey} type="radio" onChange={changeSortKey}>
              <MenuItemOption value="most_upvotes">Most Upvotes</MenuItemOption>
              <MenuItemOption value="least_upvotes">
                Least Upvotes
              </MenuItemOption>
              <MenuItemOption value="most_comments">
                Most Comments
              </MenuItemOption>
              <MenuItemOption value="least_comments">
                Least Comments
              </MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </div>
      <Box ml="auto">
        <Button colorScheme="purple" leftIcon={<FaPlus />}>
          Add Feedback
        </Button>
      </Box>
    </Box>
  );
}
