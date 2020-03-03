/*
export function someMutation (state) {
}
*/

export function SET_TARGET_VALIDATOR(state, val) {
  state.targetProvider = Object.assign({}, val);
}

export function CLEAR_TARGET_VALIDATOR(state) {
  state.targetProvider = null;
}

export function SET_DELEGATION_AMOUNT(state, val) {
  state.delegationAmount = parseFloat(val);
}

export function CLEAR_DELEGATION_AMOUNT(state) {
  state.delegationAmount = 0;
}
