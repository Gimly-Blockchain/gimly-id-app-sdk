import EosioDID from "eosio-did";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import { Authority } from "eosjs/dist/eosjs-rpc-interfaces";
import { IdentityData } from "../interfaces/types";
import { getDid, saveDID } from "../utils/keychain";

export default class GeneralIdentityService {
  public static async createDid(data: IdentityData, auth: Authority) {
    const eosioDid = new EosioDID({
      chain: data.chain,
      signatureProvider: new JsSignatureProvider([data.privateKey]),
    });

    const didCreateResult = await eosioDid.create(
      data.nameKey,
      data.newAccountName,
      auth,
      auth
    );

    if (didCreateResult) {
      await saveDID(didCreateResult);
    } else {
      throw new Error("Create DID error");
    }
  }

  public static async getUserDid() {
    const did = await getDid();
    if (!did) return null;

    const eosioDid = new EosioDID({ fetch });
    const didResolveResult = await eosioDid.resolve(did);

    return didResolveResult;
  }

  public static async updateDid(
    data: IdentityData,
    permission: string,
    parent: string,
    auth: Authority
  ) {
    const signatureProvider = new JsSignatureProvider([data.privateKey]);

    const eosioDID = new EosioDID({
      signatureProvider,
      chain: data.chain,
      fetch,
    });

    const didUpdateResult = await eosioDID.update(
      data.nameKey,
      permission,
      parent,
      auth
    );

    if (didUpdateResult) {
      await saveDID(didUpdateResult);
    } else {
      throw new Error("Update DID error");
    }
  }
}
