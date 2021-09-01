import sha256 from 'crypto-js/sha256';
const CryptoJS = require("crypto-js");
const URLSafeBase64 = require('urlsafe-base64');


export type PKCECodePair = {
  codeVerifier: string
  codeChallenge: string
  createdAt: Date
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
  const codeVerifier = URLSafeBase64.encode(generateRandomString())
  const codeChallenge = URLSafeBase64.encode(sha256(codeVerifier).toString(CryptoJS.enc.Base64))
  const createdAt = new Date()
  const codePair = {
    codeVerifier,
    codeChallenge,
    createdAt
  }
  return codePair
}
