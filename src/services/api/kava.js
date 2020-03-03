import axios from 'axios';
import { KAVA_NODE_URL } from '../../config/nodes';


/**
 * @function requestWrapper
 * @description wrapper to handle api calls
 * @param  {string} endpoint the api endpoint used in the GET request
 */
const requestWrapper = async (endpoint) => {
  try {
    const url = `${KAVA_NODE_URL}${endpoint}`;
    const res = await axios.get(url);
    return res.data.result;
  } catch (e) {
    throw new Error(e);
  }
};


/**
 * @function fetchKavaValidatorSet
 * @description returns the latest validator candidates
 * @return {array} validator candidates
 */
export const fetchKavaValidatorSet = async () => {
  try {
    const endpoint = '/staking/validators';
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchKavaLatestBlock
 * @description gets the latest block height
 */
export const fetchKavaLatestBlock = async () => {
  try {
    const endpoint = '/blocks/latest';
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchKavaStakingParameters
 * @description fetches staking parameters including denom
 */
export const fetchKavaStakingParameters = async () => {
  try {
    const endpoint = '/staking/parameters';
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchKavaAddressDelegationTxHistory
 * @description returns the delegation transaction history for a given address
 * @param address
 */
export const fetchKavaAddressDelegationTxHistory = async (address) => {
  try {
    const endpoint = `/staking/delegators/${address}/txs`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchKavaAddressDelegations
 * @description returns aggregate delegations from an address to all validators
 * @param address
 */
export const fetchKavaAddressDelegations = async (address) => {
  try {
    const endpoint = `/staking/delegators/${address}/delegations`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchKavaAddressUnbondingDelegations
 * @description fetches unbonding delegations for an address
 * @param  {type} address {description}
 */
export const fetchKavaAddressUnbondingDelegations = async (address) => {
  try {
    const endpoint = `/staking/delegators/${address}/unbonding_delegations`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchKavaDelegateValidatorRewards
 * @description fetches rewards balance for a delegate from a validator delegation
 * @param  {type} address           {address of the delegator}
 * @param  {type} validatorAddress {address of the validator}
 */
export const fetchKavaDelegateValidatorRewards = async (
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
 * @function fetchKavaAccountAuthInfo
 * @description returns aggregate delegations from an address to all validators
 * @param address
 */
export const fetchKavaAccountAuthInfo = async (address) => {
  try {
    const endpoint = `/auth/accounts/${address}`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchKavaAccountBalance
 * @description returns the balance for a given address
 * @param  {type} address account address
 */
export const fetchKavaAccountBalance = async (address) => {
  try {
    const endpoint = `/bank/balances/${address}`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchKavaDelegationRewards
 * @description fetches rewards balance for a delegate from a validator delegation
 * @param  {type} address           {description}
 * @param  {string} validatorAddress {description}
 */
export const fetchKavaDelegationRewards = async (
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
 * @function fetchKavaDelegationUnbondingTxs
 * @description fetches rewards balance for a delegate from a validator delegation
 * @param  {type} address           {description}
 * @param  {type} validatorAddress {description}
 */
export const fetchKavaDelegationUnbondingTxs = async (
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
export const postKavaSignedTx = async (txData) => {
  try {
    const url = `${KAVA_NODE_URL}/txs`;
    const pr = await axios.post(url, JSON.stringify(txData));
    return pr;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchKavaTxByHash
 */
export const fetchKavaTxByHash = async (txHash) => {
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
 * @function fetchKavaGovernanceProposals
 * @description queries for the latest governance proposals
 */
export const fetchKavaGovernanceProposals = async () => {
  try {
    const endpoint = '/gov/proposals';
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchKavaGovProposalVotesByProposalId
 */
export const fetchKavaGovProposalVotesByProposalId = async (proposalId) => {
  try {
    const url = `/gov/proposals/${proposalId}/votes`;
    return await requestWrapper(url);
  } catch (e) {
    throw new Error(e);
  }
};
