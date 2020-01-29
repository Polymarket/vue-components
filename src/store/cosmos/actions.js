import Irisnet from 'irisnet-crypto';
import { signMsg } from '../../helpers/ledger';

import {
  fetchCosmosTxByHash,
  postCosmosSignedTx,
} from '../../services/cosmos/api';

import {
  COSMOSHUB,
  UATOM,
  LEDGER_REDELEGATE_MEMO,
  LEDGER_DELEGATE_MEMO,
  COSMOSFEEAMOUNT,
  COSMOSGAS,
  LEDGER_UNBOND_MEMO,
  LEDGER_REWARDCLAIM_MEMO,
} from '../../config/delegation';


/**
 * @function beginDelegation
 * @description creates delegation transaction, awaits signature, sends to network
 */
export const beginDelegation = async ({
  rootState,
  dispatch,
}) => {
  try {
    // Delegate message (same for unbonding)
    const msg = {
      validator_addr: rootState.delegation.delegationConfig.delegateAddress,
      amount: {
        denom: UATOM,
        amount: rootState.delegation.delegationParams.amount,
      },
    };

    // Delegate request (change type to undelegate for unbonding / un-delegating)
    const request = {
      chain_id: COSMOSHUB,
      from: rootState.delegation.delegationParams.selectedAccount.address,
      account_number:
        rootState.delegation.delegationParams.selectedAccount.account_number,
      sequence: rootState.delegation.delegationParams.selectedAccount.sequence,
      fees: {
        denom: UATOM,
        amount: COSMOSFEEAMOUNT,
      },
      gas: COSMOSGAS,
      memo: LEDGER_DELEGATE_MEMO,
      type: 'delegate',
      msg,
    };

    dispatch('buildSignSendCosmosTx', request);
  } catch (e) {
    dispatch('errorMessage', e.toString());
  }
};

/**
 * @function beginRedelegation
 * @description creates delegation transaction, awaits signature, sends to network
 */
export const beginRedelegation = async ({
  rootState,
  dispatch,
}) => {
  try {
    const msg = {
      validator_src_addr:
        rootState.delegation.delegationParams.selectedAccount.delegations
          .validator_address,
      validator_dst_addr: rootState.delegation.delegationConfig.delegateAddress,
      amount: {
        denom: UATOM,
        amount: parseFloat(rootState.delegation.delegationParams.amount),
      },
    };

    // Delegate request (change type to undelegate for unbonding / un-delegate)
    const request = {
      chain_id: COSMOSHUB,
      from: rootState.delegation.delegationParams.selectedAccount.address,
      account_number:
        rootState.delegation.delegationParams.selectedAccount.account_number,
      sequence: rootState.delegation.delegationParams.selectedAccount.sequence,
      fees: {
        denom: UATOM,
        amount: COSMOSFEEAMOUNT,
      },
      gas: COSMOSGAS,
      memo: LEDGER_REDELEGATE_MEMO,
      type: 'begin_redelegate',
      msg,
    };
    if (msg.validator_src_addr === msg.validator_dst_addr) {
      throw new Error('A redelegation transaction to the same validator will fail.');
    }
    dispatch('buildSignSendCosmosTx', request);
  } catch (e) {
    dispatch('errorMessage', e.toString());
  }
};

/**
 * @function beginUnbonding
 * @description creates unbonding transaction, awaits signature, sends to network
 */
export const beginUnbonding = async ({
  rootState,
  dispatch,
}) => {
  try {
    // Delegate message (same for unbonding)
    const msg = {
      validator_addr: rootState.delegation.delegationConfig.delegateAddress,
      amount: {
        denom: UATOM,
        amount: rootState.delegation.delegationParams.amount,
      },
    };

    // Delegate request (change type to undelegate for unbonding / un-delegating)
    const request = {
      chain_id: COSMOSHUB,
      from: rootState.delegation.delegationParams.selectedAccount.address,
      account_number:
        rootState.delegation.delegationParams.selectedAccount.account_number,
      sequence: rootState.delegation.delegationParams.selectedAccount.sequence,
      fees: {
        denom: UATOM,
        amount: COSMOSFEEAMOUNT,
      },
      gas: COSMOSGAS,
      memo: LEDGER_UNBOND_MEMO,
      type: 'undelegate',
      msg,
    };
    if (msg.validator_src_addr === msg.validator_dst_addr) {
      throw new Error('A redelegation transaction to the same validator will fail.');
    }

    dispatch('buildSignSendCosmosTx', request);
  } catch (e) {
    dispatch('errorMessage', e.toString());
  }
};


/**
 * @function withdrawAllRewards
 * @description creates delegation transaction, awaits signature, sends to network
 */


