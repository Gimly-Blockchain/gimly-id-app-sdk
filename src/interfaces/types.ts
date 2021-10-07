export interface IdentityData {
  chain: string
  publicKey: string
  privateKey: string
  nameKey: string
  accountName: string
}

export interface Credential {
  '@context': string[]
  id: string
  type: string[]
  issuer: string | Issuer
  issuanceDate: string
  credentialSubject: CredentialSubject
  proof?: PresentationProof
  [x: string]: unknown
}

export interface Issuer {
  id: string
  [x: string]: unknown
}

export interface CredentialSubject {
  id: string
  [x: string]: unknown
}

export interface CredentialKeyPair {
  publicKeyBase58: string
  privateKeyBase58: string
  id: string
  controller: string
}

export interface VerifyCredentialResult {
  verified: boolean
  statusResult: object
  results: any[]
  error: object
}

export interface Presentation {
  '@context': string[]
  type: string[]
  id?: string
  holder?: string
  verifiableCredential: Credential[]
  proof?: PresentationProof
}

export interface PresentationProof {
  type: string
  created: string
  verificationMethod: string
  proofPurpose: string
  challenge?: string
  jws?: string
  proofValue?: string
}

export interface EthrDid {
  did: string
  didDocument: string
  privateKey: string
  publicKey: string
}
