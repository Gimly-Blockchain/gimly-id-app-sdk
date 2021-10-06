export interface KeyPair {
  keyType: KeyType
  privateKey: Uint8Array
  publicKey: Uint8Array
}

type KeyType = 'curve25519' | 'ed25519' | 'x25519'

export interface IUnpackedMsg {
  message: string
  recipientKey: string
  senderKey: string
  nonRepudiableVerification: boolean
}
