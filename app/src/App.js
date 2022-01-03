import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { FeedbackListContextProvider } from "./context/feedbacklist";
import { CurrentUserProvider } from "./context/currentuser";
import theme from "./theme";
import client from "./client";
import Home from "./pages/home";
import {   Center, Button,Heading,Text } from "@chakra-ui/react";

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
            <FeedbackListContextProvider>
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
                  <Route>
                    <Experiments />
                  </Route>
                  <Redirect from="*" to="/" />
                </Switch>
              </CurrentUserProvider>
            </FeedbackListContextProvider>
          </BrowserRouter>
        </Suspense>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;

function Experiments() {
  return (
    <Center h="100vh" flexDir="column">
      <Button>click me</Button> 
      <Button variant="red" isLoading>click me</Button> 
      <Button variant="purple" isLoading>click me</Button>
      <Button variant="gray" isLoading>click me</Button>
      <Heading variant="h1">Hello world</Heading>
      <Heading variant="h2">Hello world</Heading>
      <Heading variant="h3">Hello world</Heading>
      <Heading variant="h4">Hello world</Heading>
      <Text variant="body">Hello world</Text>
      <Text variant="body2">Hello world</Text>



    </Center>
  );
}
