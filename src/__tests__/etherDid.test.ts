import { EthrDID } from 'ethr-did'
import { Resolver } from '@sphereon/did-uni-client/dist/resolver/Resolver'
import base58 from 'bs58'

describe('Ethr DID should', () => {
  it('succeed creating a DID on testnet', async () => {
    const network = 'ropsten'
    const keypair = EthrDID.createKeyPair()
    const ethrDid = new EthrDID({ ...keypair, chainNameOrId: network })

    const uniResolver = new Resolver()
    const resolutionResult = await uniResolver.resolve(ethrDid.did)

    const didDocument = JSON.stringify(resolutionResult.didDocument)
    const privateKeyBase58 = base58.encode(Buffer.from(keypair.privateKey.replace('0x', ''), 'hex'))
    const publicKeyBase58 = base58.encode(Buffer.from(keypair.publicKey.replace('0x', ''), 'hex'))

    expect(didDocument).toBeTruthy()
    expect(privateKeyBase58).toBeTruthy()
    expect(publicKeyBase58).toBeTruthy()
  })
})
