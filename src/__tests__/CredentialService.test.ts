import * as base58 from 'base58-universal'
import CredentialServices from '../services/CredentialService'
import { Wallet } from 'ethers'
import { CredentialKeyPair } from '../interfaces/types'
import { credentialMock } from '../mocks/credentialMock'

describe('CredentialService', () => {
  let wallet: Wallet
  let publicKeyBase58: string
  let privateKeyBase58: string
  let keyPair: CredentialKeyPair
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

  it('should create vc', async () => {
    const isCredential = await CredentialServices.createCredential(
      credentialMock,
      keyPair
    )

    console.log('credential', isCredential)
    expect(isCredential).toBeTruthy()
  })

  it('should verify vc', async () => {
    const isCredential = await CredentialServices.createCredential(
      credentialMock,
      keyPair
    )

    const verifyResult = await CredentialServices.verifyCredential(
      isCredential,
      keyPair
    )
    console.log('verifyResult', verifyResult)
    expect(verifyResult.verified).toBeTruthy()
  })

  it('should error at verify vc', async () => {
    credentialMock.issuer = 'did:ethr:nope'
    const isCredential = await CredentialServices.createCredential(
      credentialMock,
      keyPair
    )

    const verifyResult = await CredentialServices.verifyCredential(
      isCredential,
      keyPair
    )

    expect(verifyResult.verified).toBeFalsy()
  })
})
