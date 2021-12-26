import { useQuery } from "@apollo/client";
import { Route, Switch, Redirect } from "react-router-dom";
import { lazy } from "react";
import { fetchCurrentUser } from "./graphql/queries";
import { Box } from "@chakra-ui/react";

// pages
const Signup = lazy(() => import("./pages/signup"));
const Login = lazy(() => import("./pages/login"));
const Home = lazy(() => import("./pages/home"));
const FeedbackDetails = lazy(() => import("./pages/feedback-details"));
const NewFeedback = lazy(() => import("./pages/new-feedback"));
const EditFeedback = lazy(() => import("./pages/edit-feedback"));

export default function Routes() {
  let {
    loading,
    data,
    refetch: refetchCurrentUser,
  } = useQuery(fetchCurrentUser);


  if (loading) {
    return (
      <Box h="100vh" display="grid" placeItems="center">
        {/* loading.. */}
      </Box>
    );
  }

  if (data?.currentUser) {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/feedback/new" component={NewFeedback} />
        <Route path="/feedback/:id/edit" component={EditFeedback} />
        <Route path="/feedback/:id" component={FeedbackDetails} />
        <Redirect from="*" to="/" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/signup" component={Signup} />
      <Route path="/login">
        <Login onSuccess={(user) => refetchCurrentUser()} />
      </Route>
      <Redirect from="*" to="/login" />
    </Switch>
  );
}
