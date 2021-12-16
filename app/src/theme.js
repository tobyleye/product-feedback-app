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
  styles: {
      global: {
          "html, body": {
            color: 'grey.3',
            background: '#f2f2f2',
            fontFamily: 'Jost, sans-serif'
          },
          'h1,h2,h3,h4,h5': {
              color: 'grey.2'
          }
      }
  }
});
