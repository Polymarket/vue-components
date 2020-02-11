/**
 * @function SET_COSMOS_PROPOSALS
 */
export function SET_COSMOS_PROPOSALS(state, val) {
  state.govProposals.cosmos = Object.assign({}, val);
}

/**
 * @function SET_IRIS_PROPOSALS
 */
export function SET_IRIS_PROPOSALS(state, val) {
  state.govProposals.iris = Object.assign({}, val);
}

/**
 * @function SET_CURRENT_PROPOSAL
 * @description sets the current proposal for the ProposalModal
 */
export function SET_CURRENT_PROPOSAL(state, val) {
  state.currentProposal = val;
}
