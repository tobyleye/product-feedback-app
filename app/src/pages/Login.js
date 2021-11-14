import {
  Input,
  FormControl,
  FormLabel,
  Button,
  Box,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useFormControl } from "../hooks";

export default function Signup() {
  // form controls
  const emailControl = useFormControl();
  const passwordControl = useFormControl();

  // submit handler
  const submit = (e) => {
    e.preventDefault();
    let password = passwordControl.value;
    let email = emailControl.value;

    console.log({
      email,
      password,
    });
  };

  return (
    <Box maxW="md" mx="auto" bg="white" p={6} mt={8} rounded="lg">
      <Heading mb={8} size="xl">
        Login
      </Heading>
      <form onSubmit={submit}>
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" required {...emailControl} />
          </FormControl>

          <FormControl id="password" isRequired>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormLabel>Password</FormLabel>
              <Text>Forgot password?</Text>
            </Box>
            <Input type="password" required {...passwordControl} />
          </FormControl>

          <Box display="flex" w="full" justifyContent="flex-end">
            <Button type="submit">Login</Button>
          </Box>
        </VStack>
      </form>
    </Box>
  );
}
