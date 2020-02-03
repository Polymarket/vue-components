import axios from 'axios';
import { COSMOS_NODE_URL } from '../../config/nodes';


/**
 * @function requestWrapper
 * @description wrapper to handle api calls
 * @param  {string} endpoint the api endpoint used in the GET request
 */
const requestWrapper = async (endpoint) => {
  try {
    const url = `${COSMOS_NODE_URL}${endpoint}`;
    const res = await axios.get(url);
    return res.data.result;
  } catch (e) {
    throw new Error(e);
  }
};


/**
 * @function fetchCosmosValidatorSet
 * @description returns the latest validator candidates
 * @return {array} validator candidates
 */
export const fetchCosmosValidatorSet = async () => {
  try {
    const endpoint = '/staking/validators';
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchCosmosLatestBlock
 * @description gets the latest block height
 * @return  {commit} {SET_LAST_BLOCK}
 */
export const fetchCosmosLatestBlock = async () => {
  try {
    const endpoint = '/blocks/latest';
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchCosmosStakingParameters
 * @description fetches staking parameters including denom
 */
export const fetchCosmosStakingParameters = async () => {
  try {
    const endpoint = '/staking/parameters';
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchCosmosAddressDelegationTxHistory
 * @description returns the delegation transaction history for a given address
 * @return  {res.data} delegation transaction history
 * @param address
 */
export const fetchCosmosAddressDelegationTxHistory = async (address) => {
  try {
    const endpoint = `/staking/delegators/${address}/txs`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchCosmosAddressDelegations
 * @description returns aggregate delegations from an address to all validators
 * @param address
 */
export const fetchCosmosAddressDelegations = async (address) => {
  try {
    const endpoint = `/staking/delegators/${address}/delegations`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchCosmosAddressUnbondingDelegations
 * @description fetches unbonding delegations for an address
 * @param  {type} address {description}
 */
export const fetchCosmosAddressUnbondingDelegations = async (address) => {
  try {
    const endpoint = `/staking/delegators/${address}/unbonding_delegations`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchCosmosDelegateValidatorRewards
 * @description fetches rewards balance for a delegate from a validator delegation
 * @param  {type} address           {address of the delegator}
 * @param  {type} validatorAddress {address of the validator}
 */
export const fetchCosmosDelegateValidatorRewards = async (
  address,
  validatorAddress,
) => {
  try {
    const endpoint = `/distribution/delegators/${address}/rewards/${validatorAddress}`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchCosmosAccountAuthInfo
 * @description returns aggregate delegations from an address to all validators
 * @param address
 */
export const fetchCosmosAccountAuthInfo = async (address) => {
  try {
    const endpoint = `/auth/accounts/${address}`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchCosmosAccountBalance
 * @description returns the balance for a given address
 * @param  {type} address account address
 */
export const fetchCosmosAccountBalance = async (address) => {
  try {
    const endpoint = `/bank/balances/${address}`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchCosmosDelegationRewards
 * @description fetches rewards balance for a delegate from a validator delegation
 * @param  {type} address           {description}
 * @param  {string} validatorAddress {description}
 */
export const fetchCosmosDelegationRewards = async (
  address,
  validatorAddress,
) => {
  try {
    const endpoint = `/distribution/delegators/${address}/rewards/${validatorAddress}`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchCosmosDelegationUnbondingTxs
 * @description fetches rewards balance for a delegate from a validator delegation
 * @param  {type} address           {description}
 * @param  {type} validatorAddress {description}
 */
export const fetchCosmosDelegationUnbondingTxs = async (
  address,
  validatorAddress,
) => {
  try {
    const endpoint = `/staking/delegators/${address}/unbonding_delegations/${validatorAddress}`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * ----------------------- TX -----------------------
 */

/**
 * @function postSignedTx
 * @param  {object} txData {Signed transaction object for transmission}
 * @return {hash} {transaction hash}
 */
export const postCosmosSignedTx = async (txData) => {
  try {
    const url = `${COSMOS_NODE_URL}/txs`;
    return await axios.post(url, JSON.stringify(txData));
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchCosmosTxByHash
 */
export const fetchCosmosTxByHash = async (txHash) => {
  try {
    const endpoint = `/txs/${txHash}`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * ----------------------- GOVERNANCE -----------------------
 */

/**
 * @function fetchCosmosGovernanceProposals
 * @description queries for the latest governance proposals
 */
export const fetchCosmosGovernanceProposals = async () => {
  try {
    const endpoint = '/gov/proposals';
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchCosmosGovProposalVotesByProposalId
 */
export const fetchCosmosGovProposalVotesByProposalId = async () => {
  try {
    const endpoint = '/gov/proposals';
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};
