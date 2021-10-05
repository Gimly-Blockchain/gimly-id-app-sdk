import * as base58 from 'base58-universal'
import vc from '@sphereon/rn-vc-js'

import { Credential } from '../interfaces/types'
import { EcdsaSecp256k1VerificationKey2019 } from '@sphereon/rn-ecdsa-secp256k1-verification-key-2019'
import { EcdsaSecp256k1Signature2019 } from '@sphereon/rn-ecdsa-secp256k1-signature-2019'
import { Wallet } from 'ethers'

export default class CredentialServices {
  public static async createCredential(
    credential: Credential
  ): Promise<false | Credential> {
    const id = 'https://example.edu/issuers/keys/1'
    const controller = 'https://example.com/i/carol'
    const wallet = await Wallet.createRandom()

    const publicKeyBase58 = base58.encode(
      Buffer.from(wallet.publicKey.replace('0x', ''), 'hex')
    )
    const privateKeyBase58 = base58.encode(
      Buffer.from(wallet.privateKey.replace('0x', ''), 'hex')
    )
    const keyPair = new EcdsaSecp256k1VerificationKey2019({
      publicKeyBase58,
      privateKeyBase58,
      id,
      controller
    })
    const suite = new EcdsaSecp256k1Signature2019({
      key: keyPair
    })

    if (!keyPair || !suite) return false

    try {
      const createResult: Credential = await vc.issue({ credential, suite })
      return createResult
    } catch (error) {
      console.error('Create Credential Error', error)
      return false
    }
  }

  public static async verifyCredential(
    credential: Credential
  ): Promise<boolean> {
    const id = 'https://example.edu/issuers/keys/1'
    const controller = 'https://example.com/i/carol'
    const wallet = await Wallet.createRandom()

    const publicKeyBase58 = base58.encode(
      Buffer.from(wallet.publicKey.replace('0x', ''), 'hex')
    )
    const privateKeyBase58 = base58.encode(
      Buffer.from(wallet.privateKey.replace('0x', ''), 'hex')
    )
    const keyPair = new EcdsaSecp256k1VerificationKey2019({
      publicKeyBase58,
      privateKeyBase58,
      id,
      controller
    })
    const suite = new EcdsaSecp256k1Signature2019({
      key: keyPair
    })

    if (!keyPair || !suite) return false

    try {
      await vc.verifyCredential({ credential, suite })
      return true
    } catch (error) {
      console.error('Verify Credential Error', error)
      return false
    }
  }
}
