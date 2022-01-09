import { Box, Button, Alert, AlertIcon } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { FormField } from "../../components/form";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { signup as signupMutation } from "../../graphql/mutations";
import Helmet from "react-helmet";
import { useCurrentUser } from "../../context/currentuser";

let SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");

  const [signup, { loading }] = useMutation(signupMutation);
  const history = useHistory();
  
  // eslint-disable-next-line no-unused-vars
  const [_, refetchUser] = useCurrentUser();
  const [error, setError] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    error && setError(false);
    try {
      await signup({
        variables: {
          username,
          password,
          email,
          fullname,
        },
      });
      await refetchUser();
      history.push("/");
    } catch (err) {
      setError(true);
      return;
    }
  };

  return (
    <form onSubmit={submit}>
      <Helmet>
        <title>Signup | Product Feedback App</title>
      </Helmet>
      {error && (
        <Alert status="error" mb={8} mt="-15px" rounded="md" size="sm">
          <AlertIcon />
          An error occured
        </Alert>
      )}

      <FormField
        type="email"
        label="Email Address"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormField
        type="text"
        label="Fullname"
        required
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
      />
      <FormField
        type="text"
        label="Username"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
          Sign up
        </Button>
      </Box>
    </form>
  );
};

export default SignupForm;
