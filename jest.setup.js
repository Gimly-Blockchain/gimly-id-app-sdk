/* eslint-disable @typescript-eslint/no-unused-vars */
import { TextEncoder, TextDecoder } from 'util'

// for persistor compatibility
jest.useFakeTimers('legacy')

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

jest.mock('react-native-keychain', () => {
  const credentials = {
    username: 'session',
    password:
      '{"wallet":"{\\"address\\":\\"817c14b7ae377423c628837e1363029e073b9239\\",\\"id\\":\\"f3f03a0d-15ae-450c-ac25-c3b11ea6b78d\\",\\"version\\":3,\\"Crypto\\":{\\"cipher\\":\\"aes-128-ctr\\",\\"cipherparams\\":{\\"iv\\":\\"90e85b1e493e6185ff55021ac8126ed8\\"},\\"ciphertext\\":\\"f7dc15f5fd2b4bd6028c84887d61d5d2f69f8ee9b9d96d2dc19a1adc69fbe4b9\\",\\"kdf\\":\\"scrypt\\",\\"kdfparams\\":{\\"salt\\":\\"7c62efeb8e9a7eeb61a223a311464e8ce31320c71917be9530bf1e5691aafc6e\\",\\"n\\":131072,\\"dklen\\":32,\\"p\\":1,\\"r\\":8},\\"mac\\":\\"9411b858689e7b6cad255bcef57345f402e59222ff34adb71e2827c380aad0a7\\"},\\"x-ethers\\":{\\"client\\":\\"ethers.js\\",\\"gethFilename\\":\\"UTC--2021-09-28T15-07-56.0Z--817c14b7ae377423c628837e1363029e073b9239\\",\\"mnemonicCounter\\":\\"7c1364e1f7e3f1afb6d54154c976c14b\\",\\"mnemonicCiphertext\\":\\"b2db0f399268f2eae26af2190d5641444cc38871004c9c38ff116f12534c6a55\\",\\"path\\":\\"m/44\'/60\'/0\'/0/0\\",\\"locale\\":\\"en\\",\\"version\\":\\"0.1\\"}}","mnemonic":"tobacco detect practice spirit vacuum junk noise crouch lion salon country ordinary couch strategy head retreat drip lake predict friend pole pulp cool brisk","privateKey":"0x188208fc91db99795c56d2aca04ced0d6008d34f79fa02d879d8739b9d532093","pin":"111111","did": "did:ethr:0xb9c5714089478a327f09197987f16f9e5d936e8a"}'
  }
  return {
    setGenericPassword: jest.fn(
      (username, password) => new Promise((resolve, reject) => resolve(true))
    ),
    getGenericPassword: jest.fn(
      () => new Promise((resolve, reject) => resolve(credentials))
    ),
    resetGenericPassword: jest.fn(
      () => new Promise((resolve, reject) => resolve(true))
    )
  }
})
