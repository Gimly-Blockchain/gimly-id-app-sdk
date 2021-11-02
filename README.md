<h2 style="text-align: center; vertical-align: middle">
    <center><a href="https://www.gimly.io/"><img src="https://avatars.githubusercontent.com/u/64525639?s=200&v=4" alt="Gimly" width="120" style="vertical-align: middle"></a> &nbsp;and &nbsp; <a href="https://www.sphereon.com"><img src="https://sphereon.com/content/themes/sphereon/assets/img/logo.svg" alt="Sphereon" width="320" style="vertical-align: middle" ></a></center>

# Gimly ID Mobile SDK

Typescript library and html/css bundles used to interact a the Gimly ID app to login with SSO and send and receive VCs

This is the usage documentation for the **SDK** used in a react native **APP**.

## Getting Started

React native ≥0.64 required.
To install locally the component we must install the main repository package

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
import { createEncryptedWallet } from 'gimly-id-app-sdk'

const pin = '123456'

const savePin = async (pin: string) => {
  if (pin) {
    await createEncryptedWallet(pin)
  }
}
```

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
interface IdentityData {
  chain: string;
  publicKey: string;
  privateKey: string;
  nameKey: string;
  accountName: string;
}

interface Authority {
  threshold: number;
  keys: KeyWeight[];
  accounts: PermissionLevelWeight[];
  waits: WaitWeight[];
}
```

### Generate DID

```javascript
import { GeneralIdentityService } from 'gimly-id-app-sdk'

const identityData: IdentityData = {
  chain: 'eos:testnet:jungle',
  publicKey: 'PUB_K1_5irHomACLB3oRbkqdgYTdh1GHGt8yvzQ7no5dxvEw5eYAiUiut',
  privateKey: 'PVT_K1_27yS4sdX86VDahQRABMLCcDABH5Vzy8vgLLS7wBeKESyrXetMf',
  nameKey: 'didtester3334',
  accountName: 'newaccount11'
}

const authority: Authority = {
  threshold: 1,
  keys: [
    {
      key: 'PUB_K1_5irHomACLB3oRbkqdgYTdh1GHGt8yvzQ7no5dxvEw5eYAiUiut',
      weight: 1
    }
  ],
  accounts: [],
  waits: []
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
import { GeneralIdentityService } from 'gimly-id-app-sdk'

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
import { GeneralIdentityService } from 'gimly-id-app-sdk'

const identityData: IdentityData = {
  chain: 'eos:testnet:jungle',
  publicKey: 'PUB_K1_5irHomACLB3oRbkqdgYTdh1GHGt8yvzQ7no5dxvEw5eYAiUiut',
  privateKey: 'PVT_K1_27yS4sdX86VDahQRABMLCcDABH5Vzy8vgLLS7wBeKESyrXetMf',
  nameKey: 'didtester3334',
  accountName: 'newaccount11'
}

const authority: Authority = {
  threshold: 1,
  keys: [
    {
      key: 'PUB_K1_5irHomACLB3oRbkqdgYTdh1GHGt8yvzQ7no5dxvEw5eYAiUiut',
      weight: 1
    }
  ],
  accounts: [],
  waits: []
}
const permission = 'active'
const parent = 'owner'

const updateDid = async (
  data: IdentityData,
  permission: string,
  parent: string,
  auth: Authority
) => {
  await GeneralIdentityService.updateDid(data, permission, parent, auth)
}
```

We will receive this response in case of error

```javascript
// Update DID error
```

## DID (Ethr-DID)

### Description

This service is responsible for creating and modifying the user's DID using the following libraries:

