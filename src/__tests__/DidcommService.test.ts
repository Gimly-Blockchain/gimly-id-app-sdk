import { DIDComm } from 'DIDComm-js'
import DidcommService, { KeyPair } from '../services/DidcommService'

describe('DidcommJs should', () => {
  let bobMock: KeyPair
  let aliceMock: KeyPair

  beforeEach(async () => {
    const didcomm = new DIDComm()
    await didcomm.ready
    bobMock = await didcomm.generateKeyPair()
    aliceMock = await didcomm.generateKeyPair()
  })

  it('success packing message', async () => {
    const message = 'I AM A PRIVATE MESSAGE'
    const isPackMsg = await DidcommService.packMsg(
      message,
      bobMock.publicKey,
      aliceMock
    )

    expect(isPackMsg).not.toEqual(false)
  })

  it('error due to missing issuer', async () => {
    const message = 'I AM A PRIVATE MESSAGE'

    try {
      await DidcommService.packMsg(message, undefined, aliceMock)
    } catch (e) {
      expect(e.message).toEqual('Issuer or receiver missing')
    }
  })

  it('error due to missing receiver', async () => {
    const message = 'I AM A PRIVATE MESSAGE'

    try {
      await DidcommService.packMsg(message, bobMock.publicKey, undefined)
    } catch (e) {
      expect(e.message).toEqual('Issuer or receiver missing')
    }
  })

  it('success packs and unpacks a message', async () => {
    const newMessage = 'I AM A PRIVATE MESSAGE'

    const packedMsg = await DidcommService.packMsg(
      newMessage,
      bobMock.publicKey,
      aliceMock
    )
    const { message } = await DidcommService.unPackMsg(packedMsg, bobMock)
    expect(message).toEqual(message)
  })

  it('error packs and unpacks a message', async () => {
    const newMessage = 'I AM A PRIVATE MESSAGE'

    const packedMsg = await DidcommService.packMsg(
      newMessage,
      bobMock.publicKey,
      aliceMock
    )

    try {
      await DidcommService.unPackMsg(packedMsg, undefined)
    } catch (e) {
      expect(e.message).toEqual('packed message or issuer missing')
    }
  })
})
