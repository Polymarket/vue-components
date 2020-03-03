/**
 * @function beginVoteTransaction
 * @param  {type} payload  {the proposal id for voting}
 * @description initiates the voting sequence for a governance proposal
 */
export const beginDelegation = ({ state, dispatch, commit }, validator) => {
  try {
    console.log('delegating', state.delegationAmount, 'to validator', state.targetValidator);
    commit('delegation/SET_TARGET_VALIDATOR', validator, { root: true });

    dispatch('session/showStepsContainer', null, { root: true });
    dispatch('session/showLedgerDelegationSteps', null, { root: true });
  } catch (e) {
    dispatch('session/logError', e, { root: true });
  }
};

export const setDelegationAmount = ({ commit }, amount) => {
  commit('SET_DELEGATION_AMOUNT', amount);
};
