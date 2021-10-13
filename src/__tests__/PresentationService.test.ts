import * as base58 from 'base58-universal'
import { Wallet } from 'ethers'

import { credentialProofedMock } from '../mocks/credentialMock'
import { CredentialKeyPair } from '../interfaces/credentialService.interface'
import PresentationService from '../services/PresentationService'

describe('CredentialService', () => {
  let wallet: Wallet
  let publicKeyBase58: string
  let privateKeyBase58: string
  let keyPair: CredentialKeyPair
  const challenge = '12ec21'
  const id =
    'did:ethr:ropsten:0x028360fb95417724cb7dd2ff217b15d6f17fc45e0ffc1b3dce6c2b8dd1e704fa98#controllerKey'
  const controller =
    'did:ethr:ropsten:0x028360fb95417724cb7dd2ff217b15d6f17fc45e0ffc1b3dce6c2b8dd1e704fa98'

  beforeEach(async () => {
    wallet = await Wallet.createRandom()
    publicKeyBase58 = base58.encode(
      Buffer.from(wallet.publicKey.replace('0x', ''), 'hex')
    )
    privateKeyBase58 = base58.encode(
      Buffer.from(wallet.privateKey.replace('0x', ''), 'hex')
    )
    keyPair = { publicKeyBase58, privateKeyBase58, id, controller }
  })

  it('should create presentation', async () => {
    const isPresentation = await PresentationService.createPresentation([
      credentialProofedMock
    ])

    expect(isPresentation.type[0]).toEqual('VerifiablePresentation')
    expect(isPresentation.verifiableCredential[0]).toBeTruthy()
  })

  it('should create presentation with multiple credentials', async () => {
    const isPresentation = await PresentationService.createPresentation([
      credentialProofedMock,
      credentialProofedMock
    ])

    expect(isPresentation.type[0]).toEqual('VerifiablePresentation')
    expect(isPresentation.verifiableCredential[0]).toBeTruthy()
  })

  it('should error for not receiving credentials', async () => {
    try {
      await PresentationService.createPresentation([])
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toEqual('No credentials received')
    }
  })

  it('should sign presentation', async () => {
    const presentation = await PresentationService.createPresentation([
      credentialProofedMock
    ])

    const isSignPresentation = await PresentationService.signPresentation(
      presentation,
      keyPair,
      challenge
    )

    expect(isSignPresentation).toBeTruthy()
  })

  it('should error in sign presentation', async () => {
    try {
      await PresentationService.signPresentation(undefined, keyPair, challenge)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toContain(`Sign Presentation Error`)
    }
  })

  it('should verify sign presentation', async () => {
    const presentation = await PresentationService.createPresentation([
      credentialProofedMock
    ])
    const signPresentation = await PresentationService.signPresentation(
      presentation,
      keyPair,
      challenge
    )

    const { verified } = await PresentationService.verifyPresentation(
      signPresentation,
      keyPair,
      challenge
    )

    expect(verified).toBeTruthy()
  })

  it('should error in verify presentation', async () => {
    const presentation = await PresentationService.createPresentation([
      credentialProofedMock
    ])

    const { verified } = await PresentationService.verifyPresentation(
      presentation,
      keyPair,
      challenge
    )

    expect(verified).toBeFalsy()
  })

  it('should verify unsigned presentation', async () => {
    const presentation = await PresentationService.createPresentation([
      credentialProofedMock
    ])

    const isVerifiedPresentation =
      await PresentationService.verifyUnsignedPresentation(
        presentation,
        keyPair
      )

    expect(isVerifiedPresentation).toBeTruthy()
  })

  it('should error in verify unsigned presentation', async () => {
    const {
      error: { verified }
    } = await PresentationService.verifyUnsignedPresentation(undefined, keyPair)

    expect(verified).toBeFalsy()
  })
})
