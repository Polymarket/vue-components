export function SET_APP(state, app) {
  state.cosmosApp = Object.assign({}, app);
}

export function SET_LEDGER_APP_INFO(state, val) {
  state.version = `${val.major}.${val.minor}.${val.patch}`;
  state.locked = val.device_locked;
  state.test_mode = val.test_mode;
  state.detected = true;
}


export function SET_COSMOS_ACCOUNT(state, val) {
  state.cosmosAccount = Object.assign({}, JSON.parse(JSON.stringify(val)));
}

export function SET_IRIS_ACCOUNT(state, val) {
  state.irisAccount = Object.assign({}, JSON.parse(JSON.stringify(val)));
}


/**
 * @function CLEAR_IRIS_ACCOUNT
 * @description clears the stored iris account info to ensure both stale
 *              data is not displayed (particularly in the rewards claim modal)
 *              and to force refresh prior to ledger transaction
 */
export function CLEAR_IRIS_ACCOUNT(state) {
  state.irisAccount = Object.assign({}, {
    rewardsData: {
      total: [
        {
          amount: 0,
        },
      ],
    },
  });
}

export function CLEAR_COSMOS_ACCOUNT(state) {
  state.cosmosAccount = Object.assign({}, {
    delegations: [
      {
        rewardsData: [
          {
            amount: 0,
          },
        ],
      },
    ],
  });
}

export function SET_TX_HASH(state, val) {
  state.txHash = val;
}

/**
 * @function SET_LEDGER_STATUS
 * @description sets a status message used to display information in the button
 *              of the getAddressModal and claimRewardsModal
 */
export function SET_LEDGER_STATUS(state, val) {
  state.status = val;
}


/**
 * @function SET_COSMOS_ADDRESS
 * @description sets a given Cosmos address within the state
 *              differs from SET_COSMOS_ACCOUNT as this is only
 *              setting the address (used in getAddressModal)
 */
export function SET_COSMOS_ADDRESS(state, val) {
  state.address.cosmos = val;
}

/**
 * @function SET_IRIS_ADDRESS
 * @description sets a given Iris address within the state
 *              differs from SET_IRIS_ACCOUNT as this is only
 *              setting the address (used in getAddressModal)
 */
export function SET_IRIS_ADDRESS(state, val) {
  state.address.iris = val;
}


export function SET_TEZOS_ADDRESS(state, val) {
  state.address.tezos = val;
}
