import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  colors: {
    purple: "#AD1FEA",
    blue: {
      light: "#62BCFA",
      DEFAULT: "#4661E6",
    },
    orange: "#F49F85",
    gray: {
      1: "#F7F8FD",
      2: "#F2F4FF",
    },
    grey: {
      1: "#4661E6",
      2: "#3A4374",
      3: "#647196",
    },
  },
  components: {
    Heading: {
      sizes: {
        h1: {
          fontSize: "24px",
          fontFamily: "Jost, sans-serif",
          lineHeight: "35px",
          textSpacing: -0.33,
        },

        h2: {
          fontSize: "20px",
          lineHeight: "29px",
          letterSpacing: -0.25,
        },
        h3: {
          fontSize: "18px",
          lineHeight: "26px",
          fontWeight: "bold",
          letterSpacing: -0.25,
        },
        h4: {
          fontSize: "14px",
          lineHeight: "20px",
          letterSpacing: -0.2,
        },
      },
    },
    Text: {
      sizes: {
        body1: {
          fontSize: "16px",
          lineHeight: "23px",
        },
        body2: {
          fontSize: "15px",
          lineHeight: "22px",
        },
        body3: {
          fontSize: "13px",
          lineHeight: "19px",
        },
      },
    },
  },
  styles: {
    global: {
      "html, body": {
        color: "grey.3",
        background: "#f7f8fd",
        fontFamily: "Jost, sans-serif",
      },
      "h1,h2,h3,h4,h5": {
        color: "grey.2",
      },
    },
  },
});