// {
//   "address": "cosmos1fhj7pkuvwflr7z7ngp2v9tj7g58aq2tjtl56r4",
//   "coins": [
//     {
//       "denom": "umuon",
//       "amount": "146733"
//     }
//   ],
//   "public_key": {
//     "type": "tendermint/PubKeySecp256k1",
//     "value": "A1bs2cJdRWUQbBwufQPhZcSBu39VopEFPqeIaWS37siu"
//   },
//   "account_number": "22",
//   "sequence": "13",
//   "unbondingDelegations": [],
//   "HDPATH": [
//     44,
//     118,
//     0,
//     0,
//     0
//   ],
//   "pubKey": {
//     "type": "Buffer",
//     "data": [
//       3,
//       86,
//       236,
//       217,
//       194,
//       93,
//       69,
//       101,
//       16,
//       108,
//       28,
//       46,
//       125,
//       3,
//       225,
//       101,
//       196,
//       129,
//       187,
//       127,
//       85,
//       162,
//       145,
//       5,
//       62,
//       167,
//       136,
//       105,
//       100,
//       183,
//       238,
//       200,
//       174
//     ]
//   },
//   "delegations": [
//     {
//       "delegator_address": "cosmos1fhj7pkuvwflr7z7ngp2v9tj7g58aq2tjtl56r4",
//       "validator_address": "cosmosvaloper1fhj7pkuvwflr7z7ngp2v9tj7g58aq2tjwtq00x",
//       "shares": "53451083199.000000000000000000",
//       "balance": "53451083199.000000000000000000",
//       "providerName": "Appeal2Heaven",
//       "providerLogo": "",
//       "providerURL": "",
//       "rewardsData": [
//         {
//           "denom": "umuon",
//           "amount": "570976644.896065356827982504"
//         }
//       ]
//     }
//   ],
//   "balance": "146733"
// }
export const withdrawAllRewards = async ({
  dispatch,
  rootState,
  commit,
}) => {
  try {
    const msg = {
      validator_addr: rootState.ledger.cosmosAccount.delegations[0].validator_address,
    };
    // Delegate request (change type to undelegate for unbonding/undelegation)
    const request = {
      chain_id: COSMOSHUB,
      from: rootState.ledger.cosmosAccount.address,
      account_number: rootState.ledger.cosmosAccount.account_number,
      sequence: rootState.ledger.cosmosAccount.sequence,
      fees: {
        denom: UATOM,
        amount: COSMOSFEEAMOUNT,
      },
      gas: COSMOSGAS,
      memo: LEDGER_REWARDCLAIM_MEMO,
      type: 'withdraw_delegation_reward',
      msg,
    };

    const accountHDPATH = rootState.ledger.HDPATH;

    const builder = Irisnet.getBuilder('cosmos');

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
    const res = await postCosmosSignedTx(txData);
    commit('ledger/SET_TX_HASH', res.data.hash, {
      root: true,
    });
  } catch (e) {
    dispatch('errorMessage', e.toString());
  }
};
/**
 * @function buildSignSendCosmosTx
 * @description Constructs the transaction, sends to ledger for signature, and sends to network
 * @param  {Object} request   {the raw transaction request for the Msg type to build}
 */
export const buildSignSendCosmosTx = async ({ rootState, dispatch, commit }, request) => {
  try {
    const builder = Irisnet.getBuilder('cosmos');
    const accountHDPATH = rootState.delegation.delegationParams.selectedAccount.HDPATH;

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
    const txResponse = await postCosmosSignedTx(txData);
    commit('ledger/SET_TX_HASH', txResponse.data.txhash, {
      root: true,
    });
    if (txResponse.data.logs[0].success === true) {
      commit('delegation/SET_ACTIVE_DELEGATION_PROMPT', 'TxSuccessPrompt', {
        root: true,
      });
    } else {
      dispatch(
        'delegation/toggleLoadingModal', {
          visible: true,
          header: '',
          footer: 'Broadcasting signed transaction to the network..',
        }, {
          root: true,
        },
      );

      const delay = 30000;

      setTimeout(() => {
        dispatch(
          'checkCosmosTxStatus',
        );
      }, delay);
    }
  } catch (e) {
    dispatch('errorMessage', e);
  } finally {
    dispatch('session/logDelegationRecord', null, { root: true });
  }
};

export const checkCosmosTxStatus = async ({ rootState, commit, dispatch }) => {
  try {
    const { txHash } = rootState.ledger;
    const txResponse = await fetchCosmosTxByHash(txHash);

    dispatch(
      'delegation/toggleLoadingModal',
      {
        visible: false,
        header: '',
        footer: '',
      },
      { root: true },
    );

    if (txResponse.logs[0].success === true) {
      commit('delegation/SET_ACTIVE_DELEGATION_PROMPT', 'TxSuccessPrompt', {
        root: true,
      });
    } else {
      const txError = txResponse.logs.log;
      dispatch('errorMessage', txError.toString());
    }
  } catch (e) {
    dispatch('errorMessage', 'It is taking longer than usual to confirm your transaction. We apologize for any inconvenience.');
    const delay = 10000;

    setTimeout(() => {
      dispatch(
        'checkCosmosTxStatus',
      );
    }, delay);
  }
};
