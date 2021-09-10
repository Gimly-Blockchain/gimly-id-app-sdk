# Gimly ID Mobile SDK

Typescript library and html/css bundles used to interact a the Gimly ID app to login with SSO and send and receive VCs

This is the usage documentation for the **SDK** used in a react native **APP**.

## Getting Started

React native ≥0.64 required.
To install locally  the component we must install the main repository package

```bash
    yarn add https://github.com/Gimly-Blockchain/gimly-id-app-sdk.git
```

## Service

The SDK consists of a group of services to:

- Create the encrypted wallet on the device.
- Create DID.
- Manage credentials.
- Manage presentations.

## Wallet

### Description

In the process of creating the wallet through ethers, a mnemonic phrase (BIP-39) with 24 words will be created, with this phrase the wallet will be created, later it will be encrypted with the value provided. Finally it will be stored by Keychain securely on the device

For more information, see:

- [Ethers.io](https://docs.ethers.io/v5/)
- [Keychain](https://github.com/oblador/react-native-keychain)

## Usage

To create the wallet we will only have to provide a value to the function which must have a **string** type.

```javascript
import { createEncryptedWallet } from  'gimly-id-app-sdk'

const pin = '123456';

const savePin = async (pin: string) => {
  if (pin) {
    await createEncryptedWallet(pin)
  }
}
````

We will receive this response in case of error

```javascript
// Error when creating the wallet
```

## DID

### Description

This service is responsible for creating and modifying the user's DID using the following libraries:

- [eosio-did](https://github.com/Gimly-Blockchain/eosio-did)
- [eosio-did-spec](https://github.com/Gimly-Blockchain/eosio-did-spec)

### Usage

#### Data Interface

```javascript
interface  IdentityData {
  chain: string;
  signatureProvider: string;
  publicKey: string;
  privateKey: string;
  nameKey: string;
  newAccountName: string;
}

interface  Authority {
  threshold: number;
  keys: KeyWeight[];
  accounts: PermissionLevelWeight[];
  waits: WaitWeight[];
}
````

### Generate DID

```javascript
import { GeneralIdentityService } from  'gimly-id-app-sdk'

const authority: Authority = {
    threshold: 1,
    keys: [{
        key: 'PUB_K1_5irHomACLB3oRbkqdgYTdh1GHGt8yvzQ7no5dxvEw5eYAiUiut',
        weight: 1,
    }],
    accounts: [],
    waits: [],
}

const generateDid = async (data: IdentityData, auth: Authority) => {
  await GeneralIdentityService.createDid(data, auth)
}
```

We will receive this response in case of error

```javascript
// Create DID error
```

### Resolve DID

```javascript
import { GeneralIdentityService } from  'gimly-id-app-sdk'

const resolveDID = async () => {
  await GeneralIdentityService.getUserDid()
}
```

We will receive this response in case of error

```javascript
// resolve DID error
```

### Update DID

```javascript
import { GeneralIdentityService } from  'gimly-id-app-sdk'

const authority: Authority = {
    threshold: 1,
    keys: [{
        key: 'PUB_K1_5irHomACLB3oRbkqdgYTdh1GHGt8yvzQ7no5dxvEw5eYAiUiut',
        weight: 1,
    }],
    accounts: [],
    waits: [],
}
const permission = '';
const parent = '';
const 

const resolveDID = async (
  data: IdentityData,
  permission: string,
  parent: string,
  auth: Authority
) => {
  await GeneralIdentityService.getUserDid()
}
```

We will receive this response in case of error

```javascript
// Update DID error
```

## Credentials

### Description

This service is responsible for generating and verifying the credentials

- [Sphereon/rn-vc-js](https://github.com/Sphereon-Opensource/rn-vc-js)
- [Digitalbazaar/ed25519-signature-2020](https://github.com/digitalbazaar/ed25519-signature-2020)
- [Digitalbazaar/ed25519-verification-key-2020](https://github.com/digitalbazaar/ed25519-verification-key-2020)

## Usage

### Data Interface

```javascript
interface  Credential {
  "@context": string[];
  id: string;
  type: string[];
  issuer: string;
  issuanceDate: string;
  credentialSubject: CredentialSubject;
  proof: PresentationProof;
}

interface  CredentialSubject {
  id: string;
  alumniOf: string;
}

interface  PresentationProof {
  type: string;
  created: string;
  verificationMethod: string;
  proofPurpose: string;
  challenge?: string;
  jws?: string;
  proofValue?: string;
}

```

### Generate credential

When we generate a credential, we will specify the ontologies in the `@context` of the credential
parameters, as stated in the w3 standard [link](https://w3c.github.io/vc-data-model/#credential-subject). [Examples](https://www.w3.org/2018/credentials/examples/v1) are provided to use own and third-party credentials ([schema.org](https://schema.org/Person)) or ([fhir](https://www.hl7.org/fhir/immunization.html)) [more examples](https://www.w3.org/2018/credentials/v1).

```javascript
import { GeneralIdentityService } from  'gimly-id-app-sdk'

const credential = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://www.w3.org/2018/credentials/examples/v1"
  ],
  "id": "https://example.com/credentials/1872",
  "type": ["VerifiableCredential", "AlumniCredential"],
  "issuer": "https://example.edu/issuers/565049",
  "issuanceDate": "2010-01-01T19:23:24Z",
  "credentialSubject": {
    "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
    "alumniOf": "Example University"
  }
};

const generateCredential = async (credential: Credential) => {
  await GeneralIdentityService.createCredential(credential)
}
```

We will receive this response in case of error

```javascript
// Create Credential Error
```

### Verify credential

```javascript
import { GeneralIdentityService } from  'gimly-id-app-sdk'

const verifyCredential = async (credential: Credential) => {
  await GeneralIdentityService.verifyCredential(credential)
}
```

We will receive this response in case of error

```javascript
// Verify Credential Error
```

# Presentations

### Description

This is the service responsible for generating and verifying presentations, using the following libraries

- [Sphereon/rn-vc-js](https://github.com/Sphereon-Opensource/rn-vc-js)
- [Digitalbazaar/ed25519-signature-2020](https://github.com/digitalbazaar/ed25519-signature-2020)
- [Digitalbazaar/ed25519-verification-key-2020](https://github.com/digitalbazaar/ed25519-verification-key-2020)

## Usage

### Data Interface

```javascript
interface  Presentation {
  "@context": string[];
  type: string[];
  id?: string;
  holder?: string;
  verifiableCredential: Credential[];
  proof?: PresentationProof;
}

// The "Credential" and "PresentationProof" interfaces are the same used in the presentation service.
```

### Create presentation

```javascript
import { GeneralIdentityService } from  'gimly-id-app-sdk'

const credential: Credential = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://www.w3.org/2018/credentials/examples/v1"
  ],
  "id": "https://example.com/credentials/1872",
  "type": ["VerifiableCredential", "AlumniCredential"],
  "issuer": "https://example.edu/issuers/565049",
  "issuanceDate": "2010-01-01T19:23:24Z",
  "credentialSubject": {
    "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
    "alumniOf": "Example University"
  }
};

// optional `id` and `holder`
const createPresentation = async (
  verifiableCredential: Credential[],
  id?: string,
  holder?: string
) => {
  await GeneralIdentityService.createPresentation(verifiableCredential, id, holder)
}
```

We will receive this response in case of error

```javascript
// Create Presentation Error
```

### Sign presentation

```javascript
import { GeneralIdentityService } from  'gimly-id-app-sdk'

// optional `id` and `holder`
const id = 'ebc6f1c2';
const holder = 'did:ex:12345';

const presentation = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1"
  ],
  "type": [
    "VerifiablePresentation"
  ],
  "id": "ebc6f1c2",
  "holder": "did:ex:12345",
  "verifiableCredential": [
    {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.w3.org/2018/credentials/examples/v1"
      ],
      "id": "http://example.edu/credentials/1872",
      "type": [
        "VerifiableCredential",
        "AlumniCredential"
      ],
      "issuer": "https://example.edu/issuers/565049",
      "issuanceDate": "2010-01-01T19:23:24Z",
      "credentialSubject": {
        "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
        "alumniOf": "<span lang=\"en\">Example University</span>"
      },
      "proof": {
        "type": "Ed25519Signature2018",
        "created": "2020-02-03T17:23:49Z",
        "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..AUQ3AJ23WM5vMOWNtYKuqZBekRAOUibOMH9XuvOd39my1sO-X9R4QyAXLD2ospssLvIuwmQVhJa-F0xMOnkvBg",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "https://example.edu/issuers/keys/1"
      }
    }
  ]
}
const challenge = 'mychallengeword'

const signPresentation = async (presentation: Presentation, challenge: string) => {
  await GeneralIdentityService.signPresentation(presentation, challenge)
}
```

We will receive this response in case of error

```javascript
// Sign Presentation Error
```

### Verify presentation

```javascript
import { GeneralIdentityService } from  'gimly-id-app-sdk'

const verifyPresentation = async (presentation: Presentation) => {
  await GeneralIdentityService.verifyPresentation(presentation)
}
```

We will receive this response in case of error

```javascript
// Verify Presentation Error
```

### Verify unsigned presentation

```javascript
import { GeneralIdentityService } from  'gimly-id-app-sdk'

const verifyUnsignedPresentation = async (presentation: Presentation) => {
  await GeneralIdentityService.verifyUnsignedPresentation(presentation)
}
```

We will receive this response in case of error

```javascript
// Verify Unsigned Presentation Error
```

## Class diagram

![Captura de pantalla 2021-09-10 a las 10 04 20](https://user-images.githubusercontent.com/65024448/132821350-401ab7fd-d401-4478-8dd7-4e0b708ea639.png)

