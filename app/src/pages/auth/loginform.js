import { Box, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { FormField } from "../../components/form";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { login as loginMutation } from "../../graphql/mutations";
import { fetchCurrentUser } from "../../graphql/queries";
import { Helmet } from "react-helmet";

let LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading }] = useMutation(loginMutation);

  const history = useHistory();

  // submit handler
  const submit = (e) => {
    e.preventDefault();

    login({
      variables: {
        password,
        email,
      },
      refetchQueries: [
        {
          query: fetchCurrentUser,
        },
      ],
    }).then(() => {
      history.push("/");
    });
  };

  return (
    <form onSubmit={submit}>
      {/* <FormTitle>Login</FormTitle> */}

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
