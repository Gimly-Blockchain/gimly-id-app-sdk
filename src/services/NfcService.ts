import { EmitterSubscription } from 'react-native'
import TangemSdk, {
  Card,
  CreateWalletResponse,
  InitialMessage,
  NFCStatusResponse,
  OptionsCommon,
  OptionsSign,
  PurgeWalletResponse,
  SetUserCodesResponse,
  SignResponse
} from 'tangem-sdk-react-native'

export default class NfcService {
  public static async startSession(): Promise<void> {
    await TangemSdk.startSession()
  }

  public static async stopSession(): Promise<void> {
    await TangemSdk.stopSession()
  }

  public static async scanCard(
    initialMessage: InitialMessage
  ): Promise<Card | null> {
    let message

    if (!initialMessage?.body || initialMessage.header) {
      message = initialMessage
    } else {
      message = undefined
    }

    return await TangemSdk.scanCard(
      message ? ({ message } as OptionsCommon) : undefined
    )
      .then(response => {
        console.log(response)
        return response
      })
      .catch(error => {
        console.log(error)
        return null
      })
  }

  public static async sign(
    hashes: [string],
    walletPublicKey: string,
    cardId: string,
    initialMessage: InitialMessage
  ): Promise<SignResponse | null> {
    const options: OptionsSign = {
      hashes,
      walletPublicKey,
      cardId,
      initialMessage
    }

    return await TangemSdk.sign(options)
      .then(response => {
        console.log(response)
        return response
      })
      .catch(error => {
        console.log(error)
        return null
      })
  }

  public static async getStatus(): Promise<NFCStatusResponse> {
    return await TangemSdk.getNFCStatus().then(status => {
      return status
    })
  }

  public static async createWallet(
    cardId: string
  ): Promise<CreateWalletResponse | null> {
    return await TangemSdk.createWallet({ cardId })
      .then(response => {
        console.log(response)
        return response
      })
      .catch(error => {
        console.log(error)
        return null
      })
  }

  public static async purgeWallet(
    cardId: string,
    walletPublicKey: string
  ): Promise<PurgeWalletResponse | null> {
    return await TangemSdk.purgeWallet({ cardId, walletPublicKey })
      .then(response => {
        console.log(response)
        return response
      })
      .catch(error => {
        console.log(error)
        return null
      })
  }

  public static async setPassCode(
    cardId: string
  ): Promise<SetUserCodesResponse | null> {
    return await TangemSdk.setPasscode({ cardId })
      .then(response => {
        console.log(response)
        return response
      })
      .catch(error => {
        console.log(error)
        return null
      })
  }

  public static async setAccessCode(
    cardId: string
  ): Promise<SetUserCodesResponse | null> {
    return TangemSdk.setAccessCode({ cardId })
      .then(response => {
        console.log(response)
        return response
      })
      .catch(error => {
        console.log(error)
        return null
      })
  }

  public static async resetUserCodes(
    cardId: string
  ): Promise<SetUserCodesResponse | null> {
    return await TangemSdk.resetUserCodes({ cardId })
      .then(response => {
        return response
      })
      .catch(error => {
        console.log(error)
        return null
      })
  }

  public static nfcListener(): EmitterSubscription | undefined {
    return TangemSdk.addListener('NFCStateChange', enabled => {
      console.log(enabled)
    })
  }

  public static removeNfcListener(listener: EmitterSubscription): boolean {
    if (listener) {
      listener.remove()
      return true
    }
    return false
  }
}
