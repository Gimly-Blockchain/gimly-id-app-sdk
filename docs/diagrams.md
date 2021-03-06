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
    issuer: str | Issuer
    issuanceData: str
    credentialSubject: CredentialSubject
    proof: PresentationProof
}
Credential <|-- Presentation
CredentialSubject <|-- Credential
Issuer <|-- Credential

class CredentialSubject {
    <<interface>>
    id: str
    (customizable): object
}

class Issuer {
    <<interface>>
    id: str
    (customizable): object
}

class Presentation {
    <<interface>>
    context: str[]
    type: str[]
    id?: str;
    holder?: str;
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
    createCredential(credential: Credential, credentialKeyPair: CredentialKeyPair) Promise(Credential)
    verifyCredential(credential: Credential, credentialKeyPair: CredentialKeyPair) Promise(VerifyCredentialResult)
}
Credential <-- CredentialService

class CredentialKeyPair {
    <<interface>>
    publicKeyBase58: string
    privateKeyBase58: string
    id: string
    controller: string
}

CredentialService <-- CredentialKeyPair
PresentationService <-- CredentialKeyPair

class VerifyCredentialResult {
    <<interface>>
    verified: boolean
    statusResult: object
    results: []
    error: object
}

CredentialService <-- VerifyCredentialResult

class GeneralIdentityService {
    <<service>>
    createDid(data: IdentityData, auth: Authority) Promise(bool)
    getUserDid() Promise(bool)
    updateDid() Promise(bool)
}
IdentityData <-- GeneralIdentityService
Authority <-- GeneralIdentityService

class PresentationService {
    <<service>>
    createPresentation(credentials: Credential[]) Promise(Presentation)
    signPresentation(presentation: Presentation,     credentialKeyPair: CredentialKeyPair, challenge: string) Promise(Presentation)
    verifyPresentation(presentation: Presentation, credentialKeyPair: CredentialKeyPair, challenge: string) Promise(PresentationResult)
    verifyUnsignedPresentation(presentation: Presentation, credentialKeyPair: CredentialKeyPair) Promise(VerifiedPresentation)
}
Presentation <-- PresentationService
Credential <-- PresentationService

class VerifiedPresentation {
    <<interface>>
    presentationResult: PresentationResult
    verified: boolean
    credentialResults: []
    error: VerifyPresentationError
}
PresentationService <-- VerifiedPresentation

class Authority {
    <<interface>>
    (external EOSJS rpc interface)
}

class DidcommService {
    <<service>>
    packMsg(message: str, issuerPrivateKey: Uint8Array, receiverKeyPair: KeyPair) Promise(str)
    unPackMsg(packMsg: str, issuerKeyPair: KeyPair) Promise(IUnpackedMsg)
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
    message: str
    recipientKey: str
    senderKey: str
    nonRepudiableVerification: bool
}

class NfcService {
    <<service>>
    startSession() Promise(void)
    stopSession() Promise(void)
    scanCard(initialMessage: InitialMessage) Promise(Card | null)
    sign(hashes: [string], walletPublicKey: string, cardId: string, initialMessage: InitialMessage) Promise(SignResponse | null)
    getStatus() Promise(NFCStatusResponse)
    createWallet(cardId: string Promise(CreateWalletResponse | null)
    purgeWallet(cardId: string, walletPublicKey: string) Promise(PurgeWalletResponse | null)
    setPassCode(cardId: string) Promise(SetUserCodesResponse | null)
    setAccessCode(cardId: string) Promise(SetUserCodesResponse | null)
    resetUserCodes(cardId: string) Promise(SetUserCodesResponse | null)
    nfcListener() (EmitterSubscription | undefined)
    removeNfcListener(listener: EmitterSubscription) boolean
}
```
