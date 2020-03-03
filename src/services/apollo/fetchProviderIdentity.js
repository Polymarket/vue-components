// import ProviderByAddress from '@/graphql/BaseInfo/ProviderByAddress.graphql';
import gql from 'graphql-tag';

const fetchProviderIdentityQuery = gql`query Addresses($address: String!) {
  unionmarket_service_provider_providers(where: {address: {_eq: $address}}) {
      logo
      provider_name
      formatted_url
  }
}`;


export const fetchProviderIdentity = async (providerAddress) => {
  try {
    console.log(providerAddress);

    const tokenSymbol = await this.$apolloProvider.defaultClient.query({
      query: fetchProviderIdentityQuery,
      variables: { address: providerAddress },
    });
    console.log(tokenSymbol);
    const providerName = tokenSymbol.data.unionmarket_service_provider_providers[0].provider_name;
    const providerLogo = tokenSymbol.data.unionmarket_service_provider_providers[0].logo;
    const providerURL = tokenSymbol.data.unionmarket_service_provider_providers[0].formatted_url;
    return { providerName, providerLogo, providerURL };
  } catch (error) {
    return { providerName: '', providerLogo: '', providerURL: '' };
  }
};
