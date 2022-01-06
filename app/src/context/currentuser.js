import { createContext, useContext } from "react";
import { useQuery } from "@apollo/client";
import { fetchCurrentUser } from "../graphql/queries";
import { Box, Spinner } from "@chakra-ui/react";

let CurrentUserContext = createContext(null);

export function CurrentUserProvider(props) {
  let { loading, data } = useQuery(fetchCurrentUser);

  if (loading) {
    return (
      <Box h="100vh" display="grid" placeItems="center">
        <Spinner />
      </Box>
    );
  }

  return <CurrentUserContext.Provider value={data.currentUser} {...props} />;
}

export function useCurrentUser() {
  let currentUser = useContext(CurrentUserContext);
  return currentUser;
}
