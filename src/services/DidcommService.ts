import { DIDComm } from 'DIDComm-js'

export interface KeyPair {
  keyType: KeyType
  privateKey: Uint8Array
  publicKey: Uint8Array
}

export interface IUnpackedMsg {
  message: string
  recipientKey: string
  senderKey: string
  nonRepudiableVerification: boolean
}

type KeyType = 'curve25519' | 'ed25519' | 'x25519'

export default class DidcommService {
  public static async packMsg(
    message: string,
    issuerPrivateKey: Uint8Array,
    receiverKeyPair: KeyPair
  ): Promise<string> {
    const didcomm = new DIDComm()
    await didcomm.ready

    if (!issuerPrivateKey || !receiverKeyPair)
      throw new Error('Issuer or receiver missing')

    try {
      const packedMsg = await didcomm.pack_auth_msg_for_recipients(
        message,
        [issuerPrivateKey],
        receiverKeyPair
      )
      return packedMsg
    } catch (error) {
      throw new Error('error while packaging the message')
    }
  }

  public static async unPackMsg(
    packMsg: string,
    issuerKeyPair: KeyPair
  ): Promise<IUnpackedMsg> {
    const didcomm = new DIDComm()
    await didcomm.ready

    if (!packMsg || !issuerKeyPair)
      throw new Error('packed message or issuer missing')

    try {
      const unpackedMsg = await didcomm.unpackMessage(packMsg, issuerKeyPair)
      return unpackedMsg
    } catch (error) {
      throw new Error('error while unpackaging the message')
    }
  }
}
