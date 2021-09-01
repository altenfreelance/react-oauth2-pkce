import sha256 from 'crypto-js/sha256';
const CryptoJS = require("crypto-js");


export type PKCECodePair = {
  codeVerifier: string
  codeChallenge: string
  createdAt: Date
}

export const base64URLEncode = (str: Buffer): string => {
  return str
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

const generateRandomString = (): string => {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 64; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return CryptoJS.enc.Utf8.parse(text);
}


export const createPKCECodes = (): PKCECodePair => {
  const codeVerifier = generateRandomString()
  const codeChallenge = sha256(codeVerifier).toString(CryptoJS.enc.Base64)
  const createdAt = new Date()
  const codePair = {
    codeVerifier,
    codeChallenge,
    createdAt
  }
  return codePair
}
