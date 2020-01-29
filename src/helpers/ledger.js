import TransportWebUSB from '@ledgerhq/hw-transport-webusb';

// import TransportU2F from "@ledgerhq/hw-transport-u2f";
import CosmosApp from 'ledger-cosmos-js';
import { createCosmosAddress, createIrisAddress } from './wallet';

const secp256k1 = require('secp256k1');

const HDPATH = [44, 118, 0, 0, 0];

/**
 * @function connectLedger
 * @description returns a ledger app connection (longer timeout since it is connected)
 */
export const connectLedger = async () => {
  let transport = null;
  transport = await TransportWebUSB.create();
  return new CosmosApp(transport);
};

/**
 * @function pollLedgerDevice
 */
export const pollLedgerDevice = async () => {
  let transport = null;
  transport = await TransportWebUSB.create();
  const app = new CosmosApp(transport);
  const version = await app.getVersion();
  return version;
};

/**
 * @function getLedgerCosmosVersion
 * @description returns a response object containing the version of the cosmos ledger app
 */
export const getLedgerCosmosVersion = async () => {
  try {
    const cosmosLedgerApp = await connectLedger();
    const response = await cosmosLedgerApp.getVersion();
    return response;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function getLedgerPubKey
 */
export const getLedgerPubKey = async () => {
  try {
    const cosmosLedgerApp = await connectLedger();
    const response = await cosmosLedgerApp.publicKey(HDPATH);
    response.HDPATH = HDPATH;

    return response;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function getCosmosAddressFromPubkey
 * @param  {type} pubKey {description}
 * @return {type} {description}
 */
export const getCosmosAddressFromPubkey = async (pubKey) => {
  try {
    const address = await createCosmosAddress(pubKey);
    return address;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function getIrisAddressFromPubkey
 * @param  {type} pubKey {description}
 * @return {type} {description}
 */
export const getIrisAddressFromPubkey = async (pubKey) => {
  try {
    const address = await createIrisAddress(pubKey);
    return address;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @function signMsg
 * @param  {type} accountHDPATH HDPATH for the account being used to sign
 * @param  {type} msg           unsigned message for signing
 * @return {type} the signature(s) from signing the message
 */
export const signMsg = async (accountHDPATH, msg) => {
  try {
    const cosmosLedgerApp = await connectLedger();

    const pubKey = await cosmosLedgerApp.publicKey(accountHDPATH);
    const res = await cosmosLedgerApp.sign(accountHDPATH, JSON.stringify(msg));
    const secp256k1Sig = secp256k1.signatureImport(res.signature);

    const signatures = [
      {
        signature: secp256k1Sig.toString('base64'),
        account_number: msg.account_number,
        sequence: msg.sequence,
        pub_key: {
          type: 'tendermint/PubKeySecp256k1',
          value: Buffer.from(pubKey.compressed_pk, 'hex').toString('base64'),
        },
      },
    ];

    return signatures;
  } catch (error) {
    throw new Error(error);
  }
};
