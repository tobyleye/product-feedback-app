import { Box, Icon } from "@chakra-ui/react";
import {
  Link,
  Switch,
  Route,
  Redirect,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { Padded } from "../../components/layouts";
import { FormLayout } from "../../components/form";
import { lazy, Suspense } from "react";
import { useCurrentUser } from "../../context/currentuser";
import authIcon from "../../assets/auth.png";

let LoginForm = lazy(() => import("./loginform"));
let SignupForm = lazy(() => import("./signupform"));


let Auth = () => {
  let location = useLocation();
  let { path: parentPath } = useRouteMatch();

  let isLogin = location.pathname.endsWith("/login");
  let [currentUser] = useCurrentUser();

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Box>
      <Padded>
        <FormLayout>
          <Box bg="white" p={6} rounded="lg" minH="400px">
            <Box sx={{
              textAlign:'center',
              display:'flex',
              justifyContent: 'center',
              mb:6,
              'img':{
                width: '68px'
              }
            }}>
              <img src={authIcon}  alt="auth yourself"/>
            </Box>

            <Box
              sx={{
                display: "flex",
                pos: "relative",
                mb: 10,
                borderBottom: "1px solid",
                borderColor: "#eee",
                a: {
                  flex: "1",
                  textAlign: "center",
                  py: 2,
                  fontWeight: "bold",
                  fontSize: "md",
                  _hover: {
                    bg: "gray.1",
                  },
                },
              }}
            >
              <Link to="login">Login</Link>
              <Link to="signup">Signup</Link>
              <Box
                sx={{
                  bg: "blue.1",
                  position: "absolute",
                  left: isLogin ? 0 : "50%",
                  bottom: 0,
                  w: "50%",
                  h: 1,
                  transition: "left .15s ease",
                }}
              />
            </Box>
            <Suspense fallback={<div />}>
              <Switch>
                <Route path={parentPath + "/login"}>
                  <LoginForm />
                </Route>
                <Route path={parentPath + "/signup"}>
                  <SignupForm />
                </Route>
                <Redirect from="*" to={parentPath + "/login"} />
              </Switch>
            </Suspense>
          </Box>
        </FormLayout>
      </Padded>
    </Box>
  );
};

export default Auth;
