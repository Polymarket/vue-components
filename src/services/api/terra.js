import axios from 'axios';
import { TERRA_NODE_URL } from '../../config/nodes';


/**
 * @function requestWrapper
 * @description wrapper to handle api calls
 * @param  {string} endpoint the api endpoint used in the GET request
 */
const requestWrapper = async (endpoint) => {
  try {
    const url = `${TERRA_NODE_URL}${endpoint}`;
    const res = await axios.get(url);
    return res.data.result;
  } catch (e) {
    throw new Error(e);
  }
};


/**
 * @function fetchTerraValidatorSet
 * @description returns the latest validator candidates
 * @return {array} validator candidates
 */
export const fetchTerraValidatorSet = async () => {
  try {
    const endpoint = '/staking/validators';
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchTerraLatestBlock
 * @description gets the latest block height
 * @return  {commit} {SET_LAST_BLOCK}
 */
export const fetchTerraLatestBlock = async () => {
  try {
    const endpoint = '/blocks/latest';
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchTerraStakingParameters
 * @description fetches staking parameters including denom
 */
export const fetchTerraStakingParameters = async () => {
  try {
    const endpoint = '/staking/parameters';
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchTerraAddressDelegationTxHistory
 * @description returns the delegation transaction history for a given address
 * @return  {res.data} delegation transaction history
 * @param address
 */
export const fetchTerraAddressDelegationTxHistory = async (address) => {
  try {
    const endpoint = `/staking/delegators/${address}/txs`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchTerraAddressDelegations
 * @description returns aggregate delegations from an address to all validators
 * @param address
 */
export const fetchTerraAddressDelegations = async (address) => {
  try {
    const endpoint = `/staking/delegators/${address}/delegations`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchTerraAddressUnbondingDelegations
 * @description fetches unbonding delegabanktions for an address
 * @param  {type} address {description}
 */
export const fetchTerraAddressUnbondingDelegations = async (address) => {
  try {
    const endpoint = `/staking/delegators/${address}/unbonding_delegations`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchTerraDelegateValidatorRewards
 * @description fetches rewards balance for a delegate from a validator delegation
 * @param  {type} address           {address of the delegator}
 * @param  {type} validatorAddress {address of the validator}
 */
export const fetchTerraDelegateValidatorRewards = async (
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
 * @function fetchTerraAccountAuthInfo
 * @description returns aggregate delegations from an address to all validators
 * @param address
 */
export const fetchTerraAccountAuthInfo = async (address) => {
  try {
    const endpoint = `/auth/accounts/${address}`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchTerraAccountBalance
 * @description returns the balance for a given address
 * @param  {type} address account address
 */
export const fetchTerraAccountBalance = async (address) => {
  try {
    const endpoint = `/auth/balances/${address}`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchTerraDelegationRewards
 * @description fetches rewards balance for a delegate from a validator delegation
 * @param  {type} address           {description}
 * @param  {string} validatorAddress {description}
 */
export const fetchTerraDelegationRewards = async (
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
 * @function fetchTerraDelegationUnbondingTxs
 * @description fetches rewards balance for a delegate from a validator delegation
 * @param  {type} address           {description}
 * @param  {type} validatorAddress {description}
 */
export const fetchTerraDelegationUnbondingTxs = async (
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
export const postTerraSignedTx = async (txData) => {
  try {
    const url = `${TERRA_NODE_URL}/txs`;
    console.log(url, JSON.stringify(txData));
    const pr = await axios.post(url, JSON.stringify(txData));
    console.log(pr);
    return pr;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchTerraTxByHash
 */
export const fetchTerraTxByHash = async (txHash) => {
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
 * @function fetchTerraGovernanceProposals
 * @description queries for the latest governance proposals
 */
export const fetchTerraGovernanceProposals = async () => {
  try {
    const endpoint = '/gov/proposals';
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchTerraGovProposalVotesByProposalId
 */
export const fetchTerraGovProposalVotesByProposalId = async () => {
  try {
    const endpoint = '/gov/proposals';
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};
