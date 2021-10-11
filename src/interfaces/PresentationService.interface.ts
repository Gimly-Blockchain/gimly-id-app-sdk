export interface VerifiedPresentation {
  presentationResult: PresentationResult
  verified: boolean
  credentialResults: []
  error: VerifyPresentationError
}

export interface PresentationResult {
  verified: boolean
  result: []
}

export interface VerifyPresentationError {
  verified: boolean
  results: []
  credentialResults: []
}
