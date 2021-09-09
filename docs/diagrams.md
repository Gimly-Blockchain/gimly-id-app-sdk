# Class diagram

This is the class diagram for the Gimly SDK.

Interfaces

```mermaid
classDiagram
class IdentityData {
    <<interface>>
    chain: str
    signatureProvider: str
    publicKey: str
    privateKey: str
    newAccountName: str
}

class Credential {
    <<interface>>
    context: str[]
    id: str
    type: str
    issuer: str
    issuanceData: str
    credentialSubject: CredentialSubject
    proof: PresentationProof
}
Credential <|-- Presentation
Credential <|-- CredentialSubject

class CredentialSubject {
    <<interface>>
    id: str
    alumniOf: str
}

class Presentation {
    <<interface>>
    context: str[]
    type: str[]
    verifiableCredential: Credential[]
    proof: PresentationProof
}

class PresentationProof {
    <<interface>>
    type: str
    created: str
    verificationMethod: str
    proofPurpose: str
    challenge: str
    jws: str
    proofValue: str
}

Presentation <|-- PresentationProof

class CredentialService {
    <<service>>
    createCredential(credential: Credential)
    verifyCredential(credential: Credential)
}
Credential <-- CredentialService

class GeneralIdentityService {
    <<service>>
    createDid(data: IdentityData, auth: Authority)
    getUserDid()
    updateDid()
}
IdentityData <-- GeneralIdentityService
Authority <-- GeneralIdentityService

class PresentationService {
    <<service>>
    createPresentation(verifiableCredential: Credential[], id: str, holder: str)
    signPresentation(presentation: Presentation, challenge: str)
    verifyPresentation(presentation: Presentation)
    verifyUnsignedPresentation(presentation: Presentation)
}
Presentation <-- PresentationService
Credential <-- PresentationService

class Authority {
    <<interface>>
    (external EOSJS rpc interface)
}

```
