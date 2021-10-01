import {
  changePin,
  checkPin,
  checkSecurityPhrase,
  getDid,
  getKeychainDataObject,
  getPrivateKey,
  getSecurityPhrase,
  getWalletAddress,
  saveDID,
  setKeychainDataObject
} from '../utils/keychain'

const mockKeyChainData = {
  wallet:
    '{"wallet":"{\\"address\\":\\"817c14b7ae377423c628837e1363029e073b9239\\",\\"id\\":\\"f3f03a0d-15ae-450c-ac25-c3b11ea6b78d\\",\\"version\\":3,\\"Crypto\\":{\\"cipher\\":\\"aes-128-ctr\\",\\"cipherparams\\":{\\"iv\\":\\"90e85b1e493e6185ff55021ac8126ed8\\"},\\"ciphertext\\":\\"f7dc15f5fd2b4bd6028c84887d61d5d2f69f8ee9b9d96d2dc19a1adc69fbe4b9\\",\\"kdf\\":\\"scrypt\\",\\"kdfparams\\":{\\"salt\\":\\"7c62efeb8e9a7eeb61a223a311464e8ce31320c71917be9530bf1e5691aafc6e\\",\\"n\\":131072,\\"dklen\\":32,\\"p\\":1,\\"r\\":8},\\"mac\\":\\"9411b858689e7b6cad255bcef57345f402e59222ff34adb71e2827c380aad0a7\\"},\\"x-ethers\\":{\\"client\\":\\"ethers.js\\",\\"gethFilename\\":\\"UTC--2021-09-28T15-07-56.0Z--817c14b7ae377423c628837e1363029e073b9239\\",\\"mnemonicCounter\\":\\"7c1364e1f7e3f1afb6d54154c976c14b\\",\\"mnemonicCiphertext\\":\\"b2db0f399268f2eae26af2190d5641444cc38871004c9c38ff116f12534c6a55\\",\\"path\\":\\"m/44\'/60\'/0\'/0/0\\",\\"locale\\":\\"en\\",\\"version\\":\\"0.1\\"}}","mnemonic":"tobacco detect practice spirit vacuum junk noise crouch lion salon country ordinary couch strategy head retreat drip lake predict friend pole pulp cool brisk","privateKey":"0x188208fc91db99795c56d2aca04ced0d6008d34f79fa02d879d8739b9d532093","pin":"111111"}',
  privateKey: 'privateKeyxxxxxxxxx',
  mnemonic:
    'tobacco detect practice spirit vacuum junk noise crouch lion salon country ordinary couch strategy head retreat drip lake predict friend pole pulp cool brisk',
  pin: '123456'
}

describe('Keychain', () => {
  it('succeed creating a keychain Object', async () => {
    const isKeychainObject = await setKeychainDataObject(mockKeyChainData)

    expect(isKeychainObject).toBeTruthy()
  })

  it('succeed saving did', async () => {
    const did = 'did:ethr:0xb9c5714089478a327f09197987f16f9e5d936e8a'
    const isDid = await saveDID(did)
    expect(isDid).toBeTruthy()
  })

  it('error at saving did', async () => {
    const isDid = await saveDID('')
    expect(isDid).toBeFalsy()
  })

  it('succeed getting keychain Object', async () => {
    const isKeychainObject = await getKeychainDataObject()

    expect(isKeychainObject).toBeTruthy()
  })

  it('succeed getting private key', async () => {
    const isPrivateKey = await getPrivateKey()

    expect(isPrivateKey).toBeTruthy()
  })

  it('succeed getting security phrase', async () => {
    const isSecurityPhrase = await getSecurityPhrase()

    expect(isSecurityPhrase).toBeTruthy()
  })

  it('succeed getting wallet Address', async () => {
    const isWalletAddress = await getWalletAddress()

    expect(isWalletAddress).toBeTruthy()
  })

  it('succeed getting did', async () => {
    const isDid = await getDid()

    expect(isDid).toBeTruthy()
  })

  it('succeed checking pin', async () => {
    const isCheckPin = await checkPin('123456')

    expect(isCheckPin).toBeTruthy()
  })

  it('error checking pin', async () => {
    const isCheckPin = await checkPin('')

    expect(isCheckPin).toBeFalsy()
  })

  it('succeed checking security phrase', async () => {
    const isCheckSecurityPhrase = await checkSecurityPhrase(
      mockKeyChainData.mnemonic
    )

    expect(isCheckSecurityPhrase).toBeTruthy()
  })

  it('error checking security phrase', async () => {
    const isCheckSecurityPhrase = await checkSecurityPhrase('')

    expect(isCheckSecurityPhrase).toBeFalsy()
  })

  it('succeed at change pin', async () => {
    const isChangePin = await changePin('12224')

    expect(isChangePin).toBeTruthy()
  })
})