- [ethr-did](https://github.com/uport-project/ethr-did)

### Usage

#### Data Interface

```javascript
export interface EthrDid {
  did: string
  didDocument: string
  privateKey: string
  publicKey: string
}
```

### Generate DID

```javascript
import { EtherIdentityService } from 'gimly-id-app-sdk'

const generateDid = async () => {
  await EtherIdentityService.createDid()
}

//This will save an EtherDid type object in the wallet.
```

We will receive this response in case of error

```javascript
// Create DID error
```

### Resolve DID

```javascript
import { GeneralIdentityService } from 'gimly-id-app-sdk'

const resolveDID = async () => {
  await EtherIdentityService.getUserDid()
}

//This will return the didDocument
```

We will receive this response in case of error

```javascript
// resolve DID error
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
interface Credential {
  '@context': string[]
  id: string
  type: string[]
  issuer: string | Issuer
  issuanceDate: string
  credentialSubject: CredentialSubject
  proof?: PresentationProof
}

interface CredentialSubject {
  id: string
  [custom: string]: unknown
}

interface PresentationProof {
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
import { GeneralIdentityService } from 'gimly-id-app-sdk'

const credential: Credential = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://www.w3.org/2018/credentials/examples/v1'
  ],
  id: 'https://example.com/credentials/1872',
  type: ['VerifiableCredential', 'AlumniCredential'],
  issuer: 'https://example.edu/issuers/565049',
  issuanceDate: '2010-01-01T19:23:24Z',
  credentialSubject: {
    id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
    alumniOf: 'Example University'
  }
}

const keyPair: CredentialKeyPair = {
  publicKeyBase58:
    'MmVhTd7VDGeowTYotyUyjTfzkweJokFNYStRpJmmF3oMrnijYy7XE9SyymFJVsn4ViUrSLKXvppG5G8j2fcgjLeS',
  privateKeyBase58: 'F8v7zWWPTVPid1Gd6CidHe9815jNWZB6gQFYff3TsTWJ',
  id: 'did:ethr:ropsten:0x028360fb95417724cb7dd2ff217b15d6f17fc45e0ffc1b3dce6c2b8dd1e704fa98#controllerKey',
  controller:
    'did:ethr:ropsten:0x028360fb95417724cb7dd2ff217b15d6f17fc45e0ffc1b3dce6c2b8dd1e704fa98'
}

const generateCredential = async (
  credential: Credential,
  keyPair: CredentialKeyPair
) => {
  await GeneralIdentityService.createCredential(credential)
}
```

We will receive this response in case of error

```javascript
// Create Credential Error
```

### Verify credential

```javascript
import { GeneralIdentityService } from 'gimly-id-app-sdk'

const credential: Credential = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://www.w3.org/2018/credentials/examples/v1'
  ],
  id: 'https://example.com/credentials/1872',
  type: ['VerifiableCredential', 'AlumniCredential'],
  issuer: 'https://example.edu/issuers/565049',
  issuanceDate: '2010-01-01T19:23:24Z',
  credentialSubject: {
    id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
    alumniOf: 'Example University'
  },
  proof: {
    type: 'EcdsaSecp256k1Signature2019',
    created: '2021-10-07T10:56:58Z',
    verificationMethod:
      'did:ethr:ropsten:0x028360fb95417724cb7dd2ff217b15d6f17fc45e0ffc1b3dce6c2b8dd1e704fa98#controllerKey',
    proofPurpose: 'assertionMethod',
    jws: 'eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..Q_HvWN3cF4zqcLdlC9g2lDp522yqA-FyH3WHOtYAy-8af6urfy-CsWa2S30fzh1yv0A3DGt1LAr6ZW0NWxEz-A'
  }
}

const keyPair: CredentialKeyPair = {
  publicKeyBase58:
    'MmVhTd7VDGeowTYotyUyjTfzkweJokFNYStRpJmmF3oMrnijYy7XE9SyymFJVsn4ViUrSLKXvppG5G8j2fcgjLeS',
  privateKeyBase58: 'F8v7zWWPTVPid1Gd6CidHe9815jNWZB6gQFYff3TsTWJ',
  id: 'did:ethr:ropsten:0x028360fb95417724cb7dd2ff217b15d6f17fc45e0ffc1b3dce6c2b8dd1e704fa98#controllerKey',
  controller:
    'did:ethr:ropsten:0x028360fb95417724cb7dd2ff217b15d6f17fc45e0ffc1b3dce6c2b8dd1e704fa98'
}

const verifyCredential = async (
  credential: Credential,
  keyPair: CredentialKeyPair
) => {
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
interface Presentation {
  '@context': string[];
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
import { GeneralIdentityService } from 'gimly-id-app-sdk'

const credential: Credential = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://www.w3.org/2018/credentials/examples/v1'
  ],
  id: 'https://example.com/credentials/1872',
  type: ['VerifiableCredential', 'AlumniCredential'],
  issuer: 'https://example.edu/issuers/565049',
  issuanceDate: '2010-01-01T19:23:24Z',
  credentialSubject: {
    id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
    alumniOf: 'Example University'
  },
  proof: {
    type: 'EcdsaSecp256k1Signature2019',
    created: '2021-10-07T10:56:58Z',
    verificationMethod:
      'did:ethr:ropsten:0x028360fb95417724cb7dd2ff217b15d6f17fc45e0ffc1b3dce6c2b8dd1e704fa98#controllerKey',
    proofPurpose: 'assertionMethod',
    jws: 'eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..Q_HvWN3cF4zqcLdlC9g2lDp522yqA-FyH3WHOtYAy-8af6urfy-CsWa2S30fzh1yv0A3DGt1LAr6ZW0NWxEz-A'
  }
}

const createPresentation = async (credentials: Credential[]) => {
  await GeneralIdentityService.createPresentation(credential)
}
```

We will receive this response in case of error

```javascript
// Create Presentation Error
```

### Sign presentation

```javascript
import { GeneralIdentityService } from 'gimly-id-app-sdk'

const presentation: Presentation = {
  '@context': ['https://www.w3.org/2018/credentials/v1'],
  type: ['VerifiablePresentation'],
  id: 'ebc6f1c2',
  holder: 'did:ex:12345',
  verifiableCredential: [
    {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://www.w3.org/2018/credentials/examples/v1'
      ],
      id: 'http://example.edu/credentials/1872',
      type: ['VerifiableCredential', 'AlumniCredential'],
      issuer: 'https://example.edu/issuers/565049',
      issuanceDate: '2010-01-01T19:23:24Z',
      credentialSubject: {
        id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
        alumniOf: '<span lang="en">Example University</span>'
      }
    }
  ]
}

const challenge = 'mychallengeword'

const signPresentation = async (
  presentation: Presentation,
  keyPair: CredentialKeyPair,
  challenge: string
) => {
  await GeneralIdentityService.signPresentation(
    presentation,
    keyPair,
    challenge
  )
}
```

We will receive this response in case of error

```javascript
// Sign Presentation Error
```

### Verify presentation

```javascript
import { GeneralIdentityService } from 'gimly-id-app-sdk'

const presentation: Presentation = {
  '@context': ['https://www.w3.org/2018/credentials/v1'],
  type: ['VerifiablePresentation'],
  id: 'ebc6f1c2',
  holder: 'did:ex:12345',
  verifiableCredential: [
    {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://www.w3.org/2018/credentials/examples/v1'
      ],
      id: 'http://example.edu/credentials/1872',
      type: ['VerifiableCredential', 'AlumniCredential'],
      issuer: 'https://example.edu/issuers/565049',
      issuanceDate: '2010-01-01T19:23:24Z',
      credentialSubject: {
        id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
        alumniOf: '<span lang="en">Example University</span>'
      },
      proof: {
        type: 'Ed25519Signature2018',
        created: '2020-02-03T17:23:49Z',
        jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..AUQ3AJ23WM5vMOWNtYKuqZBekRAOUibOMH9XuvOd39my1sO-X9R4QyAXLD2ospssLvIuwmQVhJa-F0xMOnkvBg',
        proofPurpose: 'assertionMethod',
        verificationMethod: 'https://example.edu/issuers/keys/1'
      }
    }
  ]
}

const verifyPresentation = async (
  presentation: Presentation,
  keyPair: CredentialKeyPair,
  challenge: string
) => {
  await GeneralIdentityService.verifyPresentation(
    presentation,
    keyPair,
    challenge
  )
}
```

We will receive this response in case of error

```javascript
// Verify Presentation Error
```

### Verify unsigned presentation

```javascript
import { GeneralIdentityService } from 'gimly-id-app-sdk'

const presentation: Presentation = {
  '@context': ['https://www.w3.org/2018/credentials/v1'],
  type: ['VerifiablePresentation'],
  id: 'ebc6f1c2',
  holder: 'did:ex:12345',
  verifiableCredential: [
    {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://www.w3.org/2018/credentials/examples/v1'
      ],
      id: 'http://example.edu/credentials/1872',
      type: ['VerifiableCredential', 'AlumniCredential'],
      issuer: 'https://example.edu/issuers/565049',
      issuanceDate: '2010-01-01T19:23:24Z',
      credentialSubject: {
        id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
        alumniOf: '<span lang="en">Example University</span>'
      }
    }
  ]
}

const verifyUnsignedPresentation = async (
  presentation: Presentation,
  credentialKeyPair: CredentialKeyPair
) => {
  await GeneralIdentityService.verifyUnsignedPresentation(
    presentation,
    credentialKeyPair
  )
}
```

We will receive this response in case of error

```javascript
// Verify Unsigned Presentation Error
```

## NFC Service

### Description

The main functions of NFC service are to securely create and store a private key from a blockchain wallet and sign blockchain transactions.

- [tangem-sdk-react-native](https://github.com/XRPL-Labs/tangem-sdk-react-native)

### Usage

#### Start/Stop Session

Is needed before running any other method in android, calling this method will ask the user to enable the NFC in case of NFC disabled.

```javascript
import { NfcService } from 'gimly-id-app-sdk'

NfcService.StartSession()
// ...other methods
NfcService.StopSession()
```

#### Scan card

This method is needed to obtain information from the card. Optionally, if the card contains a wallet (private and public key pair), it proves that the wallet owns a private key that corresponds to a public one.

```javascript
import { NfcService } from 'gimly-id-app-sdk'

const initialMessage = {
  header: '',
  body: ''
}

NfcService.scanCard(initialMessage)
```

#### Sign

Allows you to sign one or multiple hashes. The SIGN command will return a corresponding array of signatures.

```javascript
import { NfcService } from 'gimly-id-app-sdk'

const signProps = {
  hashes: ['0xasdasd3d3d31dad1w'],
  walletPublicKey: 'dsad131231dsad1d1d',
  cardId: '1231d11as1',
  initialMessage: { header: '', body: '' }
}

NfcService.sign(signProps)
```

#### NFC Status

Will return current NFC Status which is supported on the device or is NFC enabled on the device.

```javascript
import { NfcService } from 'gimly-id-app-sdk'

NfcService.getStatus()
```

#### Create Wallet

will create a new wallet on the card. A key pair WalletPublicKey / WalletPrivateKey is generated and securely stored in the card.

```javascript
import { NfcService } from 'gimly-id-app-sdk'

const cardId = '1231d11as1'

NfcService.createWallet(cardId)
```

#### Purge Wallet

Deletes all wallet data.

```javascript
import { NfcService } from 'gimly-id-app-sdk'

const purgeWalletProps = {
  cardId: '1231d11as1',
  walletPublicKey: 'dsad131231dsad1d1d'
}

NfcService.purgeWallet(purgeWalletProps)
```

#### Set PassCode

Allows to set or change passcode on the card. Passcode protects signing and operations that can alter security parameters. Passcode may be enabled or disabled during card configuration at the factory. Also, it’s possible to prohibit removing the passcode from the card once it’s set.

```javascript
import { NfcService } from 'gimly-id-app-sdk'

const cardId = '1231d11as1',

NfcService.setPassCode(cardId)
```

#### Set AccessCode

Allows to set or change acccessCode on the card. If Access code is set on the card, all commands, including Scan Card, will require to sumbit this code. So if the Access code is lost, there is no way to recover the data or even retrieve the public key. Access codes may be enabled or disabled during card configuration at the factory. Also, it’s possible to prohibit removing the access code from the card once it’s set.

```javascript
import { NfcService } from 'gimly-id-app-sdk'

const cardId = '1231d11as1',

NfcService.setAccessCode(purgeWalletProps)
```

#### Reset User Codes

Resets both access code and passcode if they were set.

```javascript
import { NfcService } from 'gimly-id-app-sdk'

const cardId = '1231d11as1',

NfcService.resetUserCodes(purgeWalletProps)
```

#### Listen on events

Should be able to add listener on the certain events

```javascript
import { NfcService } from 'gimly-id-app-sdk'

NfcService.nfcListener()
// ...
NfcService.removeNfcListener()

```

# Class diagram

![Captura de pantalla 2021-11-02 a las 17 33 46](https://user-images.githubusercontent.com/65024448/139907710-a709a1e1-fbf5-409b-b71f-bd574c1800c0.png)

## Running Tests

To launch the tests you need to use one of the following scripts:

Will install all repositories

```
yarn install
```

Will run all tests with jest

```
yarn test
```

Will run jest with the coverage report (this will create a new directory to be able to examine the report in more detail)

```
yarn test-with-coverage
```
