// const secp256k1 = require( "secp256k1" );
import sha256 from 'crypto-js/sha256';
import ripemd160 from 'crypto-js/ripemd160';
import CryptoJS from 'crypto-js';

const bech32 = require('bech32');


function bech32ify(address, prefix) {
  const words = bech32.toWords(address);
  return bech32.encode(prefix, words);
}

export function createCosmosAddress(publicKey) {
  const message = CryptoJS.enc.Hex.parse(publicKey.toString('hex'));
  const hash = ripemd160(sha256(message)).toString();
  const address = Buffer.from(hash, 'hex');
  const cosmosAddress = bech32ify(address, 'cosmos');
  return cosmosAddress;
}

export function createIrisAddress(publicKey) {
  const message = CryptoJS.enc.Hex.parse(publicKey.toString('hex'));
  const hash = ripemd160(sha256(message)).toString();
  const address = Buffer.from(hash, 'hex');
  const irisAddress = bech32ify(address, 'iaa');
  return irisAddress;
}

export function createTerraAddress(publicKey) {
  const message = CryptoJS.enc.Hex.parse(publicKey.toString('hex'));
  const hash = ripemd160(sha256(message)).toString();
  const address = Buffer.from(hash, 'hex');
  const irisAddress = bech32ify(address, 'terra');
  return irisAddress;
}

export function createKavaAddress(publicKey) {
  const message = CryptoJS.enc.Hex.parse(publicKey.toString('hex'));
  const hash = ripemd160(sha256(message)).toString();
  const address = Buffer.from(hash, 'hex');
  const irisAddress = bech32ify(address, 'kava');
  return irisAddress;
}
