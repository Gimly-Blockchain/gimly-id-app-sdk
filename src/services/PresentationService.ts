import vc from '@sphereon/rn-vc-js'
import { v4 as uuid } from 'uuid'

//TODO - Change repository
//import Secp256k1KeyPair from '@sphereon/rn-secp256k1-key-pair'
import { Presentation } from '../interfaces/types'

export default class PresentationService {
  public static async createPresentation(
    verifiableCredential: Credential[],
    id: string,
    holder: string
  ): Promise<Presentation> {
    try {
      const presentationResult: Presentation = await vc.createPresentation({
        verifiableCredential,
        id,
        holder
      })
      return presentationResult
    } catch (error) {
      throw new Error('Create Credential Error')
    }
  }

  public static async signPresentation(
    presentation: Presentation,
    challenge: string
  ): Promise<Presentation | boolean> {
    const keyPair = await Secp256k1KeyPair.generate()
    const suite = new Secp256k1KeyPair(keyPair)

    if (!keyPair || !suite) return false

    try {
      const signedResult: Presentation = await vc.signPresentation({
        presentation,
        suite,
        challenge
      })

      return signedResult
    } catch (error) {
      throw new Error('Create Credential Error')
    }
  }

  public static async verifyPresentation(
    presentation: Presentation
  ): Promise<boolean> {
    const keyPair = await Secp256k1KeyPair.generate()
    const suite = new Secp256k1KeyPair(keyPair)
    const challenge = uuid()

    if (!keyPair || !suite) return false

    try {
      await vc.verify({ presentation, challenge, suite })
      return true
    } catch (error) {
      throw new Error('Verify Presentation Error')
    }
  }

  public static async verifyUnsignedPresentation(
    presentation: Presentation
  ): Promise<boolean> {
    const keyPair = await Secp256k1KeyPair.generate()
    const suite = new Secp256k1KeyPair(keyPair)

    if (!keyPair || !suite) return false

    try {
      await vc.verify({ presentation, suite, unsignedPresentation: true })
      return true
    } catch (error) {
      throw new Error('Verify Unsigned Presentation Error')
    }
  }
}
