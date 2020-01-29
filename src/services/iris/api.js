import { IRIS_NODE_URL } from '../../config/nodes';

/**
 * @function requestWrapper
 * @description wrapper to handle api calls
 * @param  {string} endpoint {description}
 */
const requestWrapper = async (endpoint) => {
  try {
    const url = `${IRIS_NODE_URL}${endpoint}`;
    const res = await this.$axios.get(url);
    return res.data;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * --------- ---------- ---- RPC CLIENT ------ ---------- -------
 */

/**
 * @function fetchIrisNodeInfo
 * @description returns information about the connected node
 * @return {res.data.result}
 */
export const fetchIrisNodeInfo = async () => {
  try {
    const endpoint = '/node-info';
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchIrisLatestBlock
 * @description gets the latest block height
 * @return  {commit} {SET_LAST_BLOCK}
 */
export const fetchIrisLatestBlock = async () => {
  try {
    const endpoint = '/blocks/latest';
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * --------- ---------- ---- STAKING ------ ---------- -------
 */

/**
 * @function fetchIrisValidatorCandidates
 * @description returns the latest validator candidates
 * @return {array} validator candidates
 */
export const fetchIrisValidatorCandidates = async () => {
  try {
    const endpoint = '/stake/validators';
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchIrisStakingParameters
 * @description fetches staking parameters including denom
 */
export const fetchIrisStakingParameters = async () => {
  try {
    const endpoint = '/stake/parameters';
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchIrisAddressDelegationHistory
 * @description returns the delegation transaction history for a given address
 * @return  {res.data} delegation transaction history
 * @param address
 */
export const fetchIrisAddressDelegationTxHistory = async (address) => {
  try {
    const endpoint = `/stake/delegators/${address}/txs`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchIrisAddressDelegations
 * @description returns aggregate delegations from an address to all validators
 * @return {res.data} {description}
 * @param address
 */
export const fetchIrisAddressDelegations = async (address) => {
  try {
    const endpoint = `/stake/delegators/${address}/delegations`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchIrisAddressUnbondingDelegations
 * @description fetches unbonding delegations for an address
 * @param  {type} address {description}
 * @return {type} {description}
 */
export const fetchIrisAddressUnbondingDelegations = async (address) => {
  try {
    const endpoint = `/stake/delegators/${address}/unbonding-delegations`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * --------- ---------- ---- DISTRIBUTION ------ ---------- -------
 */

/**
 * @function fetchIrisDelegateValidatorRewards
 * @description fetches rewards balance for a delegate from a validator delegation
 * @param  {type} address           {description}
 */
export const fetchIrisDelegateValidatorRewards = async (address) => {
  try {
    const endpoint = `/distribution/${address}/rewards`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * --------- ---------- ---- BANK ------ ---------- -------
 */

/**
 * @function fetchIrisAccountAuthInfo
 * @description returns aggregate delegations from an address to all validators
 * @return {res.data} {description}
 * @param address
 */
export const fetchIrisAccountAuthInfo = async (address) => {
  try {
    const endpoint = `/bank/accounts/${address}`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchIrisAccountBalance
 * @description returns the balance for a given address
 * @param  {type} address account address
 * @return {array} {of denominations and amounts}
 */
export const fetchIrisAccountBalance = async (address) => {
  try {
    const endpoint = `/bank/account/${address}`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * --------- ---------- ---- TX ------ ---------- -------
 */

/**
 * @function postSignedTx
 * @param  {object} txData {Signed transaction object for transmission}
 * @return {hash} {transaction hash}
 */
export const postIrisSignedTx = async (txData) => {
  try {
    const url = `${IRIS_NODE_URL}/tx/broadcast`;
    return await this.$axios.post(url, JSON.stringify(txData));
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchIrisTxByHash
 */
export const fetchIrisTxByHash = async (txHash) => {
  try {
    const endpoint = `/txs/${txHash}`;
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * --------- ---------- ---- GOVERNANCE ------ ---------- -------
 */

/**
 * @function fetchIrisGovernanceProposals
 * @description queries for the latest governance proposals
 */
export const fetchIrisGovernanceProposals = async () => {
  try {
    const endpoint = '/gov/proposals';
    return await requestWrapper(endpoint);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function fetchIrisGovProposalVotesByProposalId
 * @param {int} proposalId
 * @description queries the votes for a given proposal
 */
export const fetchIrisGovProposalVotesByProposalId = async (proposalId) => {
  try {
    const url = `/gov/proposals/${proposalId}/votes`;
    return await requestWrapper(url);
  } catch (e) {
    throw new Error(e);
  }
};
