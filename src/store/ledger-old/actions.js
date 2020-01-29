import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import CosmosApp from 'ledger-cosmos-js';


// import TransportU2F from "@ledgerhq/hw-transport-u2f";
import { createCosmosAddress, createIrisAddress } from '../../helpers/wallet';


import { COSMOS, IRIS } from '../../config/delegation.js';

const secp256k1 = require('secp256k1');


const HDPATH = [44, 118, 0, 0, 0];


// export const pollLedgerDevice = async () => {
//   let transport = null;
//   transport = await TransportWebUSB.create();
//   const app = new CosmosApp(transport);
//   const version = await app.getVersion();
//   return version;
// };

/**
 * @function getLedgerCosmosVersion
 * @description returns a response object containing the version of the cosmos ledger app
 */
export const getLedgerCosmosVersion = async () => {
  try {
    const cosmosLedgerApp = await this.connectLedger();
    const response = await cosmosLedgerApp.getVersion();
    return response;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function getLedgerPubKey
 */
export const getLedgerPubKey = async () => {
  try {
    const cosmosLedgerApp = await this.connectLedger();
    const response = await cosmosLedgerApp.publicKey(HDPATH);
    response.HDPATH = HDPATH;

    return response;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function getCosmosAddressFromPubkey
 * @param  {type} pubKey {description}
 * @return {type} {description}
 */
export const getCosmosAddressFromPubkey = async (pubKey) => {
  try {
    const address = await createCosmosAddress(pubKey);
    return address;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function getIrisAddressFromPubkey
 * @param  {type} pubKey {description}
 * @return {type} {description}
 */
export const getIrisAddressFromPubkey = async (pubKey) => {
  try {
    const address = await createIrisAddress(pubKey);
    return address;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function signMsg
 * @param  {type} accountHDPATH HDPATH for the account being used to sign
 * @param  {type} msg           unsigned message for signing
 * @return {type} the signature(s) from signing the message
 */
export const signMsg = async (accountHDPATH, msg) => {
  try {
    const cosmosLedgerApp = await this.connectLedger();

    const pubKey = await cosmosLedgerApp.publicKey(accountHDPATH);
    const res = await cosmosLedgerApp.sign(accountHDPATH, JSON.stringify(msg));
    const secp256k1Sig = secp256k1.signatureImport(res.signature);

    const signatures = [
      {
        signature: secp256k1Sig.toString('base64'),
        account_number: msg.account_number,
        sequence: msg.sequence,
        pub_key: {
          type: 'tendermint/PubKeySecp256k1',
          value: Buffer.from(pubKey.compressed_pk, 'hex').toString('base64'),
        },
      },
    ];

    return signatures;
  } catch (error) {
    throw new Error(error);
  }
};


/**
 * @function connectLedger
 * @description returns a ledger app connection (longer timeout since it is connected)
 */
export const connectLedger = async ({ state, commit }) => {
  let transport = null;
  if (state.transportChoice === 'WebUSB') {
    transport = await TransportWebUSB.create();
  } else {
    transport = await TransportU2F.create(10000);
  }
  transport = await TransportWebUSB.create();
  const ledgerApp = new CosmosApp(transport);
  commit('SET_APP', ledgerApp);
};

/**
 * @function pollLedgerDevice
 */
export const pollLedgerDevice = async () => {
  let transport = null;
  transport = await TransportWebUSB.create();
  const app = new CosmosApp(transport);
  const version = await app.getVersion();
  return version;
};


export const ledgerConnect = async ({ commit, dispatch }) => {
  commit('session/SET_LOADING', { ledger: true }, { root: true });
  try {
    // Initiate the connection to Ledger device
    const response = await pollLedgerDevice();

    if (response.error_message !== 'No errors') {
      dispatch('session/logError', response.error_message, { root: true });
      return;
    }

    commit('SET_LEDGER_APP_INFO', response);

    const pubKeys = await getLedgerPubKey();
    dispatch('session/logInfo', pubKeys, { root: true });
    dispatch('enrichCosmosAddress', pubKeys);
  } catch (error) {
    dispatch('session/logError', error, { root: true });
  } finally {
    commit('session/SET_DONE_LOADING', { ledger: false }, { root: true });
  }
};


export const queryLedgerAccounts = async ({ dispatch }) => {
  // Update message in the LoadingModal

  // Gather account info from ledger
  const pubKeys = await getLedgerPubKey();
  dispatch('session/logInfo', pubKeys, { root: true });
  // Enrich accounts found on ledger
  return pubKeys.forEach((element) => {
    dispatch('enrichCosmosAddress', element);
  });
};


/**
 * @function enrichCosmosAddress
 * @description queries information for an account and creates an account object
 */
export const enrichCosmosAddress = async ({ dispatch }, account) => {
  try {
    const enrichedCosmosAccount = await this.enrichCosmosAccount(account);

    // Add user account to the delegation module state via action dispatch
    dispatch('delegation/updateUserAccount', enrichedCosmosAccount, {
      root: true,
    });
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function getLedgerAddressOnly
 * @description Fetches account information for multiple tendermint chains
 * given a connected ledger with the CosmosApp open. Process is called once
 * and is independant from the delegation flow. It DOES NOT fetch information for
 * the account other than the address itself.
 */

export const getLedgerAddressOnly = async ({ commit, dispatch, state }) => {
  try {
    let transport = null;

    // transport type determination
    if (state.transportChoice === 'WebUSB') {
      transport = await TransportWebUSB.create();
    } else {
      transport = await TransportU2F.create(10000);
    }

    // create new CosmosApp Instance using ledger-cosmos-js
    const app = new CosmosApp(transport);

    // get the version and commit to store
    const response = await app.getVersion();
    commit('SET_LEDGER_APP_INFO', response);

    // If the response has errors
    if (response.error_message !== 'No errors') {
      dispatch('errorMessage', response.error_message);
    }

    // parse Ledger account for the first HDPATH
    const pubKey = await app.publicKey(state.keyPathArray[0]);
    commit('SET_LEDGER_STATUS', 'Loading...');


    const irisAddress = createIrisAddress(pubKey.compressed_pk);
    const cosmosAddress = createCosmosAddress(pubKey.compressed_pk);


    // Commit the enrichedAccounts to state
    commit('SET_IRIS_ADDRESS', irisAddress);
    commit('SET_COSMOS_ADDRESS', cosmosAddress);

    commit('SET_LEDGER_STATUS', 'Done Loading Addresses! Click to Close');
  } catch (e) {
    dispatch('session/logError', e, { root: true });
  }
};
export const getLedgerAddress = async ({ commit, dispatch, state }) => {
  try {
    commit('SET_LEDGER_STATUS', 'loading..');
    let transport = null;

    // transport type determination
    if (state.transportChoice === 'WebUSB') {
      transport = await TransportWebUSB.create();
    } else {
      transport = await TransportU2F.create(10000);
    }

    // create new CosmosApp Instance using ledger-cosmos-js
    const app = new CosmosApp(transport);

    // commit( "SET_APP", app );

    // get the version and commit to store
    const response = await app.getVersion();
    commit('SET_LEDGER_STATUS', 'Confirm prompt on device');

    // If the response has errors
    if (response.error_message !== 'No errors') {
      dispatch('errorMessage', response.error_message);
    }

    // parse Ledger account for the first HDPATH
    const pubKey = await app.publicKey(state.HDPATH);
    const account = {
      HDPATH: state.HDPATH,
      pubKey,
    };
    // console.log( pubKey, account, response, app, transport );
    commit('SET_LEDGER_STATUS', 'Loading rewards info');

    // pass accounts to respective enrichAccount method
    const enrichedIrisAccount = await this.enrichIrisAccount(account);
    const enrichedCosmosAccount = await this.enrichCosmosAccount(account);

    // Commit the enrichedAccounts to state
    commit('SET_IRIS_ACCOUNT', enrichedIrisAccount);
    commit('SET_COSMOS_ACCOUNT', enrichedCosmosAccount);
    commit('SET_LEDGER_STATUS', 'Claim Rewards');
  } catch (e) {
    dispatch('session/logError', e, { root: true });
  }
};

// /**
//  * @function connect
//  * @description connects to ledger device (protocol agnostic)
//  * @description transport type set within the state
//  */
// export const connect = async ({ commit, dispatch, state }) => {
//   // clear old accounts and delegations from state
//   commit('delegation/CLEAR_ACCOUNTS', null, { root: true });
//   commit('delegation/CLEAR_DELEGATIONS', null, { root: true });

//   // Toggle loading modal
//   dispatch(
//     'delegation/toggleLoadingModal',
//     {
//       visible: true,
//       header: '',
//       footer: 'Connecting to your ledger...',
//     },
//     { root: true },
//   );

//   // transport type determination
//   const transport = await transportFactory(state.transportChoice);
//   // create new CosmosApp with given transport (CosmosApp only since that is name of
//   // export, not because this instance is being created for Cosmos)
//   const app = new CosmosApp(transport);
//   commit('SET_APP', app);

//   // get the version and commit to store
//   const response = await app.getVersion();
//   commit('SET_LEDGER_APP_INFO', response);

//   // If the response has errors
//   if (response.error_message !== 'No errors') {
//     dispatch('session/logError', response.error_message, { root: true });
//   }

//   // otherwise update the loading modal message
//   dispatch(
//     'delegation/toggleLoadingModal',
//     {
//       visible: true,
//       header: '',
//       footer: `Connected! Cosmos App v${response.major}.${r
// ?esponse.minor}.${response.patch}. Please confirm the selected account on your Ledger`,
//     },
//     { root: true },
//   );

//   const accounts = [];

//   // parse Ledger accounts using state defined depth for search
//   for (let index = 0; index < state.accountDepth; index += 1) {
//     const pubKey = await app.publicKey(state.keyPathArray[index]);
//     const account = {
//       HDPATH: state.keyPathArray[index],
//       pubKey,
//     };
//     accounts.push(account);
//   }

//   // pass accounts to enrichAccounts action
//   dispatch('enrichAccounts', accounts);

//   // Update loading modal text
//   dispatch(
//     'delegation/toggleLoadingModal',
//     {
//       visible: true,
//       header: '',
//       footer: 'Loading information about your accounts...',
//     },
//     { root: true },
//   );

//   // Display the next modal in the sequence
//   commit(
//     'delegation/SET_ACTIVE_DELEGATION_PROMPT',
//     'StartNewTxOrRedelegatePrompt',
//     { root: true },
//   );

//   // Make sure the delegation amount is reset to 0
//   commit('delegation/SET_DELEGATION_AMOUNT', 0, { root: true });

//   // Adding a delay here while the data queries complete
//   // This has better UX flow since a loading modal is already on display

//   const delay = 7000; // 7 second
//   setTimeout(() => {
//     dispatch(
//       'delegation/toggleLoadingModal',
//       {
//         visible: false,
//         header: '',
//         footer: '',
//       },
//       { root: true },
//     );
//   }, delay);
// };


/**
 * @function enrichAccounts
 * @description dispatches the account object to the appropriate module
 */
export const enrichAccounts = ({ dispatch, rootState }, accounts) => {
  switch (rootState.delegation.delegationConfig.delegationToken) {
    case COSMOS:
      accounts.forEach((account) => {
        dispatch('cosmos/enrichCosmosAddresses', account, { root: true });
      });
      break;
    case IRIS:
      accounts.forEach((account) => {
        dispatch('iris/enrichIrisAddresses', account, { root: true });
      });
      break;
    // case TERRA:
    //   accounts.forEach( account => {
    //     dispatch( "iris/enrichTerraAddress", account, { root: true } );
    //   } );
    //   break;
    default:
      dispatch('session/logError', 'ledger enrich accounts error', { root: true });
  }
};
