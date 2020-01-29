export function SET_APP(state, app) {
  state.ledgerApp = Object.assign({}, app);
}

export function SET_LEDGER_APP_INFO(state, val) {
  state.version = `${val.major}.${val.minor}.${val.patch}`;
  state.locked = val.device_locked;
  state.test_mode = val.test_mode;
  state.detected = true;
}
