import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import client from "./client";
import Routes from "./routes";
import { FeedbackListContextProvider } from "./context/feedbacklist";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <Suspense fallback={<div></div>}>
          <BrowserRouter>
            <FeedbackListContextProvider>
              <Routes />
            </FeedbackListContextProvider>
          </BrowserRouter>
        </Suspense>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;
