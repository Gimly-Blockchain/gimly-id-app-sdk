import vc from '@sphereon/rn-vc-js'

import { Ed25519VerificationKey2020 } from '@digitalbazaar/ed25519-verification-key-2020'
import { Ed25519Signature2020 } from '@digitalbazaar/ed25519-signature-2020'
import { Credential } from '../interfaces/types'

export default class CredentialServices {
  public static async createCredential(
    credential: Credential
  ): Promise<false | Credential> {
    const keyPair = await Ed25519VerificationKey2020.generate()
    const suite = new Ed25519Signature2020({ key: keyPair })

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
    const keyPair = await Ed25519VerificationKey2020.generate()
    const suite = new Ed25519Signature2020({ key: keyPair })

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
