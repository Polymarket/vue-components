import Irisnet from 'irisnet-crypto';
import { signMsg } from '../../helpers/ledger';

import {
  // LEDGER_REDELEGATE_MEMO,
  LEDGER_DELEGATE_MEMO,
  // LEDGER_UNBOND_MEMO,
  // LEDGER_REWARDCLAIM_MEMO,
  // LEDGER_VOTE_MEMO,
} from '../../config/index';

import {
  // fetchKavaTxByHash,
  postKavaSignedTx,
} from '../../services/api';


/**
 * @function beginDelegation
 * @description creates delegation transaction, awaits signature, sends to networkConstants
 */
export const beginDelegation = async ({ dispatch, rootState }) => {
  try {
    const msg = {
      validator_addr: rootState.delegation.targetProvider.operator_address,
      delegator_addr:
        rootState.ledger.account[rootState.session.networkConfig.networkNameLC].address,
      amount: {
        denom: rootState.session.networkConfig.delegationDenom,
        amount: rootState.delegation.delegationAmount * 1000000,
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

    dispatch('buildSignSendKavaTx', request);
  } catch (e) {
    throw new Error(e);
  }
};

// /**
//  * @function beginRedelegation
//  * @description creates delegation transaction, awaits signature, sends to networkConstants
//  */
// export const beginRedelegation = async ({
//   rootState,
//   dispatch,
// }) => {
//   try {
//     const msg = {
//       validator_src_addr:
//         rootState.delegation.delegationParams.selectedAccount.delegations
//           .validator_address,
//       validator_dst_addr: rootState.delegation.delegationConfig.delegateAddress,
//       amount: {
//         denom: UATOM,
//         amount: parseFloat(rootState.delegation.delegationParams.amount),
//       },
//     };
//
//     // Delegate request (change type to undelegate for unbonding / un-delegate)
//     const request = {
//       chain_id: KAVAMAINNET,
//       from: rootState.delegation.delegationParams.selectedAccount.address,
//       account_number:
//         rootState.delegation.delegationParams.selectedAccount.account_number,
//       sequence: rootState.delegation.delegationParams.selectedAccount.sequence,
//       fees: {
//         denom: UATOM,
//         amount: KAVAFEEAMOUNT,
//       },
//       gas: KAVAGAS,
//       memo: LEDGER_REDELEGATE_MEMO,
//       type: 'begin_redelegate',
//       msg,
//     };
//     if (msg.validator_src_addr === msg.validator_dst_addr) {
//       throw new Error('A redelegation transaction to the same validator will fail.');
//     }
//     dispatch('buildSignSendKavaTx', request);
//   } catch (e) {
//     dispatch('errorMessage', e.toString());
//   }
// };
//
// /**
//  * @function beginUnbonding
//  * @description creates unbonding transaction, awaits signature, sends to networkConstants
//  */
// export const beginUnbonding = async ({
//   rootState,
//   dispatch,
// }) => {
//   try {
//     // Delegate message (same for unbonding)
//     const msg = {
//       validator_addr: rootState.delegation.delegationConfig.delegateAddress,
//       amount: {
//         denom: UATOM,
//         amount: rootState.delegation.delegationParams.amount,
//       },
//     };
//
//     // Delegate request (change type to undelegate for unbonding / un-delegating)
//     const request = {
//       chain_id: KAVAMAINNET,
//       from: rootState.delegation.delegationParams.selectedAccount.address,
//       account_number:
//         rootState.delegation.delegationParams.selectedAccount.account_number,
//       sequence: rootState.delegation.delegationParams.selectedAccount.sequence,
//       fees: {
//         denom: UATOM,
//         amount: KAVAFEEAMOUNT,
//       },
//       gas: KAVAGAS,
//       memo: LEDGER_UNBOND_MEMO,
//       type: 'undelegate',
//       msg,
//     };
//     if (msg.validator_src_addr === msg.validator_dst_addr) {
//       throw new Error('A redelegation transaction to the same validator will fail.');
//     }
//
//     dispatch('buildSignSendKavaTx', request);
//   } catch (e) {
//     dispatch('errorMessage', e.toString());
//   }
// };
//
//
// /**
//  * @function govVote
//  */
// export const govVote = async ({
//   rootState,
//   dispatch,
// }) => {
//   try {
//     // Delegate message (same for unbonding)
//     const msg = {
//       proposal_id: rootState.delegation.delegationConfig.delegateAddress,
//       voter: 'asdf',
//       option: 'Yes',
//     };
//
//     // Delegate request (change type to undelegate for unbonding / un-delegating)
//     const request = {
//       chain_id: GAIA,
//       from: rootState.delegation.delegationParams.selectedAccount.address,
//       account_number:
//         rootState.delegation.delegationParams.selectedAccount.account_number,
//       sequence: rootState.delegation.delegationParams.selectedAccount.sequence,
//       fees: {
//         denom: 'umuon',
//         amount: KAVAFEEAMOUNT,
//       },
//       gas: KAVAGAS,
//       memo: LEDGER_VOTE_MEMO,
//       type: 'vote',
//       msg,
//     };
//
//     dispatch('buildSignSendKavaTx', request);
//   } catch (e) {
//     dispatch('errorMessage', e.toString());
//   }
// };
//
//
/**
 * @function buildSignSendKavaTx
 * @description Constructs the transaction,
 sends to ledger for signature, and sends to networkConstants
 * @param  {Object} request   {the raw transaction request for the Msg type to build}
 */
export const buildSignSendKavaTx = async ({ rootState, dispatch }, request) => {
  try {
    const builder = Irisnet.getBuilder(rootState.session.networkConfig.networkNameLC);
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
    const txResponse = await postKavaSignedTx(txData);
    console.log(txResponse);
    // commit('ledger/SET_TX_HASH', txResponse.data.txhash, {
    //   root: true,
    // });
    // if (txResponse.data.logs[0].success === true) {
    //   commit('delegation/SET_ACTIVE_DELEGATION_PROMPT', 'TxSuccessPrompt', {
    //     root: true,
    //   });
    // } else {
    //   dispatch(
    //     'delegation/toggleLoadingModal', {
    //       visible: true,
    //       header: '',
    //       footer: 'Broadcasting signed transaction to the networkConstants..',
    //     }, {
    //       root: true,
    //     },
    //   );

    //   const delay = 30000;

    //   setTimeout(() => {
    //     dispatch(
    //       'checkKavaTxStatus',
    //     );
    //   }, delay);
    // }
  } catch (e) {
    dispatch('session/logError', e, { root: true });
  } finally {
    dispatch('session/logDelegationRecord', null, { root: true });
  }
};
//
// // message MsgDeposit {
// //   required int64 proposalID = 1;
// //   required bytes depositor = 2;
// //   repeated Coin amount = 3;
// // }
//
// // message MsgVote {
// //   required int64 proposalID = 1;
// //   required bytes voter = 2;
// //   required uint64 option = 3;
// // }
// /**
//  * @function govDeposit
//  */
// export const govDeposit = async ({
//   rootState,
//   dispatch,
// }) => {
//   try {
//     // Delegate message (same for unbonding)
//     const msg = {
//       validator_addr: rootState.delegation.delegationConfig.delegateAddress,
//       amount: {
//         denom: UATOM,
//         amount: rootState.delegation.delegationParams.amount,
//       },
//     };
//
//     // Delegate request (change type to undelegate for unbonding / un-delegating)
//     const request = {
//       chain_id: KAVAMAINNET,
//       from: rootState.delegation.delegationParams.selectedAccount.address,
//       account_number:
//         rootState.delegation.delegationParams.selectedAccount.account_number,
//       sequence: rootState.delegation.delegationParams.selectedAccount.sequence,
//       fees: {
//         denom: UATOM,
//         amount: KAVAFEEAMOUNT,
//       },
//       gas: KAVAGAS,
//       memo: LEDGER_UNBOND_MEMO,
//       type: 'undelegate',
//       msg,
//     };
//     if (msg.validator_src_addr === msg.validator_dst_addr) {
//       throw new Error('A redelegation transaction to the same validator will fail.');
//     }
//
//     dispatch('buildSignSendKavaTx', request);
//   } catch (e) {
//     dispatch('session/logError', e, { root: true });
//   }
// };
//
//
// /**
//  * @function withdrawAllRewards
//  * @description creates delegation transaction, awaits signature, sends to networkConstants
//  */
// export const withdrawAllRewards = async ({
//   dispatch,
//   rootState,
//   commit,
// }) => {
//   try {
//     const msg = {
//       validator_addr: rootState.ledger.cosmosAccount.delegations[0].validator_address,
//     };
//     // Delegate request (change type to undelegate for unbonding/undelegation)
//     const request = {
//       chain_id: KAVAMAINNET,
//       from: rootState.ledger.cosmosAccount.address,
//       account_number: rootState.ledger.cosmosAccount.account_number,
//       sequence: rootState.ledger.cosmosAccount.sequence,
//       fees: {
//         denom: UATOM,
//         amount: KAVAFEEAMOUNT,
//       },
//       gas: KAVAGAS,
//       memo: LEDGER_REWARDCLAIM_MEMO,
//       type: 'withdraw_delegation_reward',
//       msg,
//     };
//
//     const accountHDPATH = rootState.ledger.HDPATH;
//
//     const builder = Irisnet.getBuilder('cosmos');
//
//     // create a stdTx from the request object
//     const stdTx = builder.buildTx(JSON.parse(JSON.stringify(request)));
//
//     // user message
//     commit('ledger/SET_LEDGER_STATUS', 'Confirm Tx on your device', { root: true });
//
//     // get the portions of the tx to sign
//     const signBytes = stdTx.GetSignBytes();
//
//     // get the signatures from a ledger signing action
//     const sigs = await signMsg(accountHDPATH, signBytes);
//
//     // get the portion of the stdTx for attaching signature(s)
//     const txData = stdTx.GetData();
//
//     // attach signatures
//     txData.tx.signatures = sigs;
//
//     commit('ledger/SET_LEDGER_STATUS', 'Tx Sent! Click to Close', { root: true });
//
//     // send tx to node
//     const res = await postKavaSignedTx(txData);
//     commit('ledger/SET_TX_HASH', res.data.hash, {
//       root: true,
//     });
//   } catch (e) {
//     dispatch('errorMessage', e.toString());
//   }
// };
//
//
// export const checkKavaTxStatus = async ({ rootState, commit, dispatch }) => {
//   try {
//     const { txHash } = rootState.ledger;
//     const txResponse = await fetchKavaTxByHash(txHash);
//
//     dispatch(
//       'delegation/toggleLoadingModal',
//       {
//         visible: false,
//         header: '',
//         footer: '',
//       },
//       { root: true },
//     );
//
//     if (txResponse.logs[0].success === true) {
//       commit('delegation/SET_ACTIVE_DELEGATION_PROMPT', 'TxSuccessPrompt', {
//         root: true,
//       });
//     } else {
//       const txError = txResponse.logs.log;
//       dispatch('errorMessage', txError.toString());
//     }
//   } catch (e) {
//     dispatch('errorMessage', 'It is taking longer than usu
//     // al to confirm your transaction. We apologize for any inconvenience.');
//     const delay = 10000;
//
//     setTimeout(() => {
//       dispatch(
//         'checkKavaTxStatus',
//       );
//     }, delay);
//   }
// };
