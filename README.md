# Gimly ID Mobile SDK

Typescript library and html/css bundles used to interact a the Gimly ID app to login with SSO and send and receive VCs

This is the usage documentation for the **SDK** used in a react native **APP**.

## Getting Started

React native ≥0.64 required.
To install locally  the component we must install the main repository package

    yarn add https://github.com/Gimly-Blockchain/gimly-id-app-sdk.git

## Service 

The SDK consists of a group of services to:
- Create the encrypted wallet on the device.
- Create DID.
- Manage credentials.
- Manage presentations.


# Wallet

### Description

In the process of creating the wallet through ethers, a mnemonic phrase (BIP-39) with 24 words will be created, with this phrase the wallet will be created, later it will be encrypted with the value provided. Finally it will be stored by Keychain securely on the device

For more information, see:

[Ethers.io](https://docs.ethers.io/v5/)
[Keychain](https://github.com/oblador/react-native-keychain)

## Usage

To create the wallet we will only have to provide a value to the function which must have a **string** type.

````
import { createEncryptedWallet } from  'gimly-id-app-sdk'

const savePin = async (pin: string) => {
	if (pin) {
		await createEncryptedWallet(pin)
	}
}

// This is the key that will be used to encrypt the wallet
savePin('123456')
````

We will receive this response in case of error

````
// Error when creating the wallet
````

# DID

### Description

This service is responsible for creating and modifying the user's DID using the following libraries:

[eosio-did](https://github.com/Gimly-Blockchain/eosio-did)
[eosio-did-spec](https://github.com/Gimly-Blockchain/eosio-did-spec)

## Usage

### Data Interface
````
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
````
import { GeneralIdentityService } from  'gimly-id-app-sdk'

const generateDid = async (data: IdentityData, auth: Authority) => {
	await GeneralIdentityService.createDid(data, auth)
}
````

We will receive this response in case of error
````
// Create DID error
````

### Resolve DID
````
import { GeneralIdentityService } from  'gimly-id-app-sdk'

const resolveDID = async () => {
	await GeneralIdentityService.getUserDid()
}
````

We will receive this response in case of error
````
// resolve DID error
````

### Update DID
````
import { GeneralIdentityService } from  'gimly-id-app-sdk'

const resolveDID = async (
	data: IdentityData,
	permission: string,
	parent: string,
	auth: Authority
) => {
	await GeneralIdentityService.getUserDid()
}
````

We will receive this response in case of error
````
// Update DID error
````

# Credentials

### Description

This service is responsible for generating and verifying the credentials

[Sphereon/rn-vc-js](https://github.com/Sphereon-Opensource/rn-vc-js)
[Digitalbazaar/ed25519-signature-2020](https://github.com/digitalbazaar/ed25519-signature-2020)
[Digitalbazaar/ed25519-verification-key-2020](https://github.com/digitalbazaar/ed25519-verification-key-2020)

## Usage

### Data Interface
````
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

````

### Generate credential
````
import { GeneralIdentityService } from  'gimly-id-app-sdk'

const generateCredential = async (credential: Credential) => {
	await GeneralIdentityService.createCredential(credential)
}
````

We will receive this response in case of error
````
// Create Credential Error
````

### Verify credential
````
import { GeneralIdentityService } from  'gimly-id-app-sdk'

const verifyCredential = async (credential: Credential) => {
	await GeneralIdentityService.verifyCredential(credential)
}
````

We will receive this response in case of error
````
// Verify Credential Error
````

# Presentations

### Description

This is the service responsible for generating and verifying presentations, using the following libraries

[Sphereon/rn-vc-js](https://github.com/Sphereon-Opensource/rn-vc-js)
[Digitalbazaar/ed25519-signature-2020](https://github.com/digitalbazaar/ed25519-signature-2020)
[Digitalbazaar/ed25519-verification-key-2020](https://github.com/digitalbazaar/ed25519-verification-key-2020)

## Usage

### Data Interface
````
interface  Presentation {
	"@context": string[];
	type: string[];
	verifiableCredential: Credential[];
	proof?: PresentationProof;
}
// The "Credential" and "PresentationProof" interfaces are the same used in the presentation service.
````

### Create presentation
````
import { GeneralIdentityService } from  'gimly-id-app-sdk'

// optional `id` and `holder`
const createPresentation = async (
	verifiableCredential: Credential[],
	id?: string,
	holder?: string
) => {
	await GeneralIdentityService.createPresentation(verifiableCredential, id, holder)
}
````

We will receive this response in case of error
````
// Create Presentation Error
````

### Sign presentation
````
import { GeneralIdentityService } from  'gimly-id-app-sdk'

const signPresentation = async (presentation: Presentation, challenge: string) => {
	await GeneralIdentityService.signPresentation(presentation, challenge)
}
````

We will receive this response in case of error
````
// Sign Presentation Error
````

### Verify presentation
````
import { GeneralIdentityService } from  'gimly-id-app-sdk'

const verifyPresentation = async (presentation: Presentation) => {
	await GeneralIdentityService.verifyPresentation(presentation)
}
````

We will receive this response in case of error
````
// Verify Presentation Error
````

### Verify unsigned presentation
````
import { GeneralIdentityService } from  'gimly-id-app-sdk'

const verifyUnsignedPresentation = async (presentation: Presentation) => {
	await GeneralIdentityService.verifyUnsignedPresentation(presentation)
}
````

We will receive this response in case of error
````
// Verify Unsigned Presentation Error
````



## Class diagram

![Screenshot 2021-09-09 at 16 33 13](https://user-images.githubusercontent.com/488556/132705566-9defa1a2-5f9f-4fdb-871e-2eaf7bcec075.png)
