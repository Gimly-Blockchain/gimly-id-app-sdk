import * as Keychain from 'react-native-keychain'

export type KeyChainData = {
  wallet?: string
  privateKey?: string
  mnemonic?: string
  pin?: string
  did?: string
}

export const setKeychainDataObject = async (
  data: KeyChainData
): Promise<Keychain.Result | null | false> => {
  return await Keychain.setGenericPassword(
    'UserData',
    JSON.stringify(data)
  ).catch(() => null)
}

export const saveDID = async (did: string): Promise<boolean> => {
  const keychainObject = await getKeychainDataObject()
  if (keychainObject && did) {
    keychainObject.did = did
    await setKeychainDataObject(keychainObject)
    return true
  } else {
    return false
  }
}

export const getKeychainDataObject = async (): Promise<KeyChainData | null> => {
  try {
    const credentials = await Keychain.getGenericPassword()

    if (credentials) {
      return JSON.parse(credentials.password)
    } else {
      console.log('No credentials stored')
      return null
    }
  } catch (error) {
    console.warn("Keychain couldn't be accessed!", error)
    return null
  }
}

export const getPrivateKey = async (): Promise<string | null> => {
  const keyChainDataObject = await getKeychainDataObject()
  return keyChainDataObject?.privateKey ?? null
}

export const getSecurityPhrase = async (): Promise<string> => {
  const keyChainDataObject = await getKeychainDataObject()
  return keyChainDataObject?.mnemonic ?? ''
}

export const getWalletAddress = async (): Promise<string | null> => {
  const keyChainDataObject = await getKeychainDataObject()
  if (!keyChainDataObject?.wallet) {
    return null
  }
  const wallet = JSON.parse(keyChainDataObject.wallet)
  return wallet.address
}

export const getDid = async (): Promise<string | null> => {
  const keyChainDataObject = await getKeychainDataObject()
  return keyChainDataObject?.did ?? null
}

export const checkPin = async (pin: string): Promise<boolean> => {
  const keyChainDataObject = await getKeychainDataObject()
  return keyChainDataObject?.pin === pin
}

export const checkSecurityPhrase = async (
  securityPhrase: string
): Promise<boolean> => {
  const keyChainDataObject = await getKeychainDataObject()
  return keyChainDataObject?.mnemonic === securityPhrase
}

export const changePin = async (pin: string): Promise<string | null> => {
  const keyChainDataObject = await getKeychainDataObject()
  if (!keyChainDataObject) {
    return null
  }
  keyChainDataObject.pin = pin
  await setKeychainDataObject(keyChainDataObject)
  return keyChainDataObject.pin
}
