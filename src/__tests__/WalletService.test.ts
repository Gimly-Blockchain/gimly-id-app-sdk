import { createEncryptedWallet } from '..'

describe('wallet test', () => {
  it('succeed creating a wallet', async () => {
    const pin = '123456'
    const isWalletCreated = await createEncryptedWallet(pin)
    const { mnemonicPhrase } = isWalletCreated

    expect(mnemonicPhrase).toBeTruthy()
  })
})
