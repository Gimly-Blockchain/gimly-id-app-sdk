import 'react-native-get-random-values'
import '@ethersproject/shims'
import { ethers } from 'ethers'

import { KeyChainData, setKeychainDataObject } from '../utils/keychain'

export const createEncryptedWallet = async (
  pin: string
): Promise<{
  mnemonicPhrase: string
}> => {
  try {
    const mnemonic = ethers.utils.entropyToMnemonic(
      ethers.utils.randomBytes(32)
    )
    const wallet = ethers.Wallet.fromMnemonic(mnemonic)
    const encryptedWallet = await wallet.encrypt(pin)

    const keychainData: KeyChainData = {
      wallet: encryptedWallet,
      mnemonic: wallet.mnemonic.phrase,
      privateKey: wallet.privateKey,
      pin
    }
    await setKeychainDataObject(keychainData)

    return {
      mnemonicPhrase: wallet.mnemonic.phrase
    }
  } catch (error) {
    throw new Error('Error when creating the wallet')
  }
}
