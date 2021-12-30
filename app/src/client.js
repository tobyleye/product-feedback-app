import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const link = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://product-feedbackapi.herokuapp.com/graphql"
      : "http://localhost:4000/graphql",
  credentials: "include",
});

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
