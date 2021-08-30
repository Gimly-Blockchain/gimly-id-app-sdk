import AsyncStorage from '@react-native-community/async-storage'

export const STORAGE_KEYS = {
  IS_WALLET_CREATED: 'isWalletCreated',
  IS_DID_CREATED: 'isDIDCreated',
  LAST_COMPONENT_ID: 'lastComponentId'
}

export default class LocalStorageService {
  public static async storeData(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (err) {
      throw new Error('Error storing data in LocalStorage')
    }
  }

  public static async storeBool(key: string, value: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value.toString())
    } catch (err) {
      throw new Error('Error storing data in LocalStorage')
    }
  }

  public static async getData(key: string): Promise<string> {
    try {
      const value = await AsyncStorage.getItem(key)
      return value ?? ''
    } catch (err) {
      throw new Error('Error getting data in LocalStorage')
    }
  }

  public static async getBool(key: string): Promise<boolean> {
    try {
      const keyString = await AsyncStorage.getItem(key)
      return keyString ? this.StringToBool(keyString) : false
    } catch (err) {
      throw new Error('Error getting data in LocalStorage')
    }
  }

  public static StringToBool(value: string): boolean {
    return value.toLowerCase() === 'true'
  }
}
