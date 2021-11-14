import {
  Input,
  FormControl,
  FormLabel,
  Button,
  Box,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { useFormControl } from "../hooks";


export default function Signup() {

// form controls
  const usernameControl = useFormControl()
  const emailControl = useFormControl()
  const passwordControl = useFormControl()


  const submit = (e) => {
    e.preventDefault();
    let username = usernameControl.value;
    let password = passwordControl.value;
    let email = emailControl.value;

    console.log({
        email,
        password,
        username
    })

  };

  return (
    <Box maxW="md" mx="auto" bg="white" p={6} mt={8} rounded="lg">
      <Heading mb={8} size="xl">
        Register account
      </Heading>
      <form onSubmit={submit}>
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" required {...emailControl} />
          </FormControl>

          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input type="text" required {...usernameControl} />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" required  {...passwordControl}/>
          </FormControl>

          <Box display="flex" w="full" justifyContent="flex-end">
            <Button type="submit">Sign up</Button>
          </Box>
        </VStack>
      </form>
    </Box>
  );
}
