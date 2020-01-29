/* eslint-disable camelcase */
import { createCosmosAddress, createIrisAddress } from './wallet';
import { fetchProviderIdentity } from '../services/apollo/fetchProviderIdentity';

import {
  fetchCosmosAddressDelegations,
  fetchCosmosAddressUnbondingDelegations,
  fetchCosmosAccountAuthInfo,
  fetchCosmosValidatorSet,
  fetchCosmosDelegationRewards,
  // fetchCosmosDelegationUnbondingTxs
} from '../services/cosmos/api';
import {
  fetchIrisAddressDelegations,
  fetchIrisAddressDelegationTxHistory,
  fetchIrisAddressUnbondingDelegations,
  fetchIrisAccountAuthInfo,
  fetchIrisValidatorCandidates,
  fetchIrisDelegateValidatorRewards,
} from '../services/iris/api';

export async function enrichIrisAccount(account) {
  try {
    const address = createIrisAddress(account.pubKey.compressed_pk);
    const accountAuth = await fetchIrisAccountAuthInfo(address);
    const accountDelegations = await fetchIrisAddressDelegations(address);
    const accountDelegationHistory = await fetchIrisAddressDelegationTxHistory(
      address,
    );
    const accountUnbondingDelegations = await fetchIrisAddressUnbondingDelegations(
      address,
    );
    const rewardsData = await fetchIrisDelegateValidatorRewards(address);

    const validatorSet = await fetchIrisValidatorCandidates();

    const userAccount = Object.assign({}, accountAuth.value);
    userAccount.unbondingDelegations = accountUnbondingDelegations;
    userAccount.pubKey = account.pubKey.compressed_pk;
    userAccount.HDPATH = account.HDPATH;
    // But we are going to format the delegationHistory like this;
    const delegationHistory = [];

    // if the account has delegations
    if (accountDelegations != null) {
    // take the accountDelegations  data
      const delegations = accountDelegations;

      // and foreach of the delegations therein
      for (let ds = 0; ds < delegations.length; ds += 1) {
      // create an array of tx history
        delegations[ds].txHistory = [];

        // because delegations can contain >1 tx
        const tx = accountDelegationHistory;

        // for every transaction in the accountDelegationHistory
        for (let index = 0; index < tx.length; index += 1) {
          // check for matching validator from accountDelegationHistory and delegation
          if (tx[index].result.Tags[2].value === delegations[ds].validator_addr) {
            delegations[ds].txHistory.push(tx[index]);
          }
        }

        // Next, for each delegation, grab provider details from the DB via Apollo
        const providerData = fetchProviderIdentity(
          delegations[ds].validator_addr,
        );

        // If the provider_name from the providerData
        let provider_name = providerData.providerName;

        // Is not found or is a blank
        if (providerData.providerName === '') {
        // check the validatorSet for the operator_address
          for (let i = 0; i < validatorSet.length; i += 1) {
            if (
              validatorSet[i].operator_addr
            === delegations[ds].validator_addr
            ) {
            // and set name as moniker instead
              provider_name = validatorSet[i].description.moniker;
              break;
            }
          }
          delegations[ds].providerName = provider_name;
        } else {
          delegations[ds].providerName = providerData.providerName;
        }


        // Add the logo and provider URL as well; blanks are ok here
        delegations[ds].providerLogo = providerData.providerLogo;
        delegations[ds].providerURL = providerData.providerURL;

        // Add a copy of the shares value as a balance key for integrations into delegation flow
        delegations[ds].balance = (
          delegations[ds].shares * 1000000000000000000
        ).toString();

        // add the delegation to the array
        delegationHistory.push(delegations[ds]);
      }
      // add the delegation history array to the userAccount Object
      userAccount.rewardsData = rewardsData;
      userAccount.delegations = delegationHistory;
    } else {
    // or leave it blank if they have none
      userAccount.delegations = [];
    }

    // set the balance mirror key value for delegation flow integrations
    userAccount.balance = userAccount.coins[0].amount;
    return userAccount;
  } catch (e) {
    throw new Error(e);
  }
}


/**
 * @function enrichCosmosAddresses
 * @description queries information for an account and creates an account object
 */
export const enrichCosmosAccount = async (account) => {
  try {
    // determine the account (bech32) from compressed_pk
    const address = createCosmosAddress(account.pubKey.compressed_pk);

    // make api calls to node to grab account details
    const accountAuth = await fetchCosmosAccountAuthInfo(address);
    const accountDelegations = await fetchCosmosAddressDelegations(address);

    const accountUnbondingDelegations = await fetchCosmosAddressUnbondingDelegations(
      address,
    );
    const validatorSet = await fetchCosmosValidatorSet();

    // Create base userAccount object and add part of the data
    const userAccount = Object.assign({}, accountAuth.value);
    userAccount.unbondingDelegations = accountUnbondingDelegations;
    userAccount.HDPATH = account.HDPATH;
    userAccount.pubKey = account.pubKey.compressed_pk;

    // We could simply add the delegations in a similar un-changed fashion like so:
    // userAccount.accountDelegations = accountDelegations;
    // userAccount.delegationHistory = accountDelegationHistory;

    // But we are going to format the delegationHistory like this;
    const delegationHistory = [];

    // if the account has delegations
    if (accountDelegations == null) {
      // or leave it blank if they have none
      userAccount.delegations = [];
    } else {
      // take the accountDelegations  data
      const delegations = accountDelegations;

      // and foreach of the delegations therein
      for (let ds = 0; ds < delegations.length; ds += 1) {
        // create an array of tx history
        // Next, for each delegation, grab provider details from the DB via Apollo

        /* eslint-disable no-await-in-loop */
        const providerData = await fetchProviderIdentity(
          delegations[ds].validator_address,
        );
        const rewardsData = await fetchCosmosDelegationRewards(
          address, (delegations[ds].validator_address).toString(),
        );
        /* eslint-enable no-await-in-loop */

        // If the provider_name from the providerData
        let provider_name = providerData.providerName;

        // Is not found or is a blank
        if (providerData.providerName === '') {
          // check the validatorSet for the operator_address
          for (let i = 0; i < validatorSet.length; i += 1) {
            if (
              validatorSet[i].operator_address
              === delegations[ds].validator_address
            ) {
              // and set name as moniker instead
              provider_name = validatorSet[i].description.moniker;
              break;
            }
          }
          delegations[ds].providerName = provider_name;
        } else {
          delegations[ds].providerName = providerData.providerName;
        }

        // Add the logo and provider URL as well; blanks are ok here
        delegations[ds].providerLogo = providerData.providerLogo;
        delegations[ds].providerURL = providerData.providerURL;
        delegations[ds].rewardsData = rewardsData;

        // Add a copy of the shares value as a balance key for integrations into delegation flow
        delegations[ds].balance = delegations[ds].shares;

        // add the delegation to the array
        delegationHistory.push(delegations[ds]);
      }
      // add the delegation history array to the userAccount Object
      userAccount.delegations = delegationHistory;
    }

    // set the balance mirror key value for delegation flow integrations
    userAccount.balance = userAccount.coins[0].amount;

    return userAccount;
  } catch (e) {
    throw new Error(e);
  }
};
/* eslint-enable camelcase */
