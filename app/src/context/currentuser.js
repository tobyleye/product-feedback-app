import { createContext, useContext, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { fetchCurrentUser } from "../graphql/queries";
import Loader from "../components/loader"

let CurrentUserContext = createContext(null);

export function CurrentUserProvider(props) {
  let { loading, data, refetch } = useQuery(fetchCurrentUser);

  let value = useMemo(() => [data?.currentUser, refetch], [data, refetch]);

  if (loading) {
    return (
      <Loader h="100vh"/>
    );
  }

  return <CurrentUserContext.Provider value={value} {...props} />;
}

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}
