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
  issuer: string
  issuanceDate: string
  credentialSubject: CredentialSubject
  proof: PresentationProof
}

export interface CredentialSubject {
  id: string
  alumniOf: string
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
