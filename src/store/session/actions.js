export const toggleLeftDrawer = async ({ commit }, payload) => {
  commit('SET_LEFT_DRAWER', payload);
};

export const toggleRightDrawer = async ({ commit }, payload) => {
  commit('SET_RIGHT_DRAWER', payload);
};

export const logInfo = async ({ commit }, payload) => {
  const log = {
    severity: 'info',
    message: payload,
  };
  commit('ADD_LOG_MESSAGE', log);
};

export const logWarning = async ({ commit }, payload) => {
  const log = {
    severity: 'warning',
    message: payload,
  };
  commit('ADD_LOG_MESSAGE', log);
};

export const logError = async ({ commit }, payload) => {
  const log = {
    severity: 'error',
    message: payload,
  };
  commit('ADD_LOG_MESSAGE', log);
};
