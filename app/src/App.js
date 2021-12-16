import "./css/index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ChakraProvider} from "@chakra-ui/react";
import theme from "./theme";

// pages
const Signup = lazy(() => import("./pages/signup"));
const Login = lazy(() => import("./pages/login"));
const Home = lazy(() => import("./pages/home"));
const FeedbackDetails = lazy(() => import("./pages/feedback-details"));
const NewFeedback = lazy(() => import("./pages/new-feedback"));
const EditFeedback = lazy(() => import("./pages/edit-feedback"));


const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <Suspense fallback={<div></div>}>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/feedback/new" component={NewFeedback} />
              <Route path="/feedback/:id/edit" component={EditFeedback} />
              <Route path="/feedback/:id" component={FeedbackDetails} />
              <Redirect from="*" to="/login" />
            </Switch>
          </BrowserRouter>
        </Suspense>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;
