import Irisnet from 'irisnet-crypto';
import { fetchCosmosGovernanceProposals, postCosmosSignedTx } from '../../services/cosmos/api';
import { fetchIrisGovernanceProposals, fetchIrisGovProposalVotesByProposalId } from '../../services/iris/api';

import {
  COSMOSFEEAMOUNT, COSMOSGAS, LEDGER_VOTE_MEMO,
  // COSMOSHUB, UATOM, COSMOSFEEAMOUNT, COSMOSGAS, LEDGER_VOTE_MEMO,
} from '../../config/delegation';

import { signMsg } from '../../helpers/ledger';

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
export const beginVoteTransaction = ({ commit, dispatch }, payload) => {
  try {
    dispatch('session/showStepContainer', null, { root: true });
    dispatch('session/showLedgerVoteSteps', null, { root: true });
    commit('SET_VOTE_PROPOSAL', payload);
  } catch (e) {
    dispatch('session/logError', e, { root: true });
  }
};


export const vote = async ({ state, rootState }, payload) => {
  // Delegate message (same for unbonding)

  console.log(payload);

  const msg = {
    proposal_id: state.voteProposal.id,
    option: 0x01,
    voter: rootState.ledger.account.address,
  };

  // Delegate request (change type to undelegate for unbonding / un-delegating)
  const request = {
    chain_id: 'gaia-13007',
    from: rootState.ledger.account.address,
    account_number: rootState.ledger.account.account_number,
    sequence: rootState.ledger.account.sequence,
    fees: {
      denom: 'umuon',
      amount: COSMOSFEEAMOUNT,
    },
    gas: COSMOSGAS,
    memo: LEDGER_VOTE_MEMO,
    type: 'vote',
    msg,
  };
  console.log(request);


  const builder = Irisnet.getBuilder('cosmos');
  const accountHDPATH = rootState.ledger.HDPATH;

  // create a stdTx from the request object
  const stdTx = builder.buildTx(JSON.parse(JSON.stringify(request)));

  // get the portions of the tx to sign
  const signBytes = stdTx.GetSignBytes();

  // get the signatures from a ledger signing action
  const sigs = await signMsg(accountHDPATH, signBytes);

  // get the portion of the stdTx for attaching signature(s)
  const txData = stdTx.GetData();
  console.log(txData);

  // attach signatures
  txData.tx.signatures = sigs;

  console.log(sigs);

  // send tx to node
  const txResponse = await postCosmosSignedTx(txData);
  console.log(txResponse);
};


export const deposit = ({ commit }, payload) => {
  commit('SET_CURRENT_PROPOSAL', payload);
};
