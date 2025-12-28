import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';

const cache=new InMemoryCache();

const errorLink=onError(({ graphQLErrors, networkError, operation }) => {
  if(graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        `Operation: ${operation.operationName}`
      );
    });
  }

  if(networkError) {
    console.error(`[Network error]: ${networkError}`, `Operation: ${operation.operationName}`);
  }
});

const httpLink=new HttpLink({
  uri: 'https://countries.trevorblades.com/',
});

const apolloClient=new ApolloClient({
  cache,
  link: from([errorLink, httpLink]),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});

export default apolloClient;