import Irisnet from 'irisnet-crypto';
import {
  signMsg,
} from '../../helpers/ledger';
import {
  postIrisSignedTx,
  fetchIrisTxByHash,
} from '../../services/api';
import {
  enrichIrisAccount,
} from '../../helpers/accountEnrichment';


import {
  IRISATTO,
  IRISFEEAMOUNT,
  IRISGAS,
  LEDGER_DELEGATE_MEMO,
  LEDGER_REWARDCLAIM_MEMO,
  LEDGER_REDELEGATE_MEMO,
  IRISHUB,
} from '../../config/delegation.js';

/**
 * @function errorMessage
 * @description helper to handle errors within this module the goal being ^simplicity ^brevity
 * @param error String from error message to be displayed as the error message
 * @param e
 */
export const errorMessage = ({
  commit,
}, e) => {
  const signingError = e.indexOf('signature');
  if (signingError > 0) {
    return commit(
      'delegation/TOGGLE_ERROR_UI', {
        message: 'There was an issue processing your signature or you rejected the transaction.',
      }, {
        root: true,
      },
    );
  } if (e === 'Unknown Status Code: undefined') {
    return commit(
      'delegation/TOGGLE_ERROR_UI', {
        message: 'An unknown error occurred.',
      }, {
        root: true,
      },
    );
  }
  return commit(
    'delegation/TOGGLE_ERROR_UI', {
      message: e,
    }, {
      root: true,
    },
  );
};

/**
 * @function enrichIrisAddresses
 * @description queries information for an account and creates an account object
 */
