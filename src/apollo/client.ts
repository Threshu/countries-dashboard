import { ApolloClient, InMemoryCache } from '@apollo/client/core';

const cache=new InMemoryCache();

const apolloClient=new ApolloClient({
  cache,
  uri: 'https://countries.trevorblades.com/',
});

export default apolloClient;