import { Button, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { signup as signupMutation } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import {
  Form,
  FormLayout,
  FormField,
  FormIcon,
  FormTitle,
} from "../components/form";
import { FaUserPlus } from "react-icons/fa";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");

  const [signup, { data, loading, error }] = useMutation(signupMutation);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await signup({
        variables: {
          username,
          password,
          email,
          fullname,
        },
      });
    } catch (err) {
      console.log("error:", err);
    }
  };

  return (
    <FormLayout>
      <Form onSubmit={submit}>
        <FormIcon>
          <FaUserPlus />
        </FormIcon>
        <FormTitle>Register</FormTitle>
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
          <Link to="/login">Existing member? Login</Link>
          <Button type="submit" isLoading={loading}>
            Sign up
          </Button>
        </Box>
      </Form>
    </FormLayout>
  );
}
