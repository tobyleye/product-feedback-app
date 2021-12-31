import { Button, Box } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
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
import { Padded } from "../components/layouts";
import { fetchCurrentUser } from "../graphql/queries";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");

  const [signup, { loading }] = useMutation(signupMutation);
  const history = useHistory()

  const submit = (e) => {
    e.preventDefault();

      signup({
        variables: {
          username,
          password,
          email,
          fullname,
        },
        refetchQueries: fetchCurrentUser
      }).then(() => {
        history.push('/')
      })
  };

  return (
    <Padded>
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
    </Padded>
  );
}
