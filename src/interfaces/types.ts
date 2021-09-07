export interface IdentityData {
  chain: string;
  signatureProvider: string;
  publicKey: string;
  privateKey: string;
  nameKey: string;
  newAccountName: string;
}

export interface Credential {
  "@context": string[];
  id: string;
  type: string[];
  issuer: string;
  issuanceDate: string;
  credentialSubject: CredentialSubject;
}

export interface CredentialSubject {
  id: string;
  alumniOf: string;
}