export const enrichIrisAddresses = async ({
  dispatch,
}, account) => {
  try {
    const enrichedIrisAccount = await enrichIrisAccount(account);
    dispatch('delegation/updateUserAccount', enrichedIrisAccount, {
      root: true,
    });
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function beginIrisDelegation
 * @description creates delegation transaction and constructs stdTx/Msg
 */
export const beginIrisDelegation = async ({
  dispatch,
  rootState,
}) => {
  try {
    // Delegate message (same for unbonding)
    const msg = {
      validator_addr: rootState.delegation.delegationConfig.delegateAddress,
      delegation: {
        denom: IRISATTO,
        amount: parseInt(rootState.delegation.delegationParams.amount, 10),
      },
    };

    // Delegate request (change type to undelegate for unbonding/undelegation)
    const request = {
      chain_id: IRISHUB,
      from: rootState.delegation.delegationParams.selectedAccount.address,
      account_number: rootState.delegation.delegationParams.selectedAccount.account_number,
      sequence: rootState.delegation.delegationParams.selectedAccount.sequence,
      fees: {
        denom: IRISATTO,
        amount: IRISFEEAMOUNT,
      },
      gas: IRISGAS,
      memo: LEDGER_DELEGATE_MEMO,
      type: 'delegate',
      msg,
    };
    dispatch('buildSignSendIrisTx', request);
  } catch (e) {
    dispatch('errorMessage', e.toString());
  }
};

/**
 * @function beginRedelegation
 * @description creates delegation transaction, awaits signature, sends to networkConstants
 */
export const beginRedelegation = async ({
  rootState,
  dispatch,
}) => {
  try {
    const msg = {
      validator_src_addr: rootState.delegation.delegationParams.selectedAccount.delegations
        .validator_addr,
      validator_dst_addr: rootState.delegation.delegationConfig.delegateAddress,
      shares_amount: (
        rootState.delegation.delegationParams.selectedAccount.delegations
          .shares * 1000000000000000000
      ).toString(),
    };
    if (msg.validator_src_addr === msg.validator_dst_addr) {
      throw new Error('A redelegation transaction to the same validator will fail.');
    }
    // Delegate request (change type to un-delegate for un-bonding / un-delegation)
    const request = {
      chain_id: IRISHUB,
      from: rootState.delegation.delegationParams.selectedAccount.address,
      account_number: rootState.delegation.delegationParams.selectedAccount.account_number,
      sequence: rootState.delegation.delegationParams.selectedAccount.sequence,
      fees: {
        denom: IRISATTO,
        amount: IRISFEEAMOUNT,
      },
      gas: IRISGAS,
      memo: LEDGER_REDELEGATE_MEMO,
      type: 'redelegate',
      msg,
    };

    dispatch('buildSignSendIrisTx', request);
  } catch (e) {
    dispatch('errorMessage', e.toString());
  }
};

/**
 * @function withdrawAllRewards
 * @description creates delegation transaction, awaits signature, sends to networkConstants
 */
export const withdrawAllRewards = async ({
  dispatch,
  rootState,
  commit,
}) => {
  try {
    // Delegate request (change type to undelegate for unbonding/undelegation)
    const request = {
      chain_id: IRISHUB,
      from: rootState.ledger.irisAccount.address,
      account_number: rootState.ledger.irisAccount.account_number,
      sequence: rootState.ledger.irisAccount.sequence,
      fees: {
        denom: IRISATTO,
        amount: IRISFEEAMOUNT,
      },
      gas: IRISGAS,
      memo: LEDGER_REWARDCLAIM_MEMO,
      type: 'withdraw_delegation_rewards_all',
    };

    const accountHDPATH = rootState.ledger.HDPATH;
    // const accountHDPATH = rootState.ledger.HDPATH; ---- for rewards claim

    const builder = Irisnet.getBuilder('iris');

    // create a stdTx from the request object
    const stdTx = builder.buildTx(JSON.parse(JSON.stringify(request)));

    // user message
    commit('ledger/SET_LEDGER_STATUS', 'Confirm Tx on your device', { root: true });

    // get the portions of the tx to sign
    const signBytes = stdTx.GetSignBytes();

    // get the signatures from a ledger signing action
    const sigs = await signMsg(accountHDPATH, signBytes);

    // get the portion of the stdTx for attaching signature(s)
    const txData = stdTx.GetData();

    // attach signatures
    txData.tx.signatures = sigs;

    commit('ledger/SET_LEDGER_STATUS', 'Tx Sent! Click to Close', { root: true });

    // send tx to node
    const res = await postIrisSignedTx(txData);
    commit('ledger/SET_TX_HASH', res.data.hash, {
      root: true,
    });
  } catch (e) {
    dispatch('errorMessage', e.toString());
  }
};

export const buildSignSendIrisTx = async ({ rootState, dispatch, commit }, request) => {
  try {
    const accountHDPATH = rootState.ledger.HDPATH;
    // const accountHDPATH = rootState.ledger.HDPATH; ---- for rewards claim

    const builder = Irisnet.getBuilder('iris');

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
    const res = await postIrisSignedTx(txData);
    commit('ledger/SET_TX_HASH', res.data.hash, {
      root: true,
    });

    dispatch(
      'delegation/toggleLoadingModal', {
        visible: true,
        header: '',
        footer: 'Broadcasting signed transaction to the networkConstants..',
      }, {
        root: true,
      },
    );

    const delay = 30000;

    setTimeout(() => {
      dispatch(
        'checkIrisTxStatus',
      );
    }, delay);
  } catch (e) {
    dispatch('errorMessage', e);
  } finally {
    dispatch('session/logDelegationRecord', null, { root: true });
  }
};

/**
 * @function checkIrisTxStatus
 * @description queries api for the status of txhash pulled from state
 * and returns an error on tx failure or success modal if tx success
 */
export const checkIrisTxStatus = async ({
  rootState,
  commit,
  dispatch,
}) => {
  try {
    const { txHash } = rootState.ledger;

    const txResponse = await fetchIrisTxByHash(txHash);

    dispatch(
      'delegation/toggleLoadingModal', {
        visible: false,
        header: '',
        footer: '',
      }, {
        root: true,
      },
    );

    if (txResponse.result.Code === 0) {
      commit('delegation/SET_ACTIVE_DELEGATION_PROMPT', 'TxSuccessPrompt', {
        root: true,
      });
    } else {
      const txError = txResponse.result.Code;
      dispatch('errorMessage', txError);
    }
  } catch (e) {
    dispatch('errorMessage', e.toString());
  }
};
