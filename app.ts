import * as bitcoin from 'bitcoinjs-lib';
import { ECPairAPI, ECPairFactory, TinySecp256k1Interface } from 'ecpair';
import assert = require('assert');

// Sanity check for https://www.bitaddress.org/bitaddress.org-v3.3.0-SHA256-dec17c07685e1870960903d8f58090475b25af946fe95a734f88408cef4aa194.html
const tinysecp: TinySecp256k1Interface = require('tiny-secp256k1');
const ECPair: ECPairAPI = ECPairFactory(tinysecp);
// const privateKey = ECPair.makeRandom();
const compressedPrivateWIF = ECPair.fromWIF("compressed private key WIF here")
const privateKey = compressedPrivateWIF.privateKey.toString('hex')
// const privateKey = "256-bit-number-in-hex"
const uncompressedKeyPair = ECPair.fromPrivateKey(Buffer.from(privateKey, "hex"), {compressed: false})
const compressedKeyPair = ECPair.fromPrivateKey(Buffer.from(privateKey, "hex"), {compressed: true})
assert(uncompressedKeyPair.privateKey.toString('hex') === compressedKeyPair.privateKey.toString('hex'))

console.log(`private              : ${uncompressedKeyPair.privateKey.toString('hex')}`)

console.log(`uncompressed wif     : ${uncompressedKeyPair.toWIF()}`)
console.log(`uncompressed public  : ${uncompressedKeyPair.publicKey.toString('hex')}`)
const {address} = bitcoin.payments.p2pkh({pubkey: uncompressedKeyPair.publicKey})
console.log(`uncompressed address : ${address}`)

console.log(`compressed wif       : ${compressedKeyPair.toWIF()}`)
console.log(`compressed public    : ${compressedKeyPair.publicKey.toString('hex')}`)
const {address: address2} = bitcoin.payments.p2pkh({pubkey: compressedKeyPair.publicKey})
console.log(`compressed address   : ${address2}`)
