import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { createContext, Suspense, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import client from "./client";
import Routes from "./routes";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <Suspense fallback={<div></div>}>
          <BrowserRouter>
            <HomeFiltersProvider>
              <Routes />
            </HomeFiltersProvider>
          </BrowserRouter>
        </Suspense>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export let HomeFiltersContext = createContext(null);

let HomeFiltersProvider = (props) => {
  let [sortKey, setSortKey] = useState("+upvotes");
  let [selectedCategories, setSelectedCategories] = useState([]);

  let value = {
    sortKey,
    setSortKey,
    selectedCategories,
    setSelectedCategories,
  };
  
  return <HomeFiltersContext.Provider {...props} value={value} />;
};

export default App;
