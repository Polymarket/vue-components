import Vue from 'vue';
import Vuex from 'vuex';

import session from './session';
import ledger from './ledger';
import governance from './governance';
import delegation from './delegation';
import iris from './iris';
import cosmos from './cosmos';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      session,
      ledger,
      governance,
      delegation,
      iris,
      cosmos,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: true,
  });

  return Store;
}
