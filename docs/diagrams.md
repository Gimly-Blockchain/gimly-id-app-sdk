# Class diagram

This is the class diagram for the Gimly SDK.

Interfaces and Services

```mermaid
classDiagram
class IdentityData {
    <<interface>>
    chain: str
    publicKey: str
    privateKey: str
    accountName: str
    nameKey: str
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
CredentialSubject <|-- Credential

class CredentialSubject {
    <<interface>>
    id: str
    alumniOf: str
}

class Presentation {
    <<interface>>
    context: str[]
    type: str[]
    id?: string;
    holder?: string;
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
    createCredential(credential: Credential) Promise(Credential | false)
    verifyCredential(credential: Credential) Promise(boolean)
}
Credential <-- CredentialService

class GeneralIdentityService {
    <<service>>
    createDid(data: IdentityData, auth: Authority) Promise(boolean)
    getUserDid() Promise(boolean)
    updateDid() Promise(boolean)
}
IdentityData <-- GeneralIdentityService
Authority <-- GeneralIdentityService

class PresentationService {
    <<service>>
    createPresentation(verifiableCredential: Credential[], id: str, holder: str) Promise(Presentation)
    signPresentation(presentation: Presentation, challenge: str) Promise(Presentation | boolean)
    verifyPresentation(presentation: Presentation) Promise(boolean)
    verifyUnsignedPresentation(presentation: Presentation) Promise(boolean)
}
Presentation <-- PresentationService
Credential <-- PresentationService

class Authority {
    <<interface>>
    (external EOSJS rpc interface)
}

class DidcommService {
    <<service>>
    packMsg(message: string, issuerPrivateKey: Uint8Array, receiverKeyPair: KeyPair) Promise(string)
    unPackMsg(packMsg: string, issuerKeyPair: KeyPair) Promise(IUnpackedMsg)
}
KeyPair <-- DidcommService
IUnpackedMsg <-- DidcommService

class KeyPair {
    <<interface>>
    keyType: KeyType
    privateKey: Uint8Array
    publicKey: Uint8Array
}

class IUnpackedMsg {
    <<interface>>
    message: string
    recipientKey: string
    senderKey: string
    nonRepudiableVerification: boolean
}
```
