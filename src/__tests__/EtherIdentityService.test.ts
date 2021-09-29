import EtherIdentityService from '../services/EtherIdentityService'

const mockDidDocument =
  '{"@context":["https://www.w3.org/ns/did/v1","https://identity.foundation/EcdsaSecp256k1RecoverySignature2020/lds-ecdsa-secp256k1-recovery2020-0.0.jsonld"],"id":"did:ethr:0xb9c5714089478a327f09197987f16f9e5d936e8a","verificationMethod":[{"id":"did:ethr:0xb9c5714089478a327f09197987f16f9e5d936e8a#controller","type":"EcdsaSecp256k1RecoveryMethod2020","controller":"did:ethr:0xb9c5714089478a327f09197987f16f9e5d936e8a","blockchainAccountId":"0xB9C5714089478a327F09197987f16f9E5d936E8a@eip155:1"}],"authentication":["did:ethr:0xb9c5714089478a327f09197987f16f9e5d936e8a#controller"],"assertionMethod":["did:ethr:0xb9c5714089478a327f09197987f16f9e5d936e8a#controller"]}'

describe('Ethr DID should', () => {
  it('succeed creating a DID on testnet', async () => {
    const isDidCreated = await EtherIdentityService.createDid()

    expect(isDidCreated).toBeTruthy()
  })

  it('succeed obtaining the did created', async () => {
    const didDocument = await EtherIdentityService.getUserDid()

    expect(didDocument).toEqual(mockDidDocument)
  })
})
