import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { CurrentUserProvider } from "./context/currentuser";
import theme from "./theme";
import client from "./client";
import Home from "./pages/home";
import { UpvotedFeedbackProvider } from "./context/upvoted-feedback";
import PrivateRoute from "./components/private-route";

// pages
const FeedbackDetails = lazy(() => import("./pages/feedback-details"));
const NewFeedback = lazy(() => import("./pages/new-feedback"));
const EditFeedback = lazy(() => import("./pages/edit-feedback"));
const Roadmap = lazy(() => import("./pages/roadmap"));
const Auth = lazy(() => import("./pages/auth"));

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <Suspense fallback={<div />}>
          <BrowserRouter>
            <CurrentUserProvider>
              <UpvotedFeedbackProvider>
                <Switch>
                  <Route path="/" exact>
                    <Home />
                  </Route>
                  <PrivateRoute path="/feedback/new">
                    <NewFeedback />
                  </PrivateRoute>
                  <PrivateRoute path="/feedback/:id/edit">
                    <EditFeedback />
                  </PrivateRoute>
                  <Route path="/feedback/:id">
                    <FeedbackDetails />
                  </Route>
                  <Route path="/roadmap">
                    <Roadmap />
                  </Route>
                  <Route path="/auth">
                    <Auth />
                  </Route>
                  <Redirect from="*" to="/" />
                </Switch>
              </UpvotedFeedbackProvider>
            </CurrentUserProvider>
          </BrowserRouter>
        </Suspense>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;
