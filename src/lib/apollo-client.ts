import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "https://endurfi-graphql-api-sepolia.onrender.com",
  cache: new InMemoryCache(),
});

export default apolloClient;
