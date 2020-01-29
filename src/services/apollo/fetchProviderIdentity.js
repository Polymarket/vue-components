// import ProviderByAddress from '@/graphql/BaseInfo/ProviderByAddress.graphql';

export const fetchProviderIdentity = async () => {
  // try {
  //   const tokenSymbol = await this.$apollo.defaultClient.query({
  //     query: ProviderByAddress,
  //     variables: { address: providerAddress },
  //   });
  //   if (tokenSymbol.data.Addresses.length > 0) {
  //     const providerName = tokenSymbol.data.Addresses[0].provider.provider_name;
  //     const providerLogo = tokenSymbol.data.Addresses[0].provider.logo;
  //     const providerURL = tokenSymbol.data.Addresses[0].provider.formatted_url;
  //     return { providerName, providerLogo, providerURL };
  //   }
  //   return { providerName: '', providerLogo: '', providerURL: '' };
  // } catch (error) {
  //   throw new Error(
  //     `Error fetching the provider name for ${providerAddress}`,
  //     error,
  //   );
  // }
};
