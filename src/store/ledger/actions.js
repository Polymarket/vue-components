import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import CosmosApp from 'ledger-cosmos-js';

import {
  createCosmosAddress, createIrisAddress, createTerraAddress, createKavaAddress,
} from '../../helpers/wallet';
import {
  enrichCosmosAccount, enrichIrisAccount, enrichKavaAccount, enrichTerraAccount,
} from '../../helpers/accountEnrichment';
// import {
//   fetchCosmosAccountAuthInfo,
// } from '../../services/api';


/**
 * @function connectLedger
 * @description initiates a connection to a Ledger device, saves connection to the state,
 * @description and queries device information which is also saved to the state
 */
export const connectLedger = async ({ state, commit, dispatch }) => {
  try {
    commit('session/SET_LOADING', { ledger: true }, { root: true });

    let transport = null;
    if (state.transportChoice === 'WebUSB') {
      transport = await TransportWebUSB.create();
    } else {
      transport = await TransportU2F.create(10000);
    }

    const ledgerApp = new CosmosApp(transport);
    commit('SET_APP', ledgerApp);

    const response = await ledgerApp.getVersion();
    if (response.error_message !== 'No errors') {
      dispatch('session/logError', response.error_message, { root: true });
    } else {
      commit('SET_LEDGER_APP_INFO', response);
    }
  } catch (error) {
    dispatch('session/logError', error, { root: true });
  } finally {
    commit('session/SET_DONE_LOADING', { ledger: false }, { root: true });
  }
};


export const viewLedgerAddress = async ({ commit, dispatch, state }) => {
  try {
    let transport = null;
    if (state.transportChoice === 'WebUSB') {
      transport = await TransportWebUSB.create();
    } else {
      transport = await TransportU2F.create(10000);
    }

    const app = new CosmosApp(transport);

    // parse Ledger account for the first HDPATH
    const pubKey = await app.publicKey(state.HDPATH);

    const irisAddress = createIrisAddress(pubKey.compressed_pk);
    const cosmosAddress = createCosmosAddress(pubKey.compressed_pk);
    const kavaAddress = createKavaAddress(pubKey.compressed_pk);
    const terraAddress = createTerraAddress(pubKey.compressed_pk);

    // Commit the enrichedAccounts to state
    commit('SET_IRIS_ADDRESS', irisAddress);
    commit('SET_COSMOS_ADDRESS', cosmosAddress);
    commit('SET_KAVA_ADDRESS', kavaAddress);
    commit('SET_TERRA_ADDRESS', terraAddress);
  } catch (e) {
    dispatch('session/logError', e, { root: true });
  }
};

export const getLedgerAccountDetails = async ({
  commit, dispatch, state,
}) => {
  try {
    dispatch('session/logInfo', 'getLedgerAccountDetails', { root: true });

    commit('session/SET_LOADING', { ledger: true }, { root: true });

    let transport = null;
    if (state.transportChoice === 'WebUSB') {
      transport = await TransportWebUSB.create();
    } else {
      transport = await TransportU2F.create(10000);
    }

    // create new CosmosApp Instance using ledger-cosmos-js
    const app = new CosmosApp(transport);
    const pubKey = await app.publicKey(state.HDPATH);

    const irisAddress = createIrisAddress(pubKey.compressed_pk);
    const cosmosAddress = createCosmosAddress(pubKey.compressed_pk);
    const kavaAddress = createKavaAddress(pubKey.compressed_pk);
    const terraAddress = createTerraAddress(pubKey.compressed_pk);
    commit('SET_IRIS_ADDRESS', irisAddress);
    commit('SET_COSMOS_ADDRESS', cosmosAddress);
    commit('SET_KAVA_ADDRESS', kavaAddress);
    commit('SET_TERRA_ADDRESS', terraAddress);

    const account = {
      HDPATH: state.HDPATH,
      pubKey,
    };
    console.log(account);


    console.log('fetching enriched accounts');

    const enrichedCosmosAccount = await enrichCosmosAccount(account);
    console.log(enrichedCosmosAccount);

    const enrichedTerraAccount = await enrichTerraAccount(account);
    console.log(enrichedTerraAccount);

    const enrichedKavaAccount = await enrichKavaAccount(account);
    console.log(enrichedKavaAccount);

    const enrichedIrisAccount = await enrichIrisAccount(account);
    console.log(enrichedIrisAccount);

    commit('SET_IRIS_ACCOUNT', enrichedIrisAccount);
    commit('SET_COSMOS_ACCOUNT', enrichedCosmosAccount);
    commit('SET_KAVA_ACCOUNT', enrichedKavaAccount);
    commit('SET_TERRA_ACCOUNT', enrichedTerraAccount);
    // let enrichedAccount;
    // console.log(rootState.session.networkConstants);
    // if (rootState.session.networkConstants === 'cosmos') {
    //   // enrichedAccount = await enrichCosmosAccount(account);
    // } else if (rootState.session.networkConstants === 'iris') {
    //   enrichedAccount = await enrichIrisAccount(account);
    // }
    // console.log(enrichedAccount);

    // Commit the enrichedAccount to state
    // commit('SET_ACCOUNT', userAccount);
    commit('session/SET_DONE_LOADING', { ledger: false }, { root: true });
  } catch (e) {
    throw new Error(e);
  }
};
