import { createContext, useContext, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { fetchCurrentUser } from "../graphql/queries";
import { Box, Spinner } from "@chakra-ui/react";

let CurrentUserContext = createContext(null);

export function CurrentUserProvider(props) {
  let { loading, data, refetch } = useQuery(fetchCurrentUser);

  let value = useMemo(() => [data?.currentUser, refetch], [data, refetch]);

  if (loading) {
    return (
      <Box h="100vh" display="grid" placeItems="center">
        <Spinner />
      </Box>
    );
  }

  return <CurrentUserContext.Provider value={value} {...props} />;
}

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}
