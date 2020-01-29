import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import CosmosApp from 'ledger-cosmos-js';

import { createCosmosAddress, createIrisAddress } from '../../helpers/wallet';

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

    // Commit the enrichedAccounts to state
    commit('SET_IRIS_ADDRESS', irisAddress);
    commit('SET_COSMOS_ADDRESS', cosmosAddress);
  } catch (e) {
    dispatch('session/logError', e, { root: true });
  }
};
