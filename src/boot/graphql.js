import { ApolloClient } from 'apollo-client';
import VueApollo from 'vue-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default ({ Vue, app }) => {
  const uri = 'https://hasura.union.market/v1/graphql';
  const httpLink = new HttpLink({ uri });

  // Create the apollo client
  const defaultClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  const apolloProvider = new VueApollo({ defaultClient });

  Vue.use(VueApollo);
  app.apolloProvider = apolloProvider;
  return apolloProvider;
};
