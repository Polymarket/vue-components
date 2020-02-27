import { ApolloClient } from 'apollo-client';
import VueApollo from 'vue-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default ({ Vue, app }) => {
  const uri = 'http://35.245.40.76:8080/v1/graphql';
  const httpLink = new HttpLink({ uri });

  const cache = new InMemoryCache({
    addTypename: false,
  });


  // Create the apollo client
  const defaultClient = new ApolloClient({
    link: httpLink,
    cache,
    connectToDevTools: true,
  });

  const apolloProvider = new VueApollo({ defaultClient });

  Vue.use(VueApollo);
  app.apolloProvider = apolloProvider;
  return apolloProvider;
};
