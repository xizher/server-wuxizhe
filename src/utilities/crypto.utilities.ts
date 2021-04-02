import * as CryptoJS from 'crypto-js'

const STRING_CRYPTO_IV = '474965071E8DBE5B96F7BC159F1B20E728A3D4309625F83CF16D482173780301'
const STRING_CRYPTO_KEY = '474965071E8DBE5B96F7BC159F1B20E728A3D4309625F83CF16D482173780301474965071E8DBE5B96F7BC159F1B20E728A3D4309625F83CF16D482173780301'

export function encrypto (str: string) : string {
  const key = CryptoJS.enc.Utf8.parse(STRING_CRYPTO_KEY)
  const iv = CryptoJS.enc.Utf8.parse(STRING_CRYPTO_IV)
  const newVal = CryptoJS.enc.Utf8.parse(str)
  const encrypted = CryptoJS.AES.encrypt(newVal, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.ciphertext.toString()
}

export function decrypto (str: string) : string {
  const key = CryptoJS.enc.Utf8.parse(STRING_CRYPTO_KEY)
  const iv = CryptoJS.enc.Utf8.parse(STRING_CRYPTO_IV)
  const encryptedHexStr = CryptoJS.enc.Hex.parse(str)
  const newVal = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(newVal, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
