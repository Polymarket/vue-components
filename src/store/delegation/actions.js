import Irisnet from 'irisnet-crypto';
import { LEDGER_DELEGATE_MEMO } from '../../config';
import { signMsg } from '../../helpers/ledger';

export const setDelegationAmount = ({ commit }, amount) => {
  commit('SET_DELEGATION_AMOUNT', amount);
};

/**
 * @function beginDelegation
 * @description creates delegation transaction, awaits signature, sends to networkConstants
 */
export const createDelegationTx = async ({ state, rootState, dispatch }) => {
  try {
    // const builder = Irisnet.getBuilder(rootState.session.networkConfig.networkNameLC.toString());


    // const req = {
    //   denom: rootState.session.networkConfig.delegationDenom,
    //   amount: state.delegationAmount * rootState.session.networkConfig.denomMultiplier,
    //   validator_addr: state.targetProvider.operator_address,
    //   from: rootState.ledger.account[rootState.session.networkConfig.networkNameLC].address,
    // };
    //
    // const genMsg = builder.newDelegation(req);
    // console.log(genMsg);
    //
    let msg;
    if (rootState.session.networkConfig.networkNameLC !== 'iris') {
      msg = {
        validator_addr: state.targetProvider.operator_address,
        amount: {
          denom: rootState.session.networkConfig.delegationDenom,
          amount: state.delegationAmount * rootState.session.networkConfig.denomMultiplier,
        },
      };
    } else {
      msg = {
        validator_addr: state.targetProvider.operator_address,
        delegation: {
          denom: rootState.session.networkConfig.delegationDenom,
          amount: state.delegationAmount * rootState.session.networkConfig.denomMultiplier,
        },
      };
    }


    // console.log(msg);
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
    console.log(request);
    dispatch('buildSignSendLedgerTx', request);
  } catch (e) {
    throw new Error(e);
  }
};


export const buildSignSendLedgerTx = async ({ rootState, dispatch }, request) => {
  try {
    const builder = Irisnet.getBuilder(rootState.session.networkConfig.networkNameLC.toString());
    const accountHDPATH = rootState.ledger.HDPATH;

    // create a stdTx from the request object
    const stdTx = builder.buildTx(JSON.parse(JSON.stringify(request)));

    // get the portions of the tx to sign
    const signBytes = stdTx.GetSignBytes();

    // get the signatures from a ledger signing action
    const sigs = await signMsg(accountHDPATH, signBytes);

    // get the portion of the stdTx for attaching signature(s)
    const txData = stdTx.GetData();

    // attach signatures
    txData.tx.signatures = sigs;

    // send tx to node
    dispatch('ledger/postSignedTx', txData, { root: true });
  } catch (e) {
    dispatch('session/logError', e, { root: true });
  } finally {
    dispatch('session/logDelegationRecord', null, { root: true });
  }
};
