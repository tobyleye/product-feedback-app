import { Center, Spinner } from "@chakra-ui/react";

export default function Loader({ color, size = "md", ...props }) {
  return (
    <Center {...props}>
      <Spinner color="blue.1" size={size} />
    </Center>
  );
}
