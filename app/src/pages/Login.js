import { Button, Box } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { login as loginMutation } from "../graphql/mutations";
import {
  Form,
  FormField,
  FormIcon,
  FormLayout,
  FormTitle,
} from "../components/form";
import { FaLock } from "react-icons/fa";
import { Padded } from "../components/layouts";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { data, loading }] = useMutation(loginMutation);

  // submit handler
  const submit = async (e) => {
    e.preventDefault();

    try {
      await login({
        variables: {
          password,
          email,
        },
      });
      console.log("data:", data);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <Padded>
      <FormLayout>
        <Form onSubmit={submit}>
          <FormIcon>
            <FaLock />
          </FormIcon>
          <FormTitle>Login</FormTitle>
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
            <Link to="/signup">New member? Register</Link>
            <Button type="submit" isLoading={loading}>
              Login
            </Button>
          </Box>
        </Form>
      </FormLayout>
    </Padded>
  );
}
