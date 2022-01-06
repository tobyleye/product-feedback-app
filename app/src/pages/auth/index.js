import { Box } from "@chakra-ui/react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import { Padded } from "../../components/layouts";
import { FormLayout } from "../../components/form";
import { lazy, Suspense } from "react";

let LoginForm = lazy(() => import("./loginform"));
let SignupForm = lazy(() => import("./signupform"));

let Auth = () => {
  return (
    <Box>
      <Padded>
        <FormLayout>
          <Box bg="white" p={6} rounded="lg">
            <Box h={20} />
            <Box
              sx={{
                display: "flex",
                pos: "relative",
                mb: 10,
                borderBottom: '1px solid',
                borderColor: '#eee',
                a: {
                  flex: "1",
                  textAlign: "center",
                  py: 2,
                  _hover: {
                      bg: 'gray.1',
                  }
                },
              }}
            >
              <Link to="login">Login</Link>
              <Link to="signup">Signup</Link>
            </Box>
            <Suspense fallback={<div />}>
              <Switch>
                <Route path="/auth/login">
                  <LoginForm />
                </Route>
                <Route path="/auth/signup">
                  <SignupForm />
                </Route>
                <Redirect from="*" to="/auth/login" />
              </Switch>
            </Suspense>
          </Box>
        </FormLayout>
      </Padded>
    </Box>
  );
};

export default Auth;
