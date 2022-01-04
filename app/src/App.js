import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { CurrentUserProvider } from "./context/currentuser";
import theme from "./theme";
import client from "./client";
import Home from "./pages/home";

// pages
const Signup = lazy(() => import("./pages/signup"));
const Login = lazy(() => import("./pages/login"));
const FeedbackDetails = lazy(() => import("./pages/feedback-details"));
const NewFeedback = lazy(() => import("./pages/new-feedback"));
const EditFeedback = lazy(() => import("./pages/edit-feedback"));

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <Suspense fallback={<div />}>
          <BrowserRouter>
            <CurrentUserProvider>
              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/feedback/new">
                  <NewFeedback />
                </Route>
                <Route path="/feedback/:id/edit">
                  <EditFeedback />
                </Route>
                <Route path="/feedback/:id">
                  <FeedbackDetails />
                </Route>
                <Route path="/signup">
                  <Signup />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Redirect from="*" to="/" />
              </Switch>
            </CurrentUserProvider>
          </BrowserRouter>
        </Suspense>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;
