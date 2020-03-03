const axios = require('axios');

export const postTxKava = (kava, chainID, account_number, sequence, ecpairPriv, msg) => new Promise((resolve, reject) => {
  const stdSignMsg = kava.newStdMsg({
    msgs: [msg],
    chain_id: chainID,
    // TODO: See if we can remove fee
    fee: { amount: [], gas: String(500000) },
    memo: '',
    account_number,
    sequence,
  });
  // Sign transaction
  const modeType = 'sync';
  const signedTx = kava.sign(stdSignMsg, ecpairPriv, modeType);
  // Broadcast transaction
  kava.broadcast(signedTx).then((response) => {
    resolve(response.txhash);
  });
});

export const getTxKava = (url, path, params) => {
  const options = {
    headers: { pragma: 'no-cache' },
  };

  let requestUrl = url.concat(path);

  // Write params to end of path
  const paramKeys = Object.keys(params);
  if (paramKeys.length > 0) {
    requestUrl = requestUrl.concat('?');
    for (let i = 0; i < paramKeys.length; i++) {
      const key = paramKeys[i];
      const value = params[paramKeys[i]];
      requestUrl = requestUrl.concat(`${key}=${value}`);
      if (i != paramKeys.length - 1) {
        requestUrl = requestUrl.concat('&');
      }
    }
  }

  return axios.get(requestUrl, options)
    .then(res => res.data)
    .catch(err => err);
};
