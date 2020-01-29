export function SET_LEFT_DRAWER(state, val) {
  state.leftDrawer = val;
}

export function SET_RIGHT_DRAWER(state, val) {
  state.rightDrawer = val;
}

export function ADD_LOG_MESSAGE(state, val) {
  state.messages.push(val);
}

export function SET_LOADING(state, val) {
  Object.assign(state.loading, val);
}

export function SET_DONE_LOADING(state, val) {
  Object.assign(state.loading, val);
}


export function SET_NETWORK(state, val) {
  state.network = val;
}

export function TOGGLE_REDELEGATION_STEPS(state) {
  state.redelegationStepsVisible = !state.redelegationStepsVisible;
}


export function TOGGLE_DELEGATION_STEPS(state, val) {
  state.delegationStepsVisible = val;
}

export function LOG_ERROR(state, val) {
  state.errors.push(val);
}


export function SET_VALIDATOR_CANDIDATES(state, payload) {
  state.validatorCandidates = payload;

  state.validatorDelegationSelectList = [];
  payload.forEach((item) => {
    const entry = {
      label: '',
      value: '',
      description: '',
    // category: ''
    };

    entry.label = item.description.moniker;
    entry.value = item.operator_address;
    entry.description = item.description.details;
    entry.operator_address = item.operator_address;
    state.validatorDelegationSelectList.push(entry);
  });
}


export function SET_LAST_BLOCK(state, payload) {
  state.height = payload.block.header.height;
}
