import { fetchCosmosGovernanceProposals } from '../../services/cosmos/api';
import { fetchIrisGovernanceProposals, fetchIrisGovProposalVotesByProposalId } from '../../services/iris/api';

// TODO: fetchICosmosGovProposalVotesByProposalId

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
export const queryIrisProposals = async ({ commit }) => {
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
      const votes = fetchIrisGovProposalVotesByProposalId(
        processedIrisProposals[i].id,
      );

      // TODO: finish matching providers with voter addresses
      // for (let p = 0; p < votes.length; p++) {
      //   console.log(votes[p].address)
      // }

      // const providerData = await fetchProviderIdentity(
      //   vote[p].validator_addr,
      // );

      // Add the votes to the processed proposal and push to main array
      proposalWithVotes.votes = votes;
      IrisGovProposalsWithVotes.push(proposalWithVotes);
    }

    // commit the processed proposals with votes to the state
    commit('SET_IRIS_PROPOSALS', IrisGovProposalsWithVotes);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function queryCosmosProposals
 * @description fetches cosmos proposals from API, parses results, and commits to state
 */
export const queryCosmosProposals = async ({ commit }) => {
  try {
    const cosmosProposals = await fetchCosmosGovernanceProposals();
    const processedCosmosProposals = await processCosmosGovernanceProposals(
      cosmosProposals,
    );

    // TODO: process the votes for each proposal

    commit('SET_COSMOS_PROPOSALS', processedCosmosProposals);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function setCurrentProposal
 * @description sets the current proposal for purposes of rendering the ProposalModal
 */
export const setCurrentProposal = ({ commit }, payload) => {
  commit('SET_CURRENT_PROPOSAL', payload);
};
