import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import CosmosApp from 'ledger-cosmos-js';


/**
 * @function connectLedger
 * @description returns a ledger app connection (longer timeout since it is connected)
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
