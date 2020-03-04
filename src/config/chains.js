export const chains = {
  cosmos: {
    chainID: 'cosmoshub-3',
    networkNameLC: 'cosmos',
    networkNameUC: 'COSMOS',
    networkNameProper: 'Cosmos',
    tokenDenom: 'atom',
    delegationDenom: 'uatom',
    denomMultiplier: 1000000,
    fee: 100,
    gas: 175000,
    msgs: {
      delegate: {
        validator_addr: '',
        delegation: {
          denom: 'uatom',
          amount: 0,
        },
      },
    },
  },
  iris: {
    chainID: 'irishub',
    networkNameLC: 'iris',
    networkNameUC: 'IRIS',
    networkNameProper: 'Irisnet',
    tokenDenom: 'iris',
    delegationDenom: 'iris-atto',
    denomMultiplier: 1000000000000000000,
    fee: 500000000000000000,
    gas: 50000,
    msgs: {
      delegate: {
        validator_addr: '',
        amount: {
          denom: 'iris-atto',
          amount: 0,
        },
      },
    },
  },
  kava: {
    chainID: 'kava-2',
    networkNameLC: 'kava',
    networkNameUC: 'KAVA',
    networkNameProper: 'Kava',
    tokenDenom: 'kava',
    delegationDenom: 'ukava',
    denomMultiplier: 1000000,
    fee: 100,
    gas: 175000,
    msgs: {
      delegate: {
        validator_addr: '',
        amount: {
          denom: 'ukava',
          amount: 0,
        },
      },
    },
  },
  terra: {
    chainID: 'columbus-3',
    networkNameLC: 'terra',
    networkNameUC: 'TERRA',
    networkNameProper: 'Terra',
    tokenDenom: 'luna',
    delegationDenom: 'kluna',
    denomMultiplier: 1000000,
    fee: 100,
    gas: 175000,
    msgs: {
      delegate: {
        validator_addr: '',
        amount: {
          denom: 'kluna',
          amount: 0,
        },
      },
    },
  },
};
