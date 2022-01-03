import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";
import Button from "./components/button";
import { Heading, Text } from "./components/typography";

export default extendTheme({
  colors,
  components: {
    Button,
    Heading,
    Text,
  },
  fonts: {
    heading: "Jost, sans-serif",
    body: "Jost, sans-serif",
  },
  styles: {
    global: {
      "html, body": {
        color: "gray.4",
        background: "#f7f8fd",
        fontFamily: "Jost, sans-serif",
      },
    },
  },
});
