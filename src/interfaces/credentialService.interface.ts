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
