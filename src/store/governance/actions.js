import { fetchCosmosGovernanceProposals } from '../../services/cosmos/api';
import { fetchIrisGovernanceProposals, fetchIrisGovProposalVotesByProposalId } from '../../services/iris/api';

import {
  COSMOSHUB, UATOM, COSMOSFEEAMOUNT, COSMOSGAS, LEDGER_VOTE_MEMO,
} from '../../config/delegation';

import {
  processIrisGovernanceProposals,
  processCosmosGovernanceProposals,
} from '../../helpers/governance';

/**
 * @function fetchGovernanceProposals
 * @description simply calls the fetch actions for each protocol
 * @description TODO: remove this once handled by main data flow process
 */
export const fetchGovernanceProposals = async ({ dispatch }) => {
  try {
    dispatch('queryIrisProposals');
    dispatch('queryCosmosProposals');
  } catch (e) {
    dispatch('session/logError', e, { root: true });
  }
};


/**
 * @function queryIrisProposals
 * @description fetches iris proposals from API, parses results, and commits to state
 */
export const queryIrisProposals = async ({ commit, dispatch }) => {
  try {
    // Fetch proposals from api
    const irisProposals = await fetchIrisGovernanceProposals();

    // Process the proposals using helper method
    const processedIrisProposals = await processIrisGovernanceProposals(
      irisProposals,
    );

    const IrisGovProposalsWithVotes = [];


    // Get the votes for each proposal
    for (let i = 0; i < processedIrisProposals.length; i += 1) {
      // wait for the promise to resolve before advancing the for loop
      const proposalWithVotes = { ...processedIrisProposals[i] };

      /* eslint-disable  */
      const votes = await fetchIrisGovProposalVotesByProposalId(
        processedIrisProposals[i].id,
      );
      /* eslint-enable  */

      // Add the votes to the processed proposal and push to main array
      proposalWithVotes.votes = votes;
      IrisGovProposalsWithVotes.push(proposalWithVotes);
    }

    // commit the processed proposals with votes to the state
    commit('SET_IRIS_PROPOSALS', IrisGovProposalsWithVotes);
  } catch (e) {
    dispatch('session/logError', e, { root: true });
  }
};

/**
 * @function queryCosmosProposals
 * @description fetches cosmos proposals from API, parses results, and commits to state
 */
export const queryCosmosProposals = async ({ commit, dispatch }) => {
  try {
    const cosmosProposals = await fetchCosmosGovernanceProposals();
    const processedCosmosProposals = await processCosmosGovernanceProposals(
      cosmosProposals,
    );

    // TODO: process the votes for each proposal

    commit('SET_COSMOS_PROPOSALS', processedCosmosProposals);
  } catch (e) {
    dispatch('session/logError', e, { root: true });
  }
};

/**
 * @function setCurrentProposal
 * @description sets the current proposal for purposes of rendering the ProposalModal
 */
// export const setCurrentProposal = ({ commit }, payload) => {
//   commit('SET_CURRENT_PROPOSAL', payload);
// };


/**
 * @function vote
 * @param  {type} payload  {the proposal id for voting}
 * @description initiates the voting sequence for a governance proposal
 */
export const vote = ({ rootState, dispatch }, payload) => {
  try {
    dispatch('session/showStepContainer', null, { root: true });
    dispatch('session/showLedgerVoteSteps', null, { root: true });


    // Delegate message (same for unbonding)
    const msg = {
      proposal_id: payload,
      option: 'yes',
      voter: '',
    };


    const address = rootState.ledger.address[rootState.network];
    // Delegate request (change type to undelegate for unbonding / un-delegating)
    const request = {
      chain_id: COSMOSHUB,
      from: address,
      account_number:
        rootState.delegation.delegationParams.selectedAccount.account_number,
      sequence: rootState.delegation.delegationParams.selectedAccount.sequence,
      fees: {
        denom: UATOM,
        amount: COSMOSFEEAMOUNT,
      },
      gas: COSMOSGAS,
      memo: LEDGER_VOTE_MEMO,
      type: 'vote',
      msg,
    };


    dispatch('cosmos/buildSignSendCosmosTx', request, { root: true });
  } catch (e) {
    dispatch('session/logError', e, { root: true });
  }
};


export const deposit = ({ commit }, payload) => {
  commit('SET_CURRENT_PROPOSAL', payload);
};
