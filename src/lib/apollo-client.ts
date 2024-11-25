import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "https://graphql.sepolia.endur.fi",
  cache: new InMemoryCache(),
});

export default apolloClient;
