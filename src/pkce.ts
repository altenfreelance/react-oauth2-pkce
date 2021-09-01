import sha256 from 'crypto-js/sha256';
const CryptoJS = require("crypto-js");

import b64id from 'b64id';



export type PKCECodePair = {
  codeVerifier: string
  codeChallenge: string
  createdAt: Date
}


export const createPKCECodes = (): PKCECodePair => {
  const codeVerifier = b64id.uuidToB64(b64id.generateId())
  const codeChallenge = b64id.uuidToB64(sha256(codeVerifier).toString(CryptoJS.enc.Base64))
  const createdAt = new Date()
  const codePair = {
    codeVerifier,
    codeChallenge,
    createdAt
  }
  return codePair
}
