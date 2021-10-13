import vc from '@sphereon/rn-vc-js'

import { EcdsaSecp256k1VerificationKey2019 } from '@sphereon/rn-ecdsa-secp256k1-verification-key-2019'
import { EcdsaSecp256k1Signature2019 } from '@sphereon/rn-ecdsa-secp256k1-signature-2019'
import { Credential, Presentation } from '../interfaces/types'
import { CredentialKeyPair } from '../interfaces/credentialService.interface'
import documentLoader from '../utils/Documentloader'
import {
  PresentationResult,
  VerifiedPresentation
} from '../interfaces/PresentationService.interface'

export default class PresentationService {
  public static async createPresentation(
    credentials: Credential[]
  ): Promise<Presentation> {
    if (credentials.length <= 0) throw new Error('No credentials received')

    try {
      const presentationResult: Presentation = await vc.createPresentation({
        verifiableCredential: credentials
      })
      return presentationResult
    } catch (error) {
      throw new Error('Create Presentation Error')
    }
  }

  public static async signPresentation(
    presentation: Presentation,
    credentialKeyPair: CredentialKeyPair,
    challenge: string
  ): Promise<Presentation> {
    const keyPair = await EcdsaSecp256k1VerificationKey2019.generate(
      credentialKeyPair
    )
    const suite = new EcdsaSecp256k1Signature2019({
      key: keyPair
    })

    if (!keyPair || !suite) throw new Error('Missing keypair or suite')

    try {
      const signedResult: Presentation = await vc.signPresentation({
        presentation,
        suite,
        challenge,
        documentLoader
      })

      return signedResult
    } catch (error) {
      throw new Error(`Sign Presentation Error: ${error}`)
    }
  }

  public static async verifyPresentation(
    presentation: Presentation,
    credentialKeyPair: CredentialKeyPair,
    challenge: string
  ): Promise<PresentationResult> {
    const keyPair = await EcdsaSecp256k1VerificationKey2019.generate(
      credentialKeyPair
    )
    const suite = new EcdsaSecp256k1Signature2019({
      key: keyPair
    })

    if (!keyPair || !suite) throw new Error('Missing keypair or suite')

    try {
      const verifiedPresentation: VerifiedPresentation = await vc.verify({
        challenge,
        suite,
        documentLoader,
        presentation
      })

      return verifiedPresentation.presentationResult
    } catch (error) {
      throw new Error(`Verify Presentation Error: ${error}`)
    }
  }

  public static async verifyUnsignedPresentation(
    presentation: Presentation,
    credentialKeyPair: CredentialKeyPair
  ): Promise<VerifiedPresentation> {
    const keyPair = await EcdsaSecp256k1VerificationKey2019.generate(
      credentialKeyPair
    )
    const suite = new EcdsaSecp256k1Signature2019({
      key: keyPair
    })

    if (!keyPair || !suite) throw new Error('Missing keypair or suite')

    try {
      const verifiedPresentation: VerifiedPresentation = await vc.verify({
        documentLoader,
        presentation,
        suite,
        unsignedPresentation: true
      })

      return verifiedPresentation
    } catch (error) {
      throw new Error(`Verify Unsigned Presentation Error: ${error}`)
    }
  }
}
