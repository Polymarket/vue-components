import { LEDGER_DELEGATE_MEMO } from '../../config';

export const setDelegationAmount = ({ commit }, amount) => {
  commit('SET_DELEGATION_AMOUNT', amount);
};

/**
 * @function beginDelegation
 * @description creates delegation transaction, awaits signature, sends to networkConstants
 */
export const createDelegationTx = async ({ state, dispatch, rootState }) => {
  try {
    const msg = {
      validator_addr: state.targetProvider.operator_address,
      delegator_addr:
      rootState.ledger.account[rootState.session.networkConfig.networkNameLC].address,
      amount: {
        denom: rootState.session.networkConfig.delegationDenom,
        amount: state.delegationAmount * rootState.session.networkConfig.denomMultiplier,
      },
    };

    const request = {
      chain_id: rootState.session.networkConfig.chainID,
      from: rootState.ledger.account[rootState.session.networkConfig.networkNameLC].address,
      account_number:
      rootState.ledger.account[rootState.session.networkConfig.networkNameLC].account_number,
      sequence: rootState.ledger.account[rootState.session.networkConfig.networkNameLC].sequence,
      fees: {
        denom: rootState.session.networkConfig.delegationDenom,
        amount: rootState.session.networkConfig.fee,
      },
      gas: rootState.session.networkConfig.gas,
      memo: LEDGER_DELEGATE_MEMO,
      type: 'delegate',
      msg,
    };

    dispatch('kava/buildSignSendKavaTx', request, { root: true });
  } catch (e) {
    throw new Error(e);
  }
};
