import vc from '@sphereon/rn-vc-js'

import {
  Credential,
  CredentialKeyPair,
  VerifyCredentialResult
} from '../interfaces/types'
import { EcdsaSecp256k1VerificationKey2019 } from '@sphereon/rn-ecdsa-secp256k1-verification-key-2019'
import { EcdsaSecp256k1Signature2019 } from '@sphereon/rn-ecdsa-secp256k1-signature-2019'
import documentLoader from '../utils/Documentloader'

export default class CredentialServices {
  public static async createCredential(
    credential: Credential,
    credentialKeyPair: CredentialKeyPair
  ): Promise<Credential> {
    const keyPair = new EcdsaSecp256k1VerificationKey2019(credentialKeyPair)
    const suite = new EcdsaSecp256k1Signature2019({
      key: keyPair
    })

    if (!keyPair || !suite) throw new Error('Missing keypair or suite')

    try {
      const createResult: Credential = await vc.issue({
        credential,
        suite,
        documentLoader
      })

      return createResult
    } catch (error) {
      throw new Error('Create Credential Error')
    }
  }

  public static async verifyCredential(
    credential: Credential,
    credentialKeyPair: CredentialKeyPair
  ): Promise<VerifyCredentialResult> {
    const keyPair = new EcdsaSecp256k1VerificationKey2019(credentialKeyPair)
    const suite = new EcdsaSecp256k1Signature2019({
      key: keyPair
    })

    if (!keyPair || !suite) throw new Error('Missing keypair or suite')

    try {
      const verifiedCredential: VerifyCredentialResult =
        await vc.verifyCredential({
          credential,
          suite,
          documentLoader
        })

      return verifiedCredential
    } catch (error) {
      throw new Error('Verify Credential Error')
    }
  }
}
