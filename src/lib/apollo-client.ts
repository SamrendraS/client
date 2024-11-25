import { ApolloClient, InMemoryCache } from "@apollo/client";
import { isMainnet } from "../../constants";

const apolloClient = new ApolloClient({
  uri: isMainnet()
    ? "https://graphql.mainnet.endur.fi"
    : "https://graphql.sepolia.endur.fi",
  cache: new InMemoryCache(),
});

export default apolloClient;
