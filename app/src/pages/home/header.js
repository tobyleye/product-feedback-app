import {
  VStack,
  Box,
  Heading,
  Text,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  chakra,
  HStack,
  Button,
} from "@chakra-ui/react";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useCurrentUser } from "../../context/currentuser";
import { useHomeContext } from "./context";
import { fetchCurrentUser } from "../../graphql/queries";

let Card = (props) => <Box p={4} rounded="lg" bg="white" {...props} />;

let MenuToggle = ({ isOpen, ...props }) => {
  return (
    <chakra.button
      {...props}
      className={isOpen ? "open" : ""}
      sx={{
        display: "grid",
        gap: "5px",
        width: "25px",
        span: {
          height: "3px",
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

let logoutMutation = gql`
  mutation logout {
    logout {
      id
    }
  }
`;

export function Nav() {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const btnRef = useRef();
  const currentUser = useCurrentUser();

  const [logout] = useMutation(logoutMutation, {
    refetchQueries: [
      {
        query: fetchCurrentUser,
      },
    ],
  });

  return (
    <Box h={{ base: "70px", md: "auto" }}>
      <Card
        bg="radial-gradient(
          128.88% 128.88% at 103.9% -10.39%,
          #e84d70 0%,
          #a337f6 53.09%,
          #28a7ed 100%
    )"
        color="white"
        display="flex"
        rounded={{ base: 0, md: "lg" }}
        flexDir={{ base: "row-reverse", md: "column" }}
        justifyContent="space-between"
        alignItems={{ base: "center", md: "unset" }}
        position={{ base: "fixed", md: "static" }}
        zIndex="2000"
        top={0}
        left={0}
        py={{ base: 0, md: 4 }}
        h={{ base: "inherit", md: "full" }}
        w="full"
      >
        <HStack spacing={5}>
          {currentUser ? (
            <Button onClick={logout} variant="link" color="white">
              Logout
            </Button>
          ) : (
            <Button as={Link} to="/login" variant="link" color="white">
              Login
            </Button>
          )}
          <Box display={{ base: "block", md: "none" }}>
            <MenuToggle isOpen={isOpen} onClick={onToggle} />
          </Box>
        </HStack>
        <Box mt={{ base: 0, md: 12 }}>
          <Heading color="white" variant="h2">
            Frontend Mentor
          </Heading>
          <Text variant="body2" mixBlendMode="normal">
            Feedback Board
          </Text>
        </Box>
      </Card>

      {/* drawer */}
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
    </Box>
  );
}

let filterOptions = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

function CategoryToggleButton({ label, value, checked, onClick }) {
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
        aria-checked={checked}
        bg="gray.1"
        color="blue.1"
        px="14px"
        py="10px"
        fontSize="13px"
        rounded="10px"
        cursor="pointer"
        fontWeight="600"
        _hover={{
          bg: "#CFD7FF",
          color: "blue.1",
        }}
        _checked={{
          bg: "blue.1",
          color: "white",
        }}
      >
        {label}
      </Box>
    </Box>
  );
}

export function CategoryFilters() {
  let { selectedCategory, setSelectedCategory } = useHomeContext();

  return (
    <Card>
      <Box display="flex" flexWrap="wrap">
        {filterOptions.map((opt) => {
          let value = opt.toLowerCase();
          return (
            <Box key={opt} mr={2} mb={2}>
              <CategoryToggleButton
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
    <Card
      sx={{
        li: {
          display: "flex",
          alignItems: "center",
          "&::before": {
            content: '""',
            display: "inline-block",
            background: "var(--color, #ccc)",
            w: "8px",
            h: "8px",
            borderRadius: "10px",
            mr: "12px",
          },
          span: {
            ml: "auto",
            fontWeight: 600,
          },
        },
      }}
    >
      <Box as="header" mb={4} display="flex" justifyContent="space-between">
        <Heading variant="h3">Roadmap</Heading>
        <Box
          textDecor="underline"
          color="blue.1"
          fontSize="sm"
          fontWeight="bold"
          as={Link}
          to="/roadmap"
        >
          View
        </Box>
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
    </Card>
  );
}

export default function Header() {
  return (
    <Box className="header">
      <Box display={{ base: "block", md: "none" }}>
        <Nav />
      </Box>
      <Box
        display={{ base: "none", md: "grid" }}
        gap={4}
        gridTemplateColumns={{ base: "repeat(3, 1fr)", lg: "1fr" }}
      >
        <Nav />
        <CategoryFilters />
        <Roadmap />
      </Box>
    </Box>
  );
}
