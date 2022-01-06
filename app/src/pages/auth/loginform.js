import { Box, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { FormField } from "../../components/form";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { login as loginMutation } from "../../graphql/mutations";
import { Helmet } from "react-helmet";
import { useCurrentUser } from "../../context/currentuser";
import { useLocation } from "react-router-dom";

let useSearchParams = () => {
  let location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  let result = {};
  searchParams.forEach((val, key) => {
    result[key] = val;
  });
  return result;
};

let LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading }] = useMutation(loginMutation);

  const history = useHistory();
  const { returnUrl } = useSearchParams();

  // eslint-disable-next-line no-unused-vars
  const [_, refetchUser] = useCurrentUser();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login({
        variables: {
          password,
          email,
        },
      });
      await refetchUser();

      let path = returnUrl && returnUrl.startsWith("/") ? returnUrl : "/";
      history.push(path);
    } catch (err) {}
  };

  return (
    <form onSubmit={submit}>
      <Helmet>
        <title>Login | Product Feedback App</title>
      </Helmet>

      <FormField
        type="email"
        label="Email Address"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormField
        type="password"
        label="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Box
        display="flex"
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box />
        <Button type="submit" isLoading={loading}>
          Login
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
