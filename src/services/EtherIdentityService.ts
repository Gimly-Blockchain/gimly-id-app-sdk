import { Resolver } from '@sphereon/did-uni-client/dist/resolver/Resolver'
import { EthrDID } from 'ethr-did'
import { getDid, saveDID } from '../utils/keychain'

export default class EtherIdentityService {
  public static async createDid(): Promise<boolean> {
    const network = 'ropsten'
    const keypair = EthrDID.createKeyPair()
    const ethrDid = new EthrDID({ ...keypair, chainNameOrId: network })

    if (ethrDid.did) {
      await saveDID(ethrDid.did)
      return true
    } else {
      throw new Error('Create DID error')
    }
  }

  public static async getUserDid(): Promise<string | boolean> {
    const did = await getDid()
    if (!did) return false

    const uniResolver = new Resolver()
    const didResolveResult = await uniResolver.resolve(did)
    const didDocument = JSON.stringify(didResolveResult.didDocument)

    if (didDocument) {
      return didDocument
    } else {
      throw new Error('Get User DID error')
    }
  }
}
