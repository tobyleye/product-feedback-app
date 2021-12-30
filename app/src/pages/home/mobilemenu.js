import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Box,
  useDisclosure,
  VStack,
  Heading,
  Text,
  chakra,
} from "@chakra-ui/react";
import { useRef } from "react";

import { CategoryFilters, Roadmap } from "./aside";

let Toggle = ({ isOpen, ...props }) => {
  return (
    <chakra.button
      {...props}
      className={isOpen ? "open" : ""}
      sx={{
        display: "grid",
        gap: '6px',
        width: '30px',
        span: {
          height: "4px",
          background: "#fff",
          transition: "all .33s",
        },
        "&.open span": {
          "&:nth-of-type(1)": {
            transform: "rotate(45deg)",
            transformOrigin: "top left",
          },
          "&:nth-of-type(2)": {
            transform: "translateX(200px)",
            opacity: 0,
          },
          "&:nth-of-type(3)": {
            transform: "rotate(-45deg)",
            transformOrigin: "bottom left",
          },
        },
      }}
    >
      <span />
      <span />
      <span />
    </chakra.button>
  );
};
export function MobileMenu() {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <Box
        display="flex"
        width="full"
        justifyContent="space-between"
        alignItems="center"
        position="fixed"
        left="0"
        top="0"
        right="0"
        h={20}
        zIndex="1500"
        background="radial-gradient(
            128.88% 128.88% at 103.9% -10.39%,
            #e84d70 0%,
            #a337f6 53.09%,
            #28a7ed 100%
          )"
        px={4}
      >
        <Box>
          <Heading color="white" size="h3">
            Frontend Mentor
          </Heading>
          <Text color="white" size="body2">
            Feedback Board
          </Text>
        </Box>

        <Toggle isOpen={isOpen} onClick={onToggle} />
      </Box>
      <Box h={20} />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody bg="#f7f8fd">
            <Box h={20} />
            <VStack alignItems="stretch" spacing={4}>
              <CategoryFilters />
              <Roadmap />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
