import { BottomSheet } from 'quasar';
import { chains } from '../../config';

export const toggleLeftDrawer = async ({ commit }, payload) => {
  commit('SET_LEFT_DRAWER', payload);
};

export const toggleRightDrawer = async ({ commit }, payload) => {
  commit('SET_RIGHT_DRAWER', payload);
};

export const toggleNetworkSheet = async ({ commit }) => {
  BottomSheet.create({
    dark: true,
    message: 'Network Selection',
    grid: true,
    actions: [
      {
        label: 'Cosmos',
        img: 'statics/logos/cosmos.svg',
        id: 'cosmos',
        meta: 'Cosmos',
      },
      {
        label: 'Irisnet',
        img: 'statics/logos/irisnet.svg',
        id: 'iris',
        meta: 'Irisnet',
      },
      {
        label: 'Kava',
        img: 'statics/logos/kava.svg',
        id: 'kava',
        meta: 'Kava',
      },
      {
        label: 'Terra',
        img: 'statics/logos/terra.svg',
        id: 'terra',
        meta: 'Terra',
      },
    ],
  }).onOk((action) => {
    commit('SET_NETWORK_CONFIG', chains[action.id]);
    commit('ADD_LOG_MESSAGE', `Now connected to ${action.id}`);
  }).onCancel(() => {
    // console.log('Dismissed')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  });
};


export const logInfo = async ({ commit }, payload) => {
  const log = {
    severity: 'info',
    message: payload,
  };
  commit('ADD_LOG_MESSAGE', log);
};

export const logWarning = async ({ commit }, payload) => {
  const log = {
    severity: 'warning',
    message: payload,
  };
  commit('ADD_LOG_MESSAGE', log);
};

export const logError = async ({ commit }, payload) => {
  const log = {
    severity: 'error',
    message: payload,
  };
  commit('ADD_LOG_MESSAGE', log);
};

export const showLedgerVoteSteps = async ({ commit }) => {
  commit('SHOW_LEDGER_VOTE_STEPS');
};
export const hideLedgerVoteSteps = async ({ commit }) => {
  commit('HIDE_LEDGER_VOTE_STEPS');
};


export const hideStepsContainer = async ({ commit }) => {
  commit('HIDE_STEPS_CONTAINER');
};

export const showStepsContainer = async ({ commit }) => {
  commit('SHOW_STEPS_CONTAINER');
};

export const setLedgerTxInProgress = async ({ commit }, payload) => {
  commit('SET_LEDGER_TX_IN_PROGRESS', payload);
};

export const setLedgerTxCurrentStepNumber = async ({ commit }, payload) => {
  commit('SET_LEDGER_TX_CURRENT_STEP', payload);
};

export const setLedgerTxCurrentStepOptionalMsg = async ({ commit }, payload) => {
  commit('SET_LEDGER_TX_CURRENT_STEP_MESSAGE', payload);
};


/**
 * @function beginDelegation
 * @description initiates the delegation sequence
 */
export const beginDelegationTransaction = ({ commit, dispatch }, validator) => {
  try {
    commit('delegation/SET_TARGET_VALIDATOR', validator, { root: true });
    commit('SHOW_STEPS_CONTAINER');
    commit('SHOW_LEDGER_DELEGATION_STEPS');
  } catch (e) {
    dispatch('logError', e);
  }
};

/**
 * @function beginVoteTransaction
 * @param  {type} payload  {the proposal id for voting}
 * @description initiates the voting sequence for a governance proposal
 */
export const beginVoteTransaction = ({ commit, dispatch }, payload) => {
  try {
    commit('SHOW_STEPS_CONTAINER');
    commit('SHOW_LEDGER_VOTE_STEPS');
    commit('governance/SET_VOTE_PROPOSAL', payload, { root: true });
  } catch (e) {
    dispatch('session/logError', e, { root: true });
  }
};




/**
 * @function endVoteTransaction
 * @description cleans up following a delegation transaction.
 */
export const endLedgerTransaction = ({ commit, dispatch }) => {
  try {
    commit('HIDE_STEPS_CONTAINER');
    commit('HIDE_LEDGER_DELEGATION_STEPS');
    commit('HIDE_LEDGER_VOTE_STEPS');
    commit('SET_LEDGER_TX_IN_PROGRESS', false);
    commit('SET_LEDGER_TX_CURRENT_STEP', 1);
    commit('SET_LEDGER_TX_CURRENT_STEP_MESSAGE', '');
    commit('governance/SET_VOTE_PROPOSAL', null, { root: true });
  } catch (e) {
    dispatch('logError', e);
  }
};
