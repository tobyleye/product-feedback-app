import "./css/index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
} from "@apollo/client";
import { greetings } from "./graphql/queries";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import theme from './theme'

// routes
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));


const Greetings = () => {
  const { data } = useQuery(greetings);
  return <div>{data?.greetings}</div>;
};

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <Container>
          <Suspense fallback={<div></div>}>
            <BrowserRouter>
              <Switch>
                <Route path="/greetings" component={Greetings} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
              </Switch>
            </BrowserRouter>
          </Suspense>
        </Container>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;
