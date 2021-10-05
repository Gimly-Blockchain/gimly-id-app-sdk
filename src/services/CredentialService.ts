import vc from '@sphereon/rn-vc-js'

import Secp256k1KeyPair from '@sphereon/rn-secp256k1-key-pair'
import { Credential } from '../interfaces/types'

export default class CredentialServices {
  public static async createCredential(
    credential: Credential
  ): Promise<false | Credential> {
    const keyPair = await Secp256k1KeyPair.generate()
    keyPair.id = 'https://example.edu/issuers/keys/1'
    keyPair.controller = 'https://example.com/i/carol'
    const suite = new Secp256k1KeyPair(keyPair)

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
    const keyPair = await Secp256k1KeyPair.generate()
    const suite = new Secp256k1KeyPair(keyPair)

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
