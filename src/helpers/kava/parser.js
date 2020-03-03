// Parse the current block height
export const parseBlockHeight = res => res.height;

// Parse current CDP
export const parseCurrCDP = res => ({
  ID: res.cdp.id,
  cDenom: res.cdp.collateral[0].denom,
  currCAmount: Number(res.cdp.collateral[0].amount),
  pDenom: res.cdp.principal[0].denom,
  currPAmount: Number(res.cdp.principal[0].amount),
  cValue: res.collateral_value,
  cRatio: res.collateralization_ratio,
});

// Parse the collateral params a named type from the module params
export const parseModuleParams = (collaterals, cDenom) => {
  for (let i = 0; i < collaterals.length; i++) {
    if (collaterals[i].denom == cDenom) {
      const pDenom = collaterals[i].debt_limit[0].denom;
      const pDebtLimit = Number(collaterals[i].debt_limit[0].amount);
      const liquidationRatio = Number(collaterals[i].liquidation_ratio);
      const marketID = collaterals[i].market_id;
      return {
        pDenom, pDebtLimit, liquidationRatio, marketID,
      };
    }
  }
  return null;
};

// Parse CDP query response error and return bool controlling CDP creation.
// If error = 'CDPNotFoundErr', then returns true. Otherwise returns false.
export const parseResError = (res) => {
  if (res.response != undefined) {
    // Check for 404
    if (res.response.statusCode != undefined) {
      if (res.response.statusCode = 404) {
        console.log('Status code:', res.response.statusCode);
        console.log('Request URL:', res.response.responseUrl);
      } else {
        console.log('Unknown response status code');
      }
    } else {
      // Status code is undefined on Tendermint errors
      const { data } = res.response;
      if (data != undefined) {
        const { error } = data;
        const errorObj = JSON.parse(error);
        const { code } = errorObj;
        switch (code) {
          // Code 7 is CDP module's ErrCDPNotFound
          case 7:
            console.log('Tendermint error:', errorObj.message);
            return true;
          case 1:
            console.log('Tendermint error:', errorObj.message);
            break;
          default:
            console.log('Unkown Tendermint err. Code:', code);
            break;
        }
      }
    }
  }
  return false;
};
