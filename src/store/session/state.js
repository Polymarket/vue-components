export default {
  networkConfig: {
    chainID: 'cosmoshub-3',
    networkNameLC: 'cosmos',
    networkNameUC: 'COSMOS',
    networkNameProper: 'Cosmos',
    tokenDenom: 'atom',
    delegationDenom: 'uatom',
    fee: 100,
    gas: 175000,
  },
  leftDrawer: false,
  rightDrawer: false,
  loading: {
    ledger: false,
  },
  stepsContainerVisible: false,
  ledgerVoteStepsVisible: false,
  ledgerDelegationStepsVisible: false,
  messages: [],
  ledgerTxInProgress: false,
  ledgerTxCurrentStep: {
    number: 1,
    optionalMsg: '',
  },
};
