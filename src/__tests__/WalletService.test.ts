import { createEncryptedWallet } from '..'

describe('Ethr DID should', () => {
  it('succeed creating a DID on testnet', async () => {
    const pin = '123456'
    const isWalletCreated = await createEncryptedWallet(pin)
    const { mnemonicPhrase } = isWalletCreated

    expect(mnemonicPhrase).toBeTruthy()
  })
})
